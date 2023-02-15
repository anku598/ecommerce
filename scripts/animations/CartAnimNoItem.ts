import { TimelineMax, Power4, Expo } from 'gsap/all'

const ShoppingCartEmpty = (element: any) => {
  const CartDetails = element.querySelector('.cart-details')
  const Header = element.querySelector('header')
  const listBody = element.querySelector('.list-body')
  const tl = new TimelineMax({ paused: true })
  tl.addLabel('start')
    .set(element, { opacity: 0 })
    .set(CartDetails, { width: 0, visibility: 'hidden' })
    .set(Header, { opacity: 0, visibility: 'hidden', y: -20 })
    .set(listBody, { opacity: 0, visibility: 'hidden', xPercent: 10 })
    .to(element, 0.4, { opacity: 1 }, 'start')
    .to(
      CartDetails,
      0.4,
      {
        width: 600,
        visibility: 'visible',
        ease: Power4.easeOut,
        transformOrigin: '0% 100%'
      },
      'start'
    )
    .to(
      Header,
      0.5,
      { opacity: 1, ease: Expo.easeOut, visibility: 'visible', y: 0 },
      'start+=0.3'
    )
    .to(
      listBody,
      0.5,
      { opacity: 1, ease: Expo.easeOut, visibility: 'visible', xPercent: 0 },
      'start+=0.2'
    )

  return tl
}

export default ShoppingCartEmpty
