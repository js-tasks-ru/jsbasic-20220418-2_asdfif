function initCarousel() {
  const carousel = document.querySelector('.carousel__inner')
  const leftArrow = document.querySelector('.carousel__arrow_left')
  const rightArrow = document.querySelector('.carousel__arrow_right')
  const offset = carousel.offsetWidth
  const min = 0
  const max = (-1 * (carousel.childElementCount - 1) * offset)

  leftArrow.style.display = 'none'

  document.querySelectorAll(`.carousel__arrow`).forEach((arrow) => {
    arrow.addEventListener('click', (event) => {
      let direction;
      let currentPosition = parseInt(carousel.style.transform.replace('translateX(','').replace('px)', '')) || 0

      if ((currentPosition <= min) && (currentPosition >= max)) {
        direction = event.currentTarget == rightArrow ? -1 : direction
        direction = event.currentTarget == leftArrow  ?  1 : direction
        moveCarousel()
       }

      rightArrow.style.display = currentPosition <= max ? 'none' : ''
      leftArrow.style.display = currentPosition >= min ? 'none' : ''

      function moveCarousel() {
        currentPosition = currentPosition + (direction * offset)
        carousel.style.transform = `translateX(${currentPosition}px)`
      }
    })
  })
}
