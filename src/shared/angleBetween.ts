import * as THREE from "three";

export function angleBetween(a: THREE.Vector2, b: THREE.Vector2) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.atan2(dy, dx);
}