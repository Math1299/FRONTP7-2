import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../components/Auth";
import Accueil from "../components/Accueil";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Auth",
        component: Auth,
    },

    { path: "/Accueil", name: "Accueil", component: Accueil },

    {},
];

const router = new VueRouter({
    routes,
    mode: "history",
});

export default router;
