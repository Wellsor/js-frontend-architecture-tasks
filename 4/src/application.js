// BEGIN
export default (companies) => {
  const container = document.querySelector('.container');

  let current = null;

  companies.forEach((company) => {
    const button = document.createElement('button');

    button.classList.add('btn', 'btn-primary');
    button.textContent = company.name;

    button.addEventListener('click', () => {
      const old = container.querySelector('[data-description]');

      if (current === company.name) {
        if (old) {
          old.remove();
        }
        current = null;
        return;
      }

      if (old) {
        old.remove();
      }

      const div = document.createElement('div');
      div.dataset.description = 'true';
      div.textContent = company.description;

      container.append(div);
      current = company.name;
    });

    container.append(button);
  });
};
// END