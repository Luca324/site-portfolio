(function() {
  'use strict';

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:1',message:'Скрипт загружен',data:{readyState:document.readyState},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  // Проверка поддержки WebGL и отключение на мобильных
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasWebGL = (function() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();

  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:15',message:'Проверка WebGL и мобильного',data:{hasWebGL:hasWebGL,isMobile:isMobile,width:window.innerWidth},timestamp:Date.now(),runId:'init',hypothesisId:'C'})}).catch(()=>{});
  // #endregion

  if (!hasWebGL || isMobile) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:16',message:'Выход: нет WebGL или мобильное',data:{hasWebGL:hasWebGL,isMobile:isMobile},timestamp:Date.now(),runId:'init',hypothesisId:'C'})}).catch(()=>{});
    // #endregion
    return;
  }

  // Проверка наличия необходимых элементов
  const canvas = document.getElementById('shadow-canvas');
  const header = document.querySelector('header');
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:23',message:'Проверка элементов DOM',data:{canvas:!!canvas,header:!!header,threeLoaded:typeof THREE},timestamp:Date.now(),runId:'init',hypothesisId:'B'})}).catch(()=>{});
  // #endregion
  
  if (!canvas || !header) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:24',message:'Выход: элементы не найдены',data:{canvas:!!canvas,header:!!header},timestamp:Date.now(),runId:'init',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
    return;
  }

  // Ожидание загрузки Three.js
  let waitCount = 0;
  function waitForThree(callback) {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:28',message:'Ожидание Three.js',data:{threeDefined:typeof THREE !== 'undefined',waitCount:waitCount++},timestamp:Date.now(),runId:'init',hypothesisId:'A'})}).catch(()=>{});
    // #endregion
    
    if (typeof THREE !== 'undefined') {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:30',message:'Three.js загружен, вызываем callback',data:{threeType:typeof THREE},timestamp:Date.now(),runId:'init',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      callback();
    } else {
      setTimeout(function() {
        waitForThree(callback);
      }, 50);
    }
  }

  // Проверка наличия Three.js с таймаутом
  waitForThree(function() {
    if (typeof THREE === 'undefined') {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:40',message:'Three.js не загружен после ожидания',data:{},timestamp:Date.now(),runId:'init',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      console.error('Three.js не загружен после ожидания');
      return;
    }
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:46',message:'Вызов initThreeScene',data:{threeType:typeof THREE},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // Продолжаем инициализацию
    initThreeScene();
  });

  // Функция инициализации Three.js сцены
  function initThreeScene() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:50',message:'Вход в initThreeScene',data:{threeType:typeof THREE},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    try {
    // Инициализация Three.js сцены
    const scene = new THREE.Scene();
  
  // Камера
  const camera = new THREE.PerspectiveCamera(
    55, // FOV
    1, // Aspect ratio (будет обновляться)
    0.1, // Near
    1000 // Far
  );

  // Рендерер
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
  });
  
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  
  // #region agent log
  const canvasRect = canvas.getBoundingClientRect();
  const canvasStyle = window.getComputedStyle(canvas);
  fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:72',message:'Сцена, камера, рендерер созданы',data:{canvasWidth:canvas.width,canvasHeight:canvas.height,canvasOffsetWidth:canvas.offsetWidth,canvasOffsetHeight:canvas.offsetHeight,canvasZIndex:canvasStyle.zIndex,canvasDisplay:canvasStyle.display,canvasPosition:canvasStyle.position,shadowMapEnabled:renderer.shadowMap.enabled},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
  // #endregion

  // Функция обновления размеров
  function updateSize() {
    const rect = header.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:118',message:'updateSize вызван',data:{width:width,height:height,oldCanvasWidth:canvas.width,oldCanvasHeight:canvas.height},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    // Правильный способ установки размеров для WebGL
    renderer.setSize(width, height, false);
    
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  // Первоначальная настройка размеров
  updateSize();

  // Обработчик изменения размера окна (с debounce)
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      updateSize();
      updateRoomSize();
      createRoom();
      sync3DObjectsWithHTML();
    }, 100);
  });

  // Параметры комнаты
  const roomDepth = 250;
  let roomWidth = 0;
  let roomHeight = 0;
  let roomWalls = [];

  // Обновление размеров комнаты
  function updateRoomSize() {
    const rect = header.getBoundingClientRect();
    roomWidth = rect.width;
    roomHeight = rect.height;
  }

  updateRoomSize();

  // Позиционирование камеры
  camera.position.set(0, 0, 300);
  camera.lookAt(0, 0, 0);
  
  // #region agent log
  fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:165',message:'Позиция камеры установлена',data:{cameraPos:{x:camera.position.x,y:camera.position.y,z:camera.position.z},cameraFov:camera.fov,cameraAspect:camera.aspect},timestamp:Date.now(),runId:'init',hypothesisId:'G'})}).catch(()=>{});
  // #endregion

  // Создание 3D объектов
  let photoSphere = null;
  let nameBox = null;
  let subtitleBox = null;
  let cursorLight = null;

  // Функция синхронизации 3D объектов с HTML элементами
  function sync3DObjectsWithHTML() {
    updateRoomSize();
    
    const headerRect = header.getBoundingClientRect();
    const photoEl = document.querySelector('.profile-photo');
    const nameEl = header.querySelector('h1');
    const subtitleEl = header.querySelector('.subtitle');

    if (!photoEl || !nameEl || !subtitleEl) {
      return;
    }

    const photoRect = photoEl.getBoundingClientRect();
    const nameRect = nameEl.getBoundingClientRect();
    const subtitleRect = subtitleEl.getBoundingClientRect();

    // Преобразование координат: экранные → 3D
    // Центр header = (0, 0, 0) в 3D пространстве
    // X: -roomWidth/2 до roomWidth/2
    // Y: roomHeight/2 до -roomHeight/2 (инвертировано для Y)
    // Z: глубина комнаты

    // Сфера для фото
    if (photoSphere) {
      const photoCenterX = (photoRect.left + photoRect.right) / 2 - (headerRect.left + headerRect.right) / 2;
      const photoCenterY = -((photoRect.top + photoRect.bottom) / 2 - (headerRect.top + headerRect.bottom) / 2);
      
      const photoRadius = photoRect.width / 2;
      
      photoSphere.position.set(photoCenterX, photoCenterY, -50);
      
      // Обновление радиуса сферы
      if (photoSphere.geometry) {
        photoSphere.geometry.dispose();
      }
      photoSphere.geometry = new THREE.SphereGeometry(photoRadius, 32, 16);
    }

    // Параллелепипед для имени
    if (nameBox) {
      const nameCenterX = (nameRect.left + nameRect.right) / 2 - (headerRect.left + headerRect.right) / 2;
      const nameCenterY = -((nameRect.top + nameRect.bottom) / 2 - (headerRect.top + headerRect.bottom) / 2);
      const nameWidth = nameRect.width;
      const nameHeight = nameRect.height;
      
      nameBox.position.set(nameCenterX, nameCenterY, -50);
      
      // Обновление размеров
      if (nameBox.geometry) {
        nameBox.geometry.dispose();
      }
      nameBox.geometry = new THREE.BoxGeometry(nameWidth, nameHeight, 0.1);
    }

    // Параллелепипед для подзаголовка
    if (subtitleBox) {
      const subtitleCenterX = (subtitleRect.left + subtitleRect.right) / 2 - (headerRect.left + headerRect.right) / 2;
      const subtitleCenterY = -((subtitleRect.top + subtitleRect.bottom) / 2 - (headerRect.top + headerRect.bottom) / 2);
      const subtitleWidth = subtitleRect.width;
      const subtitleHeight = subtitleRect.height;
      
      subtitleBox.position.set(subtitleCenterX, subtitleCenterY, -50);
      
      // Обновление размеров
      if (subtitleBox.geometry) {
        subtitleBox.geometry.dispose();
      }
      subtitleBox.geometry = new THREE.BoxGeometry(subtitleWidth, subtitleHeight, 0.1);
    }
  }

  // Создание комнаты
  function createRoom() {
    // Удаление старых стен, если они есть
    roomWalls.forEach(function(wall) {
      if (wall.geometry) wall.geometry.dispose();
      if (wall.material) wall.material.dispose();
      scene.remove(wall);
    });
    roomWalls = [];

    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      side: THREE.DoubleSide,
      transparent: false,
      opacity: 1.0
    });
    
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:220',message:'Материал стен создан',data:{color:wallMaterial.color.getHex(),transparent:wallMaterial.transparent,opacity:wallMaterial.opacity},timestamp:Date.now(),runId:'init',hypothesisId:'H'})}).catch(()=>{});
    // #endregion

    // Пол
    const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const floor = new THREE.Mesh(floorGeometry, wallMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -roomHeight / 2;
    floor.position.z = -roomDepth / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    roomWalls.push(floor);

    // Потолок
    const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    const ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = roomHeight / 2;
    ceiling.position.z = -roomDepth / 2;
    ceiling.receiveShadow = true;
    scene.add(ceiling);
    roomWalls.push(ceiling);

    // Левая стена
    const leftWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.x = -roomWidth / 2;
    leftWall.position.z = -roomDepth / 2;
    leftWall.receiveShadow = true;
    scene.add(leftWall);
    roomWalls.push(leftWall);

    // Правая стена
    const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.x = roomWidth / 2;
    rightWall.position.z = -roomDepth / 2;
    rightWall.receiveShadow = true;
    scene.add(rightWall);
    roomWalls.push(rightWall);

    // Задняя стена
    const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = -roomDepth;
    backWall.receiveShadow = true;
    scene.add(backWall);
    roomWalls.push(backWall);
  }

  // Создание невидимых 3D объектов
  function create3DObjects() {
    const headerRect = header.getBoundingClientRect();
    const photoEl = document.querySelector('.profile-photo');
    const nameEl = header.querySelector('h1');
    const subtitleEl = header.querySelector('.subtitle');

    if (!photoEl || !nameEl || !subtitleEl) {
      return;
    }

    const photoRect = photoEl.getBoundingClientRect();
    const nameRect = nameEl.getBoundingClientRect();
    const subtitleRect = subtitleEl.getBoundingClientRect();

    // Материал для невидимых объектов
    const invisibleMaterial = new THREE.MeshStandardMaterial({
      visible: false
    });

    // Сфера для фото
    const photoRadius = photoRect.width / 2;
    const sphereGeometry = new THREE.SphereGeometry(photoRadius, 32, 16);
    photoSphere = new THREE.Mesh(sphereGeometry, invisibleMaterial);
    photoSphere.castShadow = true;
    photoSphere.receiveShadow = false;
    scene.add(photoSphere);

    // Параллелепипед для имени
    const nameGeometry = new THREE.BoxGeometry(nameRect.width, nameRect.height, 0.1);
    nameBox = new THREE.Mesh(nameGeometry, invisibleMaterial);
    nameBox.castShadow = true;
    nameBox.receiveShadow = false;
    scene.add(nameBox);

    // Параллелепипед для подзаголовка
    const subtitleGeometry = new THREE.BoxGeometry(subtitleRect.width, subtitleRect.height, 0.1);
    subtitleBox = new THREE.Mesh(subtitleGeometry, invisibleMaterial);
    subtitleBox.castShadow = true;
    subtitleBox.receiveShadow = false;
    scene.add(subtitleBox);

    // Первоначальная синхронизация позиций
    sync3DObjectsWithHTML();
  }

  // Создание источника света от курсора
  function createCursorLight() {
    cursorLight = new THREE.PointLight(0xffffff, 1.8);
    cursorLight.castShadow = true;
    cursorLight.shadow.mapSize.width = 2048;
    cursorLight.shadow.mapSize.height = 2048;
    cursorLight.shadow.camera.near = 0.1;
    cursorLight.shadow.camera.far = 500;
    cursorLight.shadow.radius = 8;
    cursorLight.position.set(0, 0, 120);
    scene.add(cursorLight);

    // Плавное следование за курсором
    let targetX = 0;
    let targetY = 0;
    const lerpFactor = 0.1;

    document.addEventListener('mousemove', function(event) {
      const headerRect = header.getBoundingClientRect();
      const mouseX = event.clientX - (headerRect.left + headerRect.right) / 2;
      const mouseY = -((event.clientY - (headerRect.top + headerRect.bottom) / 2));

      // Преобразование в 3D координаты (прямое соответствие)
      targetX = mouseX;
      targetY = mouseY;
    });

    // Обновление позиции света с плавным движением
    function updateLightPosition() {
      cursorLight.position.x += (targetX - cursorLight.position.x) * lerpFactor;
      cursorLight.position.y += (targetY - cursorLight.position.y) * lerpFactor;
    }

    return updateLightPosition;
  }

  // Переменные для анимации
  let updateLightPosition = null;
  let animationId = null;

  // Анимационный цикл
  let animateCallCount = 0;
  function animate() {
    animateCallCount++;
    if (animateCallCount === 1) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:351',message:'Анимация запущена',data:{sceneChildren:scene.children.length,canvasVisible:canvas.offsetWidth > 0 && canvas.offsetHeight > 0,canvasStyle:window.getComputedStyle(canvas).display},timestamp:Date.now(),runId:'init',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
    }
    if (updateLightPosition) {
      updateLightPosition();
    }
    renderer.render(scene, camera);
    animationId = requestAnimationFrame(animate);
  }

  // Флаг для предотвращения множественных запусков
  let isInitialized = false;

  // Запуск анимации после загрузки страницы
  function init() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:363',message:'Вход в init',data:{isInitialized:isInitialized},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (isInitialized) return;
    isInitialized = true;

    // Дополнительная проверка элементов перед запуском
    const photoEl = document.querySelector('.profile-photo');
    const nameEl = header.querySelector('h1');
    const subtitleEl = header.querySelector('.subtitle');

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:372',message:'Проверка HTML элементов',data:{photoEl:!!photoEl,nameEl:!!nameEl,subtitleEl:!!subtitleEl},timestamp:Date.now(),runId:'init',hypothesisId:'B'})}).catch(()=>{});
    // #endregion

    if (!photoEl || !nameEl || !subtitleEl) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:373',message:'Выход: не все элементы найдены',data:{photoEl:!!photoEl,nameEl:!!nameEl,subtitleEl:!!subtitleEl},timestamp:Date.now(),runId:'init',hypothesisId:'B'})}).catch(()=>{});
      // #endregion
      console.warn('Не все необходимые элементы найдены для shadow effect');
      return;
    }

    // Инициализация 3D сцены
    updateRoomSize();
    createRoom();
    create3DObjects();
    updateLightPosition = createCursorLight();
    
    // #region agent log
    const lightPos = cursorLight ? {x:cursorLight.position.x,y:cursorLight.position.y,z:cursorLight.position.z} : null;
    const cameraPos = {x:camera.position.x,y:camera.position.y,z:camera.position.z};
    const spherePos = photoSphere ? {x:photoSphere.position.x,y:photoSphere.position.y,z:photoSphere.position.z} : null;
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:378',message:'После создания объектов',data:{sceneChildren:scene.children.length,photoSphere:!!photoSphere,nameBox:!!nameBox,subtitleBox:!!subtitleBox,cursorLight:!!cursorLight,roomWidth:roomWidth,roomHeight:roomHeight,lightPos:lightPos,cameraPos:cameraPos,spherePos:spherePos,lightShadowEnabled:cursorLight?.castShadow,lightShadowMapSize:cursorLight?.shadow?.mapSize?.width},timestamp:Date.now(),runId:'init',hypothesisId:'F'})}).catch(()=>{});
    // #endregion

    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:381',message:'Инициализация завершена, запуск анимации',data:{},timestamp:Date.now(),runId:'init',hypothesisId:'E'})}).catch(()=>{});
    // #endregion

    // Синхронизация и запуск анимации
    setTimeout(function() {
      sync3DObjectsWithHTML();
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:386',message:'Вызов animate',data:{},timestamp:Date.now(),runId:'init',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      animate();
    }, 100);
  }

    // Запуск инициализации
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:390',message:'Проверка readyState перед вызовом init',data:{readyState:document.readyState},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:50',message:'Ошибка в initThreeScene',data:{error:error.message,stack:error.stack},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error('Ошибка инициализации shadow effect:', error);
    }

    // Очистка ресурсов при выгрузке страницы
    window.addEventListener('beforeunload', function() {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (photoSphere && photoSphere.geometry) photoSphere.geometry.dispose();
      if (nameBox && nameBox.geometry) nameBox.geometry.dispose();
      if (subtitleBox && subtitleBox.geometry) subtitleBox.geometry.dispose();
      roomWalls.forEach(function(wall) {
        if (wall.geometry) wall.geometry.dispose();
        if (wall.material) wall.material.dispose();
      });
    });
  }

})();

