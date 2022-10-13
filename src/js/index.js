import '../css/styles.css';
import { fetchCountries } from '../js/fetchCountries';

import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// import countryListTpl from '../templates/countryList.hbs';

import { test } from '../templates/test';

const Handlebars = require('handlebars');
const template = Handlebars.compile(test);

const DEBOUNCE_DELAY = 300;

// ссылка на div для вставки списка
const divElemenetRef = document.querySelector('.country-list');

// ссылка на поле ввода запроса
const inputForm = document.querySelector('#search-box');

inputForm.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

// ============ Main function ============================================
function onInput(e) {
  const searchQuery = e.target.value.trim();

  // 1. Если input пустой очищаю HTML и прерываю функцию
  if (!searchQuery) {
    cleanHtmlList();
    errorMessage();
    return;
  }

  // 2. Обработка запроса
  fetchCountries(searchQuery)
    .then(json => {
      // Обработка ошибки 404
      if (json.message === 'Not Found') {
        console.log('Not Found');
        throw new Error();
      }
      renderingHtml(json);
    })
    .catch(json => {
      console.log('Сработал Catch');
      console.log(json);
      errorMessage();
    });
}

// =========================================================================

function renderingHtml(json) {
  console.log(json);

  divElemenetRef.innerHTML = `${json.length}`;
  if (json.length === 1) {
    console.log(json.length);
  } else if (json.length < 10) {
    console.log(json.length);

    divElemenetRef.innerHTML = template(json);
  } else {
    infoMessage();
  }
}

function cleanHtmlList() {
  divElemenetRef.innerHTML = '';
}

function errorMessage() {
  Notify.failure('Oops, there is no country with that name');
  divElemenetRef.innerHTML = '';
}

function infoMessage() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

// function onInput(e) {
//   const searchQuery = e.target.value.trim();

//   if (searchQuery) {
//     const response = fetchCountries(searchQuery);

//     response
//       .then(json => {
//         if (json.message != 'Not Found') {
//           if (json.length < 10) {
//             console.log(json);
//             if (json.length === 1) {
//               divElemenetRef.classList.toggle('active');
//             }
//             renderList(json);
//           } else {
//             Notify.info(
//               '"Too many matches found. Please enter a more specific name.'
//             );
//           }
//         } else {
//           throw new Error();
//         }
//       })
//       .catch(() => {
//         divElemenetRef.innerHTML = '';
//         Notify.failure('Oops, there is no country with that name');
//       });
//   } else {
//     Notify.failure('Oops, there is no country with that name');
//     divElemenetRef.innerHTML = '';
//   }
// }

// function renderList(countriesList) {
//   divElemenetRef.innerHTML = countryListTpl(countriesList);
// }
