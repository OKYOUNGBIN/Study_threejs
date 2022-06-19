import Application from './internal/Application';
import { Ground } from "~/entities/Ground";
import { Player } from "~/entities/Player";

window.addEventListener('load', () => {
  const app = new Application();
  app.addEntity(new Ground());
  app.addEntity(new Player());
});
