import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.#createElem()

    this.#initCarousel()
  }

  #createElem(){
    const carousel = createElement(`<div class="carousel"></div>`)
    const rightArrow = createElement(`
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
    `)
    const leftArrow = createElement(`
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
    `)

    const innerContainer = createElement(`<div class="carousel__inner"></div>`)

    this.slides.forEach(slide => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${Number(slide.price).toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `)
      const button = slideElement.querySelector('.carousel__button')
      button.addEventListener('click', () => {
        const event = new CustomEvent("product-add", {
          detail: button.closest('.carousel__slide').dataset.id,
          bubbles: true
        })

        button.dispatchEvent(event)
      })

      innerContainer.append(slideElement)
    })
    carousel.append(innerContainer)
    carousel.append(leftArrow)
    carousel.append(rightArrow)

    return carousel
  }

   #initCarousel() {
    const carousel = this.elem.querySelector('.carousel__inner')
    const leftArrow = this.elem.querySelector('.carousel__arrow_left')
    const rightArrow = this.elem.querySelector('.carousel__arrow_right')

    leftArrow.style.display = 'none'
  
    this.elem.querySelectorAll(`.carousel__arrow`).forEach((arrow) => {
      arrow.addEventListener('click', (event) => {
        const offset = this.elem.offsetWidth
        const min = 0
        const max = (-1 * (carousel.childElementCount - 1) * offset)

        let direction;
        let currentPosition = parseInt(carousel.style.transform.replace('translateX(','').replace('px)', '')) || 0
        if ((currentPosition <= min) && (currentPosition >= max)) {
          direction = event.currentTarget == rightArrow ? -1 : direction
          direction = event.currentTarget == leftArrow  ?  1 : direction
          moveCarousel()
          }
  
        rightArrow.style.display = currentPosition <= max ? 'none' : ''
        leftArrow.style.display  = currentPosition >= min ? 'none' : ''
  
        function moveCarousel() {
          currentPosition = currentPosition + (direction * offset)
          carousel.style.transform = `translateX(${currentPosition}px)`
        }
      })
    })
  }
}
