module.exports = {
    computed: {
        theme () {
            return this.$store.state.theme 
        },

        vars () {
            return {
                '--bg1': this.theme.colors.bg1,
                '--bg2': this.theme.colors.bg2,
                '--text': this.theme.colors.text,
                '--text-invert': this.theme.colors.textInvert,
                '--accent1': this.theme.colors.accent1,
                '--accent2': this.theme.colors.accent2,
            }
        }
    },
}