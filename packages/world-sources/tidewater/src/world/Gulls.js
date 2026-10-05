import {createGullGeometry as gullGeometry} from '@dgreenheck/tidewater-gulls/geometry';
import * as THREE from 'three/webgpu';
import {
	Fn, vec3, attribute, positionLocal, sin, cos, smoothstep, abs,
} from 'three/tsl';
import { G } from '../core/Globals.js';
import { standard } from '../materials/Materials.js';
import { staticVelocityMRT } from '../post/CameraVelocity.js';

// Seagulls soaring over the bay: each bird circles its own thermal, banking into the turn, with
// occasional flapping bursts and the characteristic bent ("M") wing. Everything is animated in
// the vertex shader from time and per-instance parameters (no CPU work per frame).
export class Gulls {

	constructor( { scene, count = 18, center = new THREE.Vector3( 35, 0, - 10 ), spread = 140, seed = 7 } ) {

		let s = seed >>> 0;
		const rand = () => ( ( s = Math.imul( s ^ ( s >>> 15 ), 2246822519 ) + 0x6D2B79F5 >>> 0 ) / 4294967296 );

		const geo = gullGeometry();
		// per instance: (cx, cz, radius, height) (phase, speed, flapSeed, dir)
		const a = new Float32Array( count * 4 ), b = new Float32Array( count * 4 );
		for ( let i = 0; i < count; i ++ ) {

			a.set( [ center.x + ( rand() - 0.5 ) * spread, center.z + ( rand() - 0.5 ) * spread * 0.8, 14 + rand() * 36, 9 + rand() * 24 ], i * 4 );
			b.set( [ rand() * Math.PI * 2, 8 + rand() * 4, rand() * 100, rand() < 0.5 ? - 1 : 1 ], i * 4 );

		}

		geo.setAttribute( 'gA', new THREE.InstancedBufferAttribute( a, 4 ) );
		geo.setAttribute( 'gB', new THREE.InstancedBufferAttribute( b, 4 ) );

		const mat = standard( { roughness: 0.75, metalness: 0 } );
		mat.name = 'Gull';
		mat.vertexColors = true;
		mat.underwaterLighting = 'none';
		mat.mrtNode = staticVelocityMRT;

		const gA = attribute( 'gA', 'vec4' ), gB = attribute( 'gB', 'vec4' );
		const side = attribute( 'side', 'float' ); // -1 left wing, 1 right wing, 0 body
		const span = attribute( 'span', 'float' ); // 0 at the shoulder .. 1 at the wing tip

		// flight state at time t
		const state = ( t ) => {

			const R = gA.z, dir = gB.w;
			const th = gB.x.add( t.mul( gB.y ).div( R ).mul( dir ) );
			const p = vec3( gA.x.add( cos( th ).mul( R ) ), gA.w.add( sin( th.mul( 2 ).add( gB.z ) ).mul( 3 ) ), gA.y.add( sin( th ).mul( R ) ) );
			// flight direction (tangent) and bank into the turn
			const fwd = vec3( sin( th ).negate().mul( dir ), 0, cos( th ).mul( dir ) );
			return { p, fwd, bank: dir.mul( - 0.45 ) };

		};

		mat.positionNode = Fn( () => {

			const t = G.time;
			const st = state( t );
			// flapping bursts: a slow gate turns wing beats (3 Hz) on and off; gliding otherwise
			const gate = smoothstep( 0.55, 0.8, sin( t.mul( 0.23 ).add( gB.z ) ).mul( 0.5 ).add( 0.5 ) );
			const beat = sin( t.mul( 3.1 * 2 * Math.PI ).add( gB.z.mul( 7 ) ) );
			const lift = gate.mul( beat ).mul( 0.55 ).add( 0.08 ); // radians at the shoulder
			const p = positionLocal.toVar();
			// wing: rotate about the body axis at the shoulder, the outer wing bends further
			const ang = lift.mul( span.mul( 0.6 ).add( 0.4 ) ).add( span.mul( span ).mul( gate.oneMinus().mul( - 0.18 ) ) );
			const ax = abs( p.x );
			const y = p.y.add( ax.mul( sin( ang ) ) );
			const x = p.x.mul( cos( ang ) );
			p.assign( vec3( select3( side, x, p.x ), select3( side, y, p.y ), p.z ) );
			// bank (roll around the flight axis), then orient along the flight direction
			const cb = cos( st.bank ), sb = sin( st.bank );
			const rolled = vec3( p.x.mul( cb ).sub( p.y.mul( sb ) ), p.x.mul( sb ).add( p.y.mul( cb ) ), p.z );
			const f = st.fwd;
			const r = vec3( f.z, 0, f.x.negate() );
			return st.p.add( r.mul( rolled.x ) ).add( vec3( 0, rolled.y, 0 ) ).add( f.mul( rolled.z ) );

		} )();

		geo.instanceCount = count;
		this.mesh = new THREE.Mesh( geo, mat );
		this.mesh.name = 'Gulls';
		this.mesh.frustumCulled = false;
		this.mesh.castShadow = false;
		scene.add( this.mesh );

	}

}

const select3 = ( side, a, b ) => side.notEqual( 0 ).select( a, b );

// ~1.3 m wingspan gull: slim body, bent wings with grey mantle and black tips, white underside
