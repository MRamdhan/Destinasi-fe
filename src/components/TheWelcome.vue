<template>
  <main class="fullscreen-bg">
    <Nav :isAdmin="isAdmin"></Nav>
    <div class="container mt-5">
      <h1 class="text-center ">Destinasi Wisata</h1>
      <div class="row mt-5">
        <div class="col-4" v-for="des in destinations" :key="des.id">
          <div class="card">
            <img :src="des.foto" alt="" class="card-image-top" />
            <div class="card-body">
              <h3 class="card-title">{{ des.nama }}</h3>
              <p class="card-text">{{ des.alamat }}</p>
              <router-link
                to="/detail"
                @click.prevent="detailId(des.id)"
                class="btn btn-primary"
              >
                Detail
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import "../../src/assets/js/bootstrap.min.js";
import Nav from "./Nav.vue";
</script>

<style>
@import "../assets/css/bootstrap.min.css";

.fullscreen-bg {
  min-height: 200vh;
  background-image: url("../../public/img/putih.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.card {
  margin-bottom: 20px;
}

.card-image-top {
  width: 100%;
  height: auto;
}

.card-body {
  padding: 20px;
}

.card-title {
  font-size: 24px;
  margin-bottom: 10px;
}

.card-text {
  margin-bottom: 20px;
}
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      destinations: [],
      token: localStorage.getItem("token"),
      isAdmin: false,
    };
  },
  mounted() {
    this.showDes();
  },
  methods: {
    showDes() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      axios
        .get("http://127.0.0.1:8000/api/v1/destinations", { headers })
        .then((res) => {
          this.destinations = res.data.Destination;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
    detailId(id) {
      localStorage.setItem("desDetailId", id);
    },
  },
};
</script>
