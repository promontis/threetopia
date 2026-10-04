import { describe,expect,it } from 'vitest';
import * as THREE from 'three';
import { CollisionWorld } from '../../src/explore/collision.ts';
import { WorldHeight } from '../../src/explore/hex-world.ts';
const makeWorld=()=>{const terrain=new WorldHeight();terrain.base=()=>0;terrain.floorAt=()=>0;return new CollisionWorld(terrain);};
describe('shared collision world',()=>{
  it('finds a deck below the player without snapping onto a roof',()=>{
    const world=makeWorld();const deck=new THREE.BoxGeometry(8,.2,8);deck.translate(0,1.9,0);world.addGeometry(deck);
    const roof=new THREE.BoxGeometry(8,.2,8);roof.translate(0,5.9,0);world.addGeometry(roof);
    expect(world.floor(0,0,2.4)).toBeCloseTo(2);expect(world.floor(0,0,6.5)).toBeCloseTo(6);world.dispose();
  });
  it('pushes a vertical player capsule out of a wall',()=>{
    const world=makeWorld(),wall=new THREE.BoxGeometry(1,5,10);wall.translate(0,2.5,0);world.addGeometry(wall);
    const position=new THREE.Vector3(.6,0,0);expect(world.resolve(position)).toBe(true);expect(position.x).toBeGreaterThanOrEqual(.8199);expect(position.y).toBeCloseTo(0);world.dispose();
  });
});
