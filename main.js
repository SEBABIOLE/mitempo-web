// Menú móvil
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('mobile-menu-button');
  const menu = document.getElementById('mobile-menu');
  btn?.addEventListener('click', () => menu.classList.toggle('hidden'));

  // Cargar características
  loadFeatures();
});

async function loadFeatures() {
  // Reemplaza esta URL por la de tu API real
  const API = 'https://jsonplaceholder.typicode.com/posts?_limit=6';
  try {
    const res = await fetch(API);
    const data = await res.json();
    renderFeatures(data);
  } catch (e) {
    console.error('No se pudieron cargar las features', e);
  }
}

function renderFeatures(items) {
  const container = document.getElementById('features-list');
  if (!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'p-6 bg-white rounded-lg shadow card-hover';
    card.innerHTML = `
      <div class="feature-icon text-4xl mb-4">💬</div>
      <h3 class="font-semibold mb-2">${item.title}</h3>
      <p class="text-gray-600">${item.body.substring(0, 60)}…</p>
    `;
    container.append(card);
  });
}

// Navegación SPA (mostrar/ocultar secciones)
function showSection(id) {
  document.querySelectorAll('section, header').forEach(el => el.classList.add('hidden'));
  const target = document.getElementById(id);
  if (target) target.classList.remove('hidden');
}
