<template>
    <header>
        <router-link to="/play"><h1>Monster Slayer</h1></router-link>
        <div class="actions">
            <router-link to="/account" v-if="isAuthenticated">Account</router-link>
            <button @click="logout" v-if="isAuthenticated">Logout</button>
            <router-link to="/login" v-else>Login/Sign Up</router-link>
        </div>
    </header>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.replace('/play');
    }
  }
}
</script>

<style scoped>
header {
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 0.5rem;
  background-color: #880017;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
}

header a {
  color: #fff;
  text-decoration: none;
}

header .actions {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
}
</style>