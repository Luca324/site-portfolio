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

  // Функция инициализации Three.js сцены - ПРОСТОЙ ТЕСТ
  function initThreeScene() {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:50',message:'Вход в initThreeScene',data:{threeType:typeof THREE},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
    // #endregion
    
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
      
      // #region agent log
      const canvasStyle = window.getComputedStyle(canvas);
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:72',message:'Сцена, камера, рендерер созданы',data:{canvasWidth:canvas.width,canvasHeight:canvas.height,canvasOffsetWidth:canvas.offsetWidth,canvasOffsetHeight:canvas.offsetHeight,canvasZIndex:canvasStyle.zIndex,canvasDisplay:canvasStyle.display,canvasPosition:canvasStyle.position},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
      // #endregion

      // Размеры комнаты
      const roomWidth = header.getBoundingClientRect().width;
      const roomHeight = header.getBoundingClientRect().height;
      const roomDepth = 50;
      
      // Материал для стен - темный и полупрозрачный
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.3,
        roughness: 0.8,        // шероховатость дает матовый эффект
        metalness: 0
    });

    const specialMaterial1 = new THREE.MeshStandardMaterial({
      color: 0xff88aa,      // розовый оттенок
      transparent: true,
      opacity: 0.8,
      emissive: 0x331122    // легкое свечение
  });
  const specialMaterial2 = new THREE.MeshStandardMaterial({
    color: 0x4488fa,      // синий
    transparent: true,
    opacity: 0.8,
    emissive: 0x331122    // легкое свечение
});
  const specialMaterial3 = new THREE.MeshStandardMaterial({
    color: 0x44cc88,      // зелёный/бирюзовый
    transparent: true,
    opacity: 0.8,
    emissive: 0x112233
});
      
      // Рендер-таргет для зеркала (задняя стена)
      const mirrorRenderTarget = new THREE.WebGLRenderTarget(512, 512, {
        minFilter: THREE.LinearFilter,
        magFilter: THREE.LinearFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false
      });
      mirrorRenderTarget.texture.flipY = true;
      const mirrorCamera = camera.clone();
      
      // Материал зеркала
      const mirrorMaterial = new THREE.MeshBasicMaterial({
        map: mirrorRenderTarget.texture,
        transparent: true,
        opacity: 0.95,
        side: THREE.DoubleSide
      });
      
      // Пол
      const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
      const floor = new THREE.Mesh(floorGeometry, specialMaterial1);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -roomHeight / 2;
      floor.position.z = -roomDepth / 2;
      scene.add(floor);
      
      // Потолок
      const ceilingGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
      const ceiling = new THREE.Mesh(ceilingGeometry, wallMaterial);
      ceiling.rotation.x = Math.PI / 2;
      ceiling.position.y = roomHeight / 2;
      ceiling.position.z = -roomDepth / 2;
      scene.add(ceiling);
      
      // Левая стена
      const leftWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
      const leftWall = new THREE.Mesh(leftWallGeometry, specialMaterial2);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.x = -roomWidth / 2;
      leftWall.position.z = -roomDepth / 2;
      scene.add(leftWall);
      
      // Правая стена — цветная (бирюзовая)
      const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
      const rightWall = new THREE.Mesh(rightWallGeometry, specialMaterial3);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.x = roomWidth / 2;
      rightWall.position.z = -roomDepth / 2;
      scene.add(rightWall);
      
      // Задняя стена — зеркало (отражает сцену)
      const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
      const backWall = new THREE.Mesh(backWallGeometry, mirrorMaterial);
      backWall.position.z = -roomDepth;
      backWall.visible = true;
      scene.add(backWall);
      
      // Передняя стена — за камерой (z > 200), смотрит в сторону комнаты
      const frontWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
      const frontWall = new THREE.Mesh(frontWallGeometry, specialMaterial3);
      frontWall.position.z = 250;   // за камерой (камера на z=200)
      frontWall.rotation.y = Math.PI; // грань смотрит в сторону -Z (к камере и комнате)
      frontWall.receiveShadow = true;
      scene.add(frontWall);
            
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
      
      document.addEventListener('mousemove', function(event) {
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
        
        // Зеркало: рендер сцены с отражённой камеры в текстуру
        mirrorCamera.position.x = camera.position.x;
        mirrorCamera.position.y = camera.position.y;
        mirrorCamera.position.z = -2 * roomDepth - camera.position.z;
        mirrorCamera.lookAt(0, 0, -2 * roomDepth);
        mirrorCamera.updateMatrixWorld(true);
        
        backWall.visible = false;
        renderer.setRenderTarget(mirrorRenderTarget);
        renderer.clear();
        renderer.render(scene, mirrorCamera);
        renderer.setRenderTarget(null);
        backWall.visible = true;
        
        renderer.render(scene, camera);
      }
      
      // Обновление при изменении размера окна
      window.addEventListener('resize', function() {
        updateSize();
        sync3DObjectsWithHTML();
      });
      
      // Запускаем анимацию
      animate();
      
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:50',message:'Ошибка в initThreeScene',data:{error:error.message,stack:error.stack},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error('Ошибка инициализации shadow effect:', error);
    }
  }

})();


    //  // Пол: сначала создаём с обычным материалом (чтобы не было чёрного экрана),
    //   // потом при успешной загрузке текстур меняем на траву
    //   const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
    //   const floor = new THREE.Mesh(floorGeometry, wallMaterial);
    //   floor.rotation.x = -Math.PI / 2;
    //   floor.position.y = -roomHeight / 2;
    //   floor.position.z = -roomDepth / 2;
    //   floor.receiveShadow = true;
    //   scene.add(floor);

    //   // Текстуры травы (путь относительно страницы — файлы должны быть рядом с index.html)
    //   const loader = new THREE.TextureLoader();
    //   const grassUrls = {
    //     color: 'Grass005_1K-JPG_Color.jpg',
    //     normal: 'Grass005_1K-JPG_NormalGL.jpg',
    //     roughness: 'Grass005_1K-JPG_Roughness.jpg'
    //   };
    //   var loaded = { color: false, normal: false, roughness: false };

    //   function tryApplyGrass() {
    //     if (!loaded.color || !loaded.normal || !loaded.roughness) return;
    //     grassColor.wrapS = grassNormal.wrapS = grassRoughness.wrapS = THREE.RepeatWrapping;
    //     grassColor.wrapT = grassNormal.wrapT = grassRoughness.wrapT = THREE.RepeatWrapping;
    //     // Травка «повыше»: меньше повторений = крупнее трава (6 вместо 20)
    //     grassColor.repeat.set(6, 6);
    //     grassNormal.repeat.set(6, 6);
    //     grassRoughness.repeat.set(6, 6);
    //     var grassMaterial = new THREE.MeshStandardMaterial({
    //       map: grassColor,
    //       normalMap: grassNormal,
    //       roughnessMap: grassRoughness,
    //       side: THREE.DoubleSide,
    //       roughness: 0.8
    //     });
    //     floor.material.dispose();
    //     floor.material = grassMaterial;
    //   }

    //   var grassColor = loader.load(grassUrls.color, function() { loaded.color = true; tryApplyGrass(); });
    //   var grassNormal = loader.load(grassUrls.normal, function() { loaded.normal = true; tryApplyGrass(); });
    //   var grassRoughness = loader.load(grassUrls.roughness, function() { loaded.roughness = true; tryApplyGrass(); });