// eslint-disable-next-line no-unused-vars
export default function decorate(block) {
    const rows = Array.from(block.children);
  
    const container = document.createElement('div');
    container.classList.add('recipe-directions-container');
  
    rows.forEach((row, index) => {
      const cells = row.querySelectorAll(':scope > div');
      if (cells.length < 4) return;
  
      const imgSrc = cells[0].textContent.trim();
      const step = cells[1].textContent.trim();
      const description = cells[2].textContent.trim();
      const time = cells[3].textContent.trim();
  
      const stepEl = document.createElement('div');
      stepEl.classList.add('recipe-step');
      if (index >= 3) stepEl.classList.add('hidden'); // hide after 3 steps
  
      stepEl.innerHTML = `
        <div class="step-image">
          <img src="${imgSrc}" alt="${step}" loading="lazy" />
        </div>
        <div class="step-divider"></div>
        <div class="step-content">
          <p class="step-title"><strong>${step}</strong> ${description}</p>
          <p class="step-time">${time}</p>
        </div>
      `;
  
      container.append(stepEl);
    });
  
    block.innerHTML = '';
    block.append(container);
  
    // Add Read More button if more than 3 steps
    if (rows.length > 3) {
      const button = document.createElement('button');
      button.classList.add('read-more-btn');
      button.textContent = 'Read More';
  
      button.addEventListener('click', () => {
        const hiddenSteps = container.querySelectorAll('.recipe-step.hidden');
        hiddenSteps.forEach((step) => {
          step.classList.remove('hidden');
          step.classList.add('fade-in');
        });
        button.remove();
      });
  
      block.append(button);
    }
  }
  