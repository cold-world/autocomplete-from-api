//Elements
const formTemplate = document.querySelector('form-template');
const formElement = formTemplate.returnShadowRoot().querySelector('form');
const nameList = formTemplate.returnShadowRoot().querySelector('#name-list');
nameList.style.display = 'none';

const nameInput = formElement.elements['name'];
nameInput.addEventListener('keyup', (event) => {
  if (event.target.value.trim() !== '') {
    fetchHandler(event);
  } else {
    nameList.innerHTML = '';
    nameList.style.display = 'none';
    return;
  }
});

//Render results
/////////////////////////////////////////////////////////////
const renderResult = (name, fullName, inn, address) => {
  formElement.elements['name'].value = name;
  formElement.elements['short-name'].value = name;
  formElement.elements['full-name'].value = fullName;
  formElement.elements['inn'].value = inn;
  formElement.elements['address'].value = address;
};

const renderResults = (result) => {
  if (!result || result.suggestions.length === 0) {
    nameList.style.display = 'none';
    return;
  }

  if (nameInput.blur()) {
    nameList.style.display = 'none';
  }

  nameList.style.display = 'block';

  const options = result.suggestions.map(
    (item) =>
      `<div 
      data-name='${item.value}' 
      data-full-name='${item.data.name.full_with_opf}' 
      data-inn='${item.data.inn} / ${item.data.kpp}' 
      data-address='${item.data.address.value}' 
      class="form__list-item">
      <span class="form__list-item-name">${item.value}</span>
      <div class="form__list-item-info">
      <span>${item.data.inn}</span>
      <span>${item.data.address.value}</span>
      </div>
      </div>`
  );

  const optionsString = options.join('');
  nameList.innerHTML = `<span class="form__list-info">
  Выберите вариант или продолжите ввод</span> ${optionsString}`;

  nameList.addEventListener('click', (e) => {
    const currentEl = e.target.closest('.form__list-item');
    const { name, fullName, inn, address } = currentEl.dataset;
    renderResult(name, fullName, inn, address);
    nameList.style.display = 'none';
  });
};

//Api
/////////////////////////////////////////////////////////////////////
const url = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party';
const token = '90837c3dcbda670757700967e6d12a064eaf4dff';

const fetchHandler = (event) => {
  const query = event.target.value;

  const options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Token ' + token,
    },
    body: JSON.stringify({ query }),
  };

  fetch(url, options)
    .then((response) => response.json())
    .then((result) => {
      renderResults(result);
      nameInput.focus();
    })
    .catch((error) => console.log('error', error));
};
