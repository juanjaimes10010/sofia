import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import * as CANNON from '../package/dist/cannon-es.js';
import { Three, Cannon } from "../app.js";

export const Player = (obj = {size: 1, position: {x: 1, y: 0, z: 0}}) => {
  // Custom js
  const size = 1;
  const position = new CANNON.Vec3(0, 0, 0);
  const quaternion = {x: 0, y: 0, z: 0, w: 1};
  const direction = { x: 0, y: 0, z: 0 };
  const velocity = new CANNON.Vec3(0, 0, 0);
  const speed = 50;

  // // Three js
  // const geometry = new THREE.BoxGeometry(size, size, size);
  // const material = new THREE.MeshBasicMaterial( {color: new THREE.Color('white')} );
  // const skin = new THREE.Mesh(geometry, material);
  // skin.position.copy(position);
  // skin.quaternion.copy(quaternion);
  // Three.scene.add(skin);

  // // Cannon js
  // const body = new CANNON.Body({
  //   type: 'Dynamic',
  //   mass: 5,
  //   shape: new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2)),
  //   material: Cannon.material.normal
  // });
  const geometry = new THREE.SphereGeometry(obj.size);
  const material = new THREE.MeshBasicMaterial( {color: new THREE.Color(obj.color)} );
  const skin = new THREE.Mesh(geometry, material);
  skin.position.copy(position);
  skin.quaternion.copy(quaternion);
  Three.scene.add(skin);

  // Cannon js
  const body = new CANNON.Body({
    type: 'Dynamic', 
    mass: 5, 
    shape: new CANNON.Sphere(obj.size),
    linearDamping: 0.31,
    material: Cannon.material.rubber
  });
  Cannon.world.addBody(body);

  body.position.copy(position);
  body.quaternion.copy(quaternion);
  // custom cannon
  // const velocity = new CANNON.Vec3(0, 0, 500);      // engine strength
  const origin = new CANNON.Vec3(0, 0, 0);             // where the ship is pushed from
  const torque = new CANNON.Vec3(0, 0/*left*/, 0);    // yaw, left

  body.linearDamping = 0.9;
  body.angularDamping = 0.9;

  const update = () => {
    body.applyTorque(torque);
    body.applyLocalForce(velocity, origin);  // push it "forward"

    position.x = body.position.x;
    position.y = body.position.y;
    position.z = body.position.z;

    quaternion.x = body.quaternion.x;
    quaternion.y = body.quaternion.y;
    quaternion.z = body.quaternion.z;
    quaternion.w = body.quaternion.w;

    skin.position.copy(position);
    skin.quaternion.copy(quaternion);
  }

  return {
    skin,
    body,
    position,
    quaternion,
    direction,
    velocity,
    speed,
    torque,
    origin,
    update
  }
}
