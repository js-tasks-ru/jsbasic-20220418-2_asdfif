import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.cartIcon = new CartIcon()
    document.body.querySelector('[data-cart-icon-holder]').append(this.cartIcon.elem)

    this.carousel = new Carousel(slides);
    document.body.querySelector('[data-carousel-holder]').append(this.carousel.elem)

    this.ribbonMenu = new RibbonMenu(categories);
    document.body.querySelector('[data-ribbon-holder]').append(this.ribbonMenu.elem)

    this.stepSlider = new StepSlider({
      steps: 5
    })
    document.body.querySelector('[data-slider-holder]').append(this.stepSlider.elem)

    this.products = await fetch('products.json')
      .then((response) => { return response.json() })
      .catch(() => { return [] })

    this.productsGrid = await new ProductsGrid(this.products)
    document.body.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem)

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    })

    this.cart = await new Cart(this.cartIcon);

    document.body.addEventListener('product-add', function(event) {
      const product = this.products.find(product => { return product.id === event.detail })
      this.cart.addProduct(product)
    }.bind(this))

    this.stepSlider.elem.addEventListener('slider-change', function(event) {
      this.productsGrid.updateFilter({ maxSpiciness: event.detail })
    }.bind(this))

    this.ribbonMenu.elem.addEventListener('ribbon-select', function(event) {
      console.log(event)
      this.productsGrid.updateFilter({ category: event.detail })
    }.bind(this))

    document.body.querySelector('.filters').addEventListener('change', function(event) {
      if (event.target.id === 'nuts-checkbox') {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked
        })
      }

      if (event.target.id === 'vegeterian-checkbox') {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked
        })
      }
    }.bind(this))
  }
}
