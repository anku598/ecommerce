<template>
  <div class="founder">
    <div class="overlay-text-section" v-if="compData.image_alignment == 'left'">
      <div class="founder-img l-img">
        <img
          :src="$config.HOST + compData.image.original.src"
          alt="About left image"
        />
      </div>

      <div class="overlay-content overlay-content-right">
        <div class="text">
          <h2>{{ compData.title }}</h2>
          <p>{{ compData.text }}</p>
        </div>
      </div>
    </div>

    <div
      class="overlay-text-section"
      v-if="compData.image_alignment == 'right'"
    >
      <div class="overlay-content overlay-content-left">
        <div class="text">
          <h2>{{ compData.title }}</h2>
          <p>{{ compData.text }}</p>
        </div>
      </div>

      <div class="founder-img r-img">
        <img
          :src="$config.HOST + compData.image.original.src"
          alt="About left image"
        />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component({
  name: "OverlappingImageAndText",
  components: {},
})
export default class OverlappingImageAndText extends Vue {
  @Prop() compData: any;
  get HOST() {
    return process.env.HOST;
  }
}
</script>
<style scoped lang="scss">
.founder {
  width: 90%;
  margin: 0 auto;
  margin-bottom: $section-margin;
  @include mediaXs {
    margin-bottom: $section-margin - 50px;
    width: 100%;
  }
}

.overlay-text-section {
  display: flex;
  justify-content: center;
  align-items: center;
  @include mediaSm {
    flex-direction: column;
  }

  @include mediaXs {
    flex-direction: column;
  }

  .founder-img {
    flex-basis: 60%;
    height: 60vh;

    @include mediaXs {
      height: auto;
      flex-basis: 100%;
      width: 90%;
      margin: 0 auto;
    }
    img {
      height: 100%;
      object-fit: cover;
      object-position: center top;
      width: 100%;
    }

    &.r-img {
      @include mediaXs {
        margin-top: 25px;
      }
    }
  }

  .overlay-content {
    flex-basis: 40%;
    background: #fefefc;
    padding: 3rem;
    display: flex;
    min-height: 350px;
    align-items: center;
    justify-content: center;

    @include mediaXs {
      padding: 2rem 0;
      text-align: center;
      width: 100%;
      margin: 0 auto;
    }

    @include mediaXs {
      flex-basis: 100%;
      min-height: auto;
    }

    .text {
      @include mediaXs {
        width: 90%;
        margin: 0 auto;
      }
    }

    p {
      max-width: 500px;
      font-size: 17px;
      line-height: 25px;
      font-family: $font-family-h;
      font-weight: 300;

      @include mediaXs {
        font-size: 14px !important;
        line-height: 22px;
      }
    }

    h2 {
      margin-bottom: 20px;
      font-size: 2.5rem;
      font-family: $font-family-h;
      text-transform: capitalize;
      // max-width: 450px;
      @include mediaMd {
        font-size: 24px;
      }

      @include mediaSm {
        font-size: 2rem;
      }
    }
  }
}

.overlay-content-right {
  margin-left: -2rem;
  @include mediaXs {
    margin-left: 0;
  }
}

.overlay-content-left {
  margin-right: -2rem;
  z-index: 1;
  background: #0e1224 !important;
  color: #fff;
  @include mediaXs {
    margin-right: 0;
  }
}
</style>
