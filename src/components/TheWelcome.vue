<template>
  <main>
    <Nav></Nav>
    <div
      class="container mt-5 d-flex justify-content-center align-items-center"
    >
      <h1 class="text-center mt-5">Destinasi Wisata</h1>
      <div class="container mt-5">
        <div class="row">
          <div class="col-3" v-for="des in destinations" :key="des.id">
            <div class="card">
              <img :src="des.foto" alt="" class="card-image-top" />
              <div class="card-body">
                <h3 class="card-title">{{ des.nama }}</h3>
              </div>
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

/* main {
    background-image: url("../../public/img/alam.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
} */
</style>

<script>
import axios from "axios";

export default {
  data() {
    return {
      destinations: [],
      token: localStorage.getItem("token"),
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
        .get("http://127.0.0.1:8000/api/v1/destination", { headers })
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
