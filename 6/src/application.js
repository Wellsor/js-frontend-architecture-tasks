import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const state = onChange({
    form: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    errors: {},
    processState: 'filling',
  }, () => {
    const form = document.querySelector('[data-form="sign-up"]');

    if (!form) {
      return;
    }

    Object.keys(state.form).forEach((name) => {
      const input = form.elements[name];

      input.classList.remove('is-invalid');

      const next = input.nextElementSibling;
      if (next && next.classList.contains('invalid-feedback')) {
        next.remove();
      }

      if (has(state.errors, name)) {
        input.classList.add('is-invalid');

        const div = document.createElement('div');
        div.classList.add('invalid-feedback');
        div.textContent = state.errors[name].message;

        input.after(div);
      }
    });

    const submit = form.querySelector('[type="submit"]');

    if (state.processState === 'sending') {
      submit.disabled = true;
      return;
    }

    submit.disabled = !isEmpty(state.errors);
  });

  const form = document.querySelector('[data-form="sign-up"]');

  form.addEventListener('input', (e) => {
    state.form[e.target.name] = e.target.value;
    state.errors = validate(state.form);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    state.errors = validate(state.form);

    if (!isEmpty(state.errors)) {
      return;
    }

    state.processState = 'sending';

    try {
      await axios.post(routes.usersPath(), state.form);

      const container = document.querySelector('[data-container="sign-up"]');
      container.textContent = 'User Created!';
    } catch (err) {
      state.processState = 'filling';
    }
  });

};
// END
