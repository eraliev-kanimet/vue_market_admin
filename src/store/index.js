import {createStore} from "vuex";
import {isAuth} from "@/utils/resourse";
import {authModule} from "@/store/authModule";
import {categoryModule} from "@/store/categoryModule";

export default createStore({
    state: () => ({
        token: isAuth(),
        errors: {
            errors: [],
            active: false
        }
    }),
    mutations: {
        setErrors(state, errors) {
            if (typeof errors === 'string') {
                state.errors.errors = [];
                state.errors.errors.push(errors);
            } else {
                state.errors.errors = Object.keys(errors).map(key => errors[key][0]);
            }
            state.errors.active = true;
            setTimeout(() => state.errors.active = false, 2500);
        }
    },
    modules: {
        auth: authModule,
        categories: categoryModule,
    },
    namespaced: true
});