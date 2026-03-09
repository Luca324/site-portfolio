(function () {
  'use strict';

  // Проверка поддержки WebGL и отключение на мобильных
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasWebGL = (function () {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();


  if (!hasWebGL || isMobile) {
    return;
  }

  // Проверка наличия необходимых элементов
  const canvas = document.getElementById('shadow-canvas');
  const header = document.querySelector('header');


  if (!canvas || !header) {
    return;
  }

  // Ожидание загрузки Three.js
  let waitCount = 0;
  function waitForThree(callback) {

    if (typeof THREE !== 'undefined') {

      callback();
    } else {
      setTimeout(function () {
        waitForThree(callback);
      }, 50);
    }
  }

  // Проверка наличия Three.js с таймаутом
  waitForThree(function () {
    if (typeof THREE === 'undefined') {

      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'shadow-effect.js:40', message: 'Three.js не загружен после ожидания', data: {}, timestamp: Date.now(), runId: 'init', hypothesisId: 'A' }) }).catch(() => { });
      // #endregion
      console.error('Three.js не загружен после ожидания');
      return;
    }

    // Продолжаем инициализацию
    initThreeScene();
  });

  // Функция инициализации Three.js сцены - ПРОСТОЙ ТЕСТ
  function initThreeScene() {


    try {
      // Инициализация Three.js сцены
      const scene = new THREE.Scene();
      scene.background = null; // Прозрачный фон

      // Камера
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 0, 200);
      camera.lookAt(0, 0, 0);

      // Рендерер
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true, // Прозрачный фон
        antialias: true
      });

      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0x000000, 10); // Прозрачный фон

      // Обновление размеров
      function updateSize() {
        const rect = header.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
      updateSize();


      // Размеры комнаты
      const roomWidth = header.getBoundingClientRect().width;
      const roomHeight = header.getBoundingClientRect().height;
      const roomDepth = 150;

      // Материал для стен - нейтральный светло-серый
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xe8e8e8,      // нейтральный светло-серый
        transparent: true,
        opacity: 0.9,
        roughness: 0.7,
        metalness: 0.1
      });

      // Материал для пола - темно-серый с легким блеском (полированный бетон)
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x2a2a2a,      // темно-серый, почти черный
        transparent: true,
        opacity: 0.9,
        roughness: 0.3,       // более гладкий для эффекта полировки
        metalness: 0.2        // легкий металлический оттенок
      });

      // Материал для потолка - светло-кремовый
      const ceilingMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5f0,      // светло-кремовый, почти белый
        transparent: true,
        opacity: 0.9,
        roughness: 0.8,
        metalness: 0
      });

      // Материал для акцентной стены - глубокий синий
      const accentWallMaterial = new THREE.MeshStandardMaterial({
        color: 0x1e3a5f,      // глубокий синий
        transparent: true,
        opacity: 1,
        roughness: 0.6,
        metalness: 0.05,
        emissive: 0x050810    // очень легкое свечение
      });

      // Материал для нейтральных стен
      const neutralWallMaterial = new THREE.MeshStandardMaterial({
        color: 0xd0d0d0,      // нейтральный серый
        transparent: true,
        opacity: 1,
        roughness: 0.7,
        metalness: 0.1
      });

      // --- Параметры зеркала (вертикальная плоскость x = mirrorPlaneX) ---
      const mirrorPlaneX = roomWidth / 2 - 10;   // позиция плоскости зеркала по X
      const mirrorPlaneY = 0;                    // центр зеркала по Y
      const mirrorPlaneZ = -roomDepth / 2;       // центр зеркала по Z
      const mirrorWidth = roomDepth;             // ширина зеркала (вдоль оси Z сцены)
      const mirrorHeight = roomHeight / 2;      // высота зеркала
      const mirrorRenderTargetSize = 512;        // разрешение текстуры отражения

      const justMirrorRenderTarget = new THREE.WebGLRenderTarget(mirrorRenderTargetSize, mirrorRenderTargetSize, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      });
      justMirrorRenderTarget.texture.flipY = true;
      const justMirrorCamera = camera.clone();

      // Материал зеркала - вариант 1: MeshBasicMaterial (базовый, текущий)
      const justMirrorMaterial1 = new THREE.MeshBasicMaterial({
        map: justMirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });

      // Материал зеркала - вариант 2: MeshStandardMaterial (реалистичный с освещением)
      const justMirrorMaterial2 = new THREE.MeshStandardMaterial({
        map: justMirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.9,
        roughness: 0.1,
        metalness: 0.8,
        side: THREE.DoubleSide
      });

      // Материал зеркала - вариант 3: MeshPhongMaterial (с бликами)
      const justMirrorMaterial3 = new THREE.MeshPhongMaterial({
        map: justMirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.85,
        shininess: 100,
        specular: 0xffffff,
        side: THREE.DoubleSide
      });

      // Материал зеркала - вариант 4: MeshLambertMaterial (простое освещение)
      const justMirrorMaterial4 = new THREE.MeshLambertMaterial({
        map: justMirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.92,
        side: THREE.DoubleSide
      });

      // Материал зеркала - вариант 5: MeshPhysicalMaterial (продвинутый, с отражениями)
      const justMirrorMaterial5 = new THREE.MeshPhysicalMaterial({
        map: justMirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.88,
        roughness: 0.05,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        side: THREE.DoubleSide
      });

      // Используем первый вариант по умолчанию
      const justMirrorMaterial = justMirrorMaterial2;

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


      // Белый шарик в центре комнаты
      const ballGeometry = new THREE.SphereGeometry(25, 22, 22);
      const ballMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.3,
        metalness: 0.1
      });
      const centerBall = new THREE.Mesh(ballGeometry, ballMaterial);
      centerBall.position.set(roomWidth * 0.5 - 40, 0, -roomDepth * 0.75); // сдвиг x,y,z (вправо, вверх, вблизь при + значениях). значение 0.5 по x значит запечататься в стену
      centerBall.castShadow = true;
      centerBall.receiveShadow = true;
      scene.add(centerBall);



      // Зеркало (вертикальная плоскость, отражает сцену)
      const justMirrorGeometry = new THREE.PlaneGeometry(mirrorWidth, mirrorHeight);
      const justMirror = new THREE.Mesh(justMirrorGeometry, justMirrorMaterial);
      justMirror.rotation.y = -Math.PI / 2;
      justMirror.position.set(mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ);
      scene.add(justMirror);

      // Настройка камеры
      camera.position.set(0, 0, 200);
      camera.lookAt(0, 0, 0);

      // Включаем тени с мягким размытием
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Ambient light для базовой видимости
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      // PointLight, следующий за курсором - ближе к объектам (на 2/3 пути от камеры)
      // Цвет света соответствует цвету ссылок заголовков (#2563eb)
      const cursorLight = new THREE.PointLight(0xffffff, 10);
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
        new THREE.BoxGeometry(200, 40, 10),
        shadowMaterial.clone()
      );
      nameBox.castShadow = true;
      nameBox.receiveShadow = false;
      scene.add(nameBox);

      const subtitleBox = new THREE.Mesh(
        new THREE.BoxGeometry(150, 25, 10),
        shadowMaterial.clone()
      );
      subtitleBox.castShadow = true;
      subtitleBox.receiveShadow = false;
      scene.add(subtitleBox);

      // Стены должны получать тени
      floor.receiveShadow = true;
      ceiling.receiveShadow = true;
      leftWall.receiveShadow = true;
      rightWall.receiveShadow = true;
      backWall.receiveShadow = true;

      // Функция синхронизации 3D объектов с HTML элементами
      function sync3DObjectsWithHTML() {
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

      sync3DObjectsWithHTML();

      // Обработчик движения мыши
      let mouseX = 0;
      let mouseY = 0;
      let mousemoveCount = 0;

      document.addEventListener('mousemove', function (event) {
        const headerRect = header.getBoundingClientRect();
        // Нормализуем координаты от -1 до 1
        mouseX = ((event.clientX - headerRect.left) / headerRect.width) * 2 - 1;
        mouseY = -(((event.clientY - headerRect.top) / headerRect.height) * 2 - 1);
      });

      // Обновление позиции света в анимации
      function updateLightPosition() {
        // Масштабируем координаты мыши под размеры сцены
        const scale = Math.min(roomWidth, roomHeight) * 0.4;
        cursorLight.position.x = mouseX * scale;
        cursorLight.position.y = mouseY * scale;
        // Z остается на 0 (ближе к объектам, на 2/3 пути от камеры)
      }

      // Анимация с обновлением света и синхронизацией объектов
      function animate() {
        requestAnimationFrame(animate);
        sync3DObjectsWithHTML();
        updateLightPosition();

        // Геометрия плоскости зеркала: точка на плоскости и нормаль
        const mirrorNormal = new THREE.Vector3(1, 0, 0).normalize(); // плоскость x = mirrorPlaneX
        const mirrorPoint = new THREE.Vector3(mirrorPlaneX, mirrorPlaneY, mirrorPlaneZ);

        
        const roomCenterNormal = new THREE.Vector3(0, 0, 1); // нормаль направлена к камере (в сторону +Z)
        const roomCenterPoint = new THREE.Vector3(0, 0, -roomDepth / 2);

        // Отражённая камера относительно плоскости зеркала
        // Позиция и цель основной камеры (сейчас она смотрит в (0,0,0))

        // Откуда смотрим - Отражённая камера относительно плоскости зеркала
        const camPos = camera.position; 
        const reflPos = reflectPoint(camPos, mirrorPoint, mirrorNormal);
        justMirrorCamera.position.copy(reflPos);
        // куда (на что) смотрим - Отраженная камера относительно середины комнаты. курсор изначальео писал что смотрим в 0 0 0.
        const camTarget = new THREE.Vector3(0, 0, 0); // если поменяешь camera.lookAt, синхронизируй сюда // по логике нужно смотреть на отражение камеры относительно середины комнаты, т.к. угол падения равен углу отражения
        const reflTarget = reflectPoint(camPos, roomCenterPoint, roomCenterNormal)
        justMirrorCamera.lookAt(reflTarget);
        justMirrorCamera.updateMatrixWorld(true);


        justMirror.visible = false;
        renderer.setRenderTarget(justMirrorRenderTarget);
        renderer.clear();
        renderer.render(scene, justMirrorCamera);
        renderer.setRenderTarget(null);
        justMirror.visible = true;

        renderer.render(scene, camera);
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
      // Обновление при изменении размера окна
      window.addEventListener('resize', function () {
        updateSize();
        sync3DObjectsWithHTML();
      });

      // Запускаем анимацию
      animate();

    } catch (error) {
      console.error('Ошибка инициализации shadow effect:', error);
    }
  }

})();