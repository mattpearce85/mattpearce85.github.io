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
    status.textContent = 'Try an urgent alert. See what moves to the front.';
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
