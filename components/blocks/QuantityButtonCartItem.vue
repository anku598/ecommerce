<template>
  <div class="quantity-btn">
    <button
      class="increment-button"
      @click.prevent="$emit('input', internalValue + 1)"
    >
      +
    </button>
    <input
      name="quantity"
      v-model="internalValue"
      @keypress="isNumber"
      type="text"
    />
    <button
      class="decrement-button"
      @click.prevent="$emit('input', internalValue - 1)"
    >
      −
    </button>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
@Component({
  name: "QuantityButtonCartitem",
  components: {},
})
export default class QuantityButtonCartitem extends Vue {
  @Prop() value!: number;
  internalValue: number = 0;
  lock: boolean = false;

  @Watch("value", { immediate: true })
  handleValueChange(val: any, oldVal: any) {
    this.lock = true;
    this.$set(this, "internalValue", val);
  }

  @Watch("internalValue", { deep: true })
  handleInternalValueChange(val: any, oldVal: any) {
    if (!this.lock) {
      this.$emit("input", val);
    }
    this.lock = false;
  }

  isNumber(event: any) {
    //// console.log($event.keyCode); //keyCodes value
    let keyCode = event.keyCode ? event.keyCode : event.which;
    if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
      // 46 is dot
      event.preventDefault();
    }
  }
}
</script>
<style scoped lang="scss">
.quantity-btn {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  margin-right: 13px;

  @include mediaXs {
    margin-left: 0 !important;
  }
  button {
    border-left-width: 1px;
    color: #707070;
    cursor: pointer;
    font-size: 1.3rem;
    background: transparent !important;
    line-height: 1.7;
    text-align: center;
    width: 22px;
    height: 25px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    box-shadow: 0 !important;
    border: none;
    display: flex;
    align-items: center;
    // &:first-child {
    //   border-bottom: 0px;
    //   border-right: 0px;
    //   border-top: 0px;
    // }

    // &:last-child {
    //   border-right: 0px;
    //   border-bottom: 0px;
    // }
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

  .q-amount {
    display: flex;
    align-items: center;
    p {
      font-family: $font-family-h;
      font-weight: 400;
      color: #000;
      font-size: 0.9rem;
      padding-left: 10px;
    }
  }

  .q-btn {
    display: flex;
    flex-direction: column;
  }
  // flex: 2;
  position: relative;
  @include mediaXs {
    margin-left: 31px;
  }

  input[type="text"] {
    text-align: center;
    width: 50px;
    height: auto;
    border-radius: 0%;
    border: 0px solid #f5f5f5;
    outline: none;
    text-align: center;
    margin-left: -14px;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 1rem;
  }

  .increment-button {
    background: #f5f5f5;
    // transform: translateX(60%);
  }

  .decrement-button {
    background: #f5f5f5;
  }
}
</style>
