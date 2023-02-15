const DuelSlider = () => {
  const carouselSlideLeft: any = document.querySelector('.left-img .slide-item')
  const carouselSlideRight: any = document.querySelector('.right-img .slide-item')
  const SlideImagesLeft: any = document.querySelectorAll('.left-img .slide-item ')
  const SlideImagesRight: any = document.querySelectorAll('.right-img .slide-item')
  const prevBtn: any = document.querySelector('.prev-btn')
  const nextBtn: any = document.querySelector('.next-btn')

  nextBtn.addEventListener('click', function () {
    for (var i = 0; i <= SlideImagesLeft.length; i++) {
      if (SlideImagesLeft[i] == carouselSlideLeft) {
        var previous = SlideImagesLeft[i - 1]
        var next = SlideImagesLeft[i + 1]
        SlideImagesLeft[i].style.transform = 'translateY(-100% ) translateZ(0)'
        next.style.transform = 'translateY(-100% ) translateZ(0)'
      }
    }

    for (var i = 0; i < SlideImagesRight.length; i++) {
      if (SlideImagesRight[i] == carouselSlideRight) {
        var previous = SlideImagesRight[i - 1]
        var next = SlideImagesRight[i + 1]

        SlideImagesRight[i].style.transform = 'translateY(100% ) translateZ(0)'
        next.style.transform = 'translateY(100% ) translateZ(0)'
      }
    }
  })

  prevBtn.addEventListener('click', function () {
    for (var i = 0; i < SlideImagesLeft.length; i++) {
      if (SlideImagesLeft[i - 1]) {
        var previous = SlideImagesLeft[i - 1]
        var next = SlideImagesLeft[i + 1]
        SlideImagesLeft[i].style.transform = 'translateY(0% )  translateZ(0)'
        previous.style.transform = 'translateY(0% ) translateZ(0)'
      }
    }

    for (var i = 0; i < SlideImagesRight.length; i++) {
      if (SlideImagesRight[i - 1]) {
        var previous = SlideImagesRight[i - 1]
        var next = SlideImagesRight[i + 1]
        SlideImagesRight[i].style.transform = 'translateY(0% ) translateZ(0)'
        previous.style.transform = 'translateY(0% ) translateZ(0)'
      }
    }
  })
}

// const DuelSlider = () => {
//   // const carouselSlideLeft: any = document.querySelector('.left-img .slide-item');
//   // const carouselSlideRight: any = document.querySelector('.right-img .slide-item');
//   // const SlideImagesLeft: any = document.querySelectorAll('.left-img .slide-item ');
//   // const SlideImagesRight: any = document.querySelectorAll('.right-img .slide-item');
//   const slides = document.querySelectorAll('.left-img .slide-item');
//   const prevBtn: any = document.querySelector('.prev-btn')
//   const nextBtn: any = document.querySelector('.next-btn')

//   const nextSlide = () => {
//     const current: any = document.querySelector('.current');
//     current.classList.remove("current");
//     if (current.nextElementSibling) {
//       current.nextElementSibling.classList.add("current")
//     } else {
//       slides[0].classList.add('current');
//     }

//     setTimeout(() => current.classList.remove("current"));
//   }

//   nextBtn.addEventListener("click", (e: any) => {
//     nextSlide();
//   })

// }

export default DuelSlider
