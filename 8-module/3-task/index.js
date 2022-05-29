export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
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
    }

    this.cartIcon.update(this)
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

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

