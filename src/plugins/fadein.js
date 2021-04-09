function checkSlide () {
  const fadeinDivs = document.querySelectorAll('.fadein')
  fadeinDivs.forEach(fadeinDiv => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - fadeinDiv.offsetHeight / 1.4
    // bottom of the image
    const imageBottom = fadeinDiv.offsetTop + fadeinDiv.offsetParent.offsetTop + fadeinDiv.offsetHeight / 2
    const isHalfShown = slideInAt > (fadeinDiv.offsetParent.offsetTop)
    const isNotScrolledPast = window.scrollY < imageBottom
    if (isHalfShown && isNotScrolledPast) {
      fadeinDiv.classList.add('active')
    }
    if (slideInAt < (fadeinDiv.offsetTop + fadeinDiv.offsetParent.offsetTop)) {
      fadeinDiv.classList.remove('active')
    }
  })

  const fadeinDivs2 = document.querySelectorAll('.fadein2')
  fadeinDivs2.forEach(fadeinDiv => {
    // half way through the image
    const slideInAt2 = (window.scrollY + window.innerHeight) - fadeinDiv.offsetHeight / 1.4
    // bottom of the image
    const imageBottom2 = fadeinDiv.offsetTop + fadeinDiv.offsetParent.offsetTop + fadeinDiv.offsetParent.offsetParent.offsetTop + fadeinDiv.offsetHeight / 3
    const isHalfShown2 = slideInAt2 > (fadeinDiv.offsetParent.offsetTop)
    const isNotScrolledPast2 = window.scrollY < imageBottom2
    if (isHalfShown2 && isNotScrolledPast2) {
      fadeinDiv.classList.add('active')
    }
    if (slideInAt2 < (fadeinDiv.offsetTop + fadeinDiv.offsetParent.offsetTop)) {
      fadeinDiv.classList.remove('active')
    }
  })
}
window.addEventListener('scroll', checkSlide)
