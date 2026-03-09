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
  // Семейство шариков в комнате: стеклянные неоновые, тёплый металл и мягкий матовый
  const largeSphereGeometry = new THREE.SphereGeometry(26, 28, 28);
  const smallSphereGeometry = new THREE.SphereGeometry(20, 24, 24);

  const glassNeonMaterial = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0ea5e9,
    emissiveIntensity: 0.7,
    roughness: 0.12,
    metalness: 0.95,
    transparent: true,
    opacity: 0.88
  });

  const metalWarmMaterial = new THREE.MeshStandardMaterial({
    color: 0xfbbf24,        // тёплый золотистый
    emissive: 0x78350f,
    emissiveIntensity: 0.3,
    roughness: 0.28,
    metalness: 0.9
  });

  const softMatteMaterial = new THREE.MeshStandardMaterial({
    color: 0xa855f7,        // мягкий фиолетовый акцент
    emissive: 0x4c1d95,
    emissiveIntensity: 0.35,
    roughness: 0.65,
    metalness: 0.18
  });

  const ballConfigs = [
    {
      geometry: largeSphereGeometry,
      material: glassNeonMaterial,
      position: [roomWidth * 0.32, roomHeight * 0.14, -roomDepth * 0.62]
    },
    {
      geometry: smallSphereGeometry,
      material: metalWarmMaterial,
      position: [roomWidth * 0.28, -roomHeight * 0.2, -roomDepth * 0.76]
    },
    {
      geometry: largeSphereGeometry,
      material: softMatteMaterial,
      position: [-roomWidth * 0.22, 0, -roomDepth * 0.7]
    },
    {
      geometry: smallSphereGeometry,
      material: glassNeonMaterial,
      position: [-roomWidth * 0.3, -roomHeight * 0.16, -roomDepth * 0.56]
    }
  ];

  const balls = [];

  for (let i = 0; i < ballConfigs.length; i++) {
    const cfg = ballConfigs[i];
    const ball = new THREE.Mesh(cfg.geometry, cfg.material);
    ball.position.set(cfg.position[0], cfg.position[1], cfg.position[2]);
    ball.castShadow = true;
    ball.receiveShadow = true;
    ball.userData.basePosition = ball.position.clone();
    ball.userData.index = i;
    scene.add(ball);
    balls.push(ball);
  }

  return balls;
}

export function initAmbientLight(scene) {
  // Ambient light для базовой видимости
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
}