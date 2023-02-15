<template>
  <div class="medias-lovegen">
    <div class="container-fluid p-0">
      <div class="row">
        <div
          class="medias-showcase col-md-4 col-sm-6 col-xl-3 d-flex justify-content-center"
          v-for="(item, idx) of results"
          :key="'der' + idx"
        >
          <SingleMediaImageBlock :comp-data="item" />
        </div>
      </div>
    </div>
    <div class="load-more">
      <!-- <a href="#"></a> -->
    </div>
  </div>
</template>
 
<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from 'nuxt-property-decorator';
import { FETCH_MEDIA_ITEM } from '~/utils/store/actions.names';
import { namespaced } from '~/utils/store/namespaces.names';
import { MediaItem } from '~/utils/store/store.types';
@Component({
  name: 'MediaItemList',
  components: {},
})
export default class MediaItemList extends Vue {
  @Prop() compData: any;
  @Action(namespaced('medias', FETCH_MEDIA_ITEM)) fetchMediaitem: any;
  results: any = [];

  async fetch() {
    this.results = await this.fetchMediaitem();
  }
}
</script>
<style scoped lang="scss">
.medias-lovegen {
  width: 95%;
  margin: 0 auto;
  margin-top: 100px;
}
.medias-showcase {
  margin-bottom: 100px;
}
</style>