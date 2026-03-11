export function checkSupport() {
  const isMobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const hasWebGL = (function () {
    try {
      const canvas = document.createElement('canvas');
      console.log(canvas)
      console.log('window.WebGLRenderingContext', window.WebGLRenderingContext)
      console.log("canvas.getContext('webgl')", canvas.getContext('webgl'))
      console.log("!!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))", !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))))
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  })();


  if (!hasWebGL || isMobile) {
    return false;
  }
  return true
}