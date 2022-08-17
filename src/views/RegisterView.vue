<template>
    <div>
        <h2>Registro de Usuário</h2>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                
                <p></p>
                <p>Nome</p>                
                <input type="text" placeholder="Nome do Usuário" class="input" v-model="name"/>
                <p>Email</p>
                <input type="text" placeholder="email@email.com" class="input" v-model="email"/>
                <p>Senha</p>
                <input type="password" placeholder="******" class="input" v-model="password"/>
                <hr>
                <button class="button is-success" @click="register">Cadastrar</button>
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
            name: '',
            password: '',
            email: '',
            error: undefined
        }
    },
    methods:{    
        register(){
            axios.post("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                password: this.password
            }).then(res =>{
                console.log(res);
                // this.$route.push({name:'home'});
                this.$router.push({name:'home'});
                // this.$router.push({name: 'Home'})
            }).catch(err => {
                var msgErr = err.response.data.err;
                this.error = msgErr;
                // console.log(msgErr);
            })
            console.log(this.name);
            console.log(this.email);
            console.log(this.password);
        }
    }
}
</script>



<style scoped>

</style>