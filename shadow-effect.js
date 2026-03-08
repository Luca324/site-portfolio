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
      scene.background = new THREE.Color(0xffffff); // Белый фон

      // Камера
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.set(0, 0, 200);
      camera.lookAt(0, 0, 0);

      // Рендерер
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: false, // Непрозрачный фон для теста
        antialias: true
      });
      
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setClearColor(0xffffff, 1); // Белый фон
      
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
      const roomDepth = 250;
      
      // Материал для стен
      const wallMaterial = new THREE.MeshStandardMaterial({
        color: 0xf5f5f5,
        side: THREE.DoubleSide
      });
      
      // Пол
      const floorGeometry = new THREE.PlaneGeometry(roomWidth, roomDepth);
      const floor = new THREE.Mesh(floorGeometry, wallMaterial);
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
      const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
      leftWall.rotation.y = Math.PI / 2;
      leftWall.position.x = -roomWidth / 2;
      leftWall.position.z = -roomDepth / 2;
      scene.add(leftWall);
      
      // Правая стена
      const rightWallGeometry = new THREE.PlaneGeometry(roomDepth, roomHeight);
      const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
      rightWall.rotation.y = -Math.PI / 2;
      rightWall.position.x = roomWidth / 2;
      rightWall.position.z = -roomDepth / 2;
      scene.add(rightWall);
      
      // Задняя стена
      const backWallGeometry = new THREE.PlaneGeometry(roomWidth, roomHeight);
      const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
      backWall.position.z = -roomDepth;
      scene.add(backWall);
      
      // ТЕСТ: Добавляем видимый красный куб в центре
      const testGeometry = new THREE.BoxGeometry(50, 50, 50);
      const testMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const testCube = new THREE.Mesh(testGeometry, testMaterial);
      testCube.position.set(0, 0, -roomDepth / 2);
      scene.add(testCube);
      
      // Настройка камеры
      camera.position.set(0, 0, 200);
      camera.lookAt(0, 0, 0);
      
      // Ambient light для базовой видимости - увеличиваем для лучшей видимости
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      // PointLight, следующий за курсором - яркий свет
      const cursorLight = new THREE.PointLight(0xffffff, 3);
      cursorLight.position.set(0, 0, -roomDepth / 2); // На той же глубине, что и куб
      cursorLight.distance = 1000; // Увеличиваем дальность
      cursorLight.decay = 0; // Без затухания для более яркого света
      scene.add(cursorLight);
      
      // Обработчик движения мыши
      let mouseX = 0;
      let mouseY = 0;
      let mousemoveCount = 0;
      
      document.addEventListener('mousemove', function(event) {
        mousemoveCount++;
        const headerRect = header.getBoundingClientRect();
        // Нормализуем координаты от -1 до 1
        mouseX = ((event.clientX - headerRect.left) / headerRect.width) * 2 - 1;
        mouseY = -(((event.clientY - headerRect.top) / headerRect.height) * 2 - 1);
        
        // #region agent log
        if (mousemoveCount <= 3) {
          fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:197',message:'mousemove',data:{mouseX:mouseX,mouseY:mouseY,headerWidth:headerRect.width,headerHeight:headerRect.height},timestamp:Date.now(),runId:'init',hypothesisId:'F'})}).catch(()=>{});
        }
        // #endregion
      });
      
      // Обновление позиции света в анимации
      let updateCount = 0;
      function updateLightPosition() {
        updateCount++;
        // Масштабируем координаты мыши под размеры сцены
        const scale = Math.min(roomWidth, roomHeight) * 0.4;
        const oldX = cursorLight.position.x;
        const oldY = cursorLight.position.y;
        cursorLight.position.x = mouseX * scale;
        cursorLight.position.y = mouseY * scale;
        // Z остается на -roomDepth / 2
        
        // #region agent log
        if (updateCount <= 20 || (updateCount % 60 === 0)) {
          fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:205',message:'updateLightPosition',data:{oldX:oldX,oldY:oldY,newX:cursorLight.position.x,newY:cursorLight.position.y,newZ:cursorLight.position.z,mouseX:mouseX,mouseY:mouseY,scale:scale,lightIntensity:cursorLight.intensity},timestamp:Date.now(),runId:'init',hypothesisId:'F'})}).catch(()=>{});
        }
        // #endregion
      }
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:232',message:'Тестовый куб и свет добавлены',data:{sceneChildren:scene.children.length,lightPos:{x:cursorLight.position.x,y:cursorLight.position.y,z:cursorLight.position.z},lightIntensity:cursorLight.intensity,cubePos:{x:testCube.position.x,y:testCube.position.y,z:testCube.position.z},cameraPos:{x:camera.position.x,y:camera.position.y,z:camera.position.z},roomDepth:roomDepth},timestamp:Date.now(),runId:'init',hypothesisId:'F'})}).catch(()=>{});
      // #endregion
      
      // Анимация с обновлением света от курсора
      function testAnimate() {
        requestAnimationFrame(testAnimate);
        testCube.rotation.x += 0.01;
        testCube.rotation.y += 0.01;
        updateLightPosition();
        renderer.render(scene, camera);
      }
      
      // Запускаем тестовую анимацию
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:105',message:'Запуск тестовой анимации',data:{},timestamp:Date.now(),runId:'init',hypothesisId:'E'})}).catch(()=>{});
      // #endregion
      testAnimate();
      
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/0d3828e4-3326-41aa-9e48-f35ccc0bc97e',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'shadow-effect.js:50',message:'Ошибка в initThreeScene',data:{error:error.message,stack:error.stack},timestamp:Date.now(),runId:'init',hypothesisId:'D'})}).catch(()=>{});
      // #endregion
      console.error('Ошибка инициализации shadow effect:', error);
    }
  }

})();
