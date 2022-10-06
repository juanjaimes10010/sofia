import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.117.1/examples/jsm/controls/OrbitControls.js';
import { gamepad } from './hooks/gamepad.js';
// import { Cannon } from './app.js';
import * as CANNON from './package/dist/cannon-es.js';

const xbox = gamepad();
// Three js
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
camera.position.set(0,25,50);
camera.lookAt(0, 0, 0)

// Cannon js
const world = new CANNON.World({
  gravity: new CANNON.Vec3(0, -9.81, 0)
})

const timeStep = 1/60;

// creating materials
const groundContactMaterial = new CANNON.Material();
const boxContactMaterial = new CANNON.Material();
const sphereContactMaterial = new CANNON.Material();

const boxToGroundContactMaterial = new CANNON.ContactMaterial(
  groundContactMaterial,
  boxContactMaterial,
  {
    friction: 0
  }
)
const sphereToGroundContactMaterial = new CANNON.ContactMaterial(
  groundContactMaterial,
  sphereContactMaterial,
  {
    restitution: 0.9
  }
)
world.addContactMaterial(boxToGroundContactMaterial);
world.addContactMaterial(sphereToGroundContactMaterial);

// creating ground 
const groundGeometry = new THREE.PlaneGeometry(30, 30);
const groundMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  wireframe: true
});
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(groundMesh)

const groundBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(15, 15, 0.1)),
  type: CANNON.Body.STATIC,
  material: groundContactMaterial
})
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// creating box model
const boxGeometry = new THREE.BoxGeometry(2,2,2);
const boxMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh)

const boxBody = new CANNON.Body({
  shape: new CANNON.Box(new CANNON.Vec3(1,1,1)),
  mass: 5,
  type: 'Dynamic',
  position: new CANNON.Vec3(6,20,1),
  material: boxContactMaterial
})
boxBody.angularVelocity.set(0,10,0);
boxBody.angularDamping = .54;
world.addBody(boxBody);

// creating sphere model
const sphereGeometry = new THREE.SphereGeometry(2);
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true
});
const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphereMesh)

const sphereBody = new CANNON.Body({
  shape: new CANNON.Sphere(2),
  mass: 5,
  type: 'Dynamic',
  position: new CANNON.Vec3(0, 12, 1),
  linearDamping: 0.31,
  material: sphereContactMaterial
})
world.addBody(sphereBody);


function animate() {
  xbox.update();


  // copy ground mesh (threejs) to have exact position as ground body (cannonjs)
  groundMesh.position.copy(groundBody.position);
  groundMesh.quaternion.copy(groundBody.quaternion)

  // copy box mesh (threejs) to have exact position as box body (cannonjs)
  boxMesh.position.copy(boxBody.position);
  boxMesh.quaternion.copy(boxBody.quaternion)

  // copy box mesh (threejs) to have exact position as box body (cannonjs)
  sphereMesh.position.copy(sphereBody.position);
  sphereMesh.quaternion.copy(sphereBody.quaternion)

  // render three js and cannon js worlds 
  world.step(timeStep);
  renderer.render(scene, camera);

}

renderer.setAnimationLoop(animate);