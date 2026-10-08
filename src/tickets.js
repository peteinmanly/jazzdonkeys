// Ticket Modal Controller (Coming Soon)

class TicketSystem {
  constructor() {
    this.dialog = null;
  }

  init() {
    this.dialog = document.getElementById('ticket-modal');
    this.bindEvents();
  }

  bindEvents() {
    // Open modal buttons
    document.querySelectorAll('.btn-buy-tickets').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal();
      });
    });

    // Close button
    const closeBtn = document.getElementById('close-ticket-modal');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeModal());
    }

    // "Got It!" button
    const gotItBtn = document.getElementById('got-it-btn');
    if (gotItBtn) {
      gotItBtn.addEventListener('click', () => this.closeModal());
    }

    // Modal background click
    if (this.dialog) {
      this.dialog.addEventListener('click', (e) => {
        if (e.target === this.dialog) {
          this.closeModal();
        }
      });
    }
  }

  openModal() {
    if (!this.dialog) return;
    this.dialog.showModal();
    this.dialog.classList.add('modal-open');
    document.body.classList.add('dialog-open');
  }

  closeModal() {
    if (!this.dialog) return;
    this.dialog.classList.remove('modal-open');
    this.dialog.close();
    document.body.classList.remove('dialog-open');
  }
}

export const ticketSystem = new TicketSystem();
