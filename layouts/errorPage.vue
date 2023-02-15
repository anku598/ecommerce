<template>
  <div>
    <Nuxt />
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'errorPage',
  components: {},
})
export default class ErrorPage extends Vue {
  @Prop() error: any;
}
</script>
<style scoped lang="scss">
</style>