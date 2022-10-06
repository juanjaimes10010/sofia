import * as CANNON from '../package/dist/cannon-es.js';

export const CreateCannon = () => {
  const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -9.82, 0)
  })

  const material = {
    rubber: new CANNON.Material(),
    normal: new CANNON.Material(),
    normalGround: new CANNON.Material(),
  }
  const normalToNormalGround = new CANNON.ContactMaterial(
    material.normal,
    material.normalGround,
    {
      friction: 0.04,
    }
  );
  world.addContactMaterial(normalToNormalGround);

  const rubberToNormalGround = new CANNON.ContactMaterial(
    material.rubber,
    material.normalGround,
    {
      restitution: 0.9
    }
  );
  world.addContactMaterial(rubberToNormalGround);



  return {
    world,
    material
  }
}
