const {
    remote: {
        getCurrentWindow
    }
} = require('electron')

const currentWindow = getCurrentWindow()

module.exports = new Vue({
    el: '#title-bar',

    data () {
        return {
            currentWindow
        }
    },

    mounted () {
        window.addEventListener('keydown', event => {
            switch (event.code.toLowerCase()) {
                case 'f5': 
                    currentWindow.reload()
                    break
            }
        })
    }
})