<template>
    <nav class="nav" style="background-color: black" >
        <a class ="nav-link text-white " href="/"> Home </a>
        <a class ="nav-link text-white " href="/login"> Login </a>
    </nav>    
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
        token: localStorage.getItem("token"),
    };
},
  methods: {
    async logout(){
        const headers = {
        Authorization: "Bearer " + this.token,
      };
       axios
        .post("http://localhost:8000/api/v1/auth/logout",{}, { headers })
        .then(() => {
          localStorage.removeItem("token");
          this.$router.push("/");
        })
        .catch((err) => {
          alert(err);
        });
        }
    }
  }

</script>