import Entity from "~/internal/Entity";
import * as THREE from 'three';

export class Ground extends Entity {
  geometry: THREE.PlaneGeometry;
  material: THREE.MeshStandardMaterial;
  plane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  start() {
    this.geometry = new THREE.PlaneGeometry(5, 5);
    this.material = new THREE.MeshStandardMaterial( { color: 0x00ffff, side: THREE.DoubleSide });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.plane.receiveShadow = true;
    this.plane.position.set(0, 0, -1);

    this.app.scene.add(this.plane);
  }
}