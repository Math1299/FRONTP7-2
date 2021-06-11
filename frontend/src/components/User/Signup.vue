<template>
    <v-app class="signup ma-auto mt-6" v-if="form">
        <v-card class="signup__card" raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model="dataSignup.firstName"
                        :rules="firstNameRules"
                        label="Prénom"
                        prepend-icon="mdi-account-outline"
                        color="black"
                        autofocus
                        required
                    ></v-text-field>
                    <v-text-field
                        v-model="dataSignup.lastName"
                        :rules="lastNameRules"
                        label="Nom"
                        prepend-icon="mdi-account-outline"
                        color="black"
                        required
                    ></v-text-field>
                    <v-text-field v-model="dataSignup.email" :rules="emailRules" label="e-mail" prepend-icon="mdi-at" color="black" required></v-text-field>
                    <v-text-field
                        v-model="dataSignup.password"
                        :rules="passRules"
                        error-count="4"
                        type="password"
                        label="Mot de passe"
                        prepend-icon="mdi-lock-outline"
                        color="black"
                        required
                    ></v-text-field>
                </v-form>
                <v-btn :disabled="!valid" class="success mb-3" @click="sendSignup()">Valider</v-btn>
                <p v-if="msg">{{ message }}</p>
            </v-card-text>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios";

export default {
    name: "Signup",
    data() {
        return {
            valid: true,
            firstNameRules: [(v) => !!v || "Renseignez votre prénom", (v) => /^[A-Za-z]+$/.test(v) || "Votre prénom n'est pas valide"],
            lastNameRules: [(v) => !!v || "Renseignez votre nom", (v) => /^[A-Za-z]+$/.test(v) || "Votre nom n'est pas valide"],
            emailRules: [(v) => !!v || "Renseignez votre e-mail", (v) => /.+@.+\..+/.test(v) || "Votre e-mail n'est pas valide"],
            passRules: [
                (v) => !!v || "Renseignez votre mot de passe",
                (v) => (v && v.length >= 5) || "5 caractères minimun",
                (v) => /(?=.*[A-Z])/.test(v) || "Au moins une majuscule",
                (v) => /(?=.*\d)/.test(v) || "Au moins un chiffre",
            ],
            dataSignup: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
            },
            dataSignupS: "",
            form: true,
            msg: false,
            message: "",
        };
    },
    methods: {
        sendSignup() {
            this.dataSignupS = JSON.stringify(this.dataSignup);
            axios
                .post("http://localhost:5000/api/user/signup", this.dataSignupS, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    let sign = JSON.stringify(response.data);
                    this.message = sign.message;
                    this.form = false;
                    this.msg = true;
                })
                .catch((error) => {
                    console.log(error);
                    this.message = error;
                    this.msg = true;
                });
        },
    },
};
</script>
<style lang="scss">
.signup {
    position: absolute;
    top: 40%;
    width: 350px;
    height: 200px;
    text-align: center;
}
</style>
