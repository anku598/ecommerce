import { TweenMax, Power3, TimelineMax } from 'gsap/all'

const routesIn = new Map()

const slide = (element: any) => TweenMax.to(
  element, 0.6, {
    y: 0,
    autoAlpha: 1,
    ease: Power3.easeOut
  }
)
routesIn.set('slide', slide)

const slideNoAlpha = (element: any) => TweenMax.to(
  element, 0.6, {
    yPercent: 0,
    ease: Power3.easeOut
  }
)
routesIn.set('slide-no-alpha', slideNoAlpha)

const fade = (element: any) => TweenMax.to(
  element, 0.6, {
    autoAlpha: 1,
    ease: Power3.easeOut
  }
)
routesIn.set('fade', fade)

const railLeft = (element: any) => TweenMax.to(
  element, 0.6, {
    y: 0,
    autoAlpha: 1,
    ease: Power3.easeOut
  }
)
routesIn.set('rail-left', railLeft)

const railRight = (element: any) => TweenMax.to(
  element, 0.6, {
    y: 0,
    autoAlpha: 1,
    ease: Power3.easeOut
  }
)
routesIn.set('rail-right', railRight)

const staggerText = (element: any) => TweenMax.staggerTo(
  Array.from(element.querySelectorAll('.stagger-element')), 1, {
    y: 0,
    autoAlpha: 1,
    ease: Power3.easeOut
  }, 0.02
)
routesIn.set('stagger-text', staggerText)

// const sliderBackground = (element:any) => {
//   const sliderFooter = element.querySelector('.slider__footer');
//   const current = element.querySelector('.slide--current');
//   const next = element.querySelector('.slide--next');

//   const tl = new TimelineMax();
//   tl.addLabel('start')
//     .to([current, next, sliderFooter], 0.6, {
//       y: 0,
//       autoAlpha: 1,
//       ease: Power3.easeOut,
//     });
//   return tl;
// };
// routesIn.set('slider-background', sliderBackground);

export default routesIn
