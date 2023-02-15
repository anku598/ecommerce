<template>
  <div class="new-arrival" v-if="compData">
    <span class="watermark">{{ compData.watermark }}</span>
    <span class="bg-box"></span>
    <div class="row new-wrap-content">
      <div class="col-md-12 col-sm-12 col-lg-6 col-xl-6 p-0">
        <div class="text-content">
          <span>{{ compData.section_1.subtitle }}</span>
          <h2 class="section-title content__item-title">
            {{ compData.section_1.title }}
          </h2>
          <p>{{ compData.section_1.text }}</p>
          <nuxt-link
            v-if="compData.section_1.call_to_action.type == 'page'"
            :to="compData.section_1.call_to_action.link"
            >{{ compData.section_1.call_to_action_label }}</nuxt-link
          >
          <a v-else :href="compData.section_1.call_to_action.link">{{
            compData.section_1.call_to_action_label
          }}</a>
        </div>
      </div>
      <div class="col-md-12 col-sm-12 col-lg-6 col-xl-6 pr-0 mobile-space">
        <div class="right-img">
          <span class="img-reveal-box"></span>
          <div class="right-img-wrap">
            <img
              :src="$config.HOST + compData.section_1.image.original.src"
              alt="Right Image"
            />
          </div>
        </div>
      </div>
    </div>
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
// import ScrollMagic from 'scrollmagic';
// import * as ScrollMagic from 'scrollmagic';
// import 'imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap';
@Component({
  name: "NewArrivals",
  components: {},
})
export default class NewArrivals extends Vue {
  @Prop() compData: any;

  get HOST() {
    return process.env.HOST;
  }

  revealAnim() {
    let bgBox = document.querySelector(".bg-box");
    const revealTl = new TimelineMax({});
    revealTl
      .to(bgBox, 1, { width: "40%", ease: Expo.easeInOut })
      .to(
        ".img-reveal-box",
        1.5,
        { width: "0%", ease: Expo.easeInOut },
        "-=1.1"
      )
      .to(
        ".watermark",
        10,
        {
          x: "-=1000",
          yoyo: true,
          repeat: -1,
        },
        "-=1.5"
      );

    if (process.browser && window) {
      const ScrollMagic = (window as any).ScrollMagic;
      const controller = new ScrollMagic.Controller();
      const scene: any = new ScrollMagic.Scene({
        triggerElement: ".new-arrival",
        reverse: true,
        triggerHook: "onCenter",
      })
        .setTween(revealTl)
        .addTo(controller);
    }
  }

  public mounted() {
    this.revealAnim();
  }
}
</script>
<style scoped lang="scss">
.new-arrival {
  position: relative;
  overflow: hidden;
  margin-top: -80px;
  display: flex;
  flex-wrap: nowrap;
  // visibility: hidden;
  .watermark {
    width: 100%;
    @include watermark;
  }
  .bg-box {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    width: 40%;
    width: 0%;
    height: 200px;
    background: #0f1326;
    z-index: 1;

    @include mediaSm {
      display: none;
    }

    @include iPad {
      display: none;
    }
  }

  .new-wrap-content {
    width: 100%;
    @include mediaXs {
      margin-top: 0px;
    }
  }

  .mobile-space {
    @include mediaSm {
      padding: 0 !important;
    }
  }

  .right-content {
    margin-top: 50px !important;
    margin-left: 20% !important;
    margin-bottom: 100px;
    @include mediaSm {
    }

    p {
      position: relative;
      &:after {
        position: absolute;
        bottom: -50%;
        transform: translateY(50%);
        width: 1px;
        height: 60px;
        content: "";
        background: rgba(0, 0, 0, 0.5);
        left: 0;
      }
    }
  }

  .text-content {
    @media (min-width: 768px) and (max-width: 991.98px) {
      width: 80% !important;
      margin-left: 50px !important;
    }

    p {
      @media (min-width: 768px) and (max-width: 991.98px) {
        width: 95% !important;
      }
    }

    h2 {
      @media (min-width: 768px) and (max-width: 991.98px) {
        font-size: 3rem !important;
      }
    }
  }

  .text-content,
  .right-content {
    width: 70%;
    margin-left: auto;
    margin-top: 180px;
    position: relative;
    z-index: 10;
    @include mediaSm {
      margin-top: 40px;
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: auto;
    }

    @include iPad {
      // margin-top: 40px;
      width: 90%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-right: auto;
    }

    @include mediaXs {
      margin-top: 0 !important;
    }
    span {
      font-size: 16px;
      font-family: "Roboto", sans-serif;
      letter-spacing: 11px;
      text-transform: uppercase;
      color: #000;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        top: 50%;
        width: 60px;
        height: 1px;
        left: -120px;
        transform: translate(50%, -50%);
        background: rgba(0, 0, 0, 0.5);
        @include mediaSm {
          display: none;
        }
      }
    }
    .section-title {
      @include responsive-font(3.5vw, 20px, 70px, 50px);
      font-family: "Roboto", sans-serif;
      font-weight: 700;
      text-transform: uppercase;
      margin-top: 30px;
      color: #000;
      margin-bottom: 0;
      @include mediaSm {
        font-size: 2rem;
        margin-top: 14px;
      }
    }
    p {
      width: 80%;
      font-family: "Roboto", sans-serif;
      color: #000;
      font-weight: 300;
      font-size: 1.1rem !important;
      line-height: 28px;
      margin: 20px 0;
      @include mediaSm {
        width: 90%;
        text-align: center;
      }
      @include iPad {
        text-align: center;
        width: 90%;
      }
    }

    a {
      color: #000;
      text-transform: uppercase;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      font-family: $font-family-h;
      border-bottom: 1.5px solid #000;
      padding-bottom: 5px;
      letter-spacing: 1.1px;
    }
  }
}

.single-img {
  width: 100%;
  position: absolute;
  top: 62%;
  margin-left: 10%;
  transform: translateY(-50%);

  @include mediaSm {
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.right-img {
  width: 100%;
  // height: 80%;
  margin-right: 0;
  margin-left: auto;
  margin-top: 200px;
  position: relative;
  overflow: hidden;
  z-index: 5;
  // padding-bottom: 90%;
  max-height: 80vh;

  .right-img-wrap {
    max-height: 100%;
  }
  .img-reveal-box {
    position: absolute;
    top: 0;
    width: 100%;
    background: #f5f5f5;
    height: 100%;
  }
  @include mediaSm {
    margin-top: 40px;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: 50% 50%;
    // position: absolute;
    // top: 0;
  }
}
</style>
