<template>
    <div>
        <h2>Login</h2>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                
                <p></p>
                <p>Email</p>
                <input type="text" placeholder="email@email.com" class="input" v-model="email"/>
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password"/>
                <hr>
                <button class="button is-success" @click="login">Logar</button>
                <div v-if="error != undefined">
                    <hr>
                    <div class="notification is-danger">
                        {{error}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
export default {
    data() {
        return{
            password: '',
            email: '',
            error: undefined
        }
    },
    methods:{    
        login(){
            axios.post("http://localhost:8686/login",{
                email: this.email,
                password: this.password
            }).then(res =>{
                if (res.status == 200){
                    var token = res.data.token;
                    localStorage.setItem("token",token);
                    console.log(token);
                    this.$router.push({name:'home'});
                } else {
                    console.log(res.status);
                    var msgErr = res.data.err;
                    this.error = msgErr;

                }               
                
                // console.log(token);

                // this.$route.push({name:'home'});
                // this.$router.push({name:'home'});
                // this.$router.push({name: 'Home'})
            }).catch(err => {
                // console.log("Catch");
                var msgErr = err.response.data.err;
                this.error = msgErr;
                // console.log(msgErr);
            });
            console.log("Login!");
        }
    }
}
</script>



<style scoped>

</style>