import Entity from "~/internal/Entity";
import * as THREE from 'three';

export class Ground extends Entity {
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshStandardMaterial;
  plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.PlaneGeometry(20, 10, 10, 10);
    this.material = new THREE.MeshStandardMaterial( { color: 0x00ffff, side: THREE.DoubleSide });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.receiveShadow = true;
    this.plane.position.set(0, 0, -1);

    defaultSystem.scene.add(this.plane);
  }
}