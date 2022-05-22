import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  #elem = null;

  constructor(categories) {
    this.categories = categories;
    this.#render();
    this.#addEventListeners();
  }

  get elem() {
    return this.#elem;
  }

  get innerRibbon() {
    return this.#elem.querySelector('.ribbon__inner')
  }

  get width() {
    return this.innerRibbon.scrollWidth - this.innerRibbon.offsetWidth
  }

  get leftArrow() {
    return this.elem.querySelector('.ribbon__arrow_left')
  }

  get rightArrow() {
    return this.elem.querySelector('.ribbon__arrow_right')
  }

  #render() {
    const ribbon = createElement(`<div class="ribbon"></div>`)
    const leftArrowElem = createElement(`
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
    const inner = createElement(`
      <nav class="ribbon__inner"></div>
    `)
    const rightArrowElem = createElement(`
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
    const linkElements = this.categories.map(({ id, name }) => {
      return createElement(`
        <a href="#" class="ribbon__item" data-id="${id}">${name}</a>
      `)
    })
    inner.append(...linkElements);
    ribbon.append(leftArrowElem, inner, rightArrowElem)
    this.#elem = ribbon
  }

  #addEventListeners() {
    this.#addOnArrowClick()
    this.#addOnScrollMenu()
    this.#addOnMenuSelect()
  }

  #addOnScrollMenu() {
    this.innerRibbon.addEventListener("scroll", () => {
      const scrolled = this.innerRibbon.scrollLeft;

      if (scrolled > 0 && scrolled < this.width) {
        this.rightArrow.classList.add('ribbon__arrow_visible')
        this.leftArrow.classList.add('ribbon__arrow_visible')
      }

      if (scrolled === this.width) {
        this.rightArrow.classList.remove('ribbon__arrow_visible')
        this.leftArrow.classList.add('ribbon__arrow_visible')
      }

      if (scrolled === 0) {
        this.leftArrow.classList.remove('ribbon__arrow_visible')
        this.rightArrow.classList.add('ribbon__arrow_visible')
      }
    })
  }

  #addOnArrowClick() {
    this.elem.addEventListener('click', ({ target }) => {
      if (target.closest('.ribbon__arrow')) {
        if (target.closest('.ribbon__arrow_left')) {
          this.innerRibbon.scrollBy(-350, 0);
        }
        if (target.closest('.ribbon__arrow_right')) {
          this.innerRibbon.scrollBy(350, 0);
        }
      }
    })
  }

  #addOnMenuSelect() {
    this.elem.querySelector('.ribbon__inner').addEventListener('click', (event) => {
      if (event.target.nodeName === 'A') {
        event.preventDefault()
        this.elem.querySelectorAll('.ribbon__item').forEach(item => { item.classList.remove('ribbon__item_active') })
        event.target.classList.add('ribbon__item_active')

        this.#elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.dataset.id,
          bubbles: true
        }))
      }
    })
  }
}
