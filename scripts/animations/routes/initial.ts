import { TweenMax, TimelineMax } from 'gsap/all'

const routeInitials = new Map()

const slide = (element: any) => TweenMax.set(
  element, {
    y: 100,
    autoAlpha: 0
  }
)

routeInitials.set('slide', slide)

const slideNoAlpha = (element: any) => {
  TweenMax.set(element, {
    yPercent: 100
  })
}

routeInitials.set('slide-no-alpha', slideNoAlpha)

routeInitials.set('slide-no-alpha', slideNoAlpha)

const fade = (element: any) => TweenMax.set(
  element, {
    autoAlpha: 0
  }
)
routeInitials.set('fade', fade)

const railLef = (element: any) => TweenMax.set(
  element, {
    y: 100,
    autoAlpha: 0
  }
)
routeInitials.set('rail-left', railLef)

const railRight = (element: any) => TweenMax.set(
  element, {
    y: -100,
    autoAlpha: 0
  }
)
routeInitials.set('rail-right', railRight)

const staggerText = (element: any) => TweenMax.set(
  Array.from(element.querySelectorAll('.stagger-element')), {
    y: 200,
    autoAlpha: 0
  }
)
routeInitials.set('stagger-text', staggerText)

// const sliderBackground = (element:any) => {
//   const sliderFooter = element.querySelector('.slider__footer');
//   const current = element.querySelector('.slide--current');
//   const prev = element.querySelector('.slide--prev');
//   const next = element.querySelector('.slide--next');
//   const empty = element.querySelector('.slide--empty');
//   const nextText = element.querySelector('.slide--next p');

//   const tl = new TimelineMax();
//   tl.addLabel('start')
//     .set(sliderFooter, { y: 20, autoAlpha: 0 })
//     .set(current, { xPercent: 0, y: 20, autoAlpha: 0 })
//     .set(prev, { xPercent: -30, y: 0, autoAlpha: 0 })
//     .set(next, { xPercent: 66, y: 20, autoAlpha: 0 })
//     .set(empty, { xPercent: 170, y: 0, autoAlpha: 0 })
//     .set(nextText, { autoAlpha: 0 });
//   return tl;
// };
// routeInitials.set('slider-background', sliderBackground);

export default routeInitials
