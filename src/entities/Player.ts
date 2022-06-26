import Entity from "~/internal/Entity";
import * as THREE from 'three';

function angleBetween(a: THREE.Vector2, b: THREE.Vector2) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dy, dx);
}

export class Player extends Entity {
  targetPosition?: THREE.Vector3;
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  box: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  speed = 5.0;

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.BoxGeometry(1, 1);
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff });
    this.box = new THREE.Mesh(this.geometry, this.material);
    this.box.castShadow = true;

    defaultSystem.scene.add(this.box);
  }

  update(delta: number) {
    if (!this.targetPosition) {
      return;
    }

    const angle = angleBetween(
      new THREE.Vector2(this.box.position.x, this.box.position.y),
      new THREE.Vector2(this.targetPosition.x, this.targetPosition.y),
    );

    const speed = this.speed * delta;
    this.box.position.setX(this.box.position.x + Math.cos(angle) * speed);
    this.box.position.setY(this.box.position.y + Math.sin(angle) * speed);

    const distance = this.box.position.distanceTo(this.targetPosition);
    if (distance <= 0.1) {
      this.targetPosition = undefined;
    }
  }

  setTargetPosition(position: THREE.Vector3) {
    this.targetPosition = position;
    this.targetPosition.setZ(this.box.position.z);

  }
}