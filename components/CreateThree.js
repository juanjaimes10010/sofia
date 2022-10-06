import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';

export const CreateThree = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.PointLight(0xfff, 1, 100);
  light.position.set(50, 50, 50);
  scene.add(light);

  const ambientLight = new THREE.AmbientLight(0x404040); // soft white light
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);

  const splitScreen = () => {
    const leftCamera = new THREE.PerspectiveCamera (45, (window.innerWidth / 2 + 1) / (window.innerHeight - 2), 1, 10000);
    leftCamera.position.set(0,55,70);
    leftCamera.lookAt (new THREE.Vector3(0,0,0));
    leftCamera.aspect = (window.innerWidth / 2 + 1) / (window.innerHeight - 2);
    leftCamera.updateProjectionMatrix();
    const leftControls = new OrbitControls(leftCamera, renderer.domElement);

    const rightCamera = new THREE.PerspectiveCamera (45, (window.innerWidth / 2 + 1) / (window.innerHeight - 2), 1, 10000);;
    rightCamera.position.set (0,35,50);
    rightCamera.lookAt (new THREE.Vector3(0,0,0));
    rightCamera.aspect = (window.innerWidth / 2 + 1) / (window.innerHeight - 2);
    rightCamera.updateProjectionMatrix();

    
    const render = () => {
      renderer.setViewport(1, 1, window.innerWidth / 2 - 2, window.innerHeight -2);
      renderer.setScissor(1, 1, window.innerWidth / 2 - 2, window.innerHeight -2);
      renderer.setScissorTest(true);
      renderer.render(scene, leftCamera);

      renderer.setViewport(window.innerWidth / 2 + 1, 1, window.innerWidth / 2 - 2, window.innerHeight -2);
      renderer.setScissor(window.innerWidth / 2 + 1, 1, window.innerWidth / 2 - 2, window.innerHeight -2);
      renderer.setScissorTest(true);  
      renderer.render(scene, rightCamera);
    }
    return {
      rightCamera, 
      leftCamera,
      render
    } 
  }

  return {
    scene,
    controls,
    camera,
    renderer,
    light,
    ambientLight,
    splitScreen
  }
}