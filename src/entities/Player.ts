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

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.BoxGeometry(1, 1);
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide });
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

    const speed = 0.5 * delta;
    this.box.position.setX(this.box.position.x + Math.cos(angle) * speed);
    this.box.position.setY(this.box.position.y + Math.sin(angle) * speed);
  }

  setTargetPosition(position: THREE.Vector3) {
    this.targetPosition = position;
    this.targetPosition.setZ(this.box.position.z);
    // this.box.position.set(position.x, position.y, this.box.position.z);
  }
}