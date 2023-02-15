import { TweenMax, Power3, TimelineMax } from 'gsap/all'

const routesOut = new Map()

const slide = (element: any) => TweenMax.to(
  element, 0.6, {
    y: 100,
    autoAlpha: 0,
    ease: Power3.easeIn
  }
)
routesOut.set('slide', slide)

const slideNoAlpha = (element: any) => TweenMax.to(
  element, 0.6, {
    yPercent: 100,
    ease: Power3.easeIn
  }
)
routesOut.set('slide-no-alpha', slideNoAlpha)

const fade = (element: any) => TweenMax.to(
  element, 0, {
    autoAlpha: 0,
    ease: Power3.easeIn
  }
)
routesOut.set('fade', fade)

const railLeft = (element: any) => TweenMax.to(
  element, 0.6, {
    y: '-=100',
    autoAlpha: 0,
    ease: Power3.easeIn
  }
)
routesOut.set('rail-left', railLeft)

const railRight = (element: any) => TweenMax.to(
  element, 0.6, {
    y: '+=100',
    autoAlpha: 0,
    ease: Power3.easeIn
  }
)
routesOut.set('rail-right', railRight)

const staggerText = (element: any) => TweenMax.staggerTo(
  Array.from(element.querySelectorAll('.stagger-element')), 0.6, {
    y: 100,
    autoAlpha: 0,
    ease: Power3.easeIn
  }
)
routesOut.set('stagger-text', staggerText)

// const sliderBackground = (element:any) => {
//   const sliderFooter = element.querySelector('.slider__footer');
//   const slider = Array.from(element.querySelectorAll('.slide'));

//   const tl = new TimelineMax();
//   tl.addLabel('start')
//     .to([...slider, sliderFooter], 0.6, {
//       y: 20,
//       autoAlpha: 0,
//       ease: Power3.easeIn,
//     });
//   return tl;
// };
// routesOut.set('slider-background', sliderBackground);

export default routesOut
