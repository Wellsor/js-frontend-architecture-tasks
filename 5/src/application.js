import uniqueId from 'lodash/uniqueId.js';

// BEGIN
export default () => {
  const state = {
    lists: {
      general: {
        id: 'general',
        name: 'General',
        tasks: [],
      },
    },
    currentListId: 'general',
  };

  const listsContainer = document.querySelector('[data-container="lists"]');
  const tasksContainer = document.querySelector('[data-container="tasks"]');

  const renderTasks = () => {
    tasksContainer.innerHTML = '';

    const current = state.lists[state.currentListId];

    if (current.tasks.length === 0) {
      return;
    }

    const ul = document.createElement('ul');

    current.tasks.forEach((task) => {
      const li = document.createElement('li');
      li.textContent = task.name;
      ul.append(li);
    });

    tasksContainer.append(ul);
  };

  const renderLists = () => {
    listsContainer.innerHTML = '';

    const ul = document.createElement('ul');

    Object.values(state.lists).forEach((list) => {
      const li = document.createElement('li');

      if (list.id === state.currentListId) {
        const b = document.createElement('b');
        b.textContent = list.name;
        li.append(b);
      } else {
        const a = document.createElement('a');
        a.href = `#${list.id}`;
        a.textContent = list.name;

        a.addEventListener('click', (e) => {
          e.preventDefault();
          state.currentListId = list.id;
          renderLists();
          renderTasks();
        });

        li.append(a);
      }

      ul.append(li);
    });

    listsContainer.append(ul);
  };

  document.querySelector('[data-container="new-list-form"]').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const name = data.get('name');

    const exists = Object.values(state.lists)
      .some((list) => list.name === name);

    if (exists) {
      return;
    }

    const id = uniqueId('list_');

    state.lists[id] = {
      id,
      name,
      tasks: [],
    };

    e.target.reset();
    renderLists();
  });

  document.querySelector('[data-container="new-task-form"]').addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const name = data.get('name');

    state.lists[state.currentListId].tasks.push({ name });

    e.target.reset();
    renderTasks();
  });

  renderLists();
  renderTasks();
};
// END