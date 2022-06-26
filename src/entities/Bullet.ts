import Entity from "~/internal/Entity";
import * as THREE from "three";

export class Bullet extends Entity {
  geometry: THREE.CylinderGeometry;
  material: THREE.MeshStandardMaterial;
  cylinder: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>;

  angle = 0;
  speed = 10;
  startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);

  start() {
    const defaultSystem = this.app.getDefaultSystem();

    this.geometry = new THREE.CylinderGeometry(0, 0.3);
    this.material = new THREE.MeshStandardMaterial( { color: 0xffffff });
    this.cylinder = new THREE.Mesh(this.geometry, this.material);
    this.cylinder.castShadow = true;
    this.cylinder.position.set(this.startPosition.x, this.startPosition.y, this.startPosition.z);

    defaultSystem.scene.add(this.cylinder);
  }

  update(delta: number) {
    const pos = new THREE.Vector2(
      Math.cos(this.angle),
      Math.sin(this.angle)
    ).multiplyScalar(this.speed * delta);

    this.cylinder.position.setX(this.cylinder.position.x + pos.x);
    this.cylinder.position.setY(this.cylinder.position.y + pos.y);
    this.cylinder.rotation.set(0, 0, this.angle - Math.PI * 0.5);
  }

  destroy() {
    this.app.removeEntity(this);
  }
}