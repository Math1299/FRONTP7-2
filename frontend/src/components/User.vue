<template>
    <v-app id="user">
        <v-container class="user d-flex flex-column justify-content-center align-items-center">
            <div class="button d-flex justify-content-around">
                <v-btn type="button" class="btn btn-dark" @click="component = 'signup'">S'inscrire</v-btn>
                <v-btn type="button" class="btn btn-dark" @click="component = 'login'">Se connecter</v-btn>
            </div>
            <div class="logo"></div>
            <component v-bind:is="component"></component>
        </v-container>
    </v-app>
</template>

<script>
import Signup from "./User/Signup.vue";
import Login from "./User/Login.vue";

export default {
    name: "User",
    data() {
        return {
            component: "",
        };
    },

    components: {
        login: Login,
        signup: Signup,
    },
};
</script>

<style lang="scss">
#user {
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
.user {
    width: 100%;
    height: 80vh;
}
.button {
    width: 100%;
    height: 5vh;
}
.logo {
    width: 70%;
    height: 40%;
    background-image: url("../assets/icon-left-font-monochrome-black.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    right: 15%;
    top: 40%;
}
</style>
