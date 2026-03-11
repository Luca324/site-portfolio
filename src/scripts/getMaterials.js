import * as THREE from 'three';

export function getMaterials() {

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
    
    return { wallMaterial, neutralWallMaterial, accentWallMaterial, ceilingMaterial, floorMaterial }
  }