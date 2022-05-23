import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  #elem = null

  constructor({ steps, value = 0 }) {
    this.steps = steps

    this.#render()
    this.#setStep(value)
    this.#addEventsListeners()
  }

  #render() {
    this.#elem = createElement(`
      <div class="slider">
        <div class="slider__thumb">
          <span class="slider__value"></span>
        </div>

        <div class="slider__progress"></div>

        <div class="slider__steps">
        </div>
      </div>
    `)

    for (let i = 0; i < this.steps; i++) {
      this.#elem.querySelector('.slider__steps').append(createElement('<span></span>'))
    }
  }

  #setStep(value) {
    const thumb = this.elem.querySelector('.slider__thumb')
    let childs = this.elem.querySelector('.slider__steps').children
    let process = value * 100 / (this.steps - 1)

    Array.from(childs).forEach(child => { child.classList.remove('slider__step-active') })
    this.value = value
    childs[value].classList.add('slider__step-active')
    this.elem.querySelector('.slider__value').textContent = value
    thumb.style.left = `${value * 100 / (this.steps - 1)}%`
    this.elem.querySelector('.slider__progress').style.width = `${process}%`
  }

  #addEventsListeners(){
    this.elem.addEventListener('click', ({ clientX }) => {
      const { x, width } = this.elem.getBoundingClientRect()
      const value = Math.round((this.steps - 1) * (clientX - x) / width)
      if (value != this.value) {
        this.#setStep(value)
        this.elem.dispatchEvent(new CustomEvent('slider-change', {
          detail: this.value,
          bubbles: true
        }))
      }
    })
  }

  get elem() {
    return this.#elem
  }
}
