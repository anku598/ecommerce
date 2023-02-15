<template>
  <div>
    <div class="product-img-list">
      <div>
        <ul ref="images" v-if="compData.default.length > 1">
          <li
            class="tile-img"
            v-for="(img, idx) in compData.default"
            :key="`img${idx}`"
          >
            <picture>
              <source
                :srcset="compData.mobile[idx].url"
                media="(max-width: 576px)"
              />
              <img
                :src="img.url"
                @click="getImageByIndex(idx)"
                alt="Product-image"
              />
            </picture>
          </li>
        </ul>

        <div
          ref="images"
          class="when-one-image"
          v-if="compData.default.length == 1"
        >
          <div
            class="tile-img"
            v-for="(img, idx) in compData.default"
            :key="`img${idx}`"
          >
            <picture>
              <source
                :srcset="compData.mobile[idx].url"
                media="(max-width: 576px)"
              />
              <img
                :src="img.url"
                @click="getImageByIndex(idx)"
                alt="Product-image"
              />
            </picture>
          </div>
        </div>

        <transition @enter="zoomEnterImage" :css="false" mode="out-in">
          <div
            class="single-zoom-img"
            ref="zoomImg"
            id="zoom-container"
            v-if="selectedImage"
          >
            <transition name="fade" mode="out-in">
              <picture>
                <source
                  :srcset="selectedImage.mobile"
                  media="(max-width: 576px)"
                />
                <source
                  :srcset="selectedImage.original"
                  media="(min-width: 1921px)"
                />
                <img
                  ref="zImg"
                  v-if="selectedImage"
                  :src="selectedImage.optimal"
                  alt="Product-image"
                  width="1920"
                  height="1080"
                  @click.stop="selectedImageIdx = null"
                  rel="preload"
                />
              </picture>
            </transition>
            <div class="control">
              <div
                @click="move(-1)"
                :class="['prev', selectedImageIdx <= 0 ? 'disabled' : '']"
              ></div>
              <div
                @click="move(1)"
                :class="[
                  'next',
                  selectedImageIdx >= compData.default.length - 1
                    ? 'disabled'
                    : '',
                ]"
              ></div>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  TimelineMax,
  CSSPlugin,
  ScrollToPlugin,
  Draggable,
  Power4,
  Power2,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
  fromTo,
} from "gsap/all";
@Component({
  name: "ProductImageList",
  components: {},
})
export default class ProductImageList extends Vue {
  @Prop() compData!: any;
  selectedImageIdx: any = null;

  // root: any = document.documentElement;
  // body: any = document.body;

  getImageByIndex(image: any) {
    this.selectedImageIdx = image;
  }

  get selectedImage(): any | null {
    if (this.selectedImageIdx != null) {
      return {
        original: this.compData.original[this.selectedImageIdx].url,
        mobile: this.compData.mobileZoom[this.selectedImageIdx].url,
        optimal: this.compData.optimal[this.selectedImageIdx].url,
      };
    }
    return null;
  }
  animateHero(toHero: any) {
    var clone = (this.$refs.images as HTMLElement).querySelectorAll(
      ".tile-img"
    )[this.selectedImageIdx];

    var from = this.calculatePosition(
      (this.$refs.images as HTMLElement).querySelectorAll(".tile-img")[
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

    function onComplete() {
      TweenMax.set(clone, { clearProps: "all" });
      TweenMax.set(toHero, { visibility: "visible" });

      // (body as any).removeChild(clone);
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
  }

  zoomEnterImage(element: any) {
    this.animateHero(element);
    // Mousemove animation
    var image: any = document.querySelector(".single-zoom-img img");
    // var bodyHeight = document.body.offsetHeight;
    var bodyHeight = window.innerHeight;
    // console.log(bodyHeight);

    image.addEventListener("mousemove", (e: any) => {
      if (process.browser && window) {
        e.preventDefault();

        var imgHeight = (this.$refs.zImg as any).clientHeight;
        var unit = Math.max(imgHeight - bodyHeight, 0) / 100;

        console.log(imgHeight, bodyHeight);

        // (document.documentElement as any).style.overflow = 'hidden';
        var valueY = -((e.clientY / bodyHeight) * 100 * unit);
        image.style.transform = `translateY(${valueY}px)`;
      }
    });
  }

  move(amount: any) {
    const newIndex = this.selectedImageIdx + amount;
    // console.log(newIndex);
    if (newIndex >= 0 && newIndex < this.compData.default.length) {
      this.selectedImageIdx = newIndex;
    }
  }
}
</script>
<style scoped lang="scss">
.product-img-list {
  // margin-bottom: $section-margin;
  // margin-top: 90px;
  height: 100%;
  margin-left: -0.5rem;
  margin-right: -0.5rem;
  cursor: url("../../assets/img/zoom-icon.png"), default;
  @include mediaXs {
    margin-top: 0px;
  }
  img {
    width: 100%;
  }
}

// .when-one-image {
//   width: 50%;
//   margin: 0 auto;
// }

.zoom-img {
  overflow: hidden;
  img {
    height: auto;
    width: 100%;
  }
}

.disabled {
  opacity: 0.5;
  transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
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
    padding: 0.5rem;

    @include mediaSm {
      height: 100%;
      object-fit: cover;
    }
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  margin-right: 20px;
  @include mediaSm {
    justify-content: center;
    margin-right: 0;
  }

  li {
    flex-basis: 50%;
    // padding: 0.5rem;

    img {
      padding: 0.5rem;
      // @include mediaXs {
      //   padding: 0.3rem !important;
      // }
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
