import Entity from "~/internal/Entity";
import * as THREE from 'three';
import { Ground } from "~/entities/Ground";
import { Player } from "~/entities/Player";
import { angleBetween } from "~/shared/angleBetween";

export class InputSystem extends Entity {
  keyMap = new Map<string, boolean>();
  mousePosition = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  start() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
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

  isPressed(key: string) {
    return this.keyMap.get(key) ?? false;
  }

  update(delta: number) {
    if (this.isPressed(' ')) {
      const player = this.app.getEntities().find(it => it instanceof Player) as Player;
      if (!player) {
        return;
      }

      const intersects = this.getIntersects(this.mousePosition);
      const ground = this.app.getEntities().find(it => it instanceof Ground) as Ground;
      if (!ground) {
        return;
      }

      const intersect = intersects.find(it => it.object === ground.plane);
      if (!intersect) {
        return;
      }

      const angle = angleBetween(
        new THREE.Vector2(player.box.position.x, player.box.position.y),
        new THREE.Vector2(intersect.point.x, intersect.point.y),
      );

      player.spawnBullet(angle);
    }
  }

  onKeyDown = (e: KeyboardEvent) => {
     this.keyMap.set(e.key, true);
  }

  onKeyUp = (e: KeyboardEvent) => {
    this.keyMap.set(e.key, false);
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