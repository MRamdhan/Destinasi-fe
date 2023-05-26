<template>
    <form class="d-flex">
            <div class="position-absolute top-50 start-50 translate-middle w-50">
                <div class="card p-4 border-2 text-black rounded-4">
                <h4 class="mt-5" style="text-align: center;">Tambah Destinasi</h4>
            <div class="mb-3">
                <label for="foto" class="form-label">Foto</label>
                <input type="text" class="form-control" v-model="foto" />
            </div>
            <div class="mb-3">
                <label for="nama" class="form-label">Nama</label>
                <input type="text" class="form-control" v-model="nama" />
            </div>
            <div class="mb-3">
                <label for="alamat" class="form-label">Alamat</label>
                <textarea name="alamat" id="alamat" cols="30" rows="3" class="form-control" style="resize: none" v-model="alamat"></textarea>
            </div>
            <div class="mb-3">
                <label for="link" class="form-label">Link</label>
                <input type="text" class="form-control" v-model="link" />
            </div>
            <div class="mb-3">
                <label for="deskripsi" class="form-label">Deskripsi</label>
                <textarea name="deskripsi" id="deskripsi" cols="30" rows="3" class="form-control" style="resize: none" v-model="deskripsi"></textarea>
            </div>
            <div class="mt-3">
                <button class="btn btn-success rounded-4 fw-bold w-100"  @click.prevent="tambah">Tambah</button>
            </div>
            <div class="mt-3">
                <a href="/dashboardAdmin" class="btn btn-secondary rounded-4 fw-bold w-50" > Back</a>
            </div>
            </div>
        </div>
        </form>
</template> 

<script setup>
import "../../src/assets/js/bootstrap.min.js";
</script>

<style>
@import "../assets/css/bootstrap.min.css";
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      foto: "",
      nama: "",
      alamat: "",
      link: "",
      deskripsi: "",
      token: localStorage.getItem("token"),
    };
  },
  methods: {
    tambah() {
      const data = {
        foto: this.foto,
        nama: this.nama,
        alamat: this.alamat,
        link: this.link,
        deskripsi: this.deskripsi,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      };
      axios
        .post("http://127.0.0.1:8000/api/v1/destination", data, config)
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Berhasil ditambahkan!",
          });
          this.$router.push("/dashboardAdmin");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
  },
};
</script>
