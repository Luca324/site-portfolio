// Parallax эффект при наведении на изображения проектов
(function() {
  const projectImages = document.querySelectorAll('.project-image');
  const maxAngle = 5; // Максимальный угол поворота в градусах
  const perspective = 1000; // Глубина перспективы

  projectImages.forEach(function(image) {
    image.addEventListener('mousemove', function(e) {
      const rect = image.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Нормализация координат от -1 до 1
      const normalizedX = (mouseX - centerX) / centerX;
      const normalizedY = (mouseY - centerY) / centerY;
      
      // Расчет углов поворота
      const rotateY = normalizedX * maxAngle;
      const rotateX = -normalizedY * maxAngle;
      
      // Применение transform
      image.style.transform = 
        `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    image.addEventListener('mouseleave', function() {
      // Возврат в исходное состояние
      image.style.transform = 
        `perspective(${perspective}px) rotateX(0deg) rotateY(0deg)`;
    });
  });
})();

