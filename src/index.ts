import Application from './internal/Application';
import { Ground } from "~/entities/Ground";
import { Player } from "~/entities/Player";
import { InputSystem } from "~/entities/InputSystem";
import { Obstacle } from "~/entities/Obstacle";

window.addEventListener('load', () => {
  const app = new Application();
  app.addEntity(new Ground());
  app.addEntity(new Player());
  app.addEntity(new InputSystem());
  app.addEntity(new Obstacle());
});
