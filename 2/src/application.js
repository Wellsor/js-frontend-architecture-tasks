import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

// BEGIN
export default async () => {
  const form = document.querySelector('form');
  const tasks = document.querySelector('#tasks');

  const render = (items) => {
    tasks.innerHTML = '';

    items.forEach((item) => {
  const li = document.createElement('li');
  li.classList.add('list-group-item');
  li.textContent = item.name;
  tasks.append(li);
});
  };

  const response = await axios.get(routes.tasksPath());
  render(response.data.items);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('name');

    await axios.post(routes.tasksPath(), { name });

    const result = await axios.get(routes.tasksPath());
    render(result.data.items);

    form.reset();
  });
};
// END