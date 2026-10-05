import * as THREE from 'three';
// Original Tidewater geometry; attribution and revision: PROVENANCE.json.
export function createGullGeometry() {

	const pos = [], col = [], side = [], span = [], idx = [];
	const white = [ 0.92, 0.92, 0.9 ], grey = [ 0.55, 0.58, 0.62 ], black = [ 0.06, 0.06, 0.07 ], bill = [ 0.85, 0.7, 0.2 ];
	const v = ( x, y, z, c, s, sp ) => {

		pos.push( x, y, z );
		col.push( ...c );
		side.push( s );
		span.push( sp );
		return pos.length / 3 - 1;

	};

	// body: two diamonds (top grey-white, bottom white) along z
	const nose = v( 0, 0.01, 0.26, bill, 0, 0 ), tail = v( 0, 0.0, - 0.24, white, 0, 0 );
	const lt = v( - 0.045, 0.03, 0.02, white, 0, 0 ), rt = v( 0.045, 0.03, 0.02, white, 0, 0 );
	const lb = v( - 0.04, - 0.03, 0.02, white, 0, 0 ), rb = v( 0.04, - 0.03, 0.02, white, 0, 0 );
	idx.push( nose, rt, lt, nose, lb, rb, nose, lt, lb, nose, rb, rt, tail, lt, rt, tail, rb, lb, tail, lb, lt, tail, rt, rb );

	// wings: shoulder -> elbow -> tip, leading/trailing edges (top grey, tip black)
	for ( const s of [ - 1, 1 ] ) {

		const ls = v( s * 0.04, 0.02, 0.07, grey, s, 0 ), ts = v( s * 0.04, 0.02, - 0.08, grey, s, 0 );
		const le = v( s * 0.32, 0.05, 0.05, grey, s, 0.5 ), te = v( s * 0.32, 0.05, - 0.09, grey, s, 0.5 );
		const tip = v( s * 0.66, 0.0, - 0.06, black, s, 1 ), tt = v( s * 0.55, 0.01, - 0.1, black, s, 0.85 );
		if ( s > 0 ) idx.push( ls, le, ts, ts, le, te, le, tip, te, te, tip, tt );
		else idx.push( ls, ts, le, ts, te, le, le, te, tip, te, tt, tip );

	}

	const g = new THREE.InstancedBufferGeometry();
	g.setIndex( idx );
	g.setAttribute( 'position', new THREE.Float32BufferAttribute( pos, 3 ) );
	g.setAttribute( 'color', new THREE.Float32BufferAttribute( col, 3 ) );
	g.setAttribute( 'side', new THREE.Float32BufferAttribute( side, 1 ) );
	g.setAttribute( 'span', new THREE.Float32BufferAttribute( span, 1 ) );
	g.computeVertexNormals();
	return g;

}
