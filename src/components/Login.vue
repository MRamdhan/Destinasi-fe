<template>
    <div class="mt-5">
      <form class="d-flex">
        <div class="position-absolute top-50 start-50 translate-middle w-25">
          <div class="card p-4 border-2 text-black rounded-4">
            <h4 class="mb-3">LOGIN</h4>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="text" name="email" id="email" v-model="email" class="form-control" required/>
            </div>
            <div class="mb-3">
              <label for="password" class="form-label">Password</label>
              <input type="password" name="password" id="password" v-model="password" class="form-control" required />
            </div>
            <div class="mt-3">
              <button class="btn btn-success rounded-4 fw-bold w-100" @click.prevent="login">Login</button>
            </div>
          </div>
        </div>
      </form>
    </div>
</template>
  
  <script>
  import axios from 'axios'
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      }
    },
    methods: {
      async login() {
        await axios.post('http://localhost:8000/api/v1/auth/login', {
            'email': this.email,
            'password': this.password,
          })
          .then((res) => {
            const accessToken = res.data.accessToken;
            console.log(accessToken);
            localStorage.setItem('token', accessToken);
            Swal.fire({
              icon: 'success',
              title: 'Login Berhasil',
            });
            this.loginAsAdmin(); // Panggil metode loginAsAdmin() setelah login berhasil
            this.$router.push('/dashboardAdmin');
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Login Gagal',
            });
          });
      },
      loginAsAdmin() {
        // Proses login sebagai admin
        this.$root.isAdmin = true; // Atur nilai isAdmin menjadi true setelah berhasil login
      },
    },
  }
</script>