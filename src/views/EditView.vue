<template>
    <div>
        <h2>Edição de Usuário</h2>
        <hr>
        <div class="columns is-centered">
            <div class="column is-half">
                
                <p></p>
                <p>Nome</p>                
                <input type="text" placeholder="Nome do Usuário" class="input" v-model="name"/>
                <p>Email</p>
                <input type="text" placeholder="email@email.com" class="input" v-model="email"/>
                <hr>
                <!-- <input type="number" placeholder="-1" class="input" v-model="role"/>
                <hr> -->
                <button class="button is-success" @click="update">Editar</button>
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
    created(){
        var req = { headers: { Authorization: "Bearer " + localStorage.getItem('token') } };
        axios.get("http://localhost:8686/user/" + this.$route.params.id,req).then(res =>{
            console.log(res);
            console.log(res.data[0].name + " - " + res.data[0].email + " - " + res.data[0].id);
            this.name = res.data[0].name;
            this.email = res.data[0].email;
            this.id = res.data[0].id;
            // this.role = res.data[0].role;
        }).catch(err=> {
            console.log(err.response);
            this.$router.push({name:'Users'});
        });
    },
    data() {
        return{
            name: '',
            email: '',
            id: -1,
            // role: -1,
            error: undefined
        }
    },
    methods:{    
        update(){
            var req = { headers: { Authorization: "Bearer " + localStorage.getItem('token') } };
            axios.put("http://localhost:8686/user",{
                name: this.name,
                email: this.email,
                id: this.id
            },req).then(res =>{
                console.log(res);
                this.$router.push({name:'Users'});
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