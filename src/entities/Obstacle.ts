import Entity from "~/internal/Entity";
import * as THREE from "three";

export class Obstacle extends Entity {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  box: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.BoxGeometry(1, 1);
    this.material = new THREE.MeshStandardMaterial( { color: 0xff0000 });
    this.box = new THREE.Mesh(this.geometry, this.material);
    this.box.castShadow = true;

    defaultSystem.scene.add(this.box);
  }

  update(delta: number) {

  }
}