import Entity from "~/internal/Entity";
import * as THREE from 'three';

export class Player extends Entity {
  geometry: THREE.BoxGeometry;
  material: THREE.MeshStandardMaterial;
  box: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshStandardMaterial>;

  start() {
    this.geometry = new THREE.BoxGeometry(1, 1);
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.DoubleSide });
    this.box = new THREE.Mesh(this.geometry, this.material);
    this.box.castShadow = true;

    this.app.scene.add(this.box);
  }
}