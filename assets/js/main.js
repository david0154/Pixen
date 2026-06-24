// Lenis smooth scrolling setup
const lenis = new Lenis({
  lerp: 0.12,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Custom cursor micro interaction
const cursor = document.getElementById('cursor');
window.addEventListener('pointermove', (e) => {
  cursor.style.transform = `translate3d(${e.clientX - 9}px, ${e.clientY - 9}px, 0)`;
});

// GSAP core and scroll animations
gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.from('.hero-left', {
  y: 40,
  opacity: 0,
  duration: 1.1,
  ease: 'power3.out',
});

gsap.from('.hero-right', {
  y: 40,
  opacity: 0,
  duration: 1.1,
  delay: 0.15,
  ease: 'power3.out',
});

// Section reveals
const sections = document.querySelectorAll('.section');
sections.forEach((section) => {
  gsap.from(section.querySelector('.section-content'), {
    scrollTrigger: {
      trigger: section,
      start: 'top 75%',
    },
    y: 30,
    opacity: 0,
    duration: 0.9,
    ease: 'power3.out',
  });
});

// Feature orbit infinite rotation
const orbitRing = document.querySelector('.feature-orbit-ring');
if (orbitRing) {
  gsap.to(orbitRing, {
    rotation: 360,
    duration: 30,
    repeat: -1,
    ease: 'none',
    transformOrigin: '50% 50%',
  });
}

// Button glow micro animation
const buttons = document.querySelectorAll('.btn');
buttons.forEach((btn) => {
  btn.addEventListener('pointerenter', () => {
    gsap.to(btn, { boxShadow: '0 20px 60px rgba(0,174,239,0.75)', duration: 0.25 });
  });
  btn.addEventListener('pointerleave', () => {
    gsap.to(btn, { boxShadow: '0 16px 40px rgba(0,174,239,0.7)', duration: 0.25 });
  });
});

// Basic Three.js phone placeholder (can be replaced with high-fidelity models)
function createPhoneScene(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 6;

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(2.4, 4.8, 0.2);
  const material = new THREE.MeshStandardMaterial({
    color: 0x00aeef,
    metalness: 0.7,
    roughness: 0.2,
  });
  const phone = new THREE.Mesh(geometry, material);
  scene.add(phone);

  const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1.1);
  scene.add(light);

  const point = new THREE.PointLight(0x00aeef, 1.3);
  point.position.set(2, 3, 4);
  scene.add(point);

  let targetRotX = 0;
  let targetRotY = 0;

  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetRotY = x * 0.6;
    targetRotX = -y * 0.6;
  });

  function animate() {
    requestAnimationFrame(animate);
    phone.rotation.y += (targetRotY - phone.rotation.y) * 0.08;
    phone.rotation.x += (targetRotX - phone.rotation.x) * 0.08;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
}

createPhoneScene('hero-phone');
createPhoneScene('download-phone');

// Placeholder 3D scenes for later extension
['social-universe-3d', 'phone-explosion-3d', 'security-shield', 'community-earth'].forEach((id) => {
  const container = document.getElementById(id);
  if (!container) return;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.z = 7;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  const geometry = new THREE.SphereGeometry(2.6, 48, 48);
  const material = new THREE.MeshStandardMaterial({
    color: 0x071320,
    metalness: 0.6,
    roughness: 0.3,
    emissive: 0x00aeef,
    emissiveIntensity: 0.4,
  });
  const orb = new THREE.Mesh(geometry, material);
  scene.add(orb);

  const hemi = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
  scene.add(hemi);

  const point = new THREE.PointLight(0x00aeef, 1.8);
  point.position.set(3, 4, 5);
  scene.add(point);

  function animate() {
    requestAnimationFrame(animate);
    orb.rotation.y += 0.004;
    orb.rotation.x += 0.002;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
});
