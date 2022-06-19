import Entity from "~/internal/Entity";
import * as THREE from 'three';
import { Ground } from "~/entities/Ground";
import { Player } from "~/entities/Player";

export class InputSystem extends Entity {
  mousePosition = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  start() {
    window.addEventListener('pointerup', this.onMouseUp);
    window.addEventListener('pointerdown', this.onMouseDown);
    window.addEventListener('pointermove', this.onMouseMove);
  }

  updateMousePosition(e: MouseEvent) {
    this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }

  getIntersects(position: THREE.Vector2) {
    const defaultSystem = this.app.getDefaultSystem();
    this.raycaster.setFromCamera(position, defaultSystem.camera);
    return this.raycaster.intersectObjects(defaultSystem.scene.children);
  }

  onMouseDown = (e: MouseEvent) => {
    this.updateMousePosition(e);

    const intersects = this.getIntersects(this.mousePosition);
    const ground = this.app.getEntities().find(it => it instanceof Ground) as Ground;
    if (!ground) {
      return;
    }

    const intersect = intersects.find(it => it.object === ground.plane);
    if (!intersect) {
      return;
    }

    const player = this.app.getEntities().find(it => it instanceof Player) as Player;
    if (!player) {
      return;
    }

    player.setTargetPosition(intersect.point);
  }

  onMouseUp = (e: MouseEvent) => {
    this.updateMousePosition(e);
  }

  onMouseMove = (e: MouseEvent) => {
    this.updateMousePosition(e);


  }
}