<template>
  <div class="profile-nav" v-on:click.prevent="$emit('toggle-profile')">
    <div class="profile-wrapper">
      <!-- <h2>{{ profile.user.full_name }}</h2> -->
      <div class="settings-nav">
        <nuxt-link to="/user/profile">My profile</nuxt-link>
        <!-- <nuxt-link to="/user/orders">Orders</nuxt-link>
        <nuxt-link to="/user/newsletter">newsletter</nuxt-link> -->
        <a href="#" @click.prevent="logout()">Logout</a>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Action, Component, Getter, Prop, Vue } from 'nuxt-property-decorator';
import { LOGOUT } from '~/utils/store/actions.names';
import { PROFILE } from '~/utils/store/getters.names';
import { namespaced, NS_USER } from '~/utils/store/namespaces.names';

@Component({
  name: 'ProfileNavComp',
  components: {},
})
export default class ProfileNavComp extends Vue {
  @Action(`user/${LOGOUT}`) logoutAction: any;
  @Getter(namespaced(NS_USER, PROFILE)) profile: any;

  logout() {
    this.logoutAction().then(() => {
      this.$router.push('/');
    });
  }
}
</script>
<style scoped lang="scss">
.profile-nav {
  position: fixed;
  top: 32px;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 5;
  background: rgba(0, 0, 0, 0.5);

  @include mediaSm {
    top: 90px;
  }

  .profile-wrapper {
    width: 450px;
    background: #fff;
    padding: 2rem 3rem;
    z-index: 5;
    position: absolute;
    top: 0;
    right: 0;
    @include mediaSm {
      width: 100%;
      padding: 5% 6%;
      text-align: right;
      border-top: 0.5px solid rgba(0, 0, 0, 0.1);
    }
  }
}

.settings-nav {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
  a {
    padding-bottom: 1.2rem;
    font-family: $font-family-h;
    font-weight: 400;
    font-size: 0.9rem;
    text-transform: capitalize;
    color: $color-secondary;
    line-height: 25px;
  }
}

h2 {
  font-family: $font-family-base;
  text-transform: uppercase;
  font-size: 1.3rem;
}
</style>
