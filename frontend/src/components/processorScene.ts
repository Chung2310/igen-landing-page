import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

/** Procedural model: no remote textures, models or runtime network requests. */
export function createProcessor(host: HTMLDivElement) {
  let renderer: THREE.WebGLRenderer;
  try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
  catch { return () => {}; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, host.clientWidth < 500 ? 1.25 : 1.75));
  renderer.setClearColor(0xffffff, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = .9;
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, .1, 100);
  camera.position.set(6.6, 7.5, 8.8);
  camera.lookAt(0, .35, 0);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  scene.environment = environment.texture;
  room.dispose();
  pmrem.dispose();
  scene.add(new THREE.HemisphereLight(0xffffff, 0x506978, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.7);
  key.position.set(-3, 8, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xc7edf1, 2);
  rim.position.set(5, 3, -4);
  scene.add(rim);
  const model = new THREE.Group();
  scene.add(model);
  const silver = new THREE.MeshStandardMaterial({ color: 0xaebbc1, metalness: .8, roughness: .27 });
  const ceramic = new THREE.MeshStandardMaterial({ color: 0x254653, metalness: .4, roughness: .4 });
  const graphite = new THREE.MeshStandardMaterial({ color: 0x0b202c, metalness: .45, roughness: .32 });
  const glass = new THREE.MeshPhysicalMaterial({ color: 0xd4ebee, metalness: .05, roughness: .16, transparent: true, opacity: .24, depthWrite: false, side: THREE.DoubleSide });
  const cyan = new THREE.MeshStandardMaterial({ color: 0x009db2, emissive: 0x007989, emissiveIntensity: .5, roughness: .4 });
  const traceMaterial = new THREE.LineBasicMaterial({ color: 0x31d1e1, transparent: true, opacity: .85 });

  const box = (w: number, h: number, d: number, y: number, material: THREE.Material, radius = .06) => {
    const mesh = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 2, radius), material);
    mesh.position.y = y;
    model.add(mesh);
    return mesh;
  };
  box(4.5, .18, 4.5, -.4, silver);
  box(4.3, .09, 4.3, -.25, graphite, .025);
  box(4.5, .13, 4.5, -.12, ceramic);
  box(4.15, .045, 4.15, .38, glass, .018);
  box(2.05, .2, 2.05, .32, silver);
  box(1.85, .12, 1.85, .47, graphite);
  box(1.66, .035, 1.66, .55, cyan, .015);
  box(1.64, .09, 1.64, .62, graphite, .04);
  box(2.6, .035, 2.6, 1.13, glass, .015);

  // Fine silver leads sit along all four edges of the ceramic substrate.
  const pinGeometry = new THREE.BoxGeometry(.065, .055, .24);
  for (let side = 0; side < 4; side++) for (let i = 0; i < 18; i++) {
    const pin = new THREE.Mesh(pinGeometry, silver);
    const along = -1.8 + i * 3.6 / 17;
    pin.position.set(side % 2 ? (side === 1 ? 2.27 : -2.27) : along, -.12, side % 2 ? along : (side === 0 ? 2.27 : -2.27));
    pin.rotation.y = side % 2 ? Math.PI / 2 : 0;
    model.add(pin);
  }
  // Spacers make the separated glass layer read as a physical assembly.
  for (const x of [-1.8, 1.8]) for (const z of [-1.8, 1.8]) {
    const spacer = new THREE.Mesh(new THREE.CylinderGeometry(.045, .045, .48, 8), silver);
    spacer.position.set(x, .13, z);
    model.add(spacer);
  }

  const routes: THREE.CurvePath<THREE.Vector3>[] = [];
  const terminals: THREE.Mesh[] = [];
  const nodeGeometry = new THREE.SphereGeometry(.026, 8, 6);
  for (let side = 0; side < 4; side++) for (let i = 0; i < 5; i++) {
    const offset = -.7 + i * .35;
    const points = [new THREE.Vector3(offset, -.045, .97), new THREE.Vector3(offset, -.045, 1.2 + i * .08), new THREE.Vector3(offset + .2, -.045, 1.4 + i * .08), new THREE.Vector3(offset + .2, -.045, 2.04)];
    points.forEach(p => p.applyAxisAngle(new THREE.Vector3(0, 1, 0), side * Math.PI / 2));
    model.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), traceMaterial));
    const node = new THREE.Mesh(nodeGeometry, cyan.clone());
    node.position.copy(points[3]);
    model.add(node);
    if (i === 2) {
      const route = new THREE.CurvePath<THREE.Vector3>();
      points.slice(1).forEach((p, n) => route.add(new THREE.LineCurve3(points[n], p)));
      routes.push(route);
      terminals.push(node);
    }
  }
  // A small neural lattice surrounds the die on the upper glass surface.
  const neuralPoints = Array.from({ length: 12 }, (_, i) => new THREE.Vector3(Math.cos(i / 12 * Math.PI * 2) * 1.05, 1.16, Math.sin(i / 12 * Math.PI * 2) * 1.05));
  neuralPoints.forEach((p, i) => {
    const dot = new THREE.Mesh(nodeGeometry, cyan);
    dot.position.copy(p);
    model.add(dot);
    model.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints([p, neuralPoints[(i + 3) % 12]]), new THREE.LineBasicMaterial({ color: 0x1bb4cc, transparent: true, opacity: .6 })));
  });

  const label = document.createElement('canvas');
  label.width = label.height = 256;
  const ctx = label.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#16323e'; ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#426370'; ctx.lineWidth = 1; ctx.strokeRect(12, 12, 232, 232);
    ctx.fillStyle = '#f2fbff'; ctx.font = '500 80px sans-serif'; ctx.textAlign = 'center'; ctx.fillText('AI', 128, 139);
    ctx.fillStyle = '#98c3cb'; ctx.font = '13px sans-serif'; ctx.fillText('i G e n   /   N E U R A L', 128, 184);
    const texture = new THREE.CanvasTexture(label); texture.colorSpace = THREE.SRGBColorSpace;
    const surface = new THREE.Mesh(new THREE.PlaneGeometry(1.52, 1.52), new THREE.MeshStandardMaterial({ map: texture, metalness: .1, roughness: .65 }));
    surface.rotation.x = -Math.PI / 2; surface.position.y = .671; model.add(surface);
  }
  // Soft contact shadow, without a costly live shadow map.
  const shadowCanvas = document.createElement('canvas'); shadowCanvas.width = shadowCanvas.height = 128;
  const shadowCtx = shadowCanvas.getContext('2d');
  if (shadowCtx) {
    const gradient = shadowCtx.createRadialGradient(64, 64, 8, 64, 64, 64);
    gradient.addColorStop(0, '#193a4b38'); gradient.addColorStop(1, '#193a4b00');
    shadowCtx.fillStyle = gradient; shadowCtx.fillRect(0, 0, 128, 128);
    const shadow = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shadowCanvas), transparent: true, depthWrite: false }));
    shadow.rotation.x = -Math.PI / 2; shadow.position.y = -.7; scene.add(shadow);
  }
  const signals = routes.map(() => { const dot = new THREE.Mesh(new THREE.SphereGeometry(.055, 8, 6), new THREE.MeshBasicMaterial({ color: 0x25cfe1 })); model.add(dot); return dot; });

  // Underside contacts and capacitors give the model detail from every angle.
  const gold = new THREE.MeshStandardMaterial({ color: 0xc5a96a, metalness: .8, roughness: .32 });
  const contactGeometry = new THREE.SphereGeometry(.058, 8, 6);
  const contacts = new THREE.InstancedMesh(contactGeometry, gold, 100);
  const matrix = new THREE.Matrix4();
  for (let i = 0; i < 100; i++) {
    matrix.makeTranslation(-1.7 + (i % 10) * .378, -.54, -1.7 + Math.floor(i / 10) * .378);
    contacts.setMatrixAt(i, matrix);
  }
  model.add(contacts);
  const componentGeometry = new THREE.BoxGeometry(.16, .11, .09);
  for (let side = 0; side < 4; side++) for (let i = 0; i < 7; i++) {
    const component = new THREE.Mesh(componentGeometry, graphite);
    component.position.set(-.9 + i * .3, .015, 1.82);
    component.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), side * Math.PI / 2);
    component.rotation.y = side * Math.PI / 2;
    model.add(component);
  }
  const assembled = model.children.map(object => ({ object, y: object.position.y,
    lift: object.position.y > 1 || (object instanceof THREE.Line && object.geometry.getAttribute('position').getY(0) > 1) ? 1.05 : object.position.y >= .25 ? .6 : 0 }));

  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, visible = true, alive = true, contextLost = false, lastFrame = 0;
  let explode = false, separation = 0, autoRotate = true, paused = false, clock = 0;
  let zoom = 1, targetZoom = 1;
  const neutralPosition = camera.position.clone();
  const targetRotation = new THREE.Quaternion();
  const stepRotation = new THREE.Quaternion();
  const autoRotation = new THREE.Quaternion();
  const displayRotation = new THREE.Quaternion();
  const verticalAxis = new THREE.Vector3(0, 1, 0);
  let autoPhase = 0;
  const cameraRight = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
  const cameraUp = new THREE.Vector3(0, 1, 0).applyQuaternion(camera.quaternion);
  const pointers = new Map<number, { x: number; y: number }>();
  let pinchDistance = 0;
  const rotate = (dx: number, dy: number) => {
    stepRotation.setFromAxisAngle(cameraUp, dx * .009);
    targetRotation.premultiply(stepRotation);
    stepRotation.setFromAxisAngle(cameraRight, dy * .009);
    targetRotation.premultiply(stepRotation).normalize();
  };
  const draw = (time: number) => {
    frame = 0;
    if (!alive || !visible || contextLost || document.hidden) return;
    const mobile = host.clientWidth < 500;
    if (time - lastFrame < (mobile ? 32 : 16)) { frame = requestAnimationFrame(draw); return; }
    const delta = Math.min(50, Math.max(0, time - lastFrame)); lastFrame = time;
    const blend = motion.matches ? 1 : 1 - Math.exp(-delta / 95);
    if (!motion.matches && !paused) clock += delta;
    // A 32-second sweep: -90° to +90°, easing smoothly at both ends.
    if (autoRotate && !motion.matches && !pointers.size) autoPhase += delta * Math.PI * 2 / 32000;
    const angle = autoRotate ? Math.sin(autoPhase) * Math.PI / 2 : 0;
    autoRotation.setFromAxisAngle(verticalAxis, angle);
    displayRotation.copy(targetRotation).premultiply(autoRotation);
    model.quaternion.slerp(displayRotation, blend);
    separation += ((explode ? 1 : 0) - separation) * blend;
    assembled.forEach(({ object, y, lift }) => { object.position.y = y + lift * separation; });
    zoom += (targetZoom - zoom) * blend;
    camera.position.copy(neutralPosition).multiplyScalar(zoom);
    camera.lookAt(0, .35, 0);
    model.position.y = motion.matches || paused || pointers.size ? 0 : Math.sin(clock * .0008) * .035;
    cyan.emissiveIntensity = motion.matches || paused ? .7 : .7 + Math.sin(clock * .003) * .25;
    signals.forEach((dot, i) => {
      dot.visible = !mobile || i < 2;
      const progress = (clock / 2700 + i * .25) % 1;
      dot.position.copy(routes[i].getPoint(progress));
      (terminals[i].material as THREE.MeshStandardMaterial).emissiveIntensity = progress > .90 ? 3 : .5;
    });
    renderer.render(scene, camera);
    const moving = model.quaternion.angleTo(displayRotation) > .001 || Math.abs(zoom - targetZoom) > .001 || Math.abs(separation - (explode ? 1 : 0)) > .001;
    if ((!motion.matches && (!paused || autoRotate)) || moving) frame = requestAnimationFrame(draw);
  };
  const wake = () => { if (!frame && alive && visible && !contextLost && !document.hidden) frame = requestAnimationFrame(draw); };
  const resize = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); camera.aspect = w / h; camera.updateProjectionMatrix(); wake(); };
  const stopAuto = () => {
    targetRotation.copy(model.quaternion);
    autoRotate = false;
    autoPhase = 0;
    host.dispatchEvent(new Event('processor-auto-stop'));
  };
  const down = (e: PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    if (autoRotate) stopAuto();
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    host.setPointerCapture(e.pointerId);
    host.focus({ preventScroll: true });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchDistance = Math.hypot(a.x - b.x, a.y - b.y);
    }
    wake();
  };
  const move = (e: PointerEvent) => {
    const previous = pointers.get(e.pointerId);
    if (!previous) return;
    const dx = e.clientX - previous.x, dy = e.clientY - previous.y;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const distance = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchDistance > 0 && distance > 0) targetZoom = THREE.MathUtils.clamp(targetZoom * pinchDistance / distance, .72, 1.4);
      pinchDistance = distance;
    } else rotate(dx, dy);
    wake();
  };
  const up = (e: PointerEvent) => { pointers.delete(e.pointerId); pinchDistance = 0; if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId); wake(); };
  const action = (event: Event) => {
    const detail = (event as CustomEvent<{ action: string; enabled?: boolean }>).detail;
    if (detail.action === 'reset') { targetRotation.identity(); targetZoom = 1; explode = false; autoRotate = false; }
    if (detail.action === 'explode') explode = !!detail.enabled;
    if (detail.action === 'auto') {
      targetRotation.copy(model.quaternion);
      autoPhase = 0;
      autoRotate = !!detail.enabled;
    }
    if (detail.action === 'pause') paused = !!detail.enabled;
    if (detail.action === 'zoom-in') targetZoom = Math.max(.72, targetZoom - .12);
    if (detail.action === 'zoom-out') targetZoom = Math.min(1.4, targetZoom + .12);
    wake();
  };
  const keydown = (e: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', '+', '-', 'Home'].includes(e.key)) return;
    e.preventDefault();
    if (autoRotate) stopAuto();
    if (e.key === 'Home') { targetRotation.identity(); targetZoom = 1; }
    else if (e.key === '+') targetZoom = Math.max(.72, targetZoom - .12);
    else if (e.key === '-') targetZoom = Math.min(1.4, targetZoom + .12);
    else rotate(e.key === 'ArrowLeft' ? -25 : e.key === 'ArrowRight' ? 25 : 0, e.key === 'ArrowUp' ? -25 : e.key === 'ArrowDown' ? 25 : 0);
    wake();
  };
  const lost = (e: Event) => { e.preventDefault(); host.dataset.webgl = 'lost'; cancelAnimationFrame(frame); frame = 0; contextLost = true; };
  const restored = () => { host.dataset.webgl = 'ready'; contextLost = false; wake(); };
  const observer = new ResizeObserver(resize); observer.observe(host);
  const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) wake(); else { cancelAnimationFrame(frame); frame = 0; } }); intersection.observe(host);
  host.addEventListener('pointerdown', down); host.addEventListener('pointermove', move); host.addEventListener('pointerup', up); host.addEventListener('pointercancel', up); host.addEventListener('lostpointercapture', up); host.addEventListener('keydown', keydown); host.addEventListener('processor-action', action);
  renderer.domElement.addEventListener('webglcontextlost', lost); renderer.domElement.addEventListener('webglcontextrestored', restored);
  document.addEventListener('visibilitychange', wake); motion.addEventListener('change', wake);
  host.dataset.webgl = 'ready'; resize();
  return () => {
    alive = false; cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect();
    host.removeEventListener('pointerdown', down); host.removeEventListener('pointermove', move); host.removeEventListener('pointerup', up); host.removeEventListener('pointercancel', up); host.removeEventListener('lostpointercapture', up); host.removeEventListener('keydown', keydown); host.removeEventListener('processor-action', action);
    document.removeEventListener('visibilitychange', wake); motion.removeEventListener('change', wake);
    renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', restored);
    const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
    scene.traverse(object => { if (object instanceof THREE.Mesh || object instanceof THREE.Line) { geometries.add(object.geometry); const list = Array.isArray(object.material) ? object.material : [object.material]; list.forEach(m => materials.add(m)); } });
    geometries.forEach(g => g.dispose()); materials.forEach(m => { if ('map' in m && m.map instanceof THREE.Texture) m.map.dispose(); m.dispose(); });
    environment.dispose(); renderer.dispose(); renderer.domElement.remove(); delete host.dataset.webgl;
  };
}
