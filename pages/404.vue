<template>
  <div class="container">
    <p>Ooops! page Not Found</p>
    <h1>404</h1>
    <NuxtLink class="btn" to="/">Go to homepage</NuxtLink>
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'Error',
  components: {},
})
export default class Error extends Vue {
  layout(context: any) {
    return 'errorPage';
  }
}
</script>
<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  height: 100vh;
}
.btn {
  border-radius: none !important;
  box-shadow: 0px;
}

h1 {
  @include responsive-font(25vw, 16px, 170px, 100px);
  margin-bottom: 20px;
}
</style>