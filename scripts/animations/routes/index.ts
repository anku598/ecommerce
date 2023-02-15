import { TimelineMax, Power3 } from 'gsap/all'
import routeInitials from './initial'
import routesIn from './In'
import routesOut from './out'

const sortElements = (elements: any, reverse = false) => {
  elements.sort((a: any, b: any) => {
    const aOrder = a.dataset.inOutOrder || 999
    const bOrder = b.dataset.inOutOrder || 999
    return reverse ? bOrder - aOrder : aOrder - bOrder
  })
}

export const EnterRoute = (element: any) => {
  const view = element
  const inElementsView = Array.from(view.querySelectorAll('[data-in-out]'))
  const sliderBackground = document.querySelector('.slider-background__white')
  const inElements = [...inElementsView]

  const tl = new TimelineMax({ paused: true, delay: 0.8 })
  tl.addLabel('start')
  inElements.forEach((inElement: any) => {
    routeInitials.get(inElement.dataset.inOutAnimation)(inElement)
  })

  inElements.forEach((inElement: any, index: any) => {
    const delay = parseFloat(inElement.dataset.inDelay)

    tl.add(routesIn.get(inElement.dataset.inOutAnimation)(inElement), `start+=${(0.02 * index) + delay}`)
  })
  return tl
}

export const LeaveRoute = (element: any) => {
  const view = element
  const outElementsView = Array.from(view.querySelectorAll('[data-in-out]'))
  const outElements = [...outElementsView]
  // sortElements(outElements, true);
  // console.log(view);

  const tl = new TimelineMax({ paused: true })
  tl.addLabel('start')
  tl.set(view, { zIndex: 3 })
  outElements.forEach((outElement: any, index: any) => {
    const delay = parseFloat(outElement.dataset.outDelay) || 0
    // console.log(outElement.dataset)
    tl.add(routesOut.get(outElement.dataset.inOutAnimation)(outElement), `start+=${(0.02 * index) + delay}`)
  })
  return tl
}
