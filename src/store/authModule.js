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
                if (response.data.admin) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('admin_key', response.data.admin);
                    window.location.href = "/admin";
                } else {
                    this.commit('setErrors', 'У вас нет доступа');
                }
            }).catch(error => {
                if (error.response.status === 422) {
                    this.commit('setErrors', error.response.data.errors);
                } else if (error.response.status === 401) {
                    this.commit('setErrors', 'У вас нет доступа');
                } else {
                    this.commit('setErrors', 'Введите данные правильно!');
                }
            });
        }
    },
    namespaced: true
}