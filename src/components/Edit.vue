<template>
    <form class="d-flex">
      <div class="position-absolute top-50 start-50 translate-middle w-50">
        <div class="card p-4 border-2 text-black rounded-4">
          <h4 class="mt-5" style="text-align: center;">Edit Destinasi</h4>
          <div class="mb-3">
            <label for="foto" class="form-label">Foto</label>
            <input type="text" class="form-control" v-model="desPH.foto" />
          </div>
          <div class="mb-3">
            <label for="nama" class="form-label">Nama</label>
            <input type="text" class="form-control" v-model="desPH.nama" />
          </div>
          <div class="mb-3">
            <label for="alamat" class="form-label">Alamat</label>
            <textarea name="alamat" id="alamat" cols="30" rows="3" class="form-control" style="resize: none" v-model="desPH.alamat"></textarea>
          </div>
          <div class="mb-3">
            <label for="link" class="form-label">Link</label>
            <input type="text" class="form-control" v-model="desPH.link" />
          </div>
          <div class="mb-3">
            <label for="deskripsi" class="form-label">Deskripsi</label>
            <textarea name="deskripsi" id="deskripsi" cols="30" rows="3" class="form-control" style="resize: none" v-model="desPH.deskripsi"></textarea>
          </div>
          <div class="mt-3">
            <button class="btn btn-success rounded-4 fw-bold w-100"  @click.prevent="edit">Edit</button>
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
      desPH: {
        foto: "",
        nama: "",
        deskripsi: "",
        alamat: "",
        link: "",
      },
      token: localStorage.getItem("token"),
      desId: localStorage.getItem("editDesId"),
    };
  },
  mounted() {
    this.placeHolder();
  },
  methods: {
    async edit() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      await axios
        .post(
          "http://127.0.0.1:8000/api/v1/destinations/" + this.desId,
          {
            foto: this.desPH.foto,
            nama: this.desPH.nama,
            alamat: this.desPH.alamat,
            link: this.desPH.link,
            deskripsi: this.desPH.deskripsi,
          },
          { headers }
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            text: "Berhasil diubah!",
          });
          this.$router.push("/dashboardAdmin");
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    },
    async placeHolder() {
      const headers = {
        Authorization: "Bearer " + this.token,
      };
      await axios
        .get("http://127.0.0.1:8000/api/v1/destinations/" + this.desId, {
          headers,
        })
        .then((res) => {
          console.log(res.data.destination);
          this.desPH = res.data.destination;
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
};
</script>
