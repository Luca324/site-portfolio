(function () {
  // Здесь можно задать человекочитаемую дату и порядок для сортировки.
  // Чем больше order, тем проект новее.
  const projectsMeta = {
    'buildmeister': {
      date: 'Октябрь 2025 - Февраль 2026', // Например: 'Октябрь 2025 — Декабрь 2025'
      order: 100
    },
    'smartstorage': {
      date: 'Октябрь 2025',
      order: 95
    },
    'myn-mn-calculation': {
      date: 'Декабрь 2024',
      order: 20
    },
    'physics-site-calculator': {
      date: 'Май 2024',
      order: 10
    },
    'plan-it': {
      date: 'Сентябрь 2025',
      order: 90
    },
    'analytics-service': {
      date: 'Июль 2025',
      order: 70
    },
    'pollster': {
      date: 'Январь 2025 - Май 2025',
      order: 50
    },
    'flocky': {
      date: 'Июнь 2025',
      order: 60
    },
    'shri-infra-homework-2025': {
      date: 'Июль 2025',
      order: 80
    }
  };

  const list = document.querySelector('.projects-list');
  const sortSelect = document.getElementById('project-sort');

  if (!list || !sortSelect) {
    return;
  }

  const items = Array.from(list.querySelectorAll('.project-item')).map(function (element, index) {
    const id = element.getAttribute('data-project-id') || '';
    const meta = projectsMeta[id];

    // Если нужно показать дату под проектом — впиши её в объект выше.
    if (meta && meta.date) {
      let dateEl = element.querySelector('.project-date');
      if (!dateEl) {
        dateEl = document.createElement('div');
        dateEl.className = 'project-date';
        const desc = element.querySelector('.project-description');
        if (desc && desc.parentNode) {
          desc.parentNode.insertBefore(dateEl, desc.nextSibling);
        } else {
          element.appendChild(dateEl);
        }
      }
      dateEl.textContent = meta.date;
    }

    return {
      element: element,
      id: id,
      originalIndex: index
    };
  });

  sortSelect.addEventListener('change', function () {
    const value = sortSelect.value;
    const sorted = items.slice();

    if (value === 'default') {
      sorted.sort(function (a, b) {
        return a.originalIndex - b.originalIndex;
      });
    } else {
      sorted.sort(function (a, b) {
        const metaA = projectsMeta[a.id] || {};
        const metaB = projectsMeta[b.id] || {};
        const orderA = typeof metaA.order === 'number' ? metaA.order : 0;
        const orderB = typeof metaB.order === 'number' ? metaB.order : 0;

        if (value === 'newest') {
          return orderB - orderA;
        }

        if (value === 'oldest') {
          return orderA - orderB;
        }

        return 0;
      });
    }

    sorted.forEach(function (item) {
      list.appendChild(item.element);
    });
  });
})();

