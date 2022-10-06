import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import * as CANNON from '../package/dist/cannon-es.js';
import { Three, Cannon } from "../app.js";

export const Enemy = () => {
  // Custom js
  const size = .5;
  const position = { x: 0, y: 12, z: 0 };
  const quaternion = {x: 0, y: 0, z: 0, w: 1};
  const direction = { x: 0, y: 0, z: 0 };
  const velocity = { x: 0, y: 0, z: 0 };
  const speed = .1;

  // Three js
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial( {color: new THREE.Color('red')} );
  const skin = new THREE.Mesh(geometry, material);
  skin.position.copy(position);
  skin.quaternion.copy(quaternion);
  Three.scene.add(skin);

  // Cannon js
  const body = new CANNON.Body({type: 'Dynamic', mass: 5, shape: new CANNON.Box(new CANNON.Vec3(size / 2, size / 2, size / 2))})
  body.position.copy(position);
  body.quaternion.copy(quaternion);
  Cannon.world.addBody(body);

  const update = () => {
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
    update
  }
}
