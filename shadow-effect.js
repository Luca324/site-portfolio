import { checkSupport } from "./scripts/checkSupport.js"
import { initThreeScene } from "./scripts/initThreeScene.js"

(function () {
  'use strict';

  // Проверка поддержки WebGL и отключение на мобильных
  if (!checkSupport()) return

  // Проверка наличия необходимых элементов
  const canvas = document.getElementById('shadow-canvas');
  const header = document.querySelector('header');

  if (!canvas || !header) return;

  // Ожидание загрузки Three.js
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

      console.error('Three.js не загружен после ожидания');
      return;
    }

    // Продолжаем инициализацию
    initThreeScene(canvas, header);
  });


})();