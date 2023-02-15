<template>
  <h2>Redirected</h2>
</template>

<script>
import { Component, Prop, Vue } from 'nuxt-property-decorator'
@Component({
  name: 'Index',
  components: {}
})
export default class Index extends Vue {
  middleware({ redirect }) {
    return redirect('/')
    // console.log('redirected')
  }
}
</script>
<style scoped lang="scss">
</style>
