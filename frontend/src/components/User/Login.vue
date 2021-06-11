<template>
    <v-app class="login ma-auto mt-6">
        <v-card raised>
            <v-card-text>
                <v-form ref="form" v-model="valid">
                    <v-text-field
                        v-model="dataLogin.email"
                        :rules="emailRules"
                        label="Email"
                        prepend-icon="mdi-at"
                        color="blue"
                        required
                        autofocus
                    ></v-text-field>
                    <v-text-field
                        v-model="dataLogin.password"
                        :rules="passRules"
                        type="password"
                        label="Mot de passe"
                        prepend-icon="mdi-lock-outline"
                        color="blue"
                        required
                    ></v-text-field>
                </v-form>
            </v-card-text>

            <v-btn :disabled="!valid" class="success mb-3" @click="sendLogin()">Valider</v-btn>
            <p v-if="msg">{{ message }}</p>
        </v-card>
    </v-app>
</template>

<script>
import axios from "axios";

export default {
    name: "Login",
    data() {
        return {
            valid: true,
            emailRules: [(v) => !!v || "Saisir votre Email", (v) => /.+@.+\..+/.test(v) || "Email invalide"],
            passRules: [(v) => !!v || "Saisir votre mot de passe"],
            dataLogin: {
                email: "",
                password: "",
            },
            dataLoginS: "",
            msg: false,
            message: "",
        };
    },
    methods: {
        sendLogin() {
            this.dataLoginS = JSON.stringify(this.dataLogin);
            axios
                .post("http://localhost:5000/api/user/login", this.dataLoginS, { headers: { "Content-Type": "application/json" } })
                .then((response) => {
                    let log = JSON.parse(response.data);
                    localStorage.userId = log.userId;
                    localStorage.token = log.token;
                    localStorage.moderation = log.moderation;
                    this.$router.push("/Accueil");
                })
                .catch((error) => {
                    console.log(error);
                    this.message = `Veuillez vérifier vos données`;
                    this.msg = true;
                });
        },
    },
};
</script>
<style lang="scss">
.login {
    position: absolute;
    top: 40%;
    width: 350px;
    height: 200px;
    text-align: center;
}
</style>
