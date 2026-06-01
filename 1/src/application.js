// BEGIN
export default () => {
  let sum = 0;

  const form = document.querySelector('form');
  const input = document.querySelector('input[name="number"]');
  const result = document.getElementById('result');
  const reset = document.querySelector('button');

  const render = () => {
    result.textContent = sum;
    form.reset();
    input.focus();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    sum += Number(input.value);

    render();
  });

  reset.addEventListener('click', () => {
    sum = 0;
    render();
  });

  render();
};
// END