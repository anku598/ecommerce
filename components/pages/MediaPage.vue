<template>
  <div class="collection-page medias">
    <span class="watermark">Media</span>
    <transition>
      <section v-if="pageData">
        <div class="left-content">
          <div class="positioning">
            <div class="date">
              <h3>{{ pageData.title }}</h3>
            </div>
            <div class="b-title overflow">
              <h2>{{ pageData.header_title }}</h2>
            </div>
            <div class="b-para overflow">
              <p class="para">{{ pageData.header_description }}</p>
            </div>
          </div>
        </div>

        <div class="right-img">
          <picture>
            <!-- <source :srcset="$config.HOST + currentSlide.hero_image_tab.url" media="(min-width: 800px)" />
            <source :srcset="$config.HOST + currentSlide.hero_image_mobile.url" media="(min-width: 300px)" />-->
            <img
              class="slide-img"
              :src="$config.HOST + pageData.hero_image_original.url"
              alt="Banner Img"
            />
          </picture>
        </div>
      </section>
    </transition>

    <MediaItemList :comp-data="pageData.body" />
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "vue-property-decorator";
@Component({
  name: "MediaPage",
  components: {},
})
export default class MediaPage extends Vue {
  @Prop() pageData: any;

  get HOST() {
    return process.env.HOST;
  }
}
</script>
<style scoped lang="scss">
.collection-page {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
  flex-direction: column;
}
.watermark {
  @include watermark;
  font-size: calc(14vw + 16px);
  z-index: 2;
  top: 2%;
}

.positioning {
  margin-right: 23px;
  overflow: hidden;
  position: relative;

  .date,
  .b-title,
  .b-para {
    // position: absolute !important;
    // top: 0;
  }
}
section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: 90%;
  margin-left: auto;

  @include mediaSm {
    flex-direction: column;
    margin-right: auto;
    height: 100%;
  }

  @include mediaMd {
    width: 95%;
  }
}

.left-content {
  // margin-left: calc(10vw + 25px);
  flex-basis: 40%;

  @include mediaSm {
    width: 100%;
    margin-top: 25px;
  }

  .date {
    @include mediaLg {
      width: 350px;
    }
    @include mediaMd {
      width: 300px;
    }
    h3,
    p {
      @include mediaMd {
        font-size: 13px;
      }

      @include mediaSm {
        margin-bottom: 20px;
      }
    }
  }
  .overflow {
    overflow: hidden;
    position: relative;
  }
  h2 {
    font-family: $font-family-h;
    font-size: calc(1.4vw + 15px);
    margin-bottom: 15px;
    margin-top: 15px;
    @include mediaSm {
      margin: 0;
      margin-bottom: 12px;
    }
  }

  .para {
    font-family: $font-family-h;
    font-weight: 300;
    font-size: 18px;
    line-height: 30px;
    letter-spacing: 1.2px;
    max-width: 75%;
    @include mediaMd {
      max-width: 100%;
      font-size: 16px;
      line-height: 24px;
    }
    @include mediaSm {
      margin: 0;
      max-width: 100%;
      font-size: 16px;
      line-height: 24px;
    }
  }
}

.btn {
  background: transparent;
  color: $color-secondary !important;
  border-bottom: 1px solid #000;
  padding-right: 0;
  padding-left: 0;
  font-family: $font-family-h;
  font-weight: 600;
  -webkit-transition: 0.5s ease all;
  transition: 0.5s ease all;
  -webkit-transform: translateX(0);
  transform: translateX(0);
  text-transform: uppercase;
  letter-spacing: 1.1px;
  padding-bottom: 5px;
  font-size: 15px;
  @include mediaSm {
    font-size: 13px;
  }
  &:hover {
    color: rgba(14, 18, 36, 0.5) !important;
  }
}

.right-img {
  flex-basis: 60%;
  overflow: hidden;
  height: 70vh;
  position: relative;
  padding-left: 2rem;
  z-index: 4;
  @include mediaXs {
    padding-left: 0;
  }
  picture {
    // position: absolute;
    // top: 0;
    // height: 100%;
    // left: 0;
  }

  img {
    height: 100%;
    object-fit: cover;
  }
  @include mediaMd {
    height: 57vh;
  }
  @include mediaSm {
    padding-left: 0;
    width: 100%;
    order: -1;
  }
}

.date {
  p {
    margin-bottom: 0;
  }
}

.date {
  display: flex;
  justify-content: space-between;
  flex-direction: column;

  h3,
  p {
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 5px;
  }

  h3 {
    font-family: $font-family-h;
    font-weight: 400;
  }

  p {
    font-family: $font-family-h;
    font-weight: 500;
    letter-spacing: 0;
    text-transform: capitalize;
  }

  h3 {
    position: relative;
    // &::before {
    //   width: 60px;
    //   height: 1px;
    //   background: $color-secondary;
    //   content: '';
    //   position: absolute;
    //   top: 50%;
    //   transform: translateY(-50%);
    //   left: -80px;
    // }
  }
}

.slider-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 80%;
  margin-top: 2rem;
  @include mediaMd {
    max-width: 100%;
  }
  @include mediaSm {
    margin-top: 2rem;
    max-width: 100%;
  }
}

.slider-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  .next-btn,
  .prev-btn {
    width: 50px;
    height: 45px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include mediaSm {
      width: 60px;
      height: 35px;
    }

    i {
      color: $color-secondary;
    }
  }

  .prev-btn {
    border-right: 0;
  }
}
</style>
