// Elements
const modal = document.getElementById('projectModal');
const overlay = modal.querySelector('.overlay');
const panel = modal.querySelector('.panel');
const closeBtn = modal.querySelector('.close');

const modalTitle = document.getElementById('modalTitle');
const modalDesc  = document.getElementById('modalDesc');
const modalImage = document.getElementById('modalImage');

const githubLink = document.getElementById('githubLink');
const demoLink   = document.getElementById('demoLink');

const prevBtn = modal.querySelector('.prev');
const nextBtn = modal.querySelector('.next');

let currentImages = [];
let currentIndex = 0;

// Open panel from a card
function openFromCard(card) {
  currentImages = card.dataset.images.split(',').map(s => s.trim()).filter(Boolean);
  currentIndex = 0;

  modalTitle.textContent = card.dataset.title || 'Project';
  modalDesc.textContent  = card.dataset.desc  || '';
  githubLink.href = card.dataset.github || '#';
  demoLink.href   = card.dataset.demo   || '#';

  updateImage();

  modal.classList.add('open');
  document.body.classList.add('modal-open');
  panel.focus();
}

// Update image src
function updateImage() {
  if (!currentImages.length) return;
  modalImage.src = currentImages[currentIndex];
}

// Close panel
function closePanel() {
  modal.classList.remove('open');
  document.body.classList.remove('modal-open');
}

// Navigation
function showNext() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex + 1) % currentImages.length;
  updateImage();
}
function showPrev() {
  if (!currentImages.length) return;
  currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
  updateImage();
}

// Event wiring
document.querySelectorAll('.project-card').forEach(card => {
  // Clicking the card opens preview panel
  card.addEventListener('click', () => openFromCard(card));

  // But clicking links inside the card should NOT open the panel
  card.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => e.stopPropagation());
  });
});

overlay.addEventListener('click', closePanel);
closeBtn.addEventListener('click', closePanel);
nextBtn.addEventListener('click', showNext);
prevBtn.addEventListener('click', showPrev);

// Keyboard support
window.addEventListener('keydown', e => {
  if (!modal.classList.contains('open')) return;
  if (e.key === 'Escape') closePanel();
  if (e.key === 'ArrowRight') showNext();
  if (e.key === 'ArrowLeft') showPrev();
});
