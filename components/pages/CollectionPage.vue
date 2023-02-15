<template>
  <div class="collection-details">
    <header>
      <div class="header-img">
        <picture>
          <img
            :src="$config.HOST + pageData.hero_image_original.url"
            alt="Banner Image"
          />
        </picture>

        <div class="banner-content">
          <div class="date">
            <h3 v-if="pageData.collection_data.season">
              {{ pageData.collection_data.season.name }}
            </h3>
            <p>{{ pageData.year }}</p>
          </div>

          <h2>{{ pageData.title }}</h2>
          <p class="para">{{ pageData.description }}</p>
        </div>
      </div>
    </header>

    <!-- Campaign Gallery  -->

    <component
      class="reveal-anim"
      :is="comp.type"
      v-for="(comp, idx) in pageData.body"
      :key="'bodycomp' + idx"
      :comp-data="comp.value"
      :page-data="pageData"
    ></component>

    <section v-if="pageData.next_collection" class="next-collection-anim">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-6 order-mobile">
            <div class="left-content">
              <div class="date">
                <h3 v-if="pageData.next_collection.collection.season">
                  {{ pageData.next_collection.collection.season.name }}
                </h3>
              </div>

              <h2>{{ pageData.next_collection.title }}</h2>
              <!-- <p class="para">
                {{ pageData.next_collection.short_description }}
              </p> -->
              <router-link :to="pageData.next_collection.url" class="btn"
                >View This Collection</router-link
              >
            </div>
          </div>
          <div class="col-md-6">
            <div class="right-img">
              <picture>
                <img
                  :src="
                    $config.HOST +
                    pageData.next_collection.hero_image_original.src
                  "
                  alt="Winter Collection"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import AboutCollection from "../blocks/AboutCollection.vue";
import DuelImageCarousel from "../blocks/DuelImageCarousel.vue";
import ShopTheCollection from "../blocks/ShopTheCollection.vue";
@Component({
  name: "CollectionPage",
  components: {
    dual_image_carousel: DuelImageCarousel,
    image_and_content: AboutCollection,
    collection_shop_slider: ShopTheCollection,
  },
})
export default class CollectionPage extends Vue {
  @Prop() pageData: any;
  get HOST() {
    return process.env.HOST;
  }
}
</script>
<style scoped lang="scss">
.collection-details {
  width: 100%;
  overflow: hidden;
}
header {
  position: relative;
  margin-bottom: $section-margin;
  @include mediaXs {
    margin-bottom: 140px;
  }

  .banner-content {
    position: absolute;
    top: 65%;
    transform: translateY(-50%);
    // left: 10%;
    right: 0;
    max-width: 600px;
    background: #fff;
    padding: 3rem 4rem;
    font-family: $font-family-base;
    @include mediaMd {
      // left: 117px;
      padding: 2rem 3rem;
      top: 75%;
      max-width: 500px;
    }

    @include mediaSm {
      transform: translate(-50%, -50%);
      left: 50%;
      width: 90%;
      text-align: center;
      padding: 2rem 3rem;
      max-width: 100%;
      top: 100%;
    }

    @include iPad {
      top: 110% !important;
    }

    @include mediaXs {
      width: 90%;
      text-align: center;
      padding: 0.5rem 2rem;
      top: 240px;
    }

    h2 {
      font-family: $font-family-h;
      font-size: 3.7rem;
      margin: 15px 0;
      @include mediaXs {
        font-size: calc(1.7vw + 15px);
        margin: 9px 0;
        font-size: 1.5rem !important;
      }
      @include mediaSm {
        font-size: 1.7rem;
      }

      @include mediaMd {
        font-size: 2.5rem;
      }
    }
  }
}

.order-mobile {
  @include mediaXs {
    order: 2;
  }
}

.date {
  display: flex;
  // justify-content: space-between;
  // width: 450px;
  align-items: center;
  @include mediaSm {
    width: 100%;
    justify-content: center;
  }
  @include mediaXs {
    flex-direction: column;
  }

  h3,
  p {
    font-weight: 400;
    font-family: $font-family-h;
    font-size: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 7px;
    color: #0e1224;
    @include mediaXs {
      font-size: 15px;
      margin: 0;
      margin-bottom: 6px;
    }

    @include mediaSm {
      font-size: 14px;
    }

    @include mediaMd {
      font-size: 1rem;
    }
  }

  h3 {
    position: relative;
    margin-right: 10px;
  }
}

.para {
  font-family: $font-family-h;
  font-weight: 300;
  font-size: 18px;
  line-height: 30px;
  letter-spacing: 1.2px;
  @include mediaXs {
    margin-top: 0;
    font-size: 14px;
    line-height: 22px;
  }
  @include mediaMd {
    max-width: 80%;
    font-size: 15px;
    line-height: 22px;
  }
  @include mediaSm {
    max-width: 100%;
    font-size: 14px;
    line-height: 22px;
  }
}

.header-img {
  height: calc(100vh - 170px);
  width: 95%;
  margin: 0 auto;
  position: relative;
  @include mediaXs {
    height: 50vh;
    width: 90%;
  }

  @include mediaMd {
    height: calc(70vh - 170px);
  }

  @include mediaSm {
    height: calc(55vh - 123px);
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center 23%;
  }
}

section {
  padding-bottom: $section-margin;
  padding-top: $section-margin;
  position: relative;
  background: #f6f6f6;

  @include mediaXs {
    padding-bottom: 40px;
    padding-top: 40px;
  }
}

.section-wrapper {
  width: 90%;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include mediaSm {
    flex-direction: column;
  }
}

.left-content {
  // padding-left: calc(10vw + 25px);
  // flex-basis: 65%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  justify-content: center;
  align-self: flex-start;
  align-items: flex-start;
  width: 40%;
  margin: 0 auto;

  @include mediaXs {
    width: 90%;
    margin: 0 auto;
    align-items: center;
  }

  @include iPad {
    width: 70%;
  }

  // @include mediaXs {
  //   max-width: 100%;
  // }

  // @include mediaSm {
  //   width: 90%;
  //   margin-top: 25px;
  //   padding: 0 25px;
  // }

  // @include mediaXs {
  //   width: 90%;
  //   margin: 0 auto;
  //   display: flex;
  //   flex-direction: column;
  //   align-items: center;
  //   margin-top: 25px;
  // }

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
    }
  }
  h2 {
    font-family: $font-family-h;
    font-size: 3.7rem;
    margin: 15px 0;
    @include mediaSm {
      margin-bottom: 3rem;
      font-size: 1.7rem;
    }

    @include iPad {
      font-size: 1.3rem;
    }

    @include mediaMd {
      font-size: 2.5rem;
    }
    @include mediaXs {
      margin-bottom: 0rem;
      font-size: 24px;
      margin-top: 30px;
    }
  }

  .para {
    max-width: 700px;
  }
}

.btn {
  background: transparent;
  color: $color-secondary !important;
  border-bottom: 1px solid #000;
  padding-right: 0;
  padding-left: 0rem;
  text-transform: uppercase;
  font-family: $font-family-h;
  font-weight: 600;
  letter-spacing: 1.1px;
  transition: 0.5s ease all;
  margin-top: 15px;
  transform: translateX(0);
  border-radius: 0px;
  // &:hover {
  //   transform: translateX(-10px);
  // }

  @include iPad {
    font-size: 12px;
    line-height: 15px;
  }

  @include mediaXs {
    margin-top: 0;
    font-size: 12px;
  }
}

.right-img {
  padding-left: 2rem;
  @include mediaSm {
    padding-left: 0;
    // width: 90%;
    order: -1;
  }

  img {
    width: 100%;
  }
}

.hb-gallery-part {
  margin: 4rem 0;
}
@media (min-width: 965px) {
  .hb-gallery-part {
    margin: 8rem 0;
  }
}
.hb-gallery-header {
  margin-bottom: 2rem;
}
.hb-gallery-header h1 {
  color: #dea53c;
  font-size: 2.5rem;
  font-family: "gt", sans-serif;
}
@media all and (min-width: 965px) {
  .hb-gallery-header h1 {
    font-size: 3.5rem;
  }
}
.hb-gallery-part-content img {
  width: 100%;
  display: block;
}
.imageGrid {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.gridRow {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-height: 450px;
  overflow: hidden;
  padding: 10px 0;
}
@media (min-width: 1921px) {
  .gridRow {
    max-height: 450px;
  }
}
.innerGridRow {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 350px;
  width: auto;
}
.innerGridRow .imageWrapper {
  flex-wrap: wrap;
  width: 50%;
}
.imageWrapper {
  overflow: hidden;
  display: flex;
  justify-content: center;
  padding: 0 10px;
  flex-grow: 1;
}
.imageWrapper > img {
  display: block;
  align-self: center;
  height: auto;
  width: 100%;
  max-height: 100%;
  margin-bottom: 15px;
  object-fit: cover;
}
.fontWrapper {
  text-align: center;
  padding: 20px;
  color: white;
  display: flex;
  padding: 0 10px;
}
.fontWrapper .blueBackground {
  background-color: #9ed4d9;
  display: flex;
  padding: 30px;
}
.fontWrapper h2 {
  align-self: center;
}
@media (max-width: 768px) {
  .gridRow {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-height: none;
    overflow: hidden;
  }
  .imageWrapper img {
    width: 100%;
  }
}
</style>
