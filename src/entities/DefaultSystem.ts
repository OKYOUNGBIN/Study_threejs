import Entity from "~/internal/Entity";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export class DefaultSystem extends Entity {
  clock: THREE.Clock;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  directionalLight: THREE.DirectionalLight;

  constructor() {
    super();
  }

  onResize = () => {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onEnterFrame = () => {
    const delta = this.clock.getDelta();
    const entities = this.app.getEntities();

    for (let i = 0, length = entities.length; i < length; i++) {
      entities[i].update(delta);
    }

    window.requestAnimationFrame(this.onEnterFrame);
    this.renderer.render(this.scene, this.camera);
  }

  start() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      .1,
      1000,
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(5, 3, 10);

    this.scene.add(this.directionalLight);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.camera.position.z = 10;
    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onResize);
    window.requestAnimationFrame(this.onEnterFrame);
  }
}