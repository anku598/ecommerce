<template>
  <a :href="compData.link" target="_blank" class="single-media-img-block-width">
    <div class="single-media-img-block">
      <div class="single-media-img">
        <picture>
          <img :src="$config.HOST + compData.image.url" alt />
        </picture>
      </div>
      <!-- <p class="media-date">{{compData.}}</p> -->
      <h3 class="name">{{ compData.title }}</h3>
    </div>
  </a>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
@Component({
  name: "SingleMediaImageBlock",
  components: {},
})
export default class SingleMediaImageBlock extends Vue {
  @Prop() compData: any;

  get HOST() {
    return process.env.HOST;
  }
}
</script>
<style scoped lang="scss">
.single-media-img-block-width {
  width: 100%;
}
// .single-media-img-block {
//   // height: 100%;
// }
.single-media-img {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding-bottom: 130%;
  margin-bottom: 20px;
  @include mediaXs {
    padding-bottom: 141%;
  }

  img {
    -webkit-filter: grayscale(100%);
    filter: grayscale(0%);
    transition: all 0.5s ease-in-out;
    height: 100%;
    object-fit: cover;
    position: absolute;
    width: 100%;
    object-position: top center;
  }

  &:hover {
    img {
      transform: scale(1.1);
      transition: all 0.5s ease-in-out;
      -webkit-filter: grayscale(100%);
      filter: grayscale(70%);
    }

    .buy-btn > a {
      -webkit-transform: translateY(0px);
      transform: translateY(0px);
    }
  }
}

.buy-btn {
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  a {
    padding-left: 1.2rem;
    padding-right: 1.2rem;
    text-transform: uppercase;
    font-size: 12px;
    font-family: $font-family-base;
    -webkit-transform: translateY(50px);
    transform: translateY(50px);
    transition: all 0.5s ease-in-out;
  }
}

.name {
  font-family: $font-family-h;
  color: #2e2e2e;
  font-size: 1rem;
  text-align: center;
}
</style>
