<template>
  <div v-if="methods">
    <form>
      <p v-for="(method, idx) in methods">
        <input
          type="radio"
          :id="`method_${idx}`"
          name="radio-group"
          v-model="internalValue"
          :value="method"
        />
        <label :for="`method_${idx}`"
          >{{ method.name }} | {{ method.price.currency }}
          {{ method.price.amount }}</label
        >
      </p>
    </form>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue, Watch } from "nuxt-property-decorator";
import { ShippingMethod } from "~/graphqlTypes";
@Component({
  name: "ShippingInput",
  components: {},
})
export default class ShippingInput extends Vue {
  @Prop() methods!: ShippingMethod[];
  @Prop() value!: ShippingMethod | null;
  internalValue: ShippingMethod | null = null;
  lock: boolean = false;

  @Watch("value", { immediate: true, deep: true })
  handleValueChange(val: any, oldVal: any) {
    this.lock = true;
    this.$set(this, "internalValue", JSON.parse(JSON.stringify(val)));
  }

  @Watch("internalValue", { immediate: true, deep: true })
  handleInternalValueChange(val: any, oldVal: any) {
    if (!this.lock) {
      this.$emit("input", val);
    }
    this.lock = false;
  }
}
</script>
<style scoped lang="scss">
[type="radio"]:checked,
[type="radio"]:not(:checked) {
  position: absolute;
  left: -9999px;
}
[type="radio"]:checked + label,
[type="radio"]:not(:checked) + label {
  position: relative;
  padding-left: 28px;
  cursor: pointer;
  line-height: 20px;
  @include productPrice;
  display: block;
  background: #f6f6f6;
  padding: 20px;
  padding-left: 45px;
  cursor: pointer;
}
[type="radio"]:checked + label:before,
[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 15px;
  top: 50%;
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  border-radius: 100%;
  background: #fff;
  transform: translateY(-50%);
}
[type="radio"]:checked + label:after,
[type="radio"]:not(:checked) + label:after {
  content: "";
  width: 12px;
  height: 12px;
  background: $color-dark-blue;
  position: absolute;
  top: 42%;
  left: 18px;
  border-radius: 100%;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  transform: translateY(-50%);
}
[type="radio"]:not(:checked) + label:after {
  opacity: 0;
  -webkit-transform: scale(0);
  transform: scale(0);
}
[type="radio"]:checked + label:after {
  opacity: 1;
  -webkit-transform: scale(1);
  transform: scale(1);
}

p {
  margin-bottom: 15px;
}
</style>
