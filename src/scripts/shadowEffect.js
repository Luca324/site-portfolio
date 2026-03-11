import * as THREE from 'three';

import { checkSupport } from "./checkSupport.js"
import { initThreeScene } from "./initThreeScene.js"

export default function shadowEffect() {
  'use strict';console.log('shadowEffect.js')

console.log(checkSupport())
  // Проверка поддержки WebGL и отключение на мобильных
  if (!checkSupport()) return
  // Проверка наличия необходимых элементов
  const canvas = document.getElementById('shadow-canvas');
  const header = document.querySelector('header');
console.log(canvas,header)
  if (!canvas || !header) return;

  // Ожидание загрузки Three.js
  function waitForThree(callback) {

    if (typeof THREE !== 'undefined') {

      callback();
    } else {
      console.log('waitForThree failed')
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
console.log('before initThreeScene')
    // Продолжаем инициализацию
    initThreeScene(canvas, header);

  });


}