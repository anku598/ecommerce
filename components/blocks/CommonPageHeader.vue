<template>
  <div class="page-header">
    <div class="header-img">
      <picture>
        <source
          :srcset="$config.HOST + imgSrc.tab.url"
          media="(max-width: 800px)"
        />
        <source
          :srcset="$config.HOST + imgSrc.mobile.url"
          media="(max-width: 300px)"
        />
        <img :src="$config.HOST + imgSrc.original.url" alt="Banner Img" />
      </picture>

      <div class="header-content">
        <h2 class="header-title">
          {{ title }}
          <span class="bold-word">{{ brandname }}</span>
        </h2>
        <p class="header-text">{{ subtitle }}</p>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component({
  name: "CommonPageHeader",
  components: {},
})
export default class CommonPageHeader extends Vue {
  @Prop() private title!: string;
  @Prop() private subtitle!: string;
  @Prop() private brandname!: string;
  @Prop() private imgSrc!: any;
  get HOST() {
    return process.env.HOST;
  }
}
</script>
<style scoped lang="scss">
.page-header {
  margin-bottom: $section-margin;
  width: 95%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  height: calc(70vh - 110px);
  @include mediaXs {
    margin-bottom: 30px;
    width: 90%;
  }
  &:before {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .header-img {
    height: 100%;
    position: relative;

    &:before {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      background: rgba(0, 0, 0, 0.35);
      content: "";
    }
    img {
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
  }

  .header-content {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 5%;
    color: #fff;
    @include mediaXs {
      text-align: center;
      left: 0;
      width: 100%;
    }
    .header-title {
      font-size: calc(2.5vw + 20px);
      font-family: $font-family-h;
      font-weight: 300;
      margin: 0;
      text-transform: uppercase;
      .bold-word {
        font-weight: 600;
      }
    }
    .header-text {
      margin: 0;
      margin-bottom: 10px;
      font-size: 1.3rem;
      font-family: $font-family-h;
      font-weight: 300;
      @include mediaXs {
        font-size: 1.1rem;
        width: 95%;
        margin: 0 auto;
        margin-top: 10px;
      }
    }
  }
}
</style>
