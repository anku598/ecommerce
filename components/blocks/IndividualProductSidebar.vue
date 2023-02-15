<template>
  <div class="individual-product-sidebar" v-if="compData">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12 p-0">
          <!-- <div class="status-tag" style="backgroundColor:#24AE9B">
            <p>New</p>
          </div>-->

          <div class="status-tag" v-if="compData.isAvailable == false">
            <p>Out of Stock</p>
          </div>

          <p class="pro-category">
            {{ categoryLabel }}
            <span>{{ collectionLabel }}</span>
          </p>
          <h3 class="product-title">{{ compData.name }}</h3>
          <div class="price">
            <p>
              <span
                class="cut-price"
                v-if="productPrice.undiscounted !== null && productPrice.onSale"
                >{{ productPrice.undiscounted.label }}</span
              >
              {{ productPrice.main.label }}
              <!-- <span class="off-percent">(25% OFF)</span> -->
            </p>
          </div>
          <!-- <p class="tax-text">
            inclusive all taxes.
            <span>Offer valid till May 10, 2020 12:30pm</span>
          </p> -->

          <p class="product_description" v-html="description"></p>
          <ul class="product-attrs">
            <li v-for="(attr, idx) in compData.attributes">
              {{ attr.attribute.name }} :
              <span class="value">{{
                attr.values.map((a) => a.name).join(", ")
              }}</span>
            </li>
          </ul>
        </div>
        <div class="choose" v-if="selectionData">
          <div
            v-for="(attrVal, key) in selectionData.attributes"
            :key="`attr${key}`"
          >
            <div class="color" v-if="attrVal.isColor">
              <p>
                {{ attrVal.name }}
                {{
                  selectionData.inputs[key] == null
                    ? ""
                    : `: ${selectionData.inputs[key].name}`
                }}
              </p>
              <ul class="color-box">
                <li
                  v-for="(color, vkey) in attrVal.values"
                  :key="`attr-${key}-${vkey}`"
                >
                  <input
                    class="styled-colorbox"
                    :id="`styled-colorbox-${key}-${vkey}`"
                    type="checkbox"
                    :true-value="color"
                    :false-value="null"
                    v-model="selectionData.inputs[key]"
                  />
                  <label
                    :for="`styled-colorbox-${key}-${vkey}`"
                    :style="{
                      backgroundColor: color.value,
                      border:
                        color.value == '#FFFFFF' ? '1px solid black' : 'none',
                    }"
                  ></label>
                </li>
              </ul>
            </div>
            <div v-else class="size">
              <p>Select your {{ attrVal.name }}</p>
              <ul class="size-box">
                <li
                  v-for="(val, vkey) in attrVal.values"
                  :key="`attr-${key}-${vkey}`"
                >
                  <input
                    class="styled-sizebox"
                    :id="`styled-sizebox-${key}-${vkey}`"
                    type="checkbox"
                    v-model="selectionData.inputs[key]"
                    :true-value="val"
                    :false-value="null"
                  />
                  <label :for="`styled-sizebox-${key}-${vkey}`">{{
                    val.name
                  }}</label>
                </li>
              </ul>
            </div>
          </div>
          <div class="quantity">
            <QuantityButton v-model="quantity"></QuantityButton>
          </div>

          <div class="p-details">{{ compData.description }}</div>

          <div class="add-to-cart-btn">
            <button
              class="add-to-bag-btn"
              @click.prevent="onCartAdd()"
              :disabled="addToCartDisabled"
            >
              {{
                selectedVariant == null ? "Select Color & Size" : "Add To Bag"
              }}
            </button>

            <!-- <button
              href="#"
              class="add-to-wishlist-btn"
              @click.prevent="onCartAdd()"
            >
              Add To wishlist
            </button> -->
          </div>
          <div class="size-chart-btn">
            <a
              href=""
              @click.prevent="toggleChartShowing"
              v-if="
                compData.category.sizeChart.image &&
                compData.category.sizeChart.table !== null
              "
              >Size Chart</a
            >

            <a v-else href="" class="no-click">No size chart available</a>

            <span></span>
            <nuxt-link to="/return-policy">return Policy</nuxt-link>
          </div>

          <div class="share-btn">
            <div class="text">
              <p>Share</p>
            </div>

            <div class="social-share-icon">
              <a class="sc-icon" :href="sharingURLs.facebook" target="_blank">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a class="sc-icon" :href="sharingURLs.twitter" target="_blank">
                <i class="fab fa-twitter"></i>
              </a>
              <span class="sc-icon" ref="copybtn" @click="onCopy">
                <i class="fas fa-link"></i>
              </span>
            </div>
          </div>
        </div>

        <!-- <ul class="purchase-condition">
          <li>
            <img src="@/assets/img/tick-mark.svg" alt />
            <p>Order before 20:00 to receive between 19th - 26th May.</p>
          </li>
          <li>
            <img src="@/assets/img/tick-mark.svg" alt />
            <p>Pay with Amex, Mastercard, Visa, PayPal, Klarna</p>
          </li>
          <li>
            <img src="@/assets/img/tick-mark.svg" alt />
            <p>Orders can be returned within 14 days</p>
          </li>
          <li>
            <img src="@/assets/img/tick-mark.svg" alt />
            <p>Free Delivery on order above INR 1199</p>
          </li>
        </ul> -->
      </div>
    </div>
    <transition @enter="SizeChartEnter" @leave="SizeChartLeave" :css="false">
      <SizeChart
        v-if="isChartShowing"
        v-on:toggle-chart="toggleChartShowing"
        :size-chart="compData.category.sizeChart"
      />
    </transition>
  </div>
</template>

<script lang='ts'>
import { Action, Getter } from "nuxt-property-decorator";
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { Collection } from "~/graphqlTypes";
import animations from "~/scripts/animations";
import { edgesNormalizer, getCategoryName } from "~/utils/common";
import { ADD_TO_CART } from "~/utils/store/actions.names";
import { AUTHENTICATED, SETTINGS } from "~/utils/store/getters.names";
import {
  namespaced,
  NS_ANIM,
  NS_SETTINGS,
  NS_USER,
} from "~/utils/store/namespaces.names";
import { createProductPrice, createSelectionMatrix } from "../../utils/sells";
import { ShareUtil } from "../../utils/seo";
import { GUEST } from "../../utils/store/getters.names";
@Component({
  name: "IndividualProductSidebar",
  components: {},
})
export default class IndividualProductSidebar extends Vue {
  @Getter(namespaced(NS_SETTINGS, SETTINGS)) settings!: any;
  @Prop() compData: any;
  @Prop() description: any;
  @Prop() seoDescription!: string;
  @Action(namespaced(NS_USER, ADD_TO_CART)) addToCart!: any;
  @Getter(namespaced(NS_USER, AUTHENTICATED)) authenticated!: boolean;
  @Getter(namespaced(NS_USER, GUEST)) guest!: string | null;

  isChartShowing: boolean = false;
  colorSelection: any | null = null;
  sizeSelection: any | null = null;
  quantity: number = 1;
  selectionData: any | null = null;

  get sharingURLs() {
    const url = (this as any).$config.SITE_URL + this.$route.path;
    return {
      facebook: ShareUtil.createFacebookShareLink(
        url,
        this.settings.social.facebook_app_id || null
      ),
      twitter: ShareUtil.createTwitterShareLink(
        url,
        `Check out ${this.compData.name} at ${this.settings.site.title}!`
      ),
      url,
    };
  }

  head() {
    const title = `${this.compData.name} | ${this.settings.site.title}`;
    const image = this.compData.ogImage
      ? this.compData.ogImage.url
      : this.settings.general.default_og_image
      ? (this as any).$config.HOST + this.settings.general.default_og_image.url
      : false;
    let type: string = "website";

    const ldJSON: any = {
      type: "application/ld+json",
      vmid: "ldjson-product-detail-json",
      json: {
        "@context": "https://schema.org/",
        "@type": "Product",
        name: this.compData.seoTitle || title,

        description: this.seoDescription,
        sku: this.compData.defaultVariant.sku,
        brand: {
          "@type": "Brand",
          name: this.settings.site.title,
        },
        offers: {
          "@type": "Offer",
          url: (this as any).$config.SITE_URL + this.$route.path,
          priceCurrency: this.productPrice.currency,
          price: this.productPrice.value,
          itemCondition: "https://schema.org/NewCondition",
          availability: `https://schema.org/${
            this.compData.isAvailable ? "InStock" : "SoldOut"
          }`,
        },
      },
    };

    const breadCrumb: any = {
      type: "application/ld+json",
      vmid: "ldjson-schema-breadcrumb",
      json: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Store",
            item: "https://schema.org/ClothingStore",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: this.compData.seoTitle || title,
            item: "https://schema.org/Product",
          },
        ],
      },
    };

    const data = {
      title,
      meta: [
        {
          hid: "og:site_name",
          name: "og_site_name",
          content: this.settings.site.title,
        },
        {
          hid: "og:title",
          name: "og:title",
          content: this.compData.seoTitle || title,
        },
        {
          hid: "og:url",
          name: "og:url",
          content: (this as any).$config.SITE_URL + this.$route.path,
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.seoDescription,
        },
        {
          hid: "description",
          name: "description",
          content: this.seoDescription,
        },
        {
          hid: "og:type",
          name: "og:type",
          content: type,
        },
      ],
      script: [ldJSON, breadCrumb],
    };
    if (image) {
      data.meta.push({
        hid: "og:image",
        name: "og:image",
        content: image,
      });
      ldJSON.json.image = [image];
    }
    return data;
  }

  toggleChartShowing() {
    this.isChartShowing = !this.isChartShowing;
    if (this.isChartShowing) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "inherit";
    }
  }

  get collectionString() {
    if (!this.compData || this.compData.collections?.length == 0) {
      return "";
    }
    const colls: string[] = this.compData.collections?.map((col: any) => {
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
    if (!this.compData || !this.compData.category) {
      return "";
    }
    return getCategoryName(this.compData.category);
  }

  onCopy(e: any) {
    document.execCommand("copy");
  }

  copyEvent(event: any) {
    event.preventDefault();
    if (event.clipboardData) {
      event.clipboardData.setData("text/plain", this.sharingURLs.url);
    }
    this.$toast.info("Link Copied!");
  }

  mounted() {
    this.selectionData = createSelectionMatrix(this.compData.variants);
    setTimeout(() => {
      const el = (this.$refs.copybtn as HTMLElement) || null;
      if (el !== null) {
        (this.$refs.copybtn as HTMLElement).addEventListener(
          "copy",
          this.copyEvent
        );
      }
    }, 0);
  }

  beforeUnmount() {
    const el = (this.$refs.copybtn as HTMLElement) || null;
    if (el !== null) {
      el.removeEventListener("copy", this.copyEvent);
    }
  }

  onCartAdd() {
    if (this.selectedVariant == null) {
      return;
    } else {
      if (this.authenticated) {
        this.addToCart({
          lines: [
            {
              variantId: this.selectedVariant.id,
              quantity: this.quantity,
            },
          ],
        });
      } else if (this.guest) {
        this.addToCart({
          email: this.guest,
          lines: [
            {
              variantId: this.selectedVariant.id,
              quantity: this.quantity,
            },
          ],
        });
      } else {
        this.$router.push(`/login/?next=${this.$route.path}`);
      }
    }
  }

  get addToCartDisabled() {
    if (
      this.selectedVariant == null ||
      this.selectedVariant.isAvailable == false
    )
      return true;
    if (this.quantity <= 0 || this.compData.isAvailableForPurchase == false) {
      return true;
    }
    return false;
  }

  get collectionLabel() {
    if (this.compData) {
      const names = this.compData.collections.map((c: Collection) => {
        return c.name;
      });
      if (names.length > 0) {
        return ` (${names.join(", ")})`;
      } else {
        return "";
      }
    } else {
      return "";
    }
  }

  get productPrice() {
    if (this.compData && this.compData.pricing) {
      return createProductPrice(this.compData.pricing);
    } else {
      return "";
    }
  }

  get selectedVariant(): any | null {
    if (this.selectionData) {
      const val = Object.values(this.selectionData.variants).find((v: any) => {
        let flag = true;
        Object.entries(this.selectionData.inputs).map((val: any) => {
          if (val[1] === null || val[1].slug !== v[val[0]]) {
            flag = false;
          }
        });
        return flag;
      });
      return val || null;
    } else {
      return null;
    }
  }

  SizeChartEnter(element: any, done: any) {
    animations
      .get("size-chart-anim")(element, true)
      .eventCallback("onComplete", done)
      .play();
  }

  SizeChartLeave(el: any, done: any) {
    animations
      .get("size-chart-anim")(el, true)
      .eventCallback("onReverseComplete", () => {
        done();
      })
      .progress(1)
      .reverse();
  }
}
</script>
<style scoped lang="scss">
.individual-product-sidebar {
  margin-bottom: $section-margin;
  width: 100%;
  max-width: 700px;
  margin-left: 40px;
  @include mediaSm {
    margin-bottom: 0;
    margin-top: 40px;
    margin-left: 0;
  }
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

.no-click {
  pointer-events: none;
  text-decoration: none !important;
}

.price {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  @include mediaSm {
    margin-bottom: 0;
  }
  p {
    font-size: $font-family-h;
    font-weight: 400;
    font-size: 1.125rem;
    align-items: center;
    display: block;

    @include mediaXs {
      font-size: 0.8rem;
    }

    @include iPad {
      font-size: 1rem;
    }

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

.share-btn {
  font-family: $font-family-h;
  font-weight: 400;
  display: flex;
  align-items: center;
  .text {
    display: flex;
    margin-right: 15px;

    img {
      width: 13px;
    }
    p {
      flex: inherit !important;
      margin-bottom: 0;
      margin-right: 5px;
      font-size: 1.1rem;
    }
  }

  .social-share-icon {
    display: flex;
    .sc-icon {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      // background: $color-dark-blue;
      border: 1px solid rgba(15, 20, 39, 0.5);
      color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 10px;
      font-size: 0.8rem;
    }
  }
}

.transculentSize {
  opacity: 0.5;
}

.tax-text {
  margin-bottom: 22px;
  font-family: $font-family-h;
  font-style: italic;
  font-weight: 300;
  font-size: 0.8125rem;
}

.p-details {
  font-family: $font-family-h;
  font-weight: 400;
  margin-bottom: 15px;
  font-size: 0.875rem;
  line-height: 22px;
  letter-spacing: 0.5px;
  margin-bottom: 34px;
  @include mediaSm {
    margin-bottom: 15px;
    font-size: 14px;
  }
}

.choose {
  width: 100%;
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
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(0, 0, 0, 0.4);
      transition: all 0.3s ease-in-out;
      font-family: $font-family-h;
      font-weight: 400;
      font-size: 0.875rem;
      color: rgba(14, 18, 36, 0.4);
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
      cursor: pointer;
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
        content: "";
      }
    }
  }

  .quantity,
  .color,
  .size {
    margin-bottom: 17px;
    @include mediaSm {
      margin-bottom: 8px;
    }
  }

  .quantity {
    margin-bottom: 34px;
  }
  .size,
  .color,
  .quantity {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-direction: column;

    // .size-box,
    // .color-box {
    //   flex: 2;
    //   display: flex;
    //   justify-content: space-between;
    //   a {
    //     width: 35px;
    //     height: 35px;
    //     border: 1px solid #000;
    //     display: flex;
    //     align-items: center;
    //     justify-content: center;
    //   }
    // }
  }
}

.color-box {
  margin-left: 4px;
  .color-circle {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    display: inline-flex;
    border: none !important;
  }

  .color1 {
    background: #1e1f2f;
  }
  .color2 {
    background: #641c18;
  }
  .color3 {
    background: #b4b4b4;
  }
  .color4 {
    background: #c1746d;
  }
}

// Quantity Style here

.control {
  // flex: 2;
  position: relative;
  @include mediaXs {
    margin-left: 31px;
  }

  input[type="number"] {
    text-align: center;
    padding-left: 2.5rem;
    padding-right: 1.6rem;
  }
}

input {
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  flex: 1 0;
  line-height: 1.65;
  height: 3em;
  margin: 0 auto;
  padding-left: 0.5rem;
  padding-right: calc(82 / 16 * 1rem);
  text-align: left;
  width: auto;
  max-width: 120px;
  vertical-align: middle;
  @include mediaXs {
    max-width: 162px;
  }
  // Firefox-specific hack
  // -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: 0;
    border: 1px solid rgba(0, 0, 0, 0.1) !important;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.3);
  }
}

button {
  border-left-width: 1px;
  color: #000;
  cursor: pointer;
  -ms-flex: 0 1;
  flex: 0 1;
  font-size: 0.875rem;

  line-height: 1.7;
  position: absolute;
  top: 0;
  text-align: center;
  width: 2.5rem;
  height: 42px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  z-index: 5;
  box-shadow: 0 !important;
  border: 0;
  @include mediaXs {
    right: 46px !important;
  }

  &:hover,
  &:active,
  &:focus {
    // border-color: #000;
    // color: #000;
    outline: none;
  }

  &:hover {
    & ~ .input {
      border: 1px solid #000;
    }
  }
  &:active,
  &:focus {
    & ~ .input {
      border: 0;
      // box-shadow: 0 0 0 0.2rem #000;
    }
  }
  &:disabled,
  &.is-disabled {
    color: #000;
    opacity: 1;
  }
}

.increment-button {
  background: #f5f5f5;
  right: 0;
  // transform: translateX(60%);
}

.decrement-button {
  background: #f5f5f5;
  left: 0;
}

button[disabled] {
  color: #fff;
}

.add-to-cart-btn {
  display: flex;
  // justify-content: center;
  // align-items: center;
  // @include mediaXs {
  //   display: flex;
  //   flex-direction: column;
  // }
}

@media screen and (max-width: 575.98px) {
  button {
    right: 0 !important;
  }
}

.add-to-wishlist-btn {
  @include Button;
  background: transparent;
  border: 1px solid #d6d6d6;
  margin-bottom: 20px;
  flex: 1;
  width: 100%;
}

.add-to-bag-btn {
  @include Button;
  color: #fff;
  margin-right: 20px;
  margin-bottom: 20px;
  flex: 1;
  width: 100%;
  p {
    flex: 1;
    font-family: $font-family-base;
    color: #fff;
    transition: all 0.6s ease-in-out;
  }

  @include mediaXs {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  span {
    position: absolute;
    right: 0;
    top: 0;
    width: 40px;
    height: 100%;
    color: #000;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    @include mediaXs {
      display: none;
    }
    i {
      transition: all 0.6s ease-in-out;
    }
  }

  &:hover {
    // background-position: 100%;
    // transition: all 0.6s ease-in-out;
    // p {
    //   color: #000 !important;
    // }
    // span i {
    //   transform: rotate(180deg);
    // }
  }
}

button[disabled] {
  pointer-events: none;
  opacity: 0.6;
}

.size-chart-btn {
  display: flex;
  justify-content: flex-start;
  text-transform: uppercase;
  font-family: $font-family-h;
  font-weight: 400;
  font-size: 0.8rem;
  margin-bottom: 25px;

  a {
    text-decoration: underline;
  }
  @include mediaXs {
    margin: 0 auto;
    font-size: 0.8rem;
    margin-bottom: 25px;
  }
  span {
    width: 1px;
    background: rgba(0, 0, 0, 0.4);
    height: auto;
    margin-left: 10px;
    margin-right: 10px;
  }
}

.status-tag {
  margin-right: 0px;
  padding: 0.4rem 1.7rem;
  color: #fff;
  font-family: $font-family-h;
  font-weight: 500;
  font-size: 13px;
  text-transform: uppercase;
  display: inline-block;
  margin-right: 10px;
  margin-bottom: 16px;
  background: #cb5454;
}

.purchase-condition {
  margin-top: 32px;
  li {
    display: flex;
    margin-bottom: 8px;

    img {
      margin-right: 10px;
      width: 12px;
    }
    p {
      font-family: $font-family-h;
      font-size: 0.87rem;
      font-weight: 400;
      line-height: 15px;
    }
  }
}

.product_description {
  font-family: $font-family-h;
  font-weight: 300;
  color: #0e1224;
  font-size: 1.1rem;
  margin-top: 20px;
  text-transform: initial;
  @include mediaXs {
    font-size: 0.8rem;
    line-height: 1.5;
    margin-top: 15px;
  }
}

.product-attrs {
  margin-bottom: 10px;
  font-weight: bold;
  color: #919191;

  .value {
    color: #484848;
    font-weight: normal;
  }

  li {
    margin-bottom: 2px;
  }
}

.copy-tooltip {
  .tooltip-inner {
    width: 40px !important;
  }
}
</style>
