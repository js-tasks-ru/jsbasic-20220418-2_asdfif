import createElement from '../../assets/lib/create-element.js'

export default class ProductCard {
  constructor(product) {
    this.product = product
    this.elem = this.#createElem()
  }

  #createElem() {
    const card = createElement(`<div class="card"></div>`)
    const cardTop = createElement(`
      <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${Number(this.product.price).toFixed(2)}</span>
      </div>
    `)
    const cardBody = createElement(`
      <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
      </div>
    `)
    cardBody.querySelector('.card__button').addEventListener('click', this.#onProductAdd)

    card.append(cardTop)
    card.append(cardBody)

    return card
  }


  #onProductAdd = () => {
    const event = new CustomEvent("product-add", {
      detail: this.product.id,
      bubbles: true
    });

    this.elem.dispatchEvent(event);
  }
}