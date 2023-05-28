<template>
  <nav class="nav" style="background-color: black">
    <a class="nav-link text-white" href="/">Home</a>
    <a v-if="!isAdmin" class="nav-link text-white" href="/login">Admin</a>
    <a v-if="isAdmin" class="nav-link text-white" href="/" @click.prevent="logout">Logout</a>
    <a v-if="isAdmin" class="nav-link text-white" href="/dashboardAdmin">Admin</a>
  </nav>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      token: localStorage.getItem('token'),
      isAdmin: false,
    };
  },
  mounted() {
    this.checkAdminStatus();
  },
  methods: {
    checkAdminStatus() {
      if (this.token) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
    async logout() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .post("http://localhost:8000/api/v1/auth/logout", {}, { headers })
        .then(() => {
          localStorage.removeItem('token');
          this.isAdmin = false;          
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
};
</script>