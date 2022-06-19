import Entity from "~/internal/Entity";
import * as THREE from 'three';

export class InputSystem extends Entity {
  mousePosition = new THREE.Vector2();
  raycaster = new THREE.Raycaster();

  start() {
    window.addEventListener('mousemove', this.onMouseMove);
  }

  onMouseMove = (e: MouseEvent) => {
    this.mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1;

    const defaultSystem = this.app.getDefaultSystem();

    this.raycaster.setFromCamera(this.mousePosition, defaultSystem.camera);
    const intersectObjects = this.raycaster.intersectObjects(defaultSystem.scene.children);

    console.log(intersectObjects);
  }
}