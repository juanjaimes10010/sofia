import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.117.1/build/three.module.js';
import * as CANNON from '../package/dist/cannon-es.js';
import { Three, Cannon } from '../app.js';

export const Ground = () => {
  const size = 50;
  const depth = 5;
  const width = 5;
  const colors = ['red','blue','green','cyan','beige','brown','orange','pink','purple','yellow'];

  for(let z = -size; z < size; z+=5) {
    for(let x = -size; x < size; x+=5) {
      // Three js
      const groundGeometry = new THREE.PlaneGeometry( 5, 5, 1, 1 );
      // const groundTexture = new THREE.TextureLoader().load("../images/grass.jpg") ;
      // const groundMaterial = new THREE.MeshLambertMaterial( {
      //   map: groundTexture 
      // } );
      const groundMaterial = new THREE.MeshBasicMaterial( {color: new THREE.Color(colors[Math.floor(Math.random()*colors.length)]), side: THREE.DoubleSide} );
      const ground = new THREE.Mesh( groundGeometry, groundMaterial );
      ground.position.set(x,0,z)
      ground.rotation.x = -Math.PI / 2; // make it face up
      // groundTexture.wrapS = THREE.RepeatWrapping;
      // groundTexture.wrapT = THREE.RepeatWrapping;
      // groundTexture.repeat.set( 30, 30 );

      Three.scene.add( ground );

      // Cannon js
      const groundBody = new CANNON.Body({
        type: CANNON.Body.STATIC, 
        shape: new CANNON.Box(new CANNON.Vec3( 5/2, 5/ 2, 1)),
        material: Cannon.material.normalGround
      })
      groundBody.position.set(x, -1, z)  
      groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0) // make it face up

      Cannon.world.addBody(groundBody)
    }
  }
  
}