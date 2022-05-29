import {get, post, put, remove} from "@/utils/request";

export const categoryModule = {
    state: () => ({
        categories: [],
        select_categories: [],
        current: {
            id: 0,
            title: '',
            category_id: 0,
            category_title: '',
            picture: null
        },
        _new: {
            title: '',
            picture: null,
        },
        _update: {
            id: 0,
            title: '',
            picture: null,
            picture_file: null
        },
        _delete: {
            id: 0,
            title: ''
        },
        errors: {
            title: {
                active: false,
                message: 'Это поле обьязателен!'
            }
        },
        modalCreate: false,
        modalUpdate: false,
        modalDelete: false,
        isLoading: false,
        select: {
            category_id: 0,
            title: '',
            active: false,
            mode: 'create'
        }
    }),
    getters: {
        getSelectCategoriesList(state) {
            if (state.categories.length) {
                if (state._update.category_id) {
                    return state.select_categories.filter(object => object.id !== state._update.id);
                } else {
                    return state.select_categories.filter(function (object) {
                        if (object.id === state._update.id) return false;
                        if (object.category_id === null) return true;
                    });
                }
            } else {
                return [];
            }
        },
        getPictureRemove(state) {
            if (state._update.picture_file) return true;
            return state._update.picture;
        }
    },
    mutations: {
        setCategories(state, value) {
            state.categories = value;
        },
        setSelectCategories(state, value) {
            state.select_categories = value;
        },
        setCurrent(state, value) {
            state.current.id = value.id;
            state.current.title = value.title;
            state.current.category_id = value.category_id;
            state.current.category_title = value.category_title;
            state.current.picture = value.picture;
        },
        setNew(state, value) {
            state._new.title = value.title;
            state._new.picture = value.picture;
        },
        setNewTitle(state, value) {
            state._new.title = value.target.value;
            state.errors.title.active = state._new.title.length === 0;
        },
        setNewPicture(state, event) {
            state._new.picture = event.target.files[0];
        },
        setNewPictureRemove(state) {
            state._new.picture = null;
        },
        setUpdate(state, value) {
            state._update.id = value.id;
            state._update.title = value.title;
            state._update.picture = value.picture;
            state._update.picture_file = null;
        },
        setUpdateTitle(state, event) {
            state._update.title = event.target.value;
            state.errors.title.active = state._update.title.length === 0;
        },
        setUpdatePicture(state, event) {
            state._update.picture = null;
            state._update.picture_file = event.target.files[0];
            event.target.type = 'text';
            event.target.type = 'file';
        },
        setUpdatePictureRemove(state) {
            state._update.picture = null;
            state._update.picture_file = null;
        },
        setDelete(state, value) {
            state._delete.id = value.id;
            state._delete.title = value.title;
        },
        setModalCreateActive(state, value) {
            state.modalCreate = value;
        },
        setModalUpdateActive(state, value) {
            state.modalUpdate = value;
        },
        setModalDeleteActive(state, value) {
            state.modalDelete = value;
        },
        setIsLoading(state, value) {
            state.isLoading = value;
        },
        setSelectTitleAndCategoryId(state, {category, mode = 'create'}) {
            if (category === 'clear') {
                state.select.title = '';
                state.select.category_id = 0;
                state.select.mode = mode;
            } else {
                state.select.title = category.title;
                state.select.category_id = category.id;
                state.select.mode = mode;
            }
            if (state.select.active) state.select.active = false;
        },
        setSelectActive(state) {
            state.select.active = !state.select.active;
        }
    },
    actions: {
        getCategoriesOrSubcategories({state,commit}, back = false) {
            commit('setIsLoading', true);
            let url = 'admin/categories';
            if (back) {
                if (state.current.category_id === null) {
                    commit('setCurrent', {id: 0, title: '', category_id: 0, category_title: '', picture: null});
                } else {
                    url = 'admin/categories/' + state.current.category_id;
                }
            } else {
                if (state.current.id) url = 'admin/categories/' + state.current.id;
            }
            get(url, this.state.token).then(response => {
                commit('setCategories', response.data.data);
                if (state.current.id) {
                    commit('setCurrent', response.data.category);
                } else {
                    commit('setCurrent', {id: 0, title: '', category_id: 0, category_title: '', picture: null});
                }
            });
            commit('setIsLoading', false);
        },
        getSelectCategories({commit}) {
            get('admin/categories/all', this.state.token).then(response => commit('setSelectCategories', response.data.data));
        },
        replaceCurrent({commit, dispatch}, category) {
            commit('setCurrent', category);
            dispatch('getCategoriesOrSubcategories');
        },
        callGetCategoriesOrSubcategories({dispatch}) {
            dispatch('getCategoriesOrSubcategories', true);
        },
        modalCreateActive({state, commit}) {
            if (state.current.id) {
                commit('setSelectTitleAndCategoryId', {category: {title: state.current.title, id: state.current.id}});
            } else {
                commit('setSelectTitleAndCategoryId', {category: 'clear'});
            }
            commit('setModalCreateActive', true);
        },
        modalCreateInactive({commit}) {
            commit('setNew', {title: '', picture: null});
            commit('setSelectTitleAndCategoryId', {category: 'clear'});
            commit('setModalCreateActive', false);
        },
        modalUpdateActive({state, commit}, category) {
            if (category === 'current') {
                commit('setUpdate', state.current);
                if (state.current.category_id === null) {
                    commit('setSelectTitleAndCategoryId', {category: 'clear', mode: 'update'});
                } else {
                    commit('setSelectTitleAndCategoryId', {category: {title: state.current.category_title, id: state.current.category_id}, mode: 'update'});
                }
            } else {
                commit('setUpdate', category);
                if (category.category_id === null) {
                    commit('setSelectTitleAndCategoryId', {category: 'clear', mode: 'update'});
                } else {
                    commit('setSelectTitleAndCategoryId', {category: state.current, mode: 'update'});
                }
            }
            commit('setModalUpdateActive', true);
        },
        modalUpdateInactive({commit}) {
            commit('setUpdate', {id: 0, title: '', picture: null});
            commit('setSelectTitleAndCategoryId', {category: 'clear'});
            commit('setModalUpdateActive', false);
        },
        modalDeleteActive({commit}, category) {
            commit('setDelete', category);
            commit('setModalDeleteActive', true);
        },
        modalDeleteInactive({commit}) {
            commit('setModalDeleteActive', false);
        },
        createCategory({state, dispatch}) {
            let data = new FormData();
            if (state.select.category_id) data.append('category_id', state.select.category_id);
            if (state._new.picture) data.append('picture', state._new.picture);
            data.append('title', state._new.title);
            post('admin/categories', data, this.state.token).then(response => {
                dispatch('modalCreateInactive');
                dispatch('getCategoriesOrSubcategories');
            }).catch(error => {
                if (error.response.status === 422) this.commit('setErrors', error.response.data.errors);
            });
        },
        updateCategory({state, dispatch}) {
            let data = new FormData();
            data.append('title', state._update.title);
            data.append('category_id', state.select.category_id ? state.select.category_id : '');
            if (state._update.picture_file) data.append('picture', state._update.picture_file);
            if (!state._update.picture && !state._update.picture_file) data.append('picture_remove', 'remove');
            put('admin/categories/' + state._update.id, data, this.state.token).then(response => {
                dispatch('getCategoriesOrSubcategories');
                dispatch('modalUpdateInactive');
            }).catch(error => {
                if (error.response.status === 404) {
                    this.commit('setErrors', 404);
                } else {
                    this.commit('setErrors', error.response.data.errors);
                }
            });
        },
        deleteCategory({state, commit, dispatch}) {
            remove('admin/categories/' + state._delete.id, this.state.token).then(response => {
                if (state._delete.id === state.current.id) commit('setCurrent', {id: 0, title: '', category_id: 0, category_title: '', picture: null});
                dispatch('getCategoriesOrSubcategories');
                commit('setModalDeleteActive', false);
            }).catch(error => {
                if (error.response.status === 401) {
                    this.commit('setErrors', 'Не авторизован!!!');
                } else {
                    this.commit('setErrors', 404);
                }
            });
        }
    },
    namespaced: true
}