import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.elem = createElement(`
      <div class="products-grid"></div>
    `)
    this.#render(this.products)
  }

  #render(products) {
    const inner = createElement(`<div class="products-grid__inner"></div>`)
    for (let product of products) {
      const card = new ProductCard(product)
      let {name, price, image, id, ...data} = product
      for (let key in data) {
        card.elem.setAttribute(`data-${key}`, data[key])
      }
      inner.append(card.elem)
    }
    this.elem.append(inner)
  }

  updateFilter(filters) {
    for (let key in filters) {
      if (filters[key] !== '' && filters[key] !== 0) {
        this.filters[key] = filters[key]
      } else {
        delete this.filters[key]
      }
    }
    let products = []
    for (let product of this.products) {
      if (
        (!this.filters.maxSpiciness || this.filters.maxSpiciness >= product.spiciness) &&
        (this.filters.category === undefined || this.filters.category === product.category) &&
        (!this.filters.vegeterianOnly || this.filters.vegeterianOnly === product.vegeterian) &&
        (!this.filters.noNuts || !product.nuts)
      ) {
        products.push(product)
      }
    }
    this.elem.querySelector('.products-grid__inner').remove()
    this.#render(products)
  }
}
