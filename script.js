'use strict';
(() => {
  const list = document.getElementById('queue-list');
  const status = document.getElementById('queue-status');
  const count = document.getElementById('queue-count');
  const alertButton = document.getElementById('add-alert');
  const processButton = document.getElementById('process-next');
  let queue = [];
  let alertId = 0;
  const render = () => {
    list.replaceChildren();
    if (!queue.length) {
      const empty = document.createElement('div');
      empty.className = 'queue-empty';
      empty.textContent = 'Queue clear';
      list.append(empty);
    }
    queue.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = 'queue-item' + (item.urgent ? ' urgent' : '');
      const order = document.createElement('span');
      order.textContent = String(index + 1).padStart(2, '0');
      const label = document.createElement('span');
      label.textContent = item.label;
      const priority = document.createElement('span');
      priority.textContent = item.urgent ? 'URGENT' : 'STANDARD';
      row.append(order, label, priority);
      list.append(row);
    });
    count.textContent = String(queue.length).padStart(2, '0') + ' PENDING';
    processButton.disabled = !queue.length;
    alertButton.disabled = queue.some(item => item.urgent);
  };
  const reset = () => {
    alertId = 0;
    queue = [1, 2, 3, 4].map(n => ({label: 'Marketing message ' + String(n).padStart(2, '0'), urgent: false}));
    status.textContent = 'Add an urgent alert to move it ahead of marketing messages.';
    render();
  };
  alertButton.addEventListener('click', () => {
    if (queue.some(item => item.urgent)) return;
    alertId += 1;
    queue.unshift({label: 'Panic alert ' + String(alertId).padStart(2, '0'), urgent: true});
    status.textContent = 'Urgent alert is now first. Pending marketing messages keep their order.';
    render();
  });
  processButton.addEventListener('click', () => {
    const item = queue.shift();
    if (!item) return;
    status.textContent = item.label + ' processed in this demo. ' + (queue.length ? queue.length + ' message' + (queue.length === 1 ? '' : 's') + ' remaining.' : 'The queue is clear. Reset to try again.');
    render();
  });
  document.getElementById('reset-queue').addEventListener('click', reset);
  const printButton = document.getElementById('print-overview');
  let priorDetails = [];
  window.addEventListener('beforeprint', () => {
    priorDetails = [...document.querySelectorAll('details')].map(el => ({el, open: el.open}));
    priorDetails.forEach(({el}) => { el.open = true; });
  });
  window.addEventListener('afterprint', () => priorDetails.forEach(({el, open}) => {el.open = open;}));
  printButton.addEventListener('click', () => window.print());
  reset();
})();

// FIG. 01 follows scroll position, not a timer. Only observe scroll while visible.
(() => {
  const art = document.querySelector('.system-art');
  if (!art) return;
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let visible = false;
  let listening = false;
  let frame = null;
  const reset = () => {
    ['--gyro-x', '--gyro-y', '--gyro-z'].forEach(name => art.style.removeProperty(name));
  };
  const draw = () => {
    frame = null;
    if (motion.matches || !visible) return;
    const bounds = art.getBoundingClientRect();
    // Independent axes travel a visible half-turn as the art crosses the viewport.
    // No timer, inertia, or perpetual motion; reversing scroll reverses the gimbals.
    const progress = Math.max(0, Math.min(1, (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height)));
    const offset = progress - 0.5;
    art.style.setProperty('--gyro-x', (offset * 180).toFixed(3) + 'deg');
    art.style.setProperty('--gyro-y', (offset * -160).toFixed(3) + 'deg');
    art.style.setProperty('--gyro-z', (offset * 140).toFixed(3) + 'deg');
  };
  const schedule = () => {
    if (frame === null && visible && !motion.matches) frame = window.requestAnimationFrame(draw);
  };
  const sync = () => {
    const active = visible && !motion.matches;
    if (active && !listening) {
      window.addEventListener('scroll', schedule, {passive: true});
      window.addEventListener('resize', schedule, {passive: true});
      listening = true;
    } else if (!active && listening) {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      listening = false;
    }
    if (!active && frame !== null) {
      window.cancelAnimationFrame(frame);
      frame = null;
    }
    if (motion.matches) reset();
    if (active) schedule();
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      sync();
    });
    observer.observe(art);
  } else {
    visible = true;
    sync();
  }
  motion.addEventListener('change', sync);
})();
