<template>
  <div v-if="loading" class="loading-page">
    <h2>Loading Screen {{ isFirst }}</h2>
  </div>
</template>
 
<script lang='ts'>
import { Getter, Mutation } from 'nuxt-property-decorator';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IS_FIRST_LOAD } from '~/utils/store/getters.names';
import { SET_IS_FIRST_LOAD } from '~/utils/store/mutations.names';
import { namespaced, NS_ANIM } from '~/utils/store/namespaces.names';
import NuxtLoading from './NuxtLoading.vue';
@Component({
  name: 'LoadingBar',
  components: {
    NuxtLoading,
  },
})
export default class LoadingBar extends Vue {
  loading: boolean = false;
  @Getter(namespaced(NS_ANIM, IS_FIRST_LOAD)) isFirst!: boolean;
  @Mutation(namespaced(NS_ANIM, SET_IS_FIRST_LOAD)) setFirstLoad!: any;

  start() {
    this.loading = true;
  }
  finish() {
    this.loading = false;
    if (this.isFirst) {
      this.setFirstLoad(false);
    }
  }
}
</script>
<style scoped lang="scss">
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: red;
  text-align: center;
  font-size: 30px;
  font-family: sans-serif;
  z-index: 5000;
}
</style>