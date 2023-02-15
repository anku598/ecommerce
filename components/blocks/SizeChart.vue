<template>
  <div class="size-chart">
    <div class="size-details">
      <div class="size-content-section">
        <header>
          <h2>Size chart</h2>
          <a href="#" class="close" v-on:click.prevent="$emit('toggle-chart')">
            <img src="@/assets/img/cross.svg" alt />
          </a>
        </header>

        <div class="row">
          <div class="col-md-3 col-lg-3 col-sm-12 pl-0">
            <div class="section-left">
              <div class="row do_only_md">
                <div class="col-md-12 col-sm-12 col-lg-12 pl-0">
                  <img :src="sizeChart.image.url" alt="measurement" />
                </div>
                <!-- <div class="col-md-7 col-sm-12 col-lg-7">
                  <ul class="body-name">
                    <li>
                      <h3>1. Bust</h3>
                      <p>Measure the fullest part and across the shoulder</p>
                    </li>

                    <li>
                      <h3>1. Bust</h3>
                      <p>Measure the fullest part and across the shoulder</p>
                    </li>

                    <li>
                      <h3>1. Bust</h3>
                      <p>Measure the fullest part and across the shoulder</p>
                    </li>

                    <li>
                      <h3>1. Bust</h3>
                      <p>Measure the fullest part and across the shoulder</p>
                    </li>

                    <li>
                      <h3>1. Bust</h3>
                      <p>Measure the fullest part and across the shoulder</p>
                    </li>
                  </ul>
                </div> -->
              </div>
            </div>
          </div>
          <div class="col-md-9 col-lg-9 col-sm-12">
            <div class="section-right">
              <!-- <div class="tab-link">
                <a href="#" class="active">Inches</a>
                <a href="#">CM</a>
              </div> -->

              <!-- <div class="table-head">
                <div class="t-head">
                  <h3
                    class="name"
                    v-for="(column, idx) in sizeChart.table.columns"
                    :key="'fg' + idx"
                  >
                    {{ column.name }}
                  </h3>
                </div>
                <div class="t-body">
                  <ul
                    class="table-list"
                    v-for="(row, idx) in sizeChart.table.rows"
                    :key="'rs' + idx"
                  >
                    <li v-for="(row_item, ridx) in row" :key="'rrsss' + ridx">
                      {{ row_item }}
                    </li>
                  </ul>
                </div>
              </div> -->

              <div
                class="table-responsive-sm table-responsive-xl table-responsive-lg table-responsive-md"
              >
                <table class="table">
                  <thead>
                    <tr>
                      <th
                        v-for="(column, idx) in sizeChart.table.columns"
                        :key="'fg' + idx"
                        scope="col"
                      >
                        {{ column.name }}
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="(row, idx) in sizeChart.table.rows"
                      :key="'rs' + idx"
                    >
                      <td v-for="(row_item, ridx) in row" :key="'rrsss' + ridx">
                        {{ row_item }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- <div>
                <b-table
                  responsive
                  :items="sizeChart.table.rows"
                  :fields="columnName"
                ></b-table>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="size-bg" v-on:click.prevent="$emit('toggle-chart')"></div>
  </div>
</template>
 
<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'SizeChart',
  components: {},
})
export default class SizeChart extends Vue {
  @Prop() sizeChart: any;

  get columnName() {
    return this.sizeChart.table.columns.map((item: any) => {
      return item.name;
    });
  }
}
</script>
<style scoped lang="scss">
.size-chart {
  position: fixed;
  top: 0px;
  left: 0;
  min-height: 100%;
  width: 100%;
  z-index: 5;
  overflow-y: hidden !important;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  .size-details {
    background: #fff;
    width: 100%;
    margin: 0 auto;
    height: auto;
    padding: 4rem 0;
    margin-top: 123px;
    padding-top: 5rem;

    @include mediaMd {
      margin-top: 70px;
    }
    @include mediaSm {
      margin-top: 142px;
      padding-top: 1rem;
    }
    @include mediaXs {
      position: absolute;
      height: calc(100vh - 120px);
      width: 100%;
      overflow-y: auto;
    }
    .size-content-section {
      width: 90%;
      margin: 0 auto;
    }
  }
}

.do_only_sm {
  @include mediaSm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.section-left {
  img {
    height: 400px;
    margin: 0 auto;
    object-fit: contain;
    @include mediaSm {
      height: 240px;
      margin: 0 auto;
    }
  }

  border-right: 1px solid rgba(0, 0, 0, 0.1);
  @include mediaSm {
    border-right: 0px solid !important;
    margin-bottom: 25px;
  }
}

.size-bg {
  flex: 1;
}

.body-name {
  display: block;
  li {
    margin-bottom: 2rem;
    &:last-child {
      margin-bottom: 0;
    }
    h3 {
      margin: 0;
      font-family: $font-family-h;
      font-weight: 500;
      text-transform: uppercase;
      font-size: 1.1rem;
      @include mediaMd {
        font-size: 15px;
      }

      @include mediaSm {
        font-size: 15px;
      }
    }
    p {
      margin-bottom: 0;
      display: block;
      @include mediaMd {
        margin-top: 6px;
      }

      @include mediaSm {
        margin-top: 6px;
      }
    }
  }
}

tr {
  text-align: center;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  @include mediaSm {
    width: 90%;
    margin: 0 auto;
    margin-top: 20px;
  }
  h2 {
    font-family: $font-family-h;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1.3rem;
    @include mediaXs {
      font-size: 1rem;
    }
  }
}

.section-right {
  margin-left: 4rem;
  @include mediaMd {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }

  @include mediaSm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-left: 0;
  }
}

.tab-link {
  display: inline-flex;
  position: relative;
  &:before {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 2px;
    content: '';
    background: rgba(0, 0, 0, 0.3);
  }
  a {
    font-family: $font-family-base;
    text-transform: uppercase;
    margin-right: 20px;
    padding-bottom: 5px;
    &.active {
      border-bottom: 2px solid #000;
    }
  }
}

::v-deep .table ::v-deep th {
  border-top: 0px solid #000 !important;
}

.table-head {
  max-width: 70%;
  @include mediaMd {
    max-width: 100%;
    width: 100%;
  }

  @include mediaSm {
    max-width: 100%;
    width: 100%;
  }
}
.t-head {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
}

.t-body {
  // display: flex;
  // justify-content: space-between;
}

.name {
  font-family: $font-family-h;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 1rem;
}

.table-list {
  border-bottom: 1px solid rgba(112, 112, 112, 0.3);
  display: flex;
  justify-content: space-between;
  &:first-child {
    border-top: 1px solid rgba(112, 112, 112, 0.3);
  }
  &:last-child {
    border-bottom: 0px solid rgba(112, 112, 112, 0.3);
  }
  li {
    padding: 18px 5px;
    text-transform: uppercase;
    font-family: $font-family-h;
    font-weight: 500;
  }
}
</style>