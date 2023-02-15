<template>
  <div class="profile-sidebar">
    <h2>Profile</h2>
    <ul class="profile-nav-item">
      <li>
        <nuxt-link
          active-class="prnav-active"
          exact
          :to="{ name: 'user-profile' }"
          >My Profile</nuxt-link
        >
      </li>
      <li>
        <nuxt-link
          active-class="prnav-active"
          :to="{ name: 'user-profile-orders' }"
          >Order</nuxt-link
        >
      </li>
      <!-- <li>
        <router-link :to="{ name: 'newsletter' }">Newsletter</router-link>
      </li> -->
      <!-- <li>
        <a href="#" @click.prevent="logout()">LogOut</a>
      </li> -->
    </ul>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'nuxt-property-decorator';
@Component({
  name: 'SideNav',
  components: {},
})
export default class SideNav extends Vue {}
</script>
<style scoped lang="scss">
.profile-sidebar {
  top: 123px;
  transition: all 3s ease;
  position: sticky;
  @include mediaSm {
    position: relative;
    top: 0;
  }

  h2 {
    @include productTitle;
    font-weight: 600;
    @include mediaXs {
      font-size: 1.2rem;
      display: none;
    }
  }
}

.profile-nav-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;

  @media (max-width: 991.98px) {
    flex-direction: row;
    // justify-content: space-between;
    max-width: 500px;
    margin-top: 0px;
    margin-bottom: 20px;
  }
  li {
    padding: 1rem 0;
    @include mediaSm {
      margin-right: 15px;
    }
    a {
      font-family: $font-family-h;
      font-weight: 400;
      text-transform: capitalize;
      letter-spacing: normal;
      font-size: 0.9rem;
    }
  }

  .prnav-active {
    position: relative;
    &:before {
      width: 50%;
      height: 1px;
      background: $color-black;
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translate(-120%, -50%);
      content: '';
      @include mediaXs {
        width: 100%;
        top: 120%;
        transform: translate(0%, 0%);
      }
    }
  }

  // .router-link-active {
  //   transition: all 0.5s ease-in-out;
  // }

  // .router-link-exact-active {
  //   margin-left: 39px;
  //   position: relative;

  //   &:before {
  //     width: 33px;
  //     height: 2px;
  //     background: #000;
  //     position: absolute;
  //     top: 50%;
  //     left: -40px;
  //     transform: translateY(-50%);
  //     content: '';
  //   }
  // }
}
</style>
