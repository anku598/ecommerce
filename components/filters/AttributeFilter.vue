
<template>
  <div>
    <div class="field-header" @click="toggle = !toggle">
      <p>{{ filterData.name }}</p>
      <div class="close-icon" :class="{ isActive: toggle === true }">
        <div class="line line-one"></div>
        <div class="line line-two"></div>
      </div>
    </div>

    <transition
      name="expand"
      @enter="enterProduct"
      @after-enter="afterEnterProduct"
      @leave="leaveProduct"
      v-if="filterData.isColor"
    >
      <ul class="color-box" v-if="toggle">
        <li v-for="(color, idx) in filterValues" :key="`c${idx}`">
          <input
            class="styled-colorbox"
            :id="`styled-colorbox-${filterData.slug}-${idx}`"
            type="checkbox"
            :value="color.slug"
            v-model="internalValue"
          />
          <label
            :for="`styled-colorbox-${filterData.slug}-${idx}`"
            :style="{
              backgroundColor: color.value,
              border: color.value == '#FFFFFF' ? '1px solid black' : 'none',
            }"
          ></label>
        </li>
      </ul>
    </transition>
    <transition
      name="expand"
      @enter="enterProduct"
      @after-enter="afterEnterProduct"
      @leave="leaveProduct"
      v-else
    >
      <ul class="size-box row" v-if="toggle">
        <li
          class="col-md-4"
          v-for="(size, idx) in filterValues"
          :key="`s${idx}`"
        >
          <input
            class="styled-sizebox"
            :id="`styled-sizebox-${filterData.slug}-${idx}`"
            type="checkbox"
            :value="size.slug"
            v-model="internalValue"
          />
          <label :for="`styled-sizebox-${filterData.slug}-${idx}`">{{
            size.name
          }}</label>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
@Component({
  name: "AttributeFilter",
})
export default class AttributeFilter extends Vue {
  @Prop() filterData!: any;
  @Prop() value!: any[];
  internalValue: any[] = [];
  toggle: boolean = true;
  lock: boolean = false;

  @Watch("value", { immediate: true, deep: true })
  handleValueChange(val: any, oldVal: any) {
    this.lock = true;
    this.$set(this, "internalValue", JSON.parse(JSON.stringify(val)));
  }

  @Watch("internalValue", { deep: true, immediate: true })
  handleInternalValueChange(val: any, oldVal: any) {
    if (!this.lock) {
      this.$emit("input", val);
    }
    this.lock = false;
  }

  get filterValues() {
    return this.filterData.values.filter((val: any) => {
      return val.hasProducts;
    });
  }

  public created() {
    if (process.browser && window) {
      this.handleView();
    }
  }

  public handleView() {
    if (window.innerWidth <= 991.98) {
      this.toggle = false;
    } else {
      return true;
    }
    window.addEventListener("resize", this.handleView);
  }

  // Animations
  public enterProduct(el: any) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
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
}
</script>

<style lang="scss" scoped>
.field-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

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
    top: 7px;
    background: white;
    width: 2px;
    height: 2px;
    box-shadow: 2px 0 0 #000, 4px 0 0 #000, 4px -2px 0 #000, 4px -4px 0 #000,
      4px -6px 0 #000, 4px -8px 0 #000;
    transform: rotate(45deg);
    transition: all 0.3s ease-out;
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
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
