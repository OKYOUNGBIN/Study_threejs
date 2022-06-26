import Entity from "~/internal/Entity";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { DEGREE_TO_RADIAN } from "~/shared/variables";

export class DefaultSystem extends Entity {
  clock: THREE.Clock;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  directionalLight: THREE.DirectionalLight;
  composer: EffectComposer;

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
    this.composer.render(delta);
  }

  start() {
    this.clock = new THREE.Clock();
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      .1,
      1000,
    );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;

    this.composer = new EffectComposer(this.renderer);
    const renderPass = new RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    this.directionalLight.position.set(0, 5, 10);
    this.directionalLight.castShadow = true;
    this.directionalLight.shadow.mapSize.width = 1024;
    this.directionalLight.shadow.mapSize.height = 1024;
    this.directionalLight.shadow.camera.near = 0.1;
    this.directionalLight.shadow.camera.far = 1000;

    this.scene.add(this.directionalLight);

    this.camera.position.set(0, -2.5, 20);
    this.camera.rotation.set(10 * DEGREE_TO_RADIAN, 0, 0);

    document.body.appendChild(this.renderer.domElement);
    window.addEventListener('resize', this.onResize);
    window.requestAnimationFrame(this.onEnterFrame);
  }
}