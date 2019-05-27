module.exports =  new Vuex.Store({
    state: {
        theme: require('./components/theme')
    },

    mutations: {
        setFont (state, payload) {
            Vue.set(state.theme, 'font', payload)
        },

        setColors (state, payload) {
            for (const [color, value] of Object.entries(payload))
                Vue.set(state.theme.colors, color, value)
        },
    }
})