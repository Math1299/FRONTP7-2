<template>
    <div id="profil" class="d-flex justify-center">
        <top-header />
        <v-card class="ma-15" raised width="230px" height="65%">
            <v-img class="logo" src="../../assets/icon-grey.png" width="150px" contain></v-img>
            <v-card-title class=" justify-center">
                <h1>Mon profil</h1>
            </v-card-title>

            <v-card-text class="ml-2 black--text">
                <p>Prénom : {{ dataGet.firstName }}</p>
                <p>Nom : {{ dataGet.lastName }}</p>
                <p>Email : {{ dataGet.email }}</p>
            </v-card-text>

            <v-card-actions class="d-flex justify-space-between mb-15">
                <v-btn @click.stop="dialogUp = true" title="modifier mes informations" outlined color="indigo">Modifier</v-btn>
                <v-btn @click.stop="dialogDel = true" title="supprimer mon profil" color="error">Supprimer</v-btn>
            </v-card-actions>
        </v-card>

        <v-dialog persistent v-model="dialogUp" max-width="600px">
            <v-card>
                <v-card-title>Modifier mon profil</v-card-title>
                <v-card-text>
                    <v-form ref="form" v-model="valid">
                        <v-text-field
                            v-model="dataUp.firstName"
                            :rules="firstNameRules"
                            label="Prénom"
                            prepend-icon="mdi-account-outline"
                            color="black"
                            required
                        ></v-text-field>
                        <v-text-field
                            v-model="dataUp.lastName"
                            :rules="lastNameRules"
                            label="Nom"
                            prepend-icon="mdi-account-outline"
                            color="black"
                            required
                        ></v-text-field>
                        <v-text-field v-model="dataUp.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" color="black" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-btn text @click="dialogUp = false">Annuler</v-btn>
                    <v-btn text :disabled="!valid" @click="updateUser">Valider</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDel" max-width="350px">
            <v-card>
                <v-card-title>
                    Êtes-vous sûr.e ?
                </v-card-title>
                <v-card-text>
                    <p>En supprimant votre profil, vous effacerez aussi tous vos posts ainsi que vos commentaires.</p>
                    <p>{{ msg }}</p>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text @click="dialogDel = false">
                        Annuler
                    </v-btn>
                    <v-btn text @click="deleteUser">
                        Supprimer mon profil
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import TopHeader from "./TopHeader";
import axios from "axios";

export default {
    name: "Profil",
    data() {
        return {
            dialogDel: false,
            dialogUp: false,
            msg: "",
            dataGet: {
                firstName: "",
                lastName: "",
                email: "",
            },
            dataUp: {
                firstName: "",
                lastName: "",
                email: "",
            },
            dataUpS: "",
            valid: true,
            firstNameRules: [(v) => !!v || "Renseignez votre prénom", (v) => /^[A-Za-z]+$/.test(v) || "Votre prénom n'est pas valide"],
            lastNameRules: [(v) => !!v || "Renseignez votre nom", (v) => /^[A-Za-z]+$/.test(v) || "Votre nom n'est pas valide"],
            emailRules: [(v) => !!v || "Renseignez votre e-mail", (v) => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide"],
        };
    },
    methods: {
        deleteUser() {
            axios
                .delete("http://localhost:5000/api/user/", { headers: { Authorization: "Bearer " + localStorage.token } })
                .then((response) => {
                    let rep = JSON.parse(response.data);
                    console.log(rep);
                    localStorage.userId = "";
                    localStorage.token = "";
                    this.$router.push("/");
                })
                .catch((error) => {
                    console.log(error);
                    this.msg = error;
                });
        },
        updateUser() {
            this.dataUpS = JSON.stringify(this.dataUp);
            axios
                .put("http://localhost:5000/api/user/", this.dataUpS, {
                    headers: { "Content-Type": "application/json", Authorization: "Bearer " + localStorage.token },
                })
                .then((response) => {
                    let rep = JSON.parse(response.data);
                    console.log(rep);
                    this.dialogUp = false;
                    window.location.assign("http://localhost:8080/Accueil/Profil");
                })
                .catch((error) => {
                    console.log(error);
                    this.msg = error;
                });
        },
    },
    mounted() {
        axios
            .get("http://localhost:5000/api/user/", { headers: { Authorization: "Bearer " + localStorage.token } })
            .then((response) => {
                let profil = JSON.parse(response.data);
                this.dataGet.email = profil[0].email;
                this.dataGet.firstName = profil[0].firstName;
                this.dataGet.lastName = profil[0].lastName;
                this.dataUp.email = profil[0].email;
                this.dataUp.firstName = profil[0].firstName;
                this.dataUp.lastName = profil[0].lastName;
            })
            .catch((error) => {
                console.log(error);
            });
    },

    components: {
        "top-header": TopHeader,
    },
};
</script>

<style lang="scss">
#profil {
    width: 100%;
    height: 100vh;
    background-image: linear-gradient(
            112.5deg,
            rgb(214, 214, 214) 0%,
            rgb(214, 214, 214) 10%,
            rgb(195, 195, 195) 10%,
            rgb(195, 195, 195) 53%,
            rgb(176, 176, 176) 53%,
            rgb(176, 176, 176) 55%,
            rgb(157, 157, 157) 55%,
            rgb(157, 157, 157) 60%,
            rgb(137, 137, 137) 60%,
            rgb(137, 137, 137) 88%,
            rgb(118, 118, 118) 88%,
            rgb(118, 118, 118) 91%,
            rgb(99, 99, 99) 91%,
            rgb(99, 99, 99) 100%
        ),
        linear-gradient(
            157.5deg,
            rgb(214, 214, 214) 0%,
            rgb(214, 214, 214) 10%,
            rgb(195, 195, 195) 10%,
            rgb(195, 195, 195) 53%,
            rgb(176, 176, 176) 53%,
            rgb(176, 176, 176) 55%,
            rgb(157, 157, 157) 55%,
            rgb(157, 157, 157) 60%,
            rgb(137, 137, 137) 60%,
            rgb(137, 137, 137) 88%,
            rgb(118, 118, 118) 88%,
            rgb(118, 118, 118) 91%,
            rgb(99, 99, 99) 91%,
            rgb(99, 99, 99) 100%
        ),
        linear-gradient(
            135deg,
            rgb(214, 214, 214) 0%,
            rgb(214, 214, 214) 10%,
            rgb(195, 195, 195) 10%,
            rgb(195, 195, 195) 53%,
            rgb(176, 176, 176) 53%,
            rgb(176, 176, 176) 55%,
            rgb(157, 157, 157) 55%,
            rgb(157, 157, 157) 60%,
            rgb(137, 137, 137) 60%,
            rgb(137, 137, 137) 88%,
            rgb(118, 118, 118) 88%,
            rgb(118, 118, 118) 91%,
            rgb(99, 99, 99) 91%,
            rgb(99, 99, 99) 100%
        ),
        linear-gradient(90deg, rgb(195, 195, 195), rgb(228, 228, 228));
    background-blend-mode: overlay, overlay, overlay, normal;
    display: flex;
    flex-direction: row;
}
.logo {
    top: 0;
    left: 15%;
}
@media screen and (min-width: 200px) and (max-width: 640px) {
    #profil {
        padding-left: 10%;
    }
}
</style>
