
<template>
  <div>
    <div class="field-header" @click="toggle = !toggle">
      <p>{{ label }}</p>
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
    >
      <ul class="checkbox" v-if="toggle">
        <li v-for="(value, idx) in filterData" :key="`cat${idx}`">
          <input
            class="styled-checkbox styled-catbox"
            :id="`styled-catbox-${label.replace(' ', '-')}-${idx}`"
            type="checkbox"
            :value="isNode ? value.node.id : value.id"
            v-model="internalValue"
          />
          <label :for="`styled-catbox-${label.replace(' ', '-')}-${idx}`"
            >{{ isNode ? value.node.name : value.name }}
          </label>

          <template
            v-if="
              nested &&
              showNested(isNode ? value.node.children : value.children)
            "
          >
            <div
              class="nested-list-close close-icon"
              @click.prevent="nestedList = nestedList == idx ? null : idx"
              :class="{ isNestedActive: nestedList == idx }"
            >
              <div class="line line-one"></div>
              <div class="line line-two"></div>
            </div>

            <ul class="checkbox checkbox-nested" v-if="nestedList == idx">
              <li
                v-for="(ncat, idnx) in getNestedChildren(value.children)"
                :key="`cat${idx}-${idnx}`"
                v-if="ncat.products.totalCount > 0"
              >
                <input
                  class="styled-checkbox styled-catbox"
                  :id="`styled-catbox-${idx}-${idnx}`"
                  type="checkbox"
                  :value="ncat.id"
                  v-model="internalValue"
                />
                <label
                  :class="{ transculent: false }"
                  :for="`styled-catbox-${idx}-${idnx}`"
                  >{{ ncat.name }}</label
                >
              </li>
            </ul>
          </template>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from "nuxt-property-decorator";
@Component({
  name: "CategoryFilter",
})
export default class CategoryFilter extends Vue {
  @Prop() filterData!: any[];
  @Prop({ default: false }) isNode!: boolean;
  @Prop() value!: any[];
  @Prop({ default: "" }) label!: String;
  @Prop({ default: false }) nested!: Boolean;
  internalValue: any[] = [];
  toggle: boolean = true;
  lock: boolean = false;
  nestedList: number | null = null;

  @Watch("value", { deep: true, immediate: true })
  handleValueChange(val: any, oldVal: any) {
    this.lock = true;
    this.$set(this, "internalValue", JSON.parse(JSON.stringify(val)));
  }

  getNestedChildren(children: any) {
    const isNode = children.edges !== undefined;
    let data: any[];
    if (!isNode) {
      data = children;
    } else {
      data = children.edges.map((c: any) => c.node);
    }
    return data;
  }

  showNested(children: any) {
    const isNode = children.edges !== undefined;
    children = isNode ? children.edges : children;
    if (children.length == 0) {
      return false;
    }
    if (
      children.reduce(
        (total: number, child: any) =>
          total +
          (isNode ? child.node.products.totalCount : child.products.totalCount),
        0
      ) > 0
    ) {
      return true;
    } else {
      return false;
    }
  }

  @Watch("internalValue", { deep: true, immediate: true })
  handleInternalValueChange(val: any, oldVal: any) {
    if (!this.lock) {
      this.$emit("input", val);
    }
    this.lock = false;
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
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    label {
      flex: 1;
    }
  }
}

.nested-list-close {
  display: inline-block;
  // margin-left: 77%;
}

.checkbox-nested {
  margin-left: 20px;
  width: 100%;
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
</style>
