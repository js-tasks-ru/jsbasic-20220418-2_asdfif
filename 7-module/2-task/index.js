import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #templateModal = `
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
  `

  #elem  = null;
  #body  = null;

  constructor() {
    this.#render()
    this.#addEventsListeners()
  }

  get elem() {
    return this.#elem
  }

  #render() {
    this.#elem = createElement(this.#templateModal)
  }

  #addEventsListeners() {
    this.#elem.querySelector('.modal__close').addEventListener('click', () => {
      this.close()
    })
    
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape') {
        this.close()
      }
    })
  }

  setTitle(title) {
    this.#elem.querySelector('.modal__title').textContent = title
  }

  setBody(bodyElem) {
    if (this.#body) {
      this.#elem.querySelector('.modal__body').removeChild(this.#body)
    }
    this.#body = bodyElem
    this.#elem.querySelector('.modal__body').append(this.#body)
  }

  open(){
    document.body.classList.add('is-modal-open')
    document.body.append(this.#elem)
  }

  close() {
    document.body.classList.remove('is-modal-open')
    this.#elem.remove()
  }
}
