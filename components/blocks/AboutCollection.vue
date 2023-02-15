<template>
  <div class="about-collection">
    <div style="overflow: hidden" v-if="compData.style == 'normal'">
      <span class="about-collection-watermark">{{ compData.watermark }}</span>
    </div>
    <div class="left-img-section" v-if="compData.style == 'normal'">
      <div class="l-img">
        <picture>
          <img
            :src="$config.HOST + compData.image.original.src"
            alt="About left image"
          />
        </picture>
        <div class="white-overlay"></div>
      </div>

      <div class="content" v-if="compData.title || compData.text">
        <div class="text">
          <h2 v-if="compData.title">{{ compData.title }}</h2>
          <p v-if="compData.text">{{ compData.text }}</p>
        </div>
      </div>
    </div>

    <div class="blue-img-section" v-if="compData.style == 'blue'">
      <div class="r-content" v-if="compData.title || compData.text">
        <div class="overlap-bg-section">
          <div class="text">
            <h2 v-if="compData.title">{{ compData.title }}</h2>
            <p v-if="compData.text">{{ compData.text }}</p>
          </div>
        </div>
      </div>

      <div class="r-img">
        <picture>
          <img
            :src="$config.HOST + compData.image.original.src"
            alt="About left image"
          />
        </picture>
        <div class="white-overlay"></div>
      </div>
    </div>

    <!-- <div class="right-img-section" v-else>
      <div class="r-img">
        <picture>
          <img :src="$config.HOST + compData.image.original.src" alt="About right image" />
        </picture>
      </div>
    </div>-->
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  TimelineMax,
  Power4,
  Expo,
  Elastic,
  Bounce,
  onComplete,
  clearProps,
  TweenMax,
} from "gsap/all";
@Component({
  name: "AboutCollection",
  components: {},
})
export default class AboutCollection extends Vue {
  @Prop() compData: any;
  get HOST() {
    return process.env.HOST;
  }

  autoScroll() {
    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const autoScrollTimeline = new TimelineMax({});
      autoScrollTimeline.to(".about-collection-watermark", 10, {
        x: "-=1000",
        yoyo: true,
        repeat: -1,
      });

      const autoScrollController = new ScrollMagic.Controller();
      const autoScrollScene: any = new ScrollMagic.Scene({
        triggerElement: ".about-collection-watermark",
        reverse: true,
        offset: -200,
      })
        .setTween(autoScrollTimeline)
        .addTo(autoScrollController);
    }
  }

  AboutCollectionReveal() {
    const isMobile = window.innerWidth <= 991;
    let aboutCollection = document.querySelectorAll(".about-collection");
    aboutCollection.forEach((elem) => {
      const revealTl = new TimelineMax({});

      revealTl
        .addLabel("start")
        .fromTo(
          elem,
          1.5,
          { y: 200, opacity: 0 },
          { y: 0, ease: Power4.easeOut, opacity: 1, clearProps: "all" },
          "start"
        );

      if (process.browser && window) {
        const ScrollMagic = (window as any).ScrollMagic;
        const controller = new ScrollMagic.Controller();
        if (isMobile) {
          const scene: any = new ScrollMagic.Scene({
            triggerElement: elem,
            reverse: false,
            triggerHook: "onEnter",
            offset: -300,
          })
            .setTween(revealTl)
            .addTo(controller);
        } else {
          const scene: any = new ScrollMagic.Scene({
            triggerElement: elem,
            offset: 300,
            reverse: false,
            triggerHook: "onEnter",
          })
            .setTween(revealTl)
            .addTo(controller);
        }
      }
    });
  }

  public mounted() {
    if (process.browser && window) {
      this.AboutCollectionReveal();
      this.autoScroll();
    }
  }
}
</script>
<style scoped lang="scss">
.watermark {
  @include watermark;
}
.about-collection {
  position: relative;
  margin-bottom: $section-margin;
  @include mediaXs {
    margin-bottom: $section-margin - 40px;
  }
  .left-img-section {
    display: flex;
    // flex-wrap: wrap;
    // justify-content: flex-end;
    @include mediaXs {
      flex-direction: column;
      width: 90%;
      margin: 0 auto;
    }
    .l-img {
      flex-basis: 45%;
      height: auto;
      position: relative;
      overflow: hidden;
      padding-top: 50%;

      @include mediaXs {
        padding-top: 150%;
        order: 2;
      }

      // .white-overlay {
      //   position: absolute;
      //   top: 0;
      //   left: 0;
      //   width: 100%;
      //   height: 100%;
      //   background: #f4f4f4;
      // }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        position: absolute;
        top: 0;
      }
    }

    .content {
      flex-basis: 55%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      text-align: left;
      @include mediaXs {
        text-align: center;
        margin-bottom: 15px;
      }

      .text {
        // width: 60%;
        margin: 0 auto;
        @include mediaMd {
          width: 80%;
        }
        @include mediaXs {
          width: 100%;
          margin: 18px auto;
        }

        @include iPad {
          width: 80%;
        }
      }

      p {
        max-width: 500px;
        font-size: 17px;
        line-height: 25px;
        font-family: $font-family-h;
        font-weight: 300;

        @include mediaXs {
          font-size: 14px;
          line-height: 22px;
          width: 90%;
          margin: 0 auto;
        }

        @include iPad {
          font-size: 14px;
        }
      }

      h2 {
        margin-bottom: 20px;
        font-size: 3.7rem;
        font-family: $font-family-h;
        text-transform: capitalize;
        // max-width: 450px;
        @include mediaMd {
          font-size: 24px;
        }

        @include mediaSm {
          font-size: 24px;
          margin-bottom: 8px;
        }
      }
    }
  }

  .r-content {
    @include mediaXs {
      order: 1;
      margin-top: 20px;
      margin-bottom: 30px;
    }
  }

  .right-img-section {
    display: flex;
    justify-content: flex-end;
    .r-img {
      flex-basis: 50%;
      height: auto;
      padding-right: 1.5rem;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.blue-img-section {
  display: flex;
  // margin-top: 80px;

  @include mediaXs {
    flex-direction: column;
    margin-top: 0;
    background: $color-dark-blue;
  }

  .overlap-bg-section {
    background: $color-dark-blue;
    padding: 0rem 3rem;
    color: #fff;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    max-width: 45%;
    min-height: 450px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;

    @include mediaXs {
      position: inherit;
      top: 0;
      width: 80%;
      min-height: inherit;
      transform: translateY(0);
      max-width: 100%;
      padding: 0;
      margin: 0 auto;
      padding-top: 20px;
    }

    @include iPad {
      max-width: 50%;
      width: 55%;
      min-height: 300px;
    }

    @include mediaMd {
      min-height: 300px;
      max-width: 55%;
      width: 55%;
    }
    .text {
      // display: flex;
      // flex-direction: column;
      // justify-content: center;
      // align-items: center;
      max-width: 600px;
      @include mediaXs {
        text-align: center;
      }
      h2 {
        font-size: 4rem;
        font-family: "Roboto", sans-serif;
        font-weight: 700;
        text-transform: capitalize;
        margin-top: 30px;
        color: #fff;
        margin-bottom: 0;
        width: 100%;

        @media (min-width: 1024px) and (max-width: 1171px) {
          font-size: 3.5rem;
        }

        @media (min-width: 768px) and (max-width: 991.98px) {
          font-size: 2.5rem;
        }

        @include mediaSm {
          font-size: 2rem;
        }

        @include mediaXs {
          font-size: 24px;
          margin-top: 0;
          margin-bottom: 8px;
        }
      }

      p {
        // width: 80%;
        font-family: "Roboto", sans-serif;
        color: #fff;
        font-weight: 300;
        font-size: 17px;
        line-height: 28px;
        margin: 20px 0;
        @media (min-width: 768px) and (max-width: 991.98px) {
          // text-align: center;
        }
        @include mediaSm {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
          text-align: center;
        }

        @include mediaMd {
          font-size: 14px !important;
          line-height: 22px;
        }

        @include iPad {
          font-size: 14px !important;
          text-align: left;
          width: 100%;
        }

        @include mediaXs {
          font-size: 14px !important;
          line-height: 22px;
          margin: 0 !important;
          width: 100% !important;
        }
      }
    }
  }
}

.r-img {
  margin-left: auto;
  width: 65%;
  height: 95vh;
  position: relative;
  padding-top: 50%;
  overflow: hidden;

  @include mediaXs {
    height: 40vh;
    width: 90%;
    order: 1;
    margin: 0 auto;
    margin-bottom: 31px;
    position: relative;
    z-index: 2;
  }

  @include iPad {
    height: auto;
    padding-top: 75%;
  }

  @include mediaMd {
    height: 65vh;
  }

  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    object-fit: cover;
    z-index: -1;
  }
}

.about-collection-watermark {
  @include watermark;
  // top: 2%;
  // right: -45%;
  z-index: 0;
  white-space: nowrap;
}
</style>
