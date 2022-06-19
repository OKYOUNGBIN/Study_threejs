import * as THREE from 'three';
import Entity from '~/internal/Entity';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Application {
  clock: THREE.Clock;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  directionalLight: THREE.DirectionalLight;
  entities: Array<Entity> = [];

  constructor() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      .1,
      1000,
    );

    this.camera.position.z = 10;

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 10);

    this.scene.add(this.directionalLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.resize);
    window.requestAnimationFrame(this.render);
  }

  addEntity(...entities: Entity[]) {
    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      entity.app = this;
      entity.start();

      this.entities.push(entity);
    }
  }

  resize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  };

  render = () => {
    const delta = this.clock.getDelta();

    for (let i = 0, length = this.entities.length; i < length; i++) {
      this.entities[i].update(delta);
    }

    window.requestAnimationFrame(this.render);
    this.renderer.render(this.scene, this.camera);
  };
}
