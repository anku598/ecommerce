import { TimelineMax, Power4, Expo } from 'gsap/all'

const MenuDropDown = () => {
  const dropDownSection = document.querySelector('.dropdown-bg')
  // const app = document.querySelector("#app");
  const subMenuItem = document.querySelector('.dropdown-content')
  const tl = new TimelineMax({ paused: true })

  tl.addLabel('start')
    .set(dropDownSection, { height: 'auto' })
    .set(subMenuItem, { opacity: 0, y: 50 })
    // .set(app, { backgroundColor: 'red', zIndex: 10 })
    // .to(app, 0.5, { backgroundColor: 'rgba(0,0,0,0.7)', ease: Power4.easeOut }, 'start')
    .from(dropDownSection, 1, { height: 0, ease: Power4.easeOut }, 'start+=0.001')
    .to(subMenuItem, 0.7, { opacity: 1, y: 0, ease: Power4.easeInOut }, 'start+=0.4')
  return tl
}

export default MenuDropDown
