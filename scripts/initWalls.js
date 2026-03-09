import { getMaterials } from "./getMaterials.js";
export function initWalls(scene, roomWidth, roomHeight, roomDepth) {
  const { wallMaterial, neutralWallMaterial, accentWallMaterial, ceilingMaterial, floorMaterial } = getMaterials()
  // Пол - темно-серый полированный
  const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
  const floor = new THREE.Mesh(floorGeometry, floorMaterial);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -roomHeight / 2;
  floor.position.z = -roomDepth / 2;
  scene.add(floor);


  // Потолок - светло-кремовый
  const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
  const ceiling = new THREE.Mesh(ceilingGeometry, ceilingMaterial);
  ceiling.rotation.x = Math.PI / 2;
  ceiling.position.y = roomHeight / 2;
  ceiling.position.z = -roomDepth / 2;
  scene.add(ceiling);

  // Левая стена - нейтральный серый
  const leftWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
  const leftWall = new THREE.Mesh(leftWallGeometry, neutralWallMaterial);
  leftWall.rotation.y = Math.PI / 2;
  leftWall.position.x = -roomWidth / 2;
  leftWall.position.z = -(roomDepth / 2);
  scene.add(leftWall);

  // Правая стена — акцентная (глубокий синий)
  const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
  const rightWall = new THREE.Mesh(rightWallGeometry, accentWallMaterial);
  rightWall.rotation.y = -Math.PI / 2;
  rightWall.position.x = roomWidth / 2;
  rightWall.position.z = -roomDepth / 2;
  scene.add(rightWall);

  // Задняя стена — нейтральный светло-серый
  const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
  const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
  backWall.position.z = -roomDepth;
  scene.add(backWall);

  // Передняя стена — нейтральный серый
  const frontWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
  const frontWall = new THREE.Mesh(frontWallGeometry, neutralWallMaterial);
  frontWall.position.z = 250;   // за камерой (камера на z=200)
  frontWall.rotation.y = Math.PI; // грань смотрит в сторону -Z (к камере и комнате)
  frontWall.receiveShadow = true;
  scene.add(frontWall);

  // Стены должны получать тени
  floor.receiveShadow = true;
  ceiling.receiveShadow = true;
  leftWall.receiveShadow = true;
  rightWall.receiveShadow = true;
  backWall.receiveShadow = true;

}

export function initBall(scene, roomWidth, roomHeight, roomDepth) {
  // Белый шарик в центре комнаты
  const ballGeometry = new THREE.SphereGeometry(25, 22, 22);
  const ballMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.7,
    roughness: 0.12,
    metalness: 0.95,
    transparent: true,
    opacity: 0.70
  });
  const centerBall = new THREE.Mesh(ballGeometry, ballMaterial);
  centerBall.position.set(roomWidth * 0.4, 0, -roomDepth * 0.75); // сдвиг x,y,z (вправо, вверх, вблизь при + значениях). значение 0.5 по x значит запечататься в стену
  centerBall.castShadow = true;
  centerBall.receiveShadow = true;
  scene.add(centerBall);
}

export function initAmbientLight(scene) {
  // Ambient light для базовой видимости
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
}