<template>
  <span v-if="link.type === null || link.link === null"><slot></slot></span>
  <nuxt-link v-else-if="link.type === 'page'" :to="transformURL(link.link)"
    ><slot></slot
  ></nuxt-link>
  <a v-else target="_blank" :href="transformURLToLocal(link.link)"
    ><slot></slot
  ></a>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from "nuxt-property-decorator";
import {
  transformURLBuilder,
  transformURLToLocalBuilder,
} from "~/utils/common";
@Component({
  name: "GenericLink",
  components: {},
})
export default class GenericLink extends Vue {
  @Prop() link: any;
  transformURL = transformURLBuilder(
    (this as any).$config.HOST,
    (this as any).$config.SITE_URL
  );
  transformURLToLocal = transformURLToLocalBuilder(
    (this as any).$config.HOST,
    (this as any).$config.SITE_URL
  );
}
</script>
<style scoped lang="scss">
</style>
