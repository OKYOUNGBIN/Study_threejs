import Entity from "~/internal/Entity";
import * as THREE from "three";
import { Bullet } from "~/entities/Bullet";

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
    this.box.position.set(5, 0, 0);

    defaultSystem.scene.add(this.box);
  }

  update(delta: number) {
    const bullets = this.app.getEntities().filter(it => it instanceof Bullet) as Array<Bullet>;

    for (let i = 0; i < bullets.length; i++) {
      const bullet = bullets[i];
      const distance = bullet.cylinder.position.distanceTo(this.box.position);
      if (distance <= 1) {
        bullet.destroy();
      }
    }
  }
}