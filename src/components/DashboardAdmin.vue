<template>
  <main>
    <Nav></Nav>
    <a
      href="/tambah"
      class="btn btn-success"
      style="margin-left: 100px; margin-top: 50px"
    >
      Tambah
    </a>
    <div class="container mt-5">
      <table class="table">
        <thead>
          <tr>
            <th class="col">No</th>
            <th class="col">Foto</th>
            <th class="col">Nama</th>
            <th class="col">Alamat</th>
            <th class="col">Link</th>
            <th class="col">Deskripsi</th>
            <th class="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(des, index) in destinations" :key="des.id">
            <th scope="row">{{ index + 1 }}</th>
            <td>
              <div class="embed-responsive embed-responsive-16by9">
                <img
                  :src="des.foto"
                  alt=""
                  class="card-image-top"
                  style="width: 100px"
                />
              </div>
            </td>
            <td>{{ des.nama }}</td>
            <td>{{ des.alamat }}</td>
            <td>
              <a :href="des.link" target="_blank">Klik di sini!</a>
            </td>
            <td>
              {{ des.deskripsi }}
            </td>
            <td>
              <div
                class=""
                style="position: absolute; margin-top: 10px; margin-right: 60px"
              >
              <router-link
                to="/edit"
                style="text-decoration: none; color: white"
              >
                <button class="btn btn-primary" @click="editDes(des.id)">Edit</button>
              </router-link>
                <button class="btn btn-danger" @click="delDes(des.id)">
                  Hapus
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<script setup>
import "../../src/assets/js/bootstrap.min.js";
import Nav from "./Nav.vue";
</script>

<style>
@import "../assets/css/bootstrap.min.css";
.img {
  width: 100px;
}
</style>

<script>
import axios from "axios";
import Swal from "sweetalert2";

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
    async delDes(id) {
      try {
        const result = await Swal.fire({
          title: 'Konfirmasi',
          text: 'Apakah Anda yakin ingin menghapus item ini?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Hapus',
          cancelButtonText: 'Batal',
        });

        if (result.isConfirmed) {
          const headers = {
            Authorization: 'Bearer ' + this.token,
          };

          const response = await axios.delete('http://127.0.0.1:8000/api/v1/destination/' + id, { headers });

          if (response.status === 200) {
            this.destinations = this.destinations.filter(des => des.id !== id);
            Swal.fire({
              icon: 'success',
              text: 'Berhasil dihapus!',
            });
          }
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    },
    editDes(id) {
      localStorage.setItem("editDesId", id);
    },
  },
};
</script>
