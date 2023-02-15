<template>
  <div class="single-product" v-if="shopProduct">
    <div
      class="single-img-slider"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <div class="slide-img-wrap">
        <nuxt-link
          :to="{
            name: 'store-products-slug',
            params: { slug: shopProduct.slug },
          }"
        >
          <swiper
            :options="swiperOption"
            ref="swiperRefDesktop"
            class="swiper-for-desktop"
          >
            <swiper-slide
              v-for="(productImg, idx) in shopProduct.imgOriginal"
              :key="'pro' + idx"
            >
              <div class="product-slide-img">
                <picture>
                  <source
                    :srcset="shopProduct.imgMobile[idx].url"
                    media="(max-width: 576px)"
                  />
                  <img
                    :src="productImg.url"
                    :height="560"
                    :width="420"
                    :alt="
                      productImg.alt || `Product Image for ${shopProduct.name}`
                    "
                  />
                </picture>
              </div>
            </swiper-slide>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>

          <swiper
            :options="swiperOptionMobile"
            ref="swiperRef"
            class="swiper-for-mobile"
          >
            <swiper-slide
              v-for="(productImg, idx) in shopProduct.imgOriginal"
              :key="'pro' + idx"
            >
              <div class="product-slide-img">
                <picture>
                  <source
                    :srcset="shopProduct.imgMobile[idx].url"
                    media="(max-width: 576px)"
                  />
                  <img
                    :src="productImg.url"
                    :height="560"
                    :width="420"
                    :alt="
                      productImg.alt || `Product Image for ${shopProduct.name}`
                    "
                  />
                </picture>
              </div>
            </swiper-slide>

            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </swiper>
        </nuxt-link>
        <!-- <div
          class="status-tag"
          v-if="productPrice.onSale"
          style="backgroundcolor: #b7a06f"
        >
          <p>On Sale</p>
        </div> -->

        <!-- <div
            v-else-if="searchProduct.tags.statusSold"
            class="status-tag"
            style="backgroundColor:#CB5454"
          >
            <p>{{ searchProduct.tags.statusSold }}</p>
        </div> -->

        <!-- <div class="add-to-bag">
          <div class="add-to-content">
            <div class="cart-btn-section">
              <button class="add-to-bag-btn" @click.prevent="handleAddToCart"  v-if="!isAvailableInfo">
                Add To Bag
              </button>
              <nuxt-link
                :to="{
                  name: 'store-products-slug',
                  params: { slug: shopProduct.slug },
                }"
                tag="button"
                class="add-to-bag-btn"
                >Show Details</nuxt-link
              >
              <button class="wishlist-btn" @click.prevent="addToWishlist()">
                Add To wishlist
              </button>
            </div>

            <div
              v-if="isAvailableInfo && filterData != null"
              class="available-info">
              <div
                v-if="isSizeBox"
                class="size-boxes"
                @click.prevent="handleSizeBoxClick"
              >
                <p>select size</p>
                <ul class="size-box">
                  <li
                    v-for="(size, idx) in filterData.sizes"
                    :key="`size${idx}`"
                  >
                    <input
                      class="styled-sizebox"
                      :id="`styled-sizebox-${idx}`"
                      :value="`styled-sizebox-${idx}`"
                      :true-value="size"
                      v-model="sizeSelection"
                      :false-value="null"
                      type="checkbox"
                    />
                    <label :for="`styled-sizebox-${idx}`">
                      {{ size.code }}
                    </label>
                  </li>
                </ul>
              </div>

              <div class="color-boxes" v-if="isColorBox">
                <div>
                  <img
                    class="color-back-btn"
                    src="../../assets/img/small-back-btn.svg"
                    alt
                  />
                  <p>select Color</p>
                </div>
                <div class="color-box">
                  <ul class="select-color-box">
                    <li
                      v-for="(color, idx) in filterData.colors"
                      :key="`color${idx}`"
                    >
                      <input
                        class="styled-colorbox"
                        :id="`styled-colorbox-${idx}`"
                        :true-value="color"
                        :false-value="null"
                        type="checkbox"
                      />
                      <label
                        :for="`styled-colorbox-${idx}`"
                        :style="{
                          backgroundColor: colorFromArray(color.color),
                        }"
                      ></label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> -->
      </div>

      <nuxt-link
        :to="{
          name: 'store-products-slug',
          params: { slug: shopProduct.slug },
        }"
      >
        <div class="card-info">
          <div class="card-top">
            <p v-if="shopProduct.category" class="pro-category">
              {{ categoryLabel }} {{ collectionString }}
              <!-- <span v-if="shopProduct.season && !seasonShowMobile"
                >({{ shopProduct.season.name }})</span
              >
              <span v-if="shopProduct.season && seasonShowMobile"
                >({{ shopProduct.season.short_code }})</span
              > -->
            </p>

            <!-- <div class="icon-wishlist in-wishlist"></div> -->

            <!-- <div
              class="avilable-colors"
              v-if="!isColorBox & (shopProduct.colors.length > 1)"
            >
              <div
                v-for="(color, idx) in shopProduct.colors"
                class="color"
                :style="{ backgroundColor: colorFromArray(color.color) }"
                :key="`color${idx}`"
              ></div>
            </div> -->
          </div>

          <p class="pro-title">{{ shopProduct.name }}</p>

          <p
            class="pro-price"
            
          >
            <div class="price" :style="[
              productPrice.undiscounted !== null && productPrice.onSale
                ? { color: 'red', display:'inline-block' }
                : '',
            ]">{{ productPrice.main.label }}</div>
            <span
              class="before-discount"
              v-if="productPrice.undiscounted !== null && productPrice.onSale"
              >{{ productPrice.undiscounted.label }}</span
            >
          </p>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from "nuxt-property-decorator";
import { TimelineMax, Expo, clearProps, TweenMax } from "gsap/all";
import { namespaced, NS_USER } from "~/utils/store/namespaces.names";
import { ADD_TO_CART, WISHLIST_ACTION } from "~/utils/store/actions.names";
import { createProductPrice } from "../../utils/sells";
import { Collection, Maybe, Product } from "~/graphqlTypes";
import { getCategoryName } from "~/utils/common";
import { WISHLIST } from "~/utils/store/getters.names";
@Component({
  name: "ShopSingleProduct",
  components: {},
})
export default class ShopSingleProduct extends Vue {
  @Prop() shopProduct!: Product;
  @Action(namespaced(NS_USER, ADD_TO_CART)) addToCart!: any;
  @Action(namespaced(NS_USER, WISHLIST_ACTION)) wishlistAction: any;
  @Getter(namespaced(NS_USER, WISHLIST)) wishlist!: any[];
  productDetail: any | null = null; // This should be in data, even if it is null;
  public $route: any;

  addToWishlist() {
    this[WISHLIST_ACTION]({ id: this.shopProduct.id, action: "add" });
  }

  get HOST() {
    return process.env.HOST;
  }

  get collectionString() {
    if (!this.shopProduct || this.shopProduct.collections?.length == 0) {
      return "";
    }
    const colls: any = this.shopProduct.collections?.map((col: any) => {
      const sc = col.metadata.find((mt: any) => mt.key === "short_code");
      if (sc) {
        return sc.value;
      } else {
        return col.name;
      }
    });
    return `(${colls.join(", ")})`;
  }

  get categoryLabel() {
    if (!this.shopProduct || !this.shopProduct.category) {
      return "";
    }
    return getCategoryName(this.shopProduct.category);
  }

  handleAddToCart() {
    // this.addToCart(this.)
    return false;
  }

  onMouseEnter() {
    if (this.$refs.swiperRefDesktop) {
      (this.$refs.swiperRefDesktop as any).swiper.autoplay.start();
    }
  }

  onMouseLeave() {
    if (this.$refs.swiperRefDesktop) {
      (this.$refs.swiperRefDesktop as any).swiper.autoplay.stop();
    }
  }

  get productPrice() {
    if (this.shopProduct && this.shopProduct.pricing) {
      return createProductPrice(this.shopProduct.pricing);
    } else {
      return "";
    }
  }

  // @Prop() searchProduct: any;
  public isAvailableInfo: boolean = false;
  public isSizeBox: boolean = true;
  public isColorBox: boolean = false;

  public colorSelection: any | null = null;
  public sizeSelection: any | null = null;

  public swiperOption: any = {
    slidesPerView: 1,
    freeMode: false,
    speed: 600,
    spaceBetween: 1,
    watchOverflow: true,
    // mousewheelControl: true,
    // parallax: true,
    // watchOverflow: false,
    // loopFillGroupWithBlank: false,
    // effect: 'fade',
    loop: false,
    touchRatio: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 1,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 1,
      },

      1024: {
        slidesPerView: 1,
        spaceBetween: 1,
        autoplay: false,
      },
    },
  };

  public swiperOptionMobile: any = {
    slidesPerView: 1,
    freeMode: false,
    speed: 600,
    spaceBetween: 1,
    watchOverflow: true,
    // mousewheelControl: true,
    // parallax: true,
    // watchOverflow: false,
    // loopFillGroupWithBlank: false,
    // effect: 'fade',
    loop: true,
    touchRatio: 0,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    autoplay: {
      delay: 2000,
    },
  };
}
</script>
<style scoped lang="scss">
.product-slide-img {
  position: relative;
  overflow: hidden;
  // padding-bottom: 130%;

  img {
    // position: absolute;
    // top: 0;
    width: 100%;
    height: auto;
    // object-fit: cover;
    // object-position: center center;
  }
}

.swiper-for-desktop {
  display: none;
  @media screen and (min-width: 991.98px) {
    display: block;
  }
}

.swiper-for-mobile {
  display: block;
  @media screen and (min-width: 991.98px) {
    display: none;
  }
}

.single-img-slider {
  position: relative;
}
.slide-img-wrap {
  position: relative;
}

.swiper-container {
  width: 100%;
  overflow: hidden;
  &:hover {
    // .swiper-button-prev,
    // .swiper-button-next {
    //   opacity: 1;
    // }

    .swiper-button-prev {
      left: 12px;
    }

    .swiper-button-next {
      right: 12px;
    }
  }
}

img {
  width: 100%;
}

.single-product {
  &:hover {
    .add-to-content {
      transform: translateY(0%);
    }
  }
}

.size-boxes,
.color-boxes {
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    color: #2e2e2e;
    font-size: 12px;
    font-family: $font-family-h;
    font-weight: 400;
    text-transform: capitalize;
  }
  .size-box,
  .box-color {
    display: flex;
    li {
      margin-right: 15px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
}

.before-discount {
  font-weight: 300;
  text-decoration: line-through;
  margin-left: 7px;
}

.add-to-bag {
  width: 100%;
  left: 0;
  position: absolute;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  .add-to-content {
    background: #fff;
    padding: 12px 15px 0;
    max-width: 386px;
    margin: 0 auto;

    transform: translateY(100%);
    transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1),
      -webkit-transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);

    .cart-btn-section {
      display: flex;
      justify-content: center;
      align-items: center;
      .add-to-bag-btn {
        @include Button;
        color: #fff;
        margin-right: 10px;
      }

      .wishlist-btn {
        @include Button;
        background: #fff;
        color: #2e2e2e;
        border: 1px solid #d6d6d6;
        &:focus {
          border: 1px solid #d6d6d6;
        }
      }
    }
  }
}

.swiper-button-prev,
.swiper-button-next {
  opacity: 1;
  transition: all 0.3s ease-out;
}

.swiper-button-prev {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 30px;
  height: 30px;
  background: #fff;
  background-repeat: no-repeat;
  background-position: 14px;
  border-radius: 50%;
  left: -40px;
  background-size: 5px;
  transform: translateY(-50%) rotate(180deg);
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  @media screen and (max-width: 991.98px) {
    display: none;
  }
  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-6px, -1px) rotate(180deg);
    transform: translate(-6px, -1px) rotate(180deg);
    opacity: 0;
    width: 12px;
    height: 1px;
    background: #000;
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);

    content: "";
  }

  &:hover {
    background-position: 17px;
    &:before {
      -webkit-transform: translate(-6px, -1px) rotate(180deg);
      transform: translate(-6px, -1px) rotate(180deg);
      opacity: 1;
    }
  }
}

.swiper-button-next {
  background-image: url("../../assets/img/chevron-right.svg") !important;
  width: 30px;
  height: 30px;
  top: 50%;
  transform: translateY(-50%);
  background: #fff;
  background-repeat: no-repeat;
  background-position: 14px;
  border-radius: 50%;
  right: -40px;
  background-size: 5px;
  transition: all 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  @media screen and (max-width: 991.98px) {
    display: none;
  }

  &:before {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-6px, 0px) rotate(180deg);
    transform: translate(-6px, 0px) rotate(180deg);
    opacity: 0;
    width: 12px;
    height: 1px;
    background: #000;
    transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    content: "";
  }

  &:hover {
    background-position: 17px;
    &:before {
      -webkit-transform: translate(-6px, 0px) rotate(180deg);
      transform: translate(-6px, 0px) rotate(180deg);
      opacity: 1;
    }
  }
}

.pro-category {
  @include productCategory;
  font-size: 0.85rem;
  span {
    font-weight: 400;
  }
}

.pro-title {
  @include productTitle;
  font-size: 0.9rem;
  margin: 6px 0 10px;
  // &:first-letter {
  //   text-transform: capitalize;
  // }
}

.pro-price {
  @include productPrice;
}

.card-info {
  max-width: 386px;
  padding: 0 15px;
  margin: 0 auto;
  @include mediaXs {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  @include mediaXs {
    margin-top: 16px;
  }
}

.avilable-colors {
  display: flex;
}

.color {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 5px;

  &:last-child {
    margin-right: 0px;
  }
}

.color-back-btn {
  width: 6px;
  margin-bottom: 4px;
}

.select-color-box {
  display: flex;
  align-items: center;
}

.status-tag {
  position: absolute;
  top: 50px;
  z-index: 3;
  right: 0;
  background: #b7a06f;
  display: block;
  margin-right: 0px;
  padding: 0.7rem 1.7rem;
  color: #fff;
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;

  @include mediaXs {
    font-size: 9px;
    padding: 0.4rem 1rem;
  }
}

.wishlist-action {
  position: absolute;
  top: 5px;
  z-index: 3;
  right: 5px;
  display: block;
  width: 20px;
  height: auto;
}

// Size Box CSS

.styled-sizebox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #d6d6d6;
    font-family: $font-family-h;
    font-weight: 700;
    color: #919191;
    font-size: 14px;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: #000;
      border: 1px solid #000;
    }
  }

  &:checked + label {
    color: #000;
    border: 1px solid #000;
    transition: all 0.3s ease-in-out;
  }
}

.styled-colorbox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 5px;
    display: inline-block;
    transition: all 0.3s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }

  .color-box {
    &:hover {
      label {
        opacity: 0.4;
      }
    }
  }

  &:checked + label {
    -webkit-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    transition: all 0.3s ease-in-out;
  }
}

.wrapper {
  // padding: 50px;
  // margin: 0 auto;
  // display: block;
}

.icon-wishlist {
  cursor: pointer;
  width: 18px;
  height: 18px;
  opacity: 0.5;
  background: 
  // DON't use a base64 encoded svg this is just for this prototype, use a normal external link to a svg file
    url("../../assets/heart.svg");

  &:hover {
    opacity: 1;
  }

  @include mediaXs {
    width: 12px;
    height: 12px;
  }

  &.in-wishlist {
    opacity: 0.6;
    animation-name: wishlist-ani;
    animation-duration: 1000ms;
    background: 
      // DON't use a base64 encoded svg this is just for this prototype, use a normal external link to a svg file
      url("../../assets/fill-heart.svg");
  }
}

@keyframes wishlist-ani {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.5);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
