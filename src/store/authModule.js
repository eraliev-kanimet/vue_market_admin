import {post} from "@/utils/request";

export const authModule = {
    state: () => ({
        data: {
            email: '',
            password: ''
        }
    }),
    mutations: {
        setEmail(state, value) {
            state.data.email = value.target.value;
        },
        setPassword(state, value) {
            state.data.password = value.target.value;
        }
    },
    actions: {
        submit({state}, event) {
            event.preventDefault();
            post('oauth/login', state.data).then(response => {
                if (Object.keys(response).includes('admin')) {
                    localStorage.setItem('token', response.token);
                    localStorage.setItem('admin_key', response.admin);
                    window.location.href = "/admin";
                } else if (Object.keys(response).includes('token')) {
                    this.commit('setErrors', 'У вас нет доступа');
                } else if (Object.keys(response).includes('errors')) {
                    this.commit('setErrors', response.errors);
                } else {
                    this.commit('setErrors', 'Введите данные правильно!');
                }
            });
        }
    },
    namespaced: true
}