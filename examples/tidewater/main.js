import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {createRocks} from '@dgreenheck/tidewater-rocks';
import {createGulls} from '@dgreenheck/tidewater-gulls';
import './style.css';

let playing = !matchMedia('(prefers-reduced-motion: reduce)').matches, time = 0, last = 0, frame;
const views = [], motion = document.querySelector('#motion');

function createView(id, seed = 17) {
  const host = document.getElementById(id), garden = id === 'garden';
  const renderer = new THREE.WebGLRenderer({antialias: true}); renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(garden ? '#dce4cd' : '#d4e6de'); renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; host.replaceChildren(renderer.domElement);
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(38, 1, .1, 150);
  camera.position.set(13, 12, 17); const controls = new OrbitControls(camera, renderer.domElement); controls.target.set(0, 1.8, 0); controls.minDistance = 12; controls.maxDistance = 38; controls.maxPolarAngle = Math.PI / 2.2; controls.update();
  scene.add(new THREE.HemisphereLight(0xeaffef, 0x6f826b, 2.4));
  const sun = new THREE.DirectionalLight(0xffeed1, 3); sun.position.set(-6, 15, 8); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024);
  Object.assign(sun.shadow.camera, {left: -10, right: 10, top: 10, bottom: -10}); sun.shadow.normalBias = .04; scene.add(sun);
  const ground = new THREE.Mesh(new THREE.CylinderGeometry(7.2, 7.4, .6, 80), new THREE.MeshStandardMaterial({color: garden ? '#879b62' : '#b6b98d', roughness: 1}));
  ground.position.y = -.3; ground.receiveShadow = true; scene.add(ground);
  const pond = new THREE.Mesh(new THREE.CircleGeometry(garden ? 2.1 : 5.8, 80), new THREE.MeshStandardMaterial({color: garden ? '#719a85' : '#6ea89f', roughness: .35, metalness: .1}));
  pond.rotation.x = -Math.PI / 2; pond.position.set(garden ? -1.6 : 0, .015, garden ? 1.2 : 0); scene.add(pond);
  const rocks = createRocks({seed, count: garden ? 4 : 6, spread: garden ? 6 : 8, size: garden ? .8 : 1.5, color: garden ? '#c4ba98' : '#748782'});
  const gulls = createGulls({seed: garden ? 22 : 7, count: garden ? 4 : 7, center: [0, 0, 0], spread: [3, 3], radius: [2, 4], height: garden ? [3.5, 5] : [4, 6], size: [.7, .9]});
  scene.add(rocks.object, gulls.object);
  const resize = new ResizeObserver(() => { const {width, height} = host.getBoundingClientRect(); renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); render(); }); resize.observe(host);
  controls.addEventListener('change', render);
  function render() { gulls.update(time); renderer.render(scene, camera); }
  render(); host.dataset.ready = 'true';
  return {scene, renderer, camera, rocks, gulls, render, dispose() { resize.disconnect(); controls.dispose(); rocks.dispose(); gulls.dispose(); ground.geometry.dispose(); ground.material.dispose(); pond.geometry.dispose(); pond.material.dispose(); sun.shadow.dispose(); renderer.dispose(); renderer.forceContextLoss(); host.replaceChildren(); }};
}

function updateMotion() { motion.textContent = playing ? 'Pause motion' : 'Play motion'; motion.setAttribute('aria-pressed', String(playing)); }
function renderFrame(now) { if (playing && last) time += Math.min((now - last) / 1000, .05); last = now; for (const view of views) view.render(); frame = requestAnimationFrame(renderFrame); }
try {
  views.push(createView('coast'), createView('garden')); updateMotion();
  document.querySelector('#status').textContent = 'Two independent scenes · ready';
  motion.addEventListener('click', () => { playing = !playing; updateMotion(); });
  let variant = 17;
  document.querySelector('#variation').addEventListener('click', () => { views[1].dispose(); views[1] = createView('garden', ++variant); });
  // Development inspection for the acceptance tests; the components themselves have no globals.
  window.tidewaterStudy = {views, seek(seconds) { playing = false; time = seconds; updateMotion(); for (const view of views) view.render(); }};
  frame = requestAnimationFrame(renderFrame);
  window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); views.forEach(view => view.dispose()); }, {once: true});
} catch (error) { document.querySelector('#status').textContent = error.message; views.forEach(view => view.dispose()); throw error; }
