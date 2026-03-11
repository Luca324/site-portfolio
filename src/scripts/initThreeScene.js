import * as THREE from 'three';

import { initWalls, initBall, initAmbientLight } from "./initWalls.js";
const roomDepth = 150;
// Выбор варианта материала зеркала (1–5)
const MIRROR_MATERIAL_VARIANT = 5

// Инициализация Three.js сцены
const scene = new THREE.Scene();
scene.background = null; // Прозрачный фон

// Обработчик движения мыши
const cursorLight = new THREE.PointLight(0xffffff, 5);
let mouseX = 0;
let mouseY = 0;
let mousemoveCount = 0;

// --- Параметры зеркала (вертикальная плоскость x = mirrorPlaneX) ---
let mirrorPlaneX // позиция плоскости зеркала по X
let mirrorPlaneY                   // центр зеркала по Y
let mirrorPlaneZ        // центр зеркала по Z
let mirrorWidth            // ширина зеркала (вдоль оси Z сцены)
let mirrorHeight    // высота зеркала
let mirrorRenderTargetSize        // разрешение текстуры отражения

// Камера
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.set(0, 0, 190);
camera.lookAt(0, 0, 0);

const justMirrorCamera = camera.clone();
let justMirror
let renderer
let justMirrorRenderTarget

export function initThreeScene(canvas, header) {
  try {
    renderer = initRenderer(canvas)

    updateSize(header);

    const { roomWidth, roomHeight } = getSizes(header)

    initWalls(scene, roomWidth, roomHeight, roomDepth)
    // initBall(scene, roomWidth, roomHeight, roomDepth)
    initAmbientLight(scene)
    addCursorLight(scene, roomWidth, roomHeight)
    initMirror(scene, header);

    const objects = init3DObjects(scene, header)
    sync3DObjectsWithHTML(objects, header);

    document.addEventListener('mousemove', function (event) {
      const headerRect = header.getBoundingClientRect();
      // Нормализуем координаты от -1 до 1
      mouseX = ((event.clientX - headerRect.left) / headerRect.width) * 2 - 1;
      mouseY = -(((event.clientY - headerRect.top) / headerRect.height) * 2 - 1);
    });

    // Обновление при изменении размера окна
    window.addEventListener('resize', function () {
      updateSize(header);
      sync3DObjectsWithHTML(objects, header);
    });


    // Запускаем анимацию
    animate(objects);

  } catch (error) {
    console.error('Ошибка инициализации shadow effect:', error);
  }



  function animate(objects) {
    requestAnimationFrame(animate);

    // Синхронизируем прокси-объекты с HTML каждый кадр
    sync3DObjectsWithHTML(objects, header);

    // Обновляем позицию курсорного света с учётом актуальных размеров хедера
    const { roomWidth, roomHeight } = getSizes(header);
    updateLightPosition(roomWidth, roomHeight);

    const sizes = getSizes(header);
    renderMirror(scene, sizes);
  }

}

function initRenderer(canvas) {
  renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true, // Прозрачный фон
    antialias: true
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 10); // Прозрачный фон
  // Включаем тени с мягким размытием
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  return renderer
}

// Обновление размеров
function updateSize(header) {
  const rect = header.getBoundingClientRect();
  const width = rect.width;
  const height = rect.height;
  renderer.setSize(width, height, false);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
}

function getSizes(header) {
  // Размеры комнаты
  const roomWidth = header.getBoundingClientRect().width;
  const roomHeight = header.getBoundingClientRect().height;

  // --- Параметры зеркала (вертикальная плоскость x = mirrorPlaneX) ---
  mirrorPlaneX = roomWidth / 2 - 1;   // позиция плоскости зеркала по X
  mirrorPlaneY = 0;                    // центр зеркала по Y
  mirrorPlaneZ = -roomDepth / 2;       // центр зеркала по Z
  mirrorWidth = roomDepth;             // ширина зеркала (вдоль оси Z сцены)
  mirrorHeight = roomHeight / 2;      // высота зеркала
  mirrorRenderTargetSize = 512;        // разрешение текстуры отражения

  return { roomWidth, roomHeight, mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ, mirrorWidth, mirrorHeight, mirrorRenderTargetSize }
}

// Обновление позиции света в анимации
function addCursorLight(scene, roomWidth, roomHeight) {
  // PointLight, следующий за курсором - ближе к объектам (на 2/3 пути от камеры)
  // Цвет света соответствует цвету ссылок заголовков (#2563eb)
  cursorLight.position.set(0, 0, 200); // Ближе к объектам (z=-125), камера на z=200
  cursorLight.castShadow = true;
  cursorLight.shadow.mapSize.width = 2048;
  cursorLight.shadow.mapSize.height = 2048;
  cursorLight.shadow.camera.near = 0.1;
  cursorLight.shadow.camera.far = 500;
  cursorLight.shadow.radius = 8; // Радиус размытия тени (больше = более размытая)
  cursorLight.distance = 1000;
  cursorLight.decay = 0;
  scene.add(cursorLight);
  updateLightPosition(roomWidth, roomHeight)

}

// Обновление позиции света в анимации
function updateLightPosition(roomWidth, roomHeight) {
  // Масштабируем координаты мыши под размеры сцены
  const scale = Math.min(roomWidth, roomHeight) * 0.4;
  cursorLight.position.x = mouseX * scale;
  cursorLight.position.y = mouseY * scale;
  // Z остается на 0 (ближе к объектам, на 2/3 пути от камеры)
}

function initMirror(scene, header) {
  const { roomWidth, roomHeight, mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ, mirrorWidth, mirrorHeight, mirrorRenderTargetSize } = getSizes(header)


  justMirrorRenderTarget = new THREE.WebGLRenderTarget(mirrorRenderTargetSize, mirrorRenderTargetSize, {
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    format: THREE.RGBAFormat,
    stencilBuffer: false
  });


  // --- Варианты материалов зеркала 1–5 ---
  // 1 — нейтральное зеркало, умеренные блики
  const justMirrorMaterial1 = new THREE.MeshPhongMaterial({
    map: justMirrorRenderTarget.texture,
    transparent: true,
    opacity: 0.9,
    shininess: 60,
    specular: 0xcccccc,
    side: THREE.DoubleSide
  });

  // 2 — очень глянцевое зеркало с широкими яркими бликами
  const justMirrorMaterial2 = new THREE.MeshPhongMaterial({
    map: justMirrorRenderTarget.texture,
    transparent: true,
    opacity: 0.95,
    shininess: 120,
    specular: 0xffffff,
    side: THREE.DoubleSide
  });

  // 3 — зеркало с узкими, контрастными бликами
  const justMirrorMaterial3 = new THREE.MeshPhongMaterial({
    map: justMirrorRenderTarget.texture,
    transparent: true,
    opacity: 0.95,
    shininess: 220,
    specular: 0xffffff,
    side: THREE.DoubleSide
  });

  // 4 — чуть «матовое» зеркало, блики мягкие и большие
  const justMirrorMaterial4 = new THREE.MeshPhongMaterial({
    map: justMirrorRenderTarget.texture,
    transparent: true,
    opacity: 0.85,
    shininess: 25,
    specular: 0x999999,
    side: THREE.DoubleSide
  });

  // 5 — стилевое зеркало с холодными, очень заметными бликами
  const justMirrorMaterial5 = new THREE.MeshPhongMaterial({
    map: justMirrorRenderTarget.texture,
    transparent: true,
    opacity: 0.9,
    color: 0xe0f0ff,
    shininess: 260,
    specular: 0xe0ffff,
    side: THREE.DoubleSide
  });

  let justMirrorMaterial;
  switch (MIRROR_MATERIAL_VARIANT) {
    case 1:
      justMirrorMaterial = justMirrorMaterial1;
      break;
    case 2:
      justMirrorMaterial = justMirrorMaterial2;
      break;
    case 4:
      justMirrorMaterial = justMirrorMaterial4;
      break;
    case 5:
      justMirrorMaterial = justMirrorMaterial5;
      break;
    case 3:
    default:
      justMirrorMaterial = justMirrorMaterial3;
      break;
  }

  justMirrorRenderTarget.texture.flipY = true;

  // Отражаем текстурные координаты
  justMirrorMaterial.map.wrapS = THREE.RepeatWrapping;
  justMirrorMaterial.map.repeat.x = -1; // Отражаем по горизонтали

  // Зеркало (вертикальная плоскость, отражает сцену)
  const justMirrorGeometry = new THREE.PlaneGeometry(mirrorWidth, mirrorHeight);
  justMirror = new THREE.Mesh(justMirrorGeometry, justMirrorMaterial);
  justMirror.rotation.y = -Math.PI / 2;
  justMirror.position.set(mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ);
  scene.add(justMirror);
}

function renderMirror(scene, sizes) {
  const { roomWidth, roomHeight, mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ, mirrorWidth, mirrorHeight, mirrorRenderTargetSize } = sizes

  const mirrorNormal = new THREE.Vector3(1, 0, 0).normalize();
  const mirrorPoint = new THREE.Vector3(mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ);

  const roomCenterNormal = new THREE.Vector3(0, 0, 1);
  const roomCenterPoint = new THREE.Vector3(0, 0, -roomDepth / 2);

  const camPos = camera.position;
  justMirrorCamera.position.copy(camPos);
  justMirrorCamera.position.x = mirrorPlaneX * 2;

  const reflLookAt = reflectPoint(camPos, roomCenterPoint, roomCenterNormal);
  reflLookAt.x = reflLookAt.x - 100
  justMirrorCamera.lookAt(reflLookAt);

  // Расстояние от зрителя до зеркала
  const distanceToMirror = Math.abs(camPos.x - mirrorPlaneX) + 10;

  // Высота зеркала в мировых координатах
  const mirrorWorldHeight = mirrorHeight;
  const mirrorWorldWidth = mirrorWidth;

  // Рассчитываем вертикальный угол обзора
  const verticalFov = 2 * Math.atan((mirrorWorldHeight / 2) / distanceToMirror) * 180 / Math.PI;

  // Устанавливаем FOV и aspect для отраженной камеры
  justMirrorCamera.fov = verticalFov;
  justMirrorCamera.aspect = mirrorWorldWidth / mirrorWorldHeight; // ВАЖНО: соотношение сторон зеркала

  // Обновляем проекционную матрицу
  justMirrorCamera.updateProjectionMatrix();
  justMirrorCamera.updateMatrixWorld(true);

  justMirror.visible = false;
  renderer.setRenderTarget(justMirrorRenderTarget);
  renderer.clear();
  renderer.render(scene, justMirrorCamera);
  renderer.setRenderTarget(null);
  justMirror.visible = true;

  renderer.render(scene, camera);
}

// Функция отражения направления (вектора)
function reflectDirection(direction, normal) {
  const n = normal.clone().normalize();
  const d = direction.clone().normalize();
  // R = D - 2 * (D · N) * N
  return d.clone().sub(n.clone().multiplyScalar(2 * d.dot(n)));
}

// Отражение точки p относительно плоскости (planePoint, planeNormal)
function reflectPoint(p, planePoint, planeNormal) {
  const N = planeNormal.clone().normalize();
  // Вектор от точки на плоскости к отражаемой точке
  const toPoint = p.clone().sub(planePoint); // (p - P0)
  // Расстояние от точки до плоскости (со знаком)
  const dist = toPoint.dot(N); // (p - P0) · N
  // Отраженная точка: p - 2 * dist * N
  return p.clone().sub(N.clone().multiplyScalar(2 * dist));
}

// Функция синхронизации 3D объектов с HTML элементами
function sync3DObjectsWithHTML(objects, header) {
  const { photoSphere, nameBox, subtitleBox, photoEl, subtitleEl, nameEl } = objects

  if (photoEl) {
    const rect = photoEl.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    photoSphere.position.x = (rect.left + rect.width / 2) - (headerRect.left + headerRect.width / 2);
    photoSphere.position.y = -((rect.top + rect.height / 2) - (headerRect.top + headerRect.height / 2));
    photoSphere.position.z = -roomDepth / 2;
  }

  if (nameEl) {
    const rect = nameEl.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    nameBox.position.x = (rect.left + rect.width / 2) - (headerRect.left + headerRect.width / 2);
    nameBox.position.y = -((rect.top + rect.height / 2) - (headerRect.top + headerRect.height / 2));
    nameBox.position.z = -roomDepth / 2;
  }

  if (subtitleEl) {
    const rect = subtitleEl.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    subtitleBox.position.x = (rect.left + rect.width / 2) - (headerRect.left + headerRect.width / 2);
    subtitleBox.position.y = -((rect.top + rect.height / 2) - (headerRect.top + headerRect.height / 2));
    subtitleBox.position.z = -roomDepth / 2;
  }
}

function init3DObjects(scene, header) {

  // Получаем HTML элементы
  const photoEl = header.querySelector('.profile-photo');
  const nameEl = header.querySelector('h1');
  const subtitleEl = header.querySelector('.subtitle');

  // 3D объекты для теней
  // В Three.js объекты с visible: false НЕ отбрасывают тени
  // Поэтому используем очень темный материал, который будет почти невидим
  const shadowMaterial = new THREE.MeshStandardMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.01 // Почти невидимый, но отбрасывает тени
  });

  const photoSphere = new THREE.Mesh(
    new THREE.SphereGeometry(75, 32, 32),
    shadowMaterial.clone()
  );
  photoSphere.castShadow = true;
  photoSphere.receiveShadow = false;
  scene.add(photoSphere);

  const nameBox = new THREE.Mesh(
    new THREE.BoxGeometry(200, 30, 10),
    shadowMaterial.clone()
  );
  nameBox.castShadow = true;
  nameBox.receiveShadow = false;
  scene.add(nameBox);

  const subtitleBox = new THREE.Mesh(
    new THREE.BoxGeometry(150, 15, 10),
    shadowMaterial.clone()
  );
  subtitleBox.castShadow = true;
  subtitleBox.receiveShadow = false;
  scene.add(subtitleBox);

  return { photoSphere, nameBox, subtitleBox, photoEl, subtitleEl, nameEl }
}