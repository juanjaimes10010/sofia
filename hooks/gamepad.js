import { player } from "../app.js";

export const gamepad = () => {
  const controllers = {
    0: null,
    1: null,
    2: null,
    3: null 
  }
  const connected = () => navigator.getGamepads().some( e => e !== null); 
  
  const connectedGamepad = e => {
    console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.",
    e.gamepad.index, e.gamepad.id,
    e.gamepad.buttons.length, e.gamepad.axes.length);
  }
  const disconnectedGamepad = (e) => {
    console.log("Gamepad disconnected from index %d: %s",
    e.gamepad.index, e.gamepad.id);
  }

  window.addEventListener("gamepadconnected", connectedGamepad);
  window.addEventListener("gamepaddisconnected", disconnectedGamepad);

  const update = () => {
    const gamepads = navigator.getGamepads();
    controllers[0] = gamepads[0];
    controllers[1] = gamepads[1];
    controllers[2] = gamepads[2];
    controllers[3] = gamepads[3]
    if(controllers[0]){
      const axes = [];
      controllers[0].axes.forEach( x => axes.push(Math.round(Math.floor(10 * x))/10));
      console.log(controllers[0].axes,'\n',axes)
    }
  }

  return {
    connected,
    update
  }
}