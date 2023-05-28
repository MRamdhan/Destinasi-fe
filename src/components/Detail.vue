<template>
  <main>
    <Nav></Nav>
    <div class="container">
      <div class="img">
        <img :src="destination.foto" alt="" style="width: 100%; margin-bottom: 30px"/>
      </div>
      <h2>Tentang {{ destination.nama }}</h2>
      <br>
      <p>{{ destination.deskripsi }}</p>
    </div>
  </main>
</template>

<script setup>
import "../../src/assets/js/bootstrap.min.js";
import Nav from "./Nav.vue";
</script>

<style>
@import "../assets/css/bootstrap.min.css";

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 100px;
}

.img {
  width: 80%;
  margin-top: 12px;
  margin-left: 50px;
  display: flex;
  align-items: center;
  align-content: center;
}

</style>

<script>
import axios from "axios";
export default {
  data() {
    return {
      destination: {
        foto: "",
        nama: "",
        deskripsi: "",
        alamat: "",
        link: "",
      },
      token: localStorage.getItem("token"),
      desId: localStorage.getItem("desDetailId"),
    };
  },
  mounted() {
    this.detail();
  },
  methods: {
    async detail() {
      await axios
        .get("http://127.0.0.1:8000/api/v1/destinations/" + this.desId)
        .then((res) => {
          this.destination = res.data.destination;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
};
</script>