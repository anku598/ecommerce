import { TweenMax, TimelineMax, Power4, Expo } from 'gsap/all'

const ZoomImage = () => {
  const root = document.documentElement
  const body = document.body
  const zoomImgs = document.querySelectorAll('.single-zoom-img')
  const tiles = document.querySelectorAll('.tile-img')

  // for (var i = 0; i < tiles.length; i++) {
  //   addListeners(tiles[i], zoomImgs[i]);
  // }

  // function addListeners(tile: any, zoomImg: any) {
  //   tile.addEventListener('click', function () {
  //     animateHero(tile, zoomImg);
  //   });

  //   zoomImg.addEventListener('click', function () {
  //     animateHero(zoomImg, tile);
  //   });
  // }

  function animateHero (fromHero: any, toHero: any) {
    const clone = fromHero.cloneNode(true)
    const from = calculatePosition(fromHero)
    const to = calculatePosition(toHero)

    TweenMax.set([fromHero, toHero], { visibility: 'hidden' })
    TweenMax.set(clone, { position: 'absolute', margin: 0 })

    body.appendChild(clone)

    const style = {
      x: to.left - from.left,
      y: to.top - from.top,
      width: to.width,
      height: to.height,
      autoRound: false,
      ease: Power4.easeInOut,
      onComplete
    }

    TweenMax.set(clone, from)
    TweenMax.to(clone, 0.7, style)

    function onComplete () {
      TweenMax.set(toHero, { visibility: 'visible' })
      body.removeChild(clone)
    }
  }

  function calculatePosition (element: any) {
    const rect = element.getBoundingClientRect()
    const scrollTop =
      window.pageYOffset || root.scrollTop || body.scrollTop || 0
    const scrollLeft =
      window.pageXOffset || root.scrollLeft || body.scrollLeft || 0

    const clientTop = root.clientTop || body.clientTop || 0
    const clientLeft = root.clientLeft || body.clientLeft || 0

    return {
      top: Math.round(rect.top + scrollTop - clientTop),
      left: Math.round(rect.left + scrollLeft - clientLeft),
      height: rect.height,
      width: rect.width
    }
  }
}

export default ZoomImage
