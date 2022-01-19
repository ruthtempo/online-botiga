export const state = () => ({
    products: [],
    user: null,
    cart: [],
    sideNav: false
})

export const getters = {
    getSectionProducts: state => (section) => {
        return state.products.filter(product => product.category === section)
    },
    getProduct: state => (id) => { 
        return state.products.find(product =>
            product.id === parseInt(id)
        )
    },
    getTotal: state => {
        let totalCost =0
        state.cart.forEach(product => { 
            totalCost += product.price 
        });
        return totalCost
    },
    getSideNavStatus: state => {
        return state.sideNav
    }
}

export const mutations = {
    saveProducts(state, products) {
        state.products = products
    },
    onAuthStateChangedMutation(state, { authUser, claims }) {
        if(!authUser) {
            state.user = null
        } else {
            const { email } = authUser
            state.user = { email }
        }
    },
    addToCart(state, item){
        state.cart.push(item)
    },
    removeItem(state, item){
        state.cart = state.cart.filter(product=> product.id !== item.id)
    },
    emptyCart(state){
        state.cart = []
    },
    setSideNav(state) {
        state.sideNav = !state.sideNav
    }
}

export const actions = {
    fetchProducts(context) {
        fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(response => {
            context.commit("saveProducts", response)
            }
        )
    },
    toggleSideNav({commit}) {
        commit('setSideNav')
    }
}
