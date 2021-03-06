import Entity from "~/internal/Entity";
import * as THREE from "three";

export class Bullet extends Entity {
  geometry: THREE.CylinderGeometry;
  material: THREE.MeshStandardMaterial;
  cylinder: THREE.Mesh<THREE.CylinderGeometry, THREE.MeshStandardMaterial>;

  angle = 0;
  speed = Math.random() * 5 + 5;
  startPosition: THREE.Vector3 = new THREE.Vector3(0, 0, 0);
  hasChild = false;

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

    if (!this.hasChild && this.startPosition.distanceTo(this.cylinder.position) > 5) {
      this.hasChild = true;

      const iteration = 100;
      const oneAngle = Math.PI * 2.0 / iteration;
      for (let i = 0; i < iteration; i++) {
        const bullet = new Bullet();
        bullet.angle = oneAngle * i;
        bullet.startPosition = this.cylinder.position;
        bullet.hasChild = true;
        this.app.addEntity(bullet);
      }
    }
  }

  destroy() {
    this.app.getDefaultSystem().scene.remove(this.cylinder);
    this.app.removeEntity(this);
  }
}