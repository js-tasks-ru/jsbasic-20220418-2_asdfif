import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]
  modal = null;
  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) { return }

    let notInCart = true
    for (let item of this.cartItems) {
      if (item.product.id === product.id ) {
        item.count += 1
        notInCart = false
      }
    }
    if (notInCart) {
      this.cartItems.push({
        product: product,
        count: 1
      })
    }

    this.cartIcon.update(this)
  }

  updateProductCount(productId, amount) {
    let count = 0
    let itm = null
    for (let item of this.cartItems) {
      if (item.product.id === productId) {
        itm = item
        count = item.count
      }
    }
    if (!itm) { return }

    if (count += amount >= 0) {
      itm.count += amount
      if (itm.count === 0) {
        const itemIndex = this.cartItems.findIndex(item => item === itm)
        this.cartItems.splice(itemIndex, 1)
      }
    }

    this.onProductUpdate(itm)
  }

  isEmpty() {
    return this.getTotalPrice() === 0
  }

  getTotalCount() {
    let totalCount = 0
    for (let item of this.cartItems) {
      totalCount += item.count
    }

    return totalCount
  }

  getTotalPrice() {
    let totalPrice = 0
    for (let item of this.cartItems) {
      totalPrice += item.count * item.product.price
    }

    return totalPrice
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    let body = createElement(`<div></div>`)
    for (let item of this.cartItems) {
      body.append(this.renderProduct(item.product, item.count))
    }

    body.append(this.renderOrderForm())

    this.modal.setTitle('Your order')
    this.modal.setBody(body);
    this.modal.open();

    this.modal.elem.querySelector('button[type="submit"]').addEventListener('click', (event) => {
    })

    const formElem = Array(...document.forms).find(form => form.classList.contains('cart-form'))
    formElem.addEventListener('submit', (event) => {
      this.onSubmit(event)
    })

    this.modal.elem.addEventListener('click', (event) => {
      const button = event.target.closest('.cart-counter__button')
      if (!button) {
        return
      }

      let amount = 0;
      if (button.classList.contains('cart-counter__button_minus')) { amount = -1 }
      if (button.classList.contains('cart-counter__button_plus')) { amount = 1 }
      const productId = button.closest('.cart-product').dataset.productId

      this.updateProductCount(productId, amount)
    })
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this)

    if (document.body.classList.contains('is-modal-open')) {
      let productId = cartItem.product.id
      let modalBody = this.modal.elem
      let productCount = modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`)
      let productPrice = modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`)
      let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`)

      productCount.innerHTML = cartItem.count
      productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`
      infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`

      if (cartItem.count === 0) {
        modalBody.querySelector(`[data-product-id="${productId}"]`).remove()
      }
      if (this.isEmpty()) {
        this.modal.close()
      }
    }
  }

  onSubmit(event) {
    event.preventDefault()

    this.modal.elem.querySelector('button[type="submit"]').classList.add('is-loading')

    const formElem = Array(...document.forms).find(form => form.classList.contains('cart-form'))
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(formElem)
    })
      .then(() => {
        this.modal.setTitle('Success!')
        this.cartItems.splice(0, this.cartItems.length)
        this.modal.setBody(
          createElement(`
            <div class="modal__body-inner">
              <p>
                Order successful! Your order is being cooked :) <br>
                We’ll notify you about delivery time shortly.<br>
                <img src="/assets/images/delivery.gif">
              </p>
            </div>
          `)
        )
      })
      .catch(() => {})
  };

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

