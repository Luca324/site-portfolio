export const projects = [
  {
    id: 'buildmeister',
    title: 'BuildMeister',
    github: 'https://github.com/Luca324/BuildMeister',
    description: (
      <>
        Сайт норвежского интернет-магазина компьютеров и комплектующих{' '}
        <a href="https://buildmeister.no" target="_blank">buildmeister.no</a>
        {' '}(в настоящее время сайт недоступен, магазин переехал на{' '}
        <a href="https://www.finn.no/recommerce/seller/1319771041">Finn.no</a>).
      </>
    ),
    images: ['buildmeister.png', 'analytics.png', 'smartstorage.png'],
    alt: 'BuildMeister',
    date: 'Октябрь 2025 - Февраль 2026',
    order: 100,
  },
  {
    id: 'smartstorage',
    title: 'SmartStorage',
    github: 'https://github.com/Luca324/SmartStorage/',
    description: (
      <>
        Умный склад - система управления складской логистикой с использованием автономных роботов.{' '}
        <a href="https://disk.yandex.ru/i/un1vq04TcxQJpA" target="_blank">Посмотреть демо</a>
      </>
    ),
    images: ['smartstorage.png'],
    alt: 'smartstorage',
    date: 'Октябрь 2025',
    order: 95,
  },
  {
    id: 'myn-mn-calculation',
    title: 'MYN-MN-calculation',
    github: 'https://github.com/Luca324/MYN-MN-calculation',
    description: (
      <>
        Сайт-калькулятор, который рассчитывает электрические токи по Методу Наложения и Методу Узловых Напряжений.{' '}
        <a href="https://tatyana.rsars.ru/calculator/index.html" target="_blank">Посмотреть сайт</a>
      </>
    ),
    images: ['mynmn.png'],
    alt: 'MYN-MN-calculation',
    date: 'Декабрь 2024',
    order: 20,
  },
  {
    id: 'physics-site-calculator',
    title: 'PhysicsSiteCalculator',
    github: 'https://github.com/Luca324/PhysicsSiteCalculator',
    description: (
      <>
        Сервис, решающий задачи по механике, ядерной физике и молекулярной физике.{' '}
        <a href="https://tatyana.rsars.ru/physics/index.html" target="_blank">Посмотреть сайт</a>
      </>
    ),
    images: ['physics.png'],
    alt: 'PhysicsSiteCalculator',
    date: 'Май 2024',
    order: 10,
  },
  {
    id: 'plan-it',
    title: 'Plan It',
    github: 'https://github.com/Luca324/PlanIt',
    description: (
      <>Мобильное приложение на React Native для заметок и планирования.</>
    ),
    images: ['2 screens light.png'],
    alt: 'Plan It',
    date: 'Сентябрь 2025',
    order: 90,
  },
  {
    id: 'analytics-service',
    title: 'Analytics-service',
    github: 'https://github.com/Luca324/Analytics-service',
    description: (
      <>Сервис для генерации и аналитики CSV с использованием JS потоков.</>
    ),
    images: ['analytics.png'],
    alt: 'Analytics-service',
    date: 'Июль 2025',
    order: 70,
  },
  {
    id: 'pollster',
    title: 'Pollster',
    github: 'https://github.com/Luca324/pollster',
    description: (
      <>Платформа для анкетирования.</>
    ),
    images: ['pollster.png'],
    alt: 'Pollster',
    date: 'Январь 2025 - Май 2025',
    order: 50,
  },
  {
    id: 'flocky',
    title: 'FLocky',
    github: 'https://github.com/Luca324/FLocky',
    description: (
      <>Веб-мессенджер на React с десктопной версией на Electron.</>
    ),
    images: ['flocky.png'],
    alt: 'FLocky',
    date: 'Июнь 2025',
    order: 60,
  },
  {
    id: 'shri-infra-homework-2025',
    title: 'shri-infra-homework-2025',
    github: 'https://github.com/Luca324/shri-infra-homework-2025',
    description: (
      <>
        Проект содержит GitHub Actions workflow, которые автоматизируют весь жизненный цикл релизов: при релизе автоматически создает GitHub Issue с полной информацией, при багфиксе находит соответствующее issue и добавляет комментарий, автоматически обновляет CHANGELOG, управляет Docker образами в Yandex Container Registry, деплоит в продакшн через SSH и многое другое.
      </>
    ),
    images: ['github-actions-workflow.png'],
    alt: 'GitHub Actions workflow',
    date: 'Июль 2025',
    order: 80,
  },
]
