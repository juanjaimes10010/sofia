import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import * as CANNON from '../package/dist/cannon-es.js';
import { Three, Cannon } from "../app.js";

export const Toy = () => {

  const createBox = (obj = {size: .5, x: 0, y: 0, z: 0, color: 'red'}) => {
    // Custom js
    const size = obj.size;
    const position = { x: obj.x, y: obj.y, z: obj.z };
    const quaternion = {x: 0, y: 0, z: 0, w: 1};
    const direction = { x: 0, y: 0, z: 0 };
    const velocity = { x: 0, y: 0, z: 0 };
    const speed = .1;

    // Three js
    const geometry = new THREE.BoxGeometry(obj.size, obj.size, obj.size);
    const material = new THREE.MeshBasicMaterial( {color: new THREE.Color(obj.color)} );
    const skin = new THREE.Mesh(geometry, material);
    skin.position.copy(position);
    skin.quaternion.copy(quaternion);
    Three.scene.add(skin);

    // Cannon js
    const body = new CANNON.Body({
      type: 'Dynamic', 
      mass: 5, 
      shape: new CANNON.Box(new CANNON.Vec3(obj.size / 2, obj.size / 2, obj.size / 2)),
      material: Cannon.material.normal
    });
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

    const createSphere = (obj = {size: .5, x: 0, y: 0, z: 0, color: 'red'}) => {
    // Custom js
    const size = obj.size;
    const position = { x: obj.x, y: obj.y, z: obj.z };
    const quaternion = {x: 0, y: 0, z: 0, w: 1};
    const direction = { x: 0, y: 0, z: 0 };
    const velocity = { x: 0, y: 0, z: 0 };
    const speed = .1;

    // Three js
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
    })
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

  return {
    createBox,
    createSphere,
  }
}