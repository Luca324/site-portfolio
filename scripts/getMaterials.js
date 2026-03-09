export function getMaterials() {

    // Материал для стен — мягкий тёмно-серый с холодным оттенком
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: 0x111827,      // тёмный серо-синий (в духе bg-slate-900)
      transparent: true,
      opacity: 0.95,
      roughness: 0.75,
      metalness: 0.15
    });

    // Материал для пола — тёмный полированный, хорошо ловит блики от шариков
    const floorMaterial = new THREE.MeshStandardMaterial({
      color: 0x020617,      // почти чёрный с лёгким синим оттенком
      transparent: true,
      opacity: 0.95,
      roughness: 0.22,      // более гладкий для эффекта полировки
      metalness: 0.55       // выраженный металлический оттенок
    });

    // Материал для потолка — светлый, но с холодным подтоном
    const ceilingMaterial = new THREE.MeshStandardMaterial({
      color: 0xe5e7eb,      // светлый серо-синий
      transparent: true,
      opacity: 0.9,
      roughness: 0.8,
      metalness: 0
    });

    // Материал для акцентной стены — глубокий синий с лёгким свечением
    const accentWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,      // насыщенный синий, ближе к #1e3a8a
      transparent: true,
      opacity: 1,
      roughness: 0.55,
      metalness: 0.12,
      emissive: 0x0f172a,   // очень лёгкое свечение в сторону синего
      emissiveIntensity: 0.35
    });

    // Материал для нейтральных стен — чуть светлее основных, чтобы не спорили с акцентной
    const neutralWallMaterial = new THREE.MeshStandardMaterial({
      color: 0x1f2937,      // тёмно-серый с холодным оттенком
      transparent: true,
      opacity: 1,
      roughness: 0.72,
      metalness: 0.18
    });
    
    return { wallMaterial, neutralWallMaterial, accentWallMaterial, ceilingMaterial, floorMaterial }
  }