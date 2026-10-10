import { initCountdown } from './countdown.js';
import { ticketSystem } from './tickets.js';
import { soundEngine } from './audio.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Countdown Timer
  initCountdown();

  // 2. Initialize Ticket Purchase System
  ticketSystem.init();

  // 3. Bind Band Audio Cards
  let activeBandCard = null;
  let activeTimeout = null;

  document.querySelectorAll('.band-card').forEach(card => {
    const bandId = card.dataset.band;

    const playHandler = () => {
      // Clear previous active card state
      if (activeBandCard && activeBandCard !== card) {
        activeBandCard.classList.remove('is-playing');
      }
      if (activeTimeout) {
        clearTimeout(activeTimeout);
      }

      // If already playing this band, stop it
      if (card.classList.contains('is-playing')) {
        soundEngine.stopCurrent();
        card.classList.remove('is-playing');
        activeBandCard = null;
        return;
      }

      // Start sound
      const durationMs = soundEngine.playBand(bandId) || 2500;
      card.classList.add('is-playing');
      activeBandCard = card;

      activeTimeout = setTimeout(() => {
        card.classList.remove('is-playing');
        if (activeBandCard === card) {
          activeBandCard = null;
        }
      }, durationMs);
    };

    card.addEventListener('click', playHandler);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        playHandler();
      }
    });
  });
});

