// BEGIN
export default (laptops) => {
  const form = document.querySelector('form');
  const result = document.querySelector('.result');
   const render = (items) => {
  result.innerHTML = '';

  if (items.length === 0) {
    return;
  }

  const ul = document.createElement('ul');

  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item.model;
    ul.append(li);
  });

  result.append(ul);
};

  const filter = () => {
    const data = new FormData(form);

    const processor = data.get('processor_eq');
    const memory = data.get('memory_eq');
    const frequencyMin = data.get('frequency_gte');
    const frequencyMax = data.get('frequency_lte');

    const filtered = laptops.filter((laptop) => {
      if (processor && laptop.processor !== processor) {
        return false;
      }

      if (memory && String(laptop.memory) !== memory) {
        return false;
      }

      if (frequencyMin && laptop.frequency < Number(frequencyMin)) {
        return false;
      }

      if (frequencyMax && laptop.frequency > Number(frequencyMax)) {
        return false;
      }

      return true;
    });

    render(filtered);
  };

  form.addEventListener('input', filter);
  form.addEventListener('change', filter);

  render(laptops);
};
// END