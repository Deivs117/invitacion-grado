// ===== Configuración: todo lo editable de la invitación está aquí =====
const CONFIG = {
  evento: '2026-11-07T12:00:00-05:00',          // hora de Colombia
  duracionHoras: 5,
  lugar: 'RR Eventos · Callejón El Uval, Candelaria',
  referencia: 'Al lado de la gasolinera Primax El Uval',
  mapsUrl: 'https://maps.app.goo.gl/A7YgtKDka1rFJBvbA',     // enlace compartido del lugar
  busquedaMapa: 'CMM2+2F Callejón el UVAL, Candelaria, Valle del Cauca',  // ubicación exacta (plus code)
  direccionCalendario: 'RR Eventos, Callejón El Uval, Candelaria, Valle del Cauca',
  fechaLimite: 'lunes 19 de octubre',
  vestimenta: 'Casual formal.',
  parqueadero: 'Sí, hay parqueadero, aunque es limitado. No es necesario reservarlo.',
  // WhatsApp con indicativo de país y sin '+' ni espacios, ej. '573001234567'
  whatsapp: [
    { nombre: 'Esperanza', detalle: '(mamá de David)', numero: '573216434068' },
    { nombre: 'David', detalle: '', numero: '573103319477' },
  ],
  mensaje: '¡Hola! Confirmo mi asistencia al almuerzo de grado de David el sábado 7 de noviembre.',
};

// ===== Rellenar textos y enlaces =====
const $$ = (sel) => document.querySelectorAll(sel);

$$('[data-config]').forEach((el) => {
  const valor = CONFIG[el.dataset.config];
  if (valor) el.textContent = valor;
  else el.classList.add('pendiente');
});

const q = encodeURIComponent(CONFIG.busquedaMapa);
const inicio = new Date(CONFIG.evento);
const fin = new Date(inicio.getTime() + CONFIG.duracionHoras * 3600e3);
const utc = (d) => d.toISOString().replace(/[-:]|\.\d{3}/g, '');
const enlaces = {
  maps: CONFIG.mapsUrl || `https://www.google.com/maps/search/?api=1&query=${q}`,
  mapa: `https://www.google.com/maps?q=${q}&output=embed`,
  calendario: 'https://calendar.google.com/calendar/render?action=TEMPLATE'
    + `&text=${encodeURIComponent('Almuerzo de grado de David Caicedo Samboni')}`
    + `&dates=${utc(inicio)}/${utc(fin)}`
    + `&location=${encodeURIComponent(CONFIG.direccionCalendario)}`
    + `&details=${encodeURIComponent('Lluvia de sobres')}`,
};
$$('[data-link]').forEach((el) => {
  const url = enlaces[el.dataset.link];
  if (el.tagName === 'IFRAME') el.src = url; else el.href = url;
});

$$('[data-whatsapp]').forEach((el) => {
  const contacto = CONFIG.whatsapp[el.dataset.whatsapp];
  el.querySelector('.txt span').textContent = `Confirmar con ${contacto.nombre}`;
  el.querySelector('small').textContent = contacto.detalle;
  if (contacto.numero) {
    el.href = `https://wa.me/${contacto.numero}?text=${encodeURIComponent(CONFIG.mensaje)}`;
  } else {
    el.classList.add('pendiente');
    el.removeAttribute('href');
    el.title = 'Falta configurar el número';
  }
});

// ===== Cuenta regresiva =====
const celdas = ['dias', 'horas', 'minutos', 'segundos'].map((id) => document.getElementById(id));
function tic() {
  const s = Math.max(0, Math.floor((inicio - Date.now()) / 1000));
  const partes = [Math.floor(s / 86400), Math.floor(s / 3600) % 24, Math.floor(s / 60) % 60, s % 60];
  partes.forEach((v, i) => { celdas[i].textContent = String(v).padStart(2, '0'); });
}
tic();
setInterval(tic, 1000);
