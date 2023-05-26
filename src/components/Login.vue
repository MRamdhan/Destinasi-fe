<template>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<div class="mt-5">
        <form class="d-flex">
            <div class="position-absolute top-50 start-50 translate-middle w-25">
                <div class="card p-4 border-2 text-black rounded-4">
                <h4 class="mb-3">LOGIN</h4>
                <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="text" name="email" id="email"  v-model="email" class="form-control" required/>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" name="password" id="password" v-model="password" class="form-control" required />
            </div>
            <div class="mt-3">
                <!-- <a class="btn btn-success rounded-4 fw-bold w-100" href="dashboardAdmin">Login</a> -->
                <button class="btn btn-success rounded-4 fw-bold w-100"  @click.prevent="login">Login</button>
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
            email:'',
            password:'',
        }
    },
    methods: {
        async login(){
            await axios.post('http://localhost:8000/api/v1/auth/login',{
                'email': this.email,
                'password': this.password,
            })
            .then((res)=>{
                const accessToken = res.data.accessToken;
                console.log(accessToken);
                localStorage.setItem('token',accessToken);
                Swal.fire({
                    icon: 'success',
                    title: 'Login Berhasil',
                });
                this.$router.push('/dashboardAdmin');
            }).catch((error)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Login Gagal',
                });
            });
        }
    },
}
</script>