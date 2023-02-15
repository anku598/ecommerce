<template>
  <v-popover
    trigger="hover"
    :style="{
      top: `${tagData.y}%`,
      left: `${tagData.x}%`,
      position: 'absolute',
      zIndex: 9999,
    }"
  >
    <button class="tooltip-icon first-tooltip">
      <i class="fas fa-plus"></i>
    </button>
    <div slot="popover">
      <div class="dress-info" ref="card">
        <div class="product-img">
          <img :src="imageURL[0]" alt="Product-Img" />
        </div>
        <div class="product-info">
          <div class="p-top">
            <p class="pro-category">
              {{ product.category.name }}
              <span>{{ collectionString }}</span>
            </p>
            <h3 class="product-title">{{ product.name }}</h3>
            <div class="price">
              <p class="pro-price">
                {{ productPrice.main.label }}
                <span
                  class="before-discount"
                  v-if="
                    productPrice.undiscounted !== null && productPrice.onSale
                  "
                  >{{ productPrice.undiscounted.label }}</span
                >
              </p>
            </div>
          </div>
          <div class="p-bottom">
            <!-- <div class="color">
              <p>Available Colors</p>
              <ul class="color-box">
                <li
                  v-for="(color, idx) in filterData.colors"
                  :key="`color${idx}`"
                >
                  <input
                    class="styled-colorbox"
                    :id="`styled-colorbox-${idx}`"
                    type="text"
                  />
                  <label
                    :style="{ backgroundColor: colorFromArray(color.color) }"
                    :for="`styled-colorbox-${idx}`"
                  ></label>
                </li>
              </ul>
            </div> -->
            <!-- <div class="size">
              <p>Available Sizes</p>
              <ul class="size-box">
                <li v-for="(size, idx) in filterData.sizes" :key="`size${idx}`">
                  <input
                    class="styled-sizebox"
                    :id="`styled-sizebox-${idx}`"
                    type="text"
                  />
                  <label :for="`styled-sizebox-${idx}`">{{ size.code }}</label>
                </li>
              </ul>
            </div> -->
            <nuxt-link
              :to="{
                name: 'store-products-slug',
                params: { slug: tagData.product.product.slug },
              }"
            >
              <div class="add-to-cart">
                <button class="cartbtn">View Product</button>
              </div>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </v-popover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { Action, Getter } from 'vuex-class';
import { createProductPrice } from '~/utils/sells';

@Component({
  name: 'MarkableBannerTag',
  components: {},
})
export default class MarkableBannerTag extends Vue {
  @Prop() tagData: any;
  @Prop() product: any;

  get HOST() {
    return process.env.HOST;
  }
  colorSelection: any | null = null;
  sizeSelection: any | null = null;

  get imageURL(): string {
    return this.product.images.map((img: any) => {
      return img.url;
    });
  }

  get collectionString() {
    if (!this.product || this.product.collections?.length == 0) {
      return '';
    }
    const colls: any = this.product.collections?.map((col: any) => {
      const sc = col.metadata.find((mt: any) => mt.key === 'short_code');
      if (sc) {
        return sc.value;
      } else {
        return col.name;
      }
    });
    return `(${colls.join(', ')})`;
  }

  get productPrice() {
    if (this.product && this.product.pricing) {
      return createProductPrice(this.product.pricing);
    } else {
      return '';
    }
  }
}
</script>

<style lang="scss" scoped>
// .v-popover {
//   position: absolute;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
// }
.dress-content {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;

  @include mediaXs() {
    display: none;
  }
}

.content {
  position: absolute;
  width: 50%;
  max-width: 612px;
  // top: 60%;
  // left: 24%;

  @include mediaSm {
    display: none;
  }
}

.tooltip-icon {
  text-decoration: none;
  color: #fff !important;
  background: rgba(15, 19, 38, 1);
  width: 35px;
  height: 35px;
  border-radius: 50%;
  border: 1px solid #fff;
  display: none;
  justify-content: center;
  align-items: center;
  position: relative;

  @media screen and (min-width: 1000px) {
    display: inline-flex;
  }

  &:hover {
    i {
      transform: rotate(90deg);
      transform-origin: center center;
      transition: transform 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
  }
}

.size-box,
.color-box {
  display: flex;

  li {
    margin-right: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
}

.styled-sizebox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: auto;
    padding: 0;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 1);
    transition: all 0.3s ease-in-out;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.875rem;
    color: rgba(14, 18, 36, 1);
    @include mediaXs {
      width: 20px;
      height: 20px;
      font-size: 12px;
    }
  }

  &:checked + label {
    // border: #000;
    // color: #fff;
    color: rgba(14, 18, 36, 1);
    border: 1px solid #000;
    transition: all 0.3s ease-in-out;
  }
}

.styled-colorbox {
  position: absolute;
  opacity: 0;
  & + label {
    position: relative;
    cursor: auto;
    padding: 0;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: inline-block;
    transition: all 0.3s ease-in-out;
    @include mediaXs {
      width: 20px;
      height: 20px;
    }
  }

  &:checked + label {
    // -webkit-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    // -moz-box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    // box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.75);
    // transition: all 0.3s ease-in-out;
    // padding: 3px;
    // border: 2px solid #000;

    transition: all 0.3s ease-in-out;
    &:before {
      width: 26px;
      height: 26px;
      border-radius: 50%;
      border: 1px solid #000;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      content: '';
    }
  }
}

// .color,
// .size {
//   margin-bottom: 17px;
//   @include mediaSm {
//     margin-bottom: 8px;
//   }
// }

.size,
.color {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: column;
  margin-bottom: 15px;

  p {
    flex: 1;
    font-family: $font-family-h;
    font-weight: 400;
    color: #000;
    font-size: 0.9375rem;
    margin-bottom: 10px;
    @include mediaSm {
      font-size: 14px;
    }
  }
}

.popper {
  width: auto;
  background-color: rgba(0, 0, 0, 0);
  color: #212121;
  text-align: inherit;
  padding: 0px;
  display: inline-block;
  border-radius: 0px !important;
  position: absolute;
  font-size: 14px;
  font-weight: normal;
  border: 0px #fff solid !important;
  box-shadow: none !important;
}

.dress-info {
  background: #fff;
  padding: 1rem;
  display: flex;
  // width: 50vw;
  // max-width: 612px;
  // width: 100%;
  // max-width: 600px;
  .product-img {
    flex-basis: 40%;
    // min-height: 350px;
    // max-height: 350px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .product-info {
    flex-basis: 60%;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: left;
  }
}

.dress-info {
  // position: absolute;
  padding: 10px 0;
  display: flex;
}

.product-title {
  @include productTitle;
}

.pro-category {
  @include productCategory;
  margin-bottom: 6px;
  span {
    font-weight: 400;
  }
}

.price {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @include mediaSm {
    margin-bottom: 0;
  }
  p {
    font-size: $font-family-h !important;
    font-weight: 400;
    font-size: 1.1rem;
    align-items: center;
    display: block;

    .cut-price {
      font-weight: 300;
      text-decoration: line-through;
      margin-right: 7px;
    }

    .off-percent {
      font-weight: 300;
      margin-left: 3px;
      color: #24ae9b;
    }
  }

  a {
    display: flex;
    align-items: center;
    img {
      width: 22px;
    }
  }
}

.cartbtn {
  margin-top: 0;
  background: #0f1326;
  border-bottom: 0;
  width: 100%;
  font-size: 0.875rem;
  border: none;
  text-transform: uppercase;
  font-family: $font-family-h, sans-serif;
  color: #fff;
  outline: none;
  position: relative;
  // margin-top: 2rem;
  padding: 10px;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  font-weight: 600;
  cursor: pointer;
}

.add-to-cart {
  a {
    background: #000;
    border-bottom: 0;
    font-size: 1.1rem;
    border: none;
    color: #fff;
    outline: none;
    padding: 11px 15px;
    font-weight: 600;
    color: #fff;
    text-decoration: none;
  }
}
</style>


<style lang="scss">
.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: #fff;
    color: #000;
    padding: 5px 10px 4px;
    max-width: inherit !important;
    width: 500px !important;
    border-radius: 0 !important;
    // max-width: 100%;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: #fff;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}

.tooltip-inner {
  .dress-info {
    transform: scale(1);
    opacity: 1;
    transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
}
.fade-enter,
.fade-leave-to {
  // opacity: 0;

  .tooltip-inner {
    .dress-info {
      transform: scale(0.5);
      opacity: 0;
    }

    .popper__arrow {
      display: none;
    }
  }
}
</style>
