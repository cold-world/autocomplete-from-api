class FormTemplate extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });

    const styles = `
    form {
      width: 50vw;
    }
    @media only screen and (max-width: 500px) {
      form {
        width: 100%;
      }
    }
    .form__row {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .form__row:not(:last-child) {
      margin-bottom: 1rem;
    }
    .form__row:first-child {
      position: relative;
    }
  
    .form__list {
      font-size: 0.9rem;
      border: 1px solid grey;
      width: 100%;
      position: absolute;
      z-index: 2;
      top: 3rem;
      box-sizing: border-box;
      background-color: white;
      padding: 0.4rem;
      transition: all 0.3s;
    }

    .form__list-info{
      display: block;
      font-size: 0.8rem;
      color: grey;
      margin-bottom: 0.8rem;
    }

    .form__list-item {
      margin-bottom: 0.5rem;
      cursor: pointer;
      transition: all 0.3s;
    }

    .form__list-item:hover {
      background-color: #e8ebed;
    }

    .form__list-item-info {
      color: grey;
      font-size: 0.7rem;
    }
    `;

    const template = document.createElement('template');
    template.innerHTML = `
      <form>
        <div class="form__row">
          <label for="name">Компания или ИП</label>
          <input type="text" id="name" name="name autocomplete="off""
          placeholder="Введите название, ИНН, ОГРН или адрес организации"/>
          <div class="form__list" id="name-list">
          </div>
        </div>
        <div class="form__row">
          <label for="short-name">Краткое наименование</label>
          <input type="text" id="short-name" name="short-name" />
        </div>
        <div class="form__row">
          <label for="full-name">Полное наименование</label>
          <input type="text" id="full-name" name="full-name" />
        </div>
        <div class="form__row">
          <label for="inn">ИНН / КПП</label>
          <input type="text" id="inn" name="inn" />
        </div>
        <div class="form__row">
          <label for="address">Адрес</label>
          <input type="text" id="address" name="address" />
        </div>
      </form>
    `;

    shadowRoot.innerHTML = `
      <style>${styles}</style>
    `;

    shadowRoot.appendChild(template.content.cloneNode(true));
  }
  returnShadowRoot() {
    return this.shadowRoot;
  }
}

customElements.define('form-template', FormTemplate);
