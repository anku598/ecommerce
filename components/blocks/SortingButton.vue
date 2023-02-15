<template>
  <div>
    <div class="dropdown-btn desktop">
      <div class="default-header" @click.prevent="open = !open">
        <p href="#">
          SORT BY: {{ selectedLabel }}
          <!-- SORT BY -->
        </p>
        <div class="s-dropdown-icon" :class="{ isActive: open == true }">
          <img src="@/assets/img/dropdown-icon.svg" alt />
        </div>
      </div>

      <transition
        name="expand"
        @enter="enterSelectDropdown"
        @after-enter="afterEnterSelectDropdown"
        @leave="leaveSelectDropdown"
      >
        <ul v-if="open">
          <li
            v-for="(option, idx) in options"
            :key="'f' + idx"
            @click.prevent="handleSelection(option)"
          >
            <p>{{ option.label }}</p>
          </li>
        </ul>
      </transition>
    </div>

    <div class="mobile">
      <div class="dropdown-btn">
        <div class="default-header" @click.prevent="open = !open">
          <p href="#">SORT BY: {{ selectedLabel }}</p>
          <div class="s-dropdown-icon" :class="{ isActive: open == true }">
            <img src="@/assets/img/dropdown-icon.svg" alt />
          </div>
        </div>
      </div>

      <transition
        name="expand"
        @enter="enterSelectDropdown"
        @after-enter="afterEnterSelectDropdown"
        @leave="leaveSelectDropdown"
      >
        <ul v-if="open">
          <li
            v-for="(option, idx) in options"
            :key="'f' + idx"
            @click.prevent="handleSelection(option)"
          >
            <p>{{ option.label }}</p>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import { OrderDirection, ProductOrderField } from "~/graphqlTypes";
@Component({
  name: "SortingButton",
  components: {},
})
export default class SortingButton extends Vue {
  @Prop() value!: any;
  open: boolean = false;
  options: any[] = [
    {
      label: "Price Low to High",
      value: {
        field: ProductOrderField.MinimalPrice,
        direction: OrderDirection.Asc,
      },
    },
    {
      label: "Price High to Low",
      value: {
        field: ProductOrderField.MinimalPrice,
        direction: OrderDirection.Desc,
      },
    },
    {
      label: "Latest",
      value: {
        field: ProductOrderField.PublicationDate,
        direction: OrderDirection.Desc,
      },
    },
  ];

  handleSelection(opt: any) {
    this.$emit("input", opt.value);
    this.open = false;
  }

  get selectedLabel() {
    if (!this.value) {
      return "";
    } else {
      const lObj: any = this.options.find((val: any) => {
        return (
          val.value.field == this.value.field &&
          val.value.direction == this.value.direction
        );
      });
      if (lObj) {
        return lObj.label;
      } else {
        return "";
      }
    }
  }

  enterSelectDropdown(el: any) {
    el.style.height = "auto";
    const height = getComputedStyle(el).height;
    el.style.height = 0;

    getComputedStyle(el);

    setTimeout(() => {
      el.style.height = height;
    });
  }

  afterEnterSelectDropdown(el: any) {
    el.style.height = "auto";
  }

  leaveSelectDropdown(el: any) {
    el.style.height = getComputedStyle(el).height;
    getComputedStyle(el);
    setTimeout(() => {
      el.style.height = 0;
    });
  }
}
</script>
<style scoped lang="scss">
.desktop {
  display: none;
  @media screen and (min-width: 991.98px) {
    display: block;
  }
}

.mobile {
  display: block;
  @media screen and (min-width: 991.98px) {
    display: none;
  }

  ul {
    position: fixed;
    background: #fff;
    width: 100%;
    left: 0;
    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    margin-top: -21px;
    z-index: 20;
    top: 192px;
    li {
      padding: 12px 15px;
      transition: all 0.5s ease-out;
      &:hover {
        background: #f6f6f6;
      }
      a {
        color: $font-family-h;
        font-family: $font-family-h;
        font-weight: 400;
        font-size: 15px;
        text-transform: initial;
      }
    }
  }

  .dropdown-btn {
    width: 146x !important;
    position: fixed;
    top: 133px;
    left: 6px;
    z-index: 21;
    right: 0;
    margin-left: auto;
  }
}
.dropdown-btn {
  position: relative;
  width: 250px;
  border: 1px solid lighten($color: $color-lightgray, $amount: 30);
  font-family: $font-family-h;
  font-weight: 400;
  font-size: 0.95rem;
  color: $color-dark-blue;
  cursor: pointer;

  @include mediaXs {
    width: 200px;
    font-size: 0.75rem;
    border: 0px;
  }

  .default-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 15px;
    .s-dropdown-icon {
      width: 12px;
      transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
      &.isActive {
        transform: rotate(180deg);
      }
    }
  }

  ul {
    position: absolute;
    top: 102%;
    transform: translateY(-50);
    z-index: 5;
    background: #fff;
    width: 100%;
    left: 0;
    -webkit-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    -moz-box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
    li {
      padding: 12px 15px;
      transition: all 0.5s ease-out;
      &:hover {
        background: #f6f6f6;
      }
      a {
        color: $font-family-h;
        font-family: $font-family-h;
        font-weight: 400;
        font-size: 15px;
        text-transform: initial;
      }
    }
  }
}

.expand-enter-active,
.expand-leave-active {
  transition: height 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  overflow: hidden;
}
</style>
