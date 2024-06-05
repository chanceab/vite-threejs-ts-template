import * as THREE from 'three';

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;

// 创建一个由多个三角形组成的"线"
function createLine(points: THREE.Vector3[], width: number, color: THREE.Color) {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide });

  const vertices = [];
  for (let i = 0; i < points.length - 1; i++) {
    const start = points[i];
    const end = points[i + 1];

    const direction = new THREE.Vector3().subVectors(end, start);
    const normal = new THREE.Vector3()
      .crossVectors(direction, new THREE.Vector3(0, 0, 1))
      .normalize()
      .multiplyScalar(width / 2);

    const v1 = new THREE.Vector3().addVectors(start, normal);
    const v2 = new THREE.Vector3().subVectors(start, normal);
    const v3 = new THREE.Vector3().addVectors(end, normal);
    const v4 = new THREE.Vector3().subVectors(end, normal);

    vertices.push(v1.x, v1.y, v1.z);
    vertices.push(v2.x, v2.y, v2.z);
    vertices.push(v3.x, v3.y, v3.z);

    vertices.push(v2.x, v2.y, v2.z);
    vertices.push(v3.x, v3.y, v3.z);
    vertices.push(v4.x, v4.y, v4.z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  return new THREE.Mesh(geometry, material);
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
  camera.position.set(0, 0, 100);
  camera.lookAt(0, 0, 0);

  scene = new THREE.Scene();

  //create a blue LineBasicMaterial
  const material = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10 });

  const points = [];
  points.push(new THREE.Vector3(-10, 0, 0));
  points.push(new THREE.Vector3(0, 10, 0));
  points.push(new THREE.Vector3(10, 0, 0));
  points.push(new THREE.Vector3(0, -10, 0));
  points.push(new THREE.Vector3(-10, 0, 0));

  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  const line = createLine(points, 2, new THREE.Color(0x0000ff));
  console.log('line', line);
  scene.add(line);
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();
animate();
