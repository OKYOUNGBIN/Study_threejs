import Entity from "~/internal/Entity";
import * as THREE from "three";

export class Bullet extends Entity {
  geometry: THREE.CylinderGeometry;
  material: THREE.MeshStandardMaterial;
  cylinder: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>;

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.CylinderGeometry(0, 0.2);
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff });
    this.cylinder = new THREE.Mesh(this.geometry, this.material);
    this.cylinder.castShadow = true;

    defaultSystem.scene.add(this.cylinder);
  }
}