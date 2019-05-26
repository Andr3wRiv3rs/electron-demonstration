const {
    remote: {
        BrowserWindow,
        getCurrentWindow,
    }
} = require('electron')

const fs = require('fs')

const currentWindow = getCurrentWindow()

module.exports = Vue.component('three', {
    data () {
        return {
            cubeWindow: null,
            cubeInVoid: false,
        }
    },

    components: {
        cube: require('./cube')
    },

    props: ['page', 'bounds'],

    mounted () {
        const cubeWindow = new BrowserWindow({
            width: 200,
            height: 200, 
            transparent: true,
            frame: false,
            skipTaskbar: true,
            resizable: false,
            webPreferences: {
                nodeIntegration: true
            }
        })

        cubeWindow.loadFile('./client/components/cube.html')

        cubeWindow.setAlwaysOnTop(true)

        if (this.page !== '3D') cubeWindow.hide()

        Vue.set(this, 'cubeWindow', cubeWindow)

        window.addEventListener('beforeunload', () => {
            cubeWindow.close()
        })

        cubeWindow.on('move', event => {
            const bounds = event.sender.getBounds()

            Vue.set(this, 'cubeInVoid',
                this.bounds.x > bounds.x + bounds.width || 
                this.bounds.x + this.bounds.width < bounds.x ||
                this.bounds.y > bounds.y + bounds.height || 
                this.bounds.y + this.bounds.height < bounds.y
            )
        })

        currentWindow.on('focus', () => {
            // if (this.page === '3D') this.cubeWindow.show()
        })
    },

    methods: {
        createTXT () {
            fs.writeFileSync(
                require('path').join(require('os').homedir(), 'Desktop\\') + 'outofbounds.txt',
                'You moved the cube out of bounds!',
                { encoding: 'utf8' }
            )
        }
    },

    watch: {
        page (newPage) {
            if (newPage === '3D') this.cubeWindow.show()
            else this.cubeWindow.hide()
        }
    },

    template: `
        <div>
            <h1>3D Model (three.js)</h1>
            <p>Out Of Bounds: {{cubeInVoid}}</p>
            <button v-if="cubeInVoid" @click="createTXT()">Create Text Document on Desktop</button>
        </div>
    `
})