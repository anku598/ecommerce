<template>
  <div class="shop-sorting-sidebar">
    <div class="desktop-filter">
      <div class="bar-header">
        <h2>Filter By</h2>
        <a href="#" @click.prevent="reset()">Clear all</a>
      </div>
      <div>
        <GenderFilter
          v-if="showGenders && genders.length > 0"
          label="For"
          :is-node="false"
          :filter-data="genders"
          class="sort-catagory item-gap"
          :value="internalValue.gender"
          @input="onGenderChange"
        >
        </GenderFilter>

        <CategoryFilter
          v-if="categories.length > 0"
          label="Category"
          :is-node="false"
          :filter-data="categories"
          class="sort-catagory item-gap"
          v-model="internalValue.categories"
          :nested="true"
        >
        </CategoryFilter>

        <CategoryFilter
          label="Collection"
          v-if="pageType !== 'collection' && collections.length > 0"
          :is-node="false"
          :filter-data="collections"
          class="sort-catagory item-gap"
          v-model="internalValue.collections"
        >
        </CategoryFilter>
        <AttributeFilter
          class="item-gap"
          v-for="(attr, idx) in filterData.attributes"
          :filter-data="attr"
          v-model="internalValue.attributes[attr.slug]"
          :key="`attr-${idx}`"
        ></AttributeFilter>

        <!-- <div class="price-range item-gap">
        <div
          class="field-header"
          @click="contentVisiblePrice = !contentVisiblePrice"
        >
          <p>Price ({{ currentCurrency.symbol }})</p>
          <div
            class="close-icon"
            :class="{ isActive: contentVisiblePrice === true }"
          >
            <div class="line line-one"></div>
            <div class="line line-two"></div>
          </div>
        </div>
        <transition
          name="expand"
          @enter="enterProduct"
          @after-enter="afterEnterProduct"
          @leave="leaveProduct"
        >
          <div v-if="contentVisiblePrice">
            <VueSlider
              v-model="internalValue.price"
              :lazy="true"
              :enable-cross="false"
              :min-range="10"
              :min="priceRange[0]"
              :max="priceRange[1]"
              :rail-style="{
                minHeight: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
              }"
              :dot-style="{
                backgroundColor: 'white',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '50%',
                height: '100%',
              }"
              tooltip="none"
            ></VueSlider>
            <span
              >{{ internalValue.price[0] }} - {{ internalValue.price[1] }}</span
            >
          </div>
        </transition>
      </div> -->
      </div>
    </div>

    <div class="mobile-filter">
      <div class="bar-header">
        <div
          class="filter-btn-mobile"
          @click.prevent="toggleFilterShowingMobile"
        >
          <h2>Filter By</h2>
          <div- class="close-icon">
            <div class="line line-one"></div>
            <div class="line line-two"></div>
          </div->
        </div>
        <SortingButton
          :value="sortBy"
          @input="(val) => $emit('sort', val)"
        ></SortingButton>

        <!-- <a href="#" @click.prevent="reset()">Clear all</a> -->
      </div>

      <div class="filter-sidebar-mobile" v-if="isSidebarFilterShow">
        <!-- <CategoryFilter
            v-if="filterData && filterData.categories != undefined"
            label="Category"
            :is-node="true"
            :filter-data="filterData.categories"
            class="sort-catagory item-gap"
            v-model="internalValue.genders"
          >
          </CategoryFilter>

          <CategoryFilter
            label="Category"
            :is-node="true"
            :filter-data="categories"
            v-if="categories && categories.length > 0"
            class="sort-catagory item-gap"
            v-model="internalValue.categories"
          >
          </CategoryFilter> -->
        <div class="fake-bg" @click.prevent="toggleFilterShowingMobile"></div>
        <div class="sidebar-body">
          <header>
            <h2>Filter By:</h2>
            <div
              @click.prevent="toggleFilterShowingMobile"
              class="close-sidebar"
            >
              <img src="@/assets/img/close-icon.svg" alt="delete" />
            </div>
          </header>
          <div class="sort-item-mobile">
            <GenderFilter
              v-if="showGenders && genders.length > 0"
              label="For"
              :is-node="false"
              :filter-data="genders"
              class="sort-catagory item-gap"
              :value="internalValue.gender"
              @input="onGenderChange"
            >
            </GenderFilter>

            <CategoryFilter
              label="Collection"
              v-if="pageType !== 'collection' && collections.length > 0"
              :is-node="false"
              :filter-data="collections"
              class="sort-catagory item-gap"
              v-model="internalValue.collections"
            >
            </CategoryFilter>

            <CategoryFilter
              v-if="categories.length > 0"
              label="Category"
              :is-node="false"
              :filter-data="categories"
              class="sort-catagory item-gap"
              v-model="internalValue.categories"
              :nested="true"
            >
            </CategoryFilter>

            <AttributeFilter
              class="item-gap"
              v-for="(attr, idx) in filterData.attributes"
              :filter-data="attr"
              v-model="internalValue.attributes[attr.slug]"
              :key="`attr-${idx}`"
            ></AttributeFilter>
          </div>
        </div>

        <div class="sidebar-footer">
          <a
            href=""
            @click.prevent="toggleFilterShowingMobile"
            class="btn apply"
            >Apply</a
          >
          <a href="#" class="btn clear" @click.prevent="reset()">Clear</a>
        </div>

        <!-- <div class="price-range item-gap">
        <div
          class="field-header"
          @click="contentVisiblePrice = !contentVisiblePrice"
        >
          <p>Price ({{ currentCurrency.symbol }})</p>
          <div
            class="close-icon"
            :class="{ isActive: contentVisiblePrice === true }"
          >
            <div class="line line-one"></div>
            <div class="line line-two"></div>
          </div>
        </div>
        <transition
          name="expand"
          @enter="enterProduct"
          @after-enter="afterEnterProduct"
          @leave="leaveProduct"
        >
          <div v-if="contentVisiblePrice">
            <VueSlider
              v-model="internalValue.price"
              :lazy="true"
              :enable-cross="false"
              :min-range="10"
              :min="priceRange[0]"
              :max="priceRange[1]"
              :rail-style="{
                minHeight: '4px',
                backgroundColor: 'rgba(0, 0, 0, 0.12)',
              }"
              :dot-style="{
                backgroundColor: 'white',
                border: '1px solid rgba(0, 0, 0, 0.12)',
                borderRadius: '50%',
                height: '100%',
              }"
              tooltip="none"
            ></VueSlider>
            <span
              >{{ internalValue.price[0] }} - {{ internalValue.price[1] }}</span
            >
          </div>
        </transition>
      </div> -->
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { ProductFilterInput } from "~/graphqlTypes";
import GenderFilter from "../filters/GenderFilter.vue";
import CategoryFilter from "../filters/CategoryFilter.vue";
import AttributeFilter from "../filters/AttributeFilter.vue";
import { createCategoryTree } from "~/utils/filter";
import animations from "~/scripts/animations";

const ATTRIBUTE_ORDER: string[] = ["size", "color"];

const DEFAULT_VALUE: any = {
  categories: [],
  gender: null,
  attributes: {
    color: [],
    size: [],
  },
  collections: [],
};

@Component({
  name: "ShopSortingSidebar",
  components: {
    GenderFilter,
    CategoryFilter,
    AttributeFilter,
  },
})
export default class ShopSortingSidebar extends Vue {
  @Prop() filterData: any;
  @Prop() sortBy: any;
  @Prop() value!: any;
  @Prop() pageType!: string;
  @Prop({ default: false }) disableGender!: boolean;
  lock: boolean = false;
  internalValue: any = JSON.parse(JSON.stringify(DEFAULT_VALUE));
  public filterBoxMobile: boolean = false;
  public filterCollapseMobile: boolean = false;
  isSidebarFilterShow: boolean = false;

  get showGenders() {
    return (
      this.pageType !== "gender" &&
      this.pageType !== "category" &&
      this.genders != null
    );
  }

  @Watch("value", { immediate: true, deep: true })
  handleValueChange(val: any, oldVal: any) {
    this.lock = true;
    this.$set(this, "internalValue", JSON.parse(JSON.stringify(val)));
  }

  @Watch("internalValue", { deep: true, immediate: true })
  handleInternalValueChange(val: any, oldVal: any) {
    if (!this.lock) {
      const data = JSON.parse(JSON.stringify(val));
      if (val.gender !== oldVal.gender) {
        data.categories = [];
      }
      this.$emit("input", data);
    }
    this.lock = false;
  }

  onGenderChange(e: string | null) {
    this.internalValue = {
      ...this.internalValue,
      ...{ gender: e, categories: [] },
    };
  }

  public created() {
    if (process.browser && window) {
      this.handleMobileFilterView();
    }
  }

  FilterEnter(element: any, done: any) {
    // animations
    //   .get("sidebar-filter")(element, true)
    //   .eventCallback("onComplete", done)
    //   .play();
    console.log("Enter");
  }

  FilterLeave(element: any, done: any) {
    // animations
    //   .get("sidebar-filter")(element, false)
    //   .eventCallback("onReverseComplete", () => {
    //     done();
    //   })
    //   .progress(1)
    //   .reverse();
    console.log("Leave");
  }

  get changeStyle() {
    return (document as any).documentElement.querySelector(".mobile-menu");
  }

  toggleFilterShowingMobile() {
    this.isSidebarFilterShow = !this.isSidebarFilterShow;
    if (this.isSidebarFilterShow) {
      document.documentElement.style.overflow = "hidden";
      this.changeStyle.style.position = "inherit";
    } else {
      document.documentElement.style.overflow = "inherit";
      this.changeStyle.style.position = "fixed";
    }
  }

  handleMobileFilterView() {
    this.filterBoxMobile = window.innerWidth <= 991;
    window.addEventListener("resize", this.handleMobileFilterView);
  }

  public enterProduct(el: any) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
    });
  }

  get collections() {
    if (this.filterData.collections.length > 0) {
      return this.filterData.collections.filter((col: any) => {
        return col.products.totalCount > 0;
      });
    } else {
      return [];
    }
  }

  get genders() {
    let genders: any[] | null = null;
    if (this.pageType == "generic") {
      genders = this.filterData.categories;
    } else if (this.pageType == "collection" || this.pageType == "onSale") {
      genders = createCategoryTree(this.filterData.categories);
    }
    if (genders === null) {
      return genders;
    } else {
      return genders.filter((cat: any) => {
        return cat.products.totalCount > 0;
      });
    }
  }

  mergedCategories(categories: any[]) {
    const data: any = {};
    for (let cidx = 0; cidx < categories.length; cidx++) {
      const category = categories[cidx];
      if (data[category.name] === undefined) {
        data[category.name] = {
          name: category.name,
          id: [category.id],
          products: { totalCount: category.products.totalCount },
        };
        if (category.children) {
          data[category.name].children = category.children;
        }
      } else {
        data[category.name].id.push(category.id);
        data[category.name].products.totalCount += category.products.totalCount;
        if (category.children) {
          data[category.name].children.push(...category.children);
        }
      }
    }
    const pcats = Object.values(data);
    for (let idx = 0; idx < pcats.length; idx++) {
      const category: any = pcats[idx];
      if (category.children && category.children.length > 0) {
        (pcats[idx] as any).children = this.mergedCategories(category.children);
      }
    }
    return pcats;
  }

  get categories() {
    let categories: any;
    if (this.filterData.category != undefined) {
      categories = this.filterData.category.children.edges.map(
        (v: any) => v.node
      );
    } else if (this.filterData.categories != undefined) {
      if (this.internalValue.gender !== null) {
        const cat = (this.genders as any).find(
          (c: any) => c.id === this.internalValue.gender
        );
        if (cat !== undefined) {
          categories = cat.children;
        } else {
          categories = [];
        }
      } else {
        if (this.genders) {
          let allCat: any[] = [];
          for (let gidxx = 0; gidxx < this.genders.length; gidxx++) {
            const gender = this.genders[gidxx];
            allCat.push(...gender.children);
          }
          categories = this.mergedCategories(allCat);
        } else {
          categories = [];
        }
      }
    } else {
      categories = [];
    }
    console.log(categories);
    return categories.filter((cat: any) => {
      return cat.products.totalCount > 0;
    });
  }

  public leaveProduct(el: any) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }

  public afterEnterProduct(el: any) {
    el.style.height = "auto";
  }

  public enterProductFilterMobile(el: any) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
    });
  }

  public reset() {
    this.$set(this, "internalValue", JSON.parse(JSON.stringify(DEFAULT_VALUE)));
  }

  public afterEnterProductFilterMobile(el: any) {
    el.style.height = "auto";
  }

  public leaveProductFilterMobile(el: any) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }
}
</script>
<style scoped lang="scss">
.desktop-filter {
  display: none;
  @media screen and (min-width: 991.98px) {
    display: block;
  }
}

.mobile-filter {
  display: block;
  @media screen and (min-width: 991.98px) {
    display: none;
  }
}
.shop-sorting-sidebar {
  min-height: 60%;
  padding: 2rem 2rem;
  margin-bottom: $section-margin;
  padding-left: 4px;
  @media (max-width: 991.98px) {
    margin-bottom: 0;
    padding: 15px 4px;
    padding-bottom: 0;
  }
}

.filter-btn-mobile {
  display: flex;
  align-items: center;

  .close-icon {
    margin-left: 5px;
    .line {
      width: 10px;
    }

    &.isActive {
      .line {
        transform: rotate(180deg);
      }

      .line-two {
        opacity: 0;
      }
    }
  }
}

.fake-bg {
  flex-basis: 15%;
  background: rgba(0, 0, 0, 0.35);
}

.filter-sidebar-mobile {
  position: fixed;
  right: 0;
  width: 100%;
  // background: rgba(0, 0, 0, 0.35);
  height: calc(var(--vh, 1vh) * 100);
  top: 0;
  z-index: 48 !important;
  // transform: translateX(-100%);
  display: flex;

  .sidebar-footer {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 85%;
    z-index: 10;
    padding: 20px 0 0 0;
    background: #fff;
    display: flex;
    justify-content: space-between;

    .btn {
      border-radius: 0 !important;
      padding: 0.7rem 0rem;
      flex: 1;
      &.clear {
        background: #fff;
        color: #000 !important;
        border: 1px solid #dbdbdb;
      }
    }
  }

  // .wrapper-body {

  //   width: 85%;
  //   margin-left: auto;
  // }

  .sidebar-body {
    overflow: hidden;
    overflow-y: auto;

    @include mediaSm {
      max-height: 1041px;
    }
    @include mediaXs {
      max-height: 674px;
    }
    background: #fff;
    flex-basis: 85%;

    header {
      padding-top: 1rem;
      padding-bottom: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 90%;
      margin: 0 auto;
      border-bottom: 1px solid #dbdbdb;
    }

    .sort-item-mobile {
      width: 90%;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
}

.bar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  padding-bottom: 20px;
  margin-bottom: 20px;

  @media (max-width: 991.98px) {
    padding-bottom: 10px;
    margin-bottom: 12px;
  }

  // @media screen and (max-width: 991.98px) {
  //   margin-bottom: 20px;
  // }

  a {
    color: $color-lightgray;
    text-transform: capitalize;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.875rem;
    @include mediaXs {
      font-size: 0.775rem;
    }
  }
}

.active-opacity {
  opacity: 1;
}

.c-line {
  width: 12px;
  height: 2px;
  background: $color-lightgray;
  transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-left: auto;
}

.line {
  width: 12px;
  height: 2px;
  background: $color-lightgray;
  transition: all 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.line-two {
  transform: rotate(90deg) translateX(-2px);
}

.isNestedActive {
  .line {
    transform: rotate(180deg);
  }

  .line-two {
    opacity: 0;
  }
}

.isActive {
  .line {
    transform: rotate(180deg);
  }

  .line-two {
    opacity: 0;
  }
}

.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-gap {
  padding: 20px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  cursor: pointer;
  @include mediaXs {
    padding: 12px 0;
  }
  &:first-child {
    padding-top: 0;
  }
}

h2 {
  font-family: $font-family-h;
  text-transform: uppercase;
  font-weight: 500;
  font-size: 1rem;
  color: $color-secondary;
  @include mediaXs {
    font-size: 0.8rem;
  }
}

p {
  text-transform: uppercase;
  font-family: $font-family-h;
  font-weight: 600;
  letter-spacing: 1.5px;
  font-size: 15px;
  @include mediaXs {
    font-size: 13px;
  }
}

label {
  font-family: $font-family-h;
  font-weight: 400;
  text-transform: capitalize;
}
img {
  width: 100%;
}

.checkbox {
  li {
    margin: 17px 0;
    &:last-child {
      margin-bottom: 0px;
    }
  }
}

.nested-list-close {
  display: inline-block;
  margin-left: 77%;
}

.checkbox-nested {
  margin-left: 20px;
}

.transculent {
  opacity: 0.5 !important;
}

.transculentSize {
  opacity: 0.5;
}

.transculentColor {
  opacity: 0.5 !important;
  &:before {
    width: 26px;
    transition: all 0.6s ease-in-out;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    height: 1px;
    background: $color-black;
    transform: translate(-50%, -50%) rotate(-45deg);
    transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
}

.styled-checkbox {
  position: absolute;
  opacity: 0;
  &:checked + label {
    opacity: 1;

    label {
      opacity: 0.5;
    }
  }

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    display: inline-block;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 14px;
    height: 14px;
    // border: 1px solid rgba(168, 168, 168, 0.5);
    vertical-align: text-top;
    border: 1px solid #000;
    margin-top: 1px;
  }

  // &:checked + label:before {
  //   border: 1px solid #000;
  //   transition: all 0.3s ease-out;
  // }

  &:checked + label:after {
    content: "";
    position: absolute;
    left: 1px;
    top: 7px !important;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #000, 4px 0 0 #000, 4px -2px 0 #000, 4px -4px 0 #000,
      4px -6px 0 #000, 4px -8px 0 #000;
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }
}

.season-box {
  flex-direction: column;
}

.size-box,
.color-box,
.season-box {
  display: flex;

  li {
    // margin-right: 20px;
    margin-top: 17px;
  }
}

.color-box {
  flex-wrap: wrap;
  li {
    margin-right: 20px;
  }
}

.styled-sizebox {
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    border: 1px solid #000;
    transition: all 0.3s ease-out;
    margin-top: -2px;
  }

  &:checked + label:after {
    content: "";
    position: absolute;
    left: 1px;
    top: 7px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #000, 4px 0 0 #000, 4px -2px 0 #000, 4px -4px 0 #000,
      4px -6px 0 #000, 4px -8px 0 #000;
    transform: rotate(45deg);
    transition: all 0.3s ease-in-out;
  }

  // &:checked label {
  //   // transition: all 0.3s ease-in-out;
  // }
}

// .styled-catbox:checked + label {
//   opacity: 1;
// }
// .styled-catbox.inactive + label {
//   opacity: 0.5;
// }

.styled-seasonbox {
  position: absolute;
  opacity: 0;

  & + label {
    position: relative;
    cursor: pointer;
    padding: 0;
    display: flex;
    align-items: center;
    font-size: 0.875rem;
  }

  & + label:before {
    content: "";
    margin-right: 10px;
    display: inline-block;
    width: 14px;
    height: 14px;
    vertical-align: text-top;
    border: 1px solid #000;
    transition: all 0.3s ease-out;
    margin-top: -2px;
  }

  &:checked + label:after {
    content: "";
    position: absolute;
    left: 1px;
    top: 7px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #000, 4px 0 0 #000, 4px -2px 0 #000, 4px -4px 0 #000,
      4px -6px 0 #000, 4px -8px 0 #000;
    transform: rotate(45deg);
    transition: all 0.3s ease-in-out;
  }

  // &:checked label {
  //   // transition: all 0.3s ease-in-out;
  // }
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
  }

  & + label {
    position: relative;
    transition: all 0.3s ease-in-out;
    opacity: 1;
  }

  &:checked + label {
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

//Price Range Slider

.price-range {
  // p {
  //   // margin-bottom: 25px;
  // }

  span {
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.95rem;
    margin-top: 6px;
    display: block;
  }
}

.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
  margin-bottom: 30px;
}

.slider:hover {
  opacity: 1;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #000;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  background: #4caf50;
  cursor: pointer;
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}

.filter-enter-active,
.filter-leave-active {
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}
</style>
