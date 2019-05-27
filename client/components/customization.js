const { Chrome } = require('vue-color')

module.exports = Vue.component('customization', {
    data () {
        return {
            ...this.$store.state.theme.colors
        }
    },

    components: {
        'color-picker': Chrome
    },

    methods: {
        setColor (color, value) {
            this.$store.commit('setColors', {
                [color]: value
            })
        }
    },

    watch: {
        text (newColor) {
            this.setColor('text', newColor.hex)
        },

        textInvert (newColor) {
            this.setColor('textInvert', newColor.hex)
        },
        
        bg1 (newColor) {
            this.setColor('bg1', newColor.hex)
        },
        
        bg2 (newColor) {
            this.setColor('bg2', newColor.hex)
        },
        
        accent1 (newColor) {
            this.setColor('accent1', newColor.hex)
        },
        
        accent2 (newColor) {
            this.setColor('accent2', newColor.hex)
        },
        
    },

    template: `
        <div id="customization">
            <h1>Customization</h1>

            <div>
                <p>Text Color</p>
                <color-picker v-model="text"></color-picker>
            </div>

            <div>
                <p>Invert of Text Color</p>
                <color-picker v-model="textInvert"></color-picker>
            </div>

            <div>
                <p>Background Color</p>
                <color-picker v-model="bg1"></color-picker>
            </div>

            <div>
                <p>Secondary Background Color</p>
                <color-picker v-model="bg2"></color-picker>
            </div>

            <div>
                <p>First Accent Color</p>
                <color-picker v-model="accent1"></color-picker>
            </div>

            <div>
                <p>Second Accent Color</p>
                <color-picker v-model="accent2"></color-picker>
            </div>
        </div>
    `
})