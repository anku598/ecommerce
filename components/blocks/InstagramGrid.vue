<template>
  <transition v-on:after-enter="afterEnter">
    <div class="instagram-grid" v-if="results.length > 0">
      <div class="instagram-section d-flex flex-column align-items-center">
        <p>Celebrity Spotted</p>
        <h2>#IamLoveGen</h2>

        <div class="instagram-img">
          <div class="container-fluid p-0">
            <div class="row" ref="images">
              <div
                class="col-md-4 col-sm-6 col-xl-3 col-6 d-flex justify-content-center mobile-layout tile-img"
                v-for="(item, idx) of results"
                :key="'ins' + idx"
              >
                <div @click.prevent="getImageByIndex(idx)" class="insta_img">
                  <img
                    class="img-fluid social-img"
                    :src="$config.HOST + item.image.url"
                    alt
                  />
                </div>
              </div>

              <!-- <vue-easy-lightbox
                :visible="visible"
                :index="index"
                :imgs="imagesUrl"
                @hide="visible = false"
              /> -->
            </div>
          </div>

          <transition @enter="zoomEnterImage" :css="false" mode="out-in">
            <div
              class="single-zoom-img"
              ref="zoomImg"
              id="zoom-container"
              v-if="selectedImage"
            >
              <img
                ref="zImg"
                v-if="selectedImage"
                :src="$config.HOST + selectedImage"
                alt="Product-image"
                @click.stop="selectedImageIdx = null"
                rel="preload"
              />

              <div class="control">
                <div
                  @click="move(-1)"
                  :class="['prev', selectedImageIdx <= 0 ? 'disabled' : '']"
                ></div>
                <div
                  @click="move(1)"
                  :class="[
                    'next',
                    selectedImageIdx >= results.length - 1 ? 'disabled' : '',
                  ]"
                ></div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang='ts'>
import { Action, Component, Prop, Vue } from "nuxt-property-decorator";
import { TimelineMax, Expo, clearProps, TweenMax, Power4 } from "gsap/all";
import { FETCH_USER_IMAGE } from "~/utils/store/actions.names";
@Component({
  name: "InstagramGrid",
  components: {},
})
export default class InstagramGrid extends Vue {
  @Action(FETCH_USER_IMAGE) fetchUserImage: any;
  @Prop() compData: any;
  results: any = [];
  visible: boolean = false;
  index: number = 0; // default

  get HOST() {
    return process.env.HOST;
  }

  layoutReveal() {
    if (process.browser && window) {
      var socialImg = document.querySelectorAll(".insta_img");
      const ScrollMagic = (window as any).ScrollMagic;
      var timeline = new TimelineMax({});
      timeline.staggerFromTo(
        socialImg,
        2.5,
        { y: 150, opacity: 0 },
        { y: 0, opacity: 1, ease: Expo.easeOut, clearProps: "all" },
        0.1
      );
      var controller = new ScrollMagic.Controller();
      var scene: any = new ScrollMagic.Scene({
        triggerElement: ".instagram-section",
        reverse: false,
        triggerHook: "onCenter",
        offset: -300,
      })
        .setTween(timeline)
        .addTo(controller);
    }
  }

  afterEnter(el: any) {
    if (process.browser && window) {
      this.layoutReveal();
    }
  }

  selectedImageIdx: any = null;

  // root: any = document.documentElement;
  // body: any = document.body;

  getImageByIndex(idx: any) {
    this.selectedImageIdx = idx;
  }

  get selectedImage(): string | null {
    if (this.selectedImageIdx != null) {
      return this.results[this.selectedImageIdx].image.url;
    }
    return null;
  }
  animateHero(toHero: any) {
    if (process.browser && window) {
      var clone = (this.$refs.images as HTMLElement).querySelectorAll(
        ".tile-img"
      )[this.selectedImageIdx];
      // // console.log("from--------------");

      var from = this.calculatePosition(
        (this.$refs.images as HTMLElement).querySelectorAll(".tile-img img")[
          this.selectedImageIdx
        ]
      );

      TweenMax.set(toHero, {
        x: from.left,
        y: from.top,
        height: from.height,
        width: from.width,
      });
      TweenMax.to(toHero, 1, {
        x: 0,
        y: 0,
        height: "100%",
        width: "100%",
        ease: Power4.easeInOut,
      });

      // (this.body as any).appendChild(clone);

      // var style = {
      //   x: to.left - from.left,
      //   y: to.top - from.top,
      //   width: to.width,
      //   height: to.height,
      //   zIndex: 10,
      //   ease: Power4.easeInOut,
      //   onComplete: onComplete
      // };

      // TweenMax.set(clone, from);
      // TweenMax.to(clone, 0.7, style);

      function onComplete() {
        TweenMax.set(clone, { clearProps: "all" });
        TweenMax.set(toHero, { visibility: "visible" });

        // (body as any).removeChild(clone);
      }
    }
  }

  calculatePosition(element: any) {
    var rect = element.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      height: rect.height,
      width: rect.width,
    };

    // console.log(rect);
  }

  winX: number | null = null;
  winY: number | null = null;

  zoomEnterImage(element: any) {
    if (process.browser && window) {
      this.animateHero(element);
      // Mousemove animation
      var image: any = document.querySelector(".single-zoom-img img");
      // var bodyHeight = document.body.offsetHeight;
      var bodyHeight = window.innerHeight;
      image.addEventListener("mousemove", (e: any) => {
        e.preventDefault();
        var imgHeight = (this.$refs.zImg as any).clientHeight;
        var unit = Math.max(imgHeight - bodyHeight, 0) / 100;
        console.log(unit);

        // (document.documentElement as any).style.overflow = 'hidden';
        var valueY = -((e.clientY / bodyHeight) * 100 * unit);
        image.style.transform = `translateY(${valueY}px)`;
      });
    }
  }

  move(amount: any) {
    const newIndex = this.selectedImageIdx + amount;
    // console.log(newIndex);
    if (newIndex >= 0 && newIndex < this.results.length) {
      this.selectedImageIdx = newIndex;
    }
  }

  mounted() {
    this.fetchUserImage({ limit: 8, offset: 0 }).then((d: any) => {
      this.results = d.results.filter((item: any) => item.image != null);
    });
  }
}
</script>
<style scoped lang="scss">
.instagram-grid {
  background: #f6f6f6;
  padding: 100px 0;

  @include mediaSm {
    margin-top: 120px;
  }

  @include mediaXs {
    padding: 45px 0;
    margin-top: 96px;
  }
}

// .social-img {

// }
.instagram-section {
  width: 90%;
  margin: 0 auto;
  position: relative;

  @include mediaSm {
    width: 90%;
    margin: 0 auto;
  }
  h2,
  p {
    text-align: center;
  }
  h2 {
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 4rem;
    margin: 0;
    text-transform: uppercase;
    @include mediaSm {
      font-size: 2rem;
    }
    @include mediaXs {
      font-size: 2rem;
      margin-top: 14px;
      text-transform: uppercase;
    }
  }
  p {
    color: #000;
    text-transform: uppercase;
    letter-spacing: 10px;
    font-weight: 400;
    font-size: 16px;
    font-family: "Roboto", sans-serif;
  }
  .instagram-img {
    margin-top: 3rem;
    width: 100%;

    @include mediaXs {
      margin-top: 1.1rem;
    }
  }
}

.hop-btn {
  width: 192px;
  text-align: center;
}

.mobile-layout {
  @include mediaSm {
    padding: 0 !important;
  }
}

.insta_img {
  // min-height: 400px;
  position: relative;
  overflow: hidden;
  padding-bottom: 100%;
  width: 100%;
  margin-bottom: 30px;
  // cursor: url('../assets/img/zoom-icon.png'), default;

  @include mediaSm {
    margin: 7px;
  }

  img {
    position: absolute;
    height: 100% !important;
    object-fit: cover;
    object-position: top center;
    width: 100%;
  }
}

.disabled {
  opacity: 0.5;
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
}

::v-deep .vel-modal {
  background: rgba(0, 0, 0, 0.8) !important;
}

::v-deep .btn__close {
  display: none !important;
}

#zoom-container {
  overflow: hidden;
}

.custom-margin {
  margin-bottom: 30px;
  // padding: 0;
  // padding-right: 1rem;
  // padding-bottom: 1rem;
}

.zoom-img {
  visibility: hidden;
}

.single-zoom-img {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 20;
  overflow: hidden;

  img {
    width: 100%;
    position: absolute;
    top: 0;
    -webkit-transform: translateZ(0);
    -moz-transform: translateZ(0);
    -ms-transform: translateZ(0);
    -o-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;

    -webkit-perspective: 1000;
    -moz-perspective: 1000;
    -ms-perspective: 1000;
    perspective: 1000;
    transform-origin: 50% 50%;
    transition: transform 2s cubic-bezier(0.165, 0.84, 0.44, 1);
    cursor: url("../../assets/img/cursor-zoomout@2x.png"), default;
    // padding: 15px;
    object-fit: cover;

    @include mediaSm {
      height: 100%;
      object-fit: cover;
    }
  }
}

.control {
  // position: relative;
  // // left: 0;
  // // right: 0;
  // // width: 90%;
  // // margin: 0 auto;
  // display: inline-flex;
  // height: 100%;
  // justify-content: space-between;

  .next,
  .prev {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  //   .swiper-button-prev,
  // .swiper-button-next {
  //   opacity: 1;
  //   transition: all 0.3s ease-out;
  // }

  .prev {
    background-image: url("../../assets/img/chevron-right.svg") !important;
    width: 60px;
    height: 60px;
    background: #fff;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    left: 5%;
    background-size: 5px;
    transform: translateY(-50%) rotate(180deg);
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-6px, -1px, 0) rotate3d(0, 0, 1, 180deg) scale(0.7);
      opacity: 0;
      width: 12px;
      height: 1px;
      background: #000;
      transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
        opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      content: "";
    }

    &:hover {
      background-position: 60%;
      &:before {
        transform: translate3d(-6px, -1px, 0) rotate3d(0, 0, 1, 180deg) scale(1);
        opacity: 1;
      }
    }
  }

  .next {
    background-image: url("../../assets/img/chevron-right.svg") !important;
    width: 60px;
    height: 60px;
    transform: translateY(-50%);
    background: #fff;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    right: 5%;
    background-size: 5px;
    transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);

    &:before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-6px, -1px, 0) rotate3d(0, 0, 1, 180deg) scale(0.7);
      opacity: 0;
      width: 12px;
      height: 1px;
      background: #000;
      transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
        opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
      content: "";
    }

    &:hover {
      background-position: 60%;
      &:before {
        transform: translate3d(-6px, -1px, 0) rotate3d(0, 0, 1, 180deg) scale(1);
        opacity: 1;
      }
    }
  }
}

.control {
  -webkit-animation: 1s ease 0s normal forwards 1 Revealfadein;
  animation: 1s ease 0s normal forwards 1 Revealfadein;
}

@keyframes Revealfadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-webkit-keyframes Revealfadein {
  0% {
    opacity: 0;
  }
  66% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 2s;
}
.fade-enter-to {
  opacity: 0.5;
}
.fade-leave {
  opacity: 0.5;
}
.fade-leave-active {
  transition: opacity 2s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
