<template>
  <div>
    <div class="info-card" v-if="address">
      <img
        src="~/assets/img/edit.svg"
        alt=""
        class="edit-btn"
        @click.prevent="$emit('edit')"
      />
      <div class="name">{{ address.firstName }} {{ address.lastName }}</div>
      <p class="address">
        {{ address.streetAddress1 }}
        {{ address.streetAddress2 }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "nuxt-property-decorator";
import { Address } from "../../graphqlTypes";

@Component({
  name: "AddressCard",
})
export default class AddressCard extends Vue {
  @Prop() address!: Address;
}
</script>


<style lang="scss" scoped>
.info-card {
  position: relative;
  background: #f6f6f6;
  color: $color-black;
  display: flex;
  flex-direction: column;
  padding: 4rem 3rem;
  min-height: 200px;
  margin-bottom: 20px;

  .edit-btn {
    width: 16px;
    height: auto;
    position: absolute;
    top: 5px;
    right: 5px;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }

  @include mediaXs {
    display: flex;
    justify-content: center;
    padding: 0rem 3rem;
    min-height: 150px;
  }
  .name {
    font-family: $font-family-base;
    font-size: 1.1rem;
  }
}

.selected {
  .info-card {
    border: 2px solid #0e1224;
  }
}
</style>
