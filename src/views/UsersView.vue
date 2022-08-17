<template>
    <div>
        <h1>Painel Adm</h1>
        
        <table class="table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Cargo</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id">
                    <th>{{user.name}}</th>
                    <th>{{user.email}}</th>
                    <th>{{ processRole(user.role) }}</th>
                    <th>
                        <router-link :to="{name: 'UserEdit', params: {id: user.id}}">
                            <button class="button is-success">Editar</button>
                        </router-link>
                        <button class="button is-danger" @click="showModalUser(user.id)">Deletar</button>
                    </th>
                </tr>
            </tbody>
        </table>
        

        <div :class="{modal: true, 'is-active': showModal }">
            <div class="modal-background"></div>
            <div class="modal-content">
                
                <div class="card">
                    <header class="card-header">
                        <p class="class-header-title">
                            Você quer realmente deletar este usuário?
                        </p>
                    </header>
                    <div class="class-content">
                        <div class="content">
                            <p>klajsdlkas lkasjdlsa</p>
                        </div>
                    </div>
                    <footer>
                        <a href="#" class="card-footer-item" @click="hideModal()">Cancelar</a>
                        <a href="#" class="card-footer-item" @click="deleteUser()">Sim, quero deletar</a>
                    </footer>
                </div>
            </div>
            <button class="modal-close is-large" aria-label="close" @click="hideModal()"></button>
            
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    created(){
        var req = { headers: { Authorization: "Bearer " + localStorage.getItem('token') } };
        axios.get("http://localhost:8686/user",req).then(res =>{
            this.users = res.data

        }).catch(err => {
            console.log(err);
        })
        console.log("Olá");
    },
    data() {
        return {
            users: [],
            showModal: false,
            deleteUserId: -1
        }
        
    },
    methods: {
        processRole: function(value){
            if(value == 0){
                return "Usuário Comum";
            } else {
                return "Admin";
            }
        },
        hideModal(){
            this.showModal = false;
        },
        showModalUser(id){
            this.deleteUserId = id;
            console.log("Id: " + id);
            this.showModal = true;
        },
        deleteUser(){
            var req = { headers: { Authorization: "Bearer " + localStorage.getItem('token') } };
            axios.delete("http://localhost:8686/user/"+this.deleteUserId,req).then(res => {
                console.log(res);
                this.showModal = false;
                this.users = this.users.filter(u => u.id != this.deleteUserId);

            }).catch(err=>{
                console.log(err);
            })
        }
    }
}

</script>


<style scoped>

</style>