import {createRouter, createWebHistory} from "vue-router";
import MainPage from "@/pages/MainPage";
import StorePage from "@/pages/StorePage";
import NotFoundPage from "@/pages/NotFoundPage";

const routes = [
    {path: '', component: NotFoundPage},
    {path: '/admin', component: MainPage},
    {path: '/admin/store', component: StorePage},
    {path: '/:catchAll(.*)', component: NotFoundPage}
];

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;