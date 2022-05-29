import {get} from "@/utils/request";

export const productModule = {
    state: () => ({
        products: [],
        current_page: 1,
        last_page: 0,
        empty: {
            message: '',
            empty: false
        },
        isLoading: false,
        sidebar: false,
        product: {
            id: 0,
            title: '',
            desc: '',
            price: 0,
            count: 0,
            images: [''],
            manufacturer: '',
            category_id: 0,
            image1: '',
            image2: '',
            image3: '',
            image4: '',
            changed_images: false,
            removed_images: []
        },
        properties: [],
        property: {
            title: '',
            value: ''
        },
        new_property: true,
        select: {
            title: '',
            active: false
        }
    }),
    getters: {},
    mutations: {
        setProducts(state, value) {
            state.products = [...state.products, ...value.data];
            state.current_page++;
            state.last_page = value.last_page;
        },
        setProduct(state, value) {
            state.product.id = value.id;
            state.product.title = value.title;
            state.product.desc = value.desc;
            state.product.price = value.price;
            state.product.count = value.count;
            state.product.manufacturer = value.manufacturer;
            state.product.category_id = value.category_id;
            state.product.images = value.images;
            state.product.image1 = value.image1;
            state.product.image2 = value.image2;
            state.product.image3 = value.image3;
            state.product.image4 = value.image4;
            state.product.changed_images = value.changed_images;
            state.product.removed_images = value.removed_images;
            state.properties = value.properties;
            state.property.title = '';
            state.property.value = '';
            state.new_property = value.new_property;
        },
        setEmpty(state, value) {
            state.empty.message = value.message;
            state.empty.active = value.active;
        },
        setIsLoading(state, value) {
            state.isLoading = value;
        },
        setProperty(state, value) {
            state.property.title = value.title;
            state.property.value = value.value;
        },
        setNewProperty(state, value) {
            state.new_property = value;
        },
        setProperties(state, value) {
            state.properties = [...state.properties, value];
        },
        setSidebar(state, value) {
            state.sidebar = value;
        },
        setSelectTitleAndCategoryId(state, category) {
            if (category === 'clear') {
                state.select.title = '';
                state.product.category_id = 0;
            } else {
                state.select.title = category.title;
                state.product.category_id = category.id;
            }
            if (state.select.active) state.select.active = false;
        },
        setSelectActive(state) {
            state.select.active = !state.select.active;
        },
        setProductTitle(state, event) {
            state.product.title = event.target.value;
        },
        setProductDesc(state, event) {
            state.product.desc = event.target.value;
        },
        setProductPrice(state, event) {
            state.product.price = event.target.value;
        },
        setProductCount(state, event) {
            state.product.count = event.target.value;
        },
        setProductManufacturer(state, event) {
            state.product.manufacturer = event.target.value;
        },
        setProductImage(state, {image, event}) {
            state.product[image] = event.target.files[0];
            event.target.type = 'text';
            event.target.type = 'file';
        },
        setProductImageRemove(state, {id, image}) {
            state.product[image] = '';
            state.product.images[id] = '';
        },
        setNewPropertyTitle(state, event) {
            state.property.title = event.target.value;
        },
        setNewPropertyValue(state, event) {
            state.property.value = event.target.value;
        },
    },
    actions: {
        receiptOfProducts({state, commit}) {
            commit('setIsLoading', true);
            get('admin/products?page=' + state.current_page, this.state.token).then(response => {
                commit('setProducts', {data: response.data.data, last_page: response.data.meta.last_page});
                if (!state.products.length) commit('setEmpty', {message: 'Нет продуктов', active: true});
                commit('setIsLoading', false);
            });
        },
        loadMoreProducts({state, commit, dispatch}) {
            if (state.last_page >= state.current_page) {
                dispatch('receiptOfProducts');
            } else {
                commit('setEmpty', {message: 'Больше нет продуктов', active: true});
            }
        },
        downloadProduct({state, commit}) {
            commit('setSidebar', true);
        },
        closeSidebar({commit}) {
            commit('setSidebar', false);
        }
    },
    namespaced: true
}