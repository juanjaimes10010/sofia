import { player } from "../app.js";

export const keyboard = () => {
  const keys = {
    ArrowUp: false,
    ArrowLeft: false,
    ArrowDown: false,
    ArrowRight: false,
    Space: false,
    KeyW: false,
    KeyD: false,
    KeyS: false,
    KeyA: false,
  };
  
  const keyDown = (e) => {

    if (e.code == "ArrowUp") keys.ArrowUp = true;
    if (e.code == "ArrowRight") keys.ArrowRight = true;
    if (e.code == "ArrowDown") keys.ArrowDown = true;
    if (e.code == "ArrowLeft") keys.ArrowLeft = true;
    if (e.code == "KeyW") keys.KeyW = true;
    if (e.code == "KeyD") keys.KeyD = true;
    if (e.code == "KeyS") keys.KeyS = true;
    if (e.code == "KeyA") keys.KeyA = true;
    if (e.code == "Space") keys.Space = true;

    player.direction.z = (keys.KeyW || keys.ArrowUp ? -1 : 0) + (keys.KeyS || keys.ArrowDown ? 1 : 0);
    if (player.direction.z == 1) player.velocity.z = -player.speed;
    else if (player.direction.z == -1) player.velocity.z = player.speed;
    else player.velocity.z = 0;

    player.direction.x = (keys.KeyA || keys.ArrowLeft ? -1 : 0) + (keys.KeyD || keys.ArrowRight ? 1 : 0);
    if (player.direction.x == 1) player.torque.x = player.speed;
    else if (player.direction.x == -1) player.torque.x = -player.speed;
    else player.torque.x = 0;

    console.log(player.position)
  };

  const keyUp = (e) => {
    if (e.code == "ArrowUp") keys.ArrowUp = false;
    if (e.code == "ArrowRight") keys.ArrowRight = false;
    if (e.code == "ArrowDown") keys.ArrowDown = false;
    if (e.code == "ArrowLeft") keys.ArrowLeft = false;
    if (e.code == "KeyW") keys.KeyW = false;
    if (e.code == "KeyD") keys.KeyD = false;
    if (e.code == "KeyS") keys.KeyS = false;
    if (e.code == "KeyA") keys.KeyA = false;

    player.direction.z = (keys.KeyW || keys.ArrowUp ? -1 : 0) + (keys.KeyS || keys.ArrowDown ? 1 : 0);
    if (player.direction.z == 1) player.velocity.z = -player.speed;
    else if (player.direction.z == -1) player.velocity.z = player.speed;
    else player.velocity.z = 0;

    player.direction.x = (keys.KeyA || keys.ArrowLeft ? -1 : 0) + (keys.KeyD || keys.ArrowRight ? 1 : 0);
    if (player.direction.x == 1) player.torque.x = player.speed;
    else if (player.direction.x == -1) player.torque.x = -player.speed;
    else player.torque.x = 0;
  };

  addEventListener("keypress", keyDown);

  addEventListener("keydown", keyDown);

  addEventListener("keyup", keyUp);
}