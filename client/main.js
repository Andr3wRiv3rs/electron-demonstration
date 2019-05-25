const {
    Scene, 
    WebGLRenderer,
    DirectionalLight, 
    AmbientLight,
    Mesh, 
    PerspectiveCamera,
    BoxGeometry,
    MeshLambertMaterial,
} = require('three')

const $ = el => document.querySelector(el)

new Vue({
    el: '#threejs',

    mounted () {
        const container = this.$el
        const scene = new Scene()
        const renderer = new WebGLRenderer({
            antialias: true,
            alpha: true
        })
        const camera = new PerspectiveCamera( 50, container.offsetWidth / container.offsetHeight, 0.1, 1000 )
        const ambient = new AmbientLight( 0x303030 )
        const sun = new DirectionalLight( 0xE0D5FF, 1 )
        const cube = new Mesh( 
            new BoxGeometry( 2, 2, 2 ), 
            new MeshLambertMaterial({
                color: 0xffffff
            })
        )

        renderer.setSize( container.offsetWidth, container.offsetHeight )

        camera.position.z = 6

        sun.position.set( 0, 0.5, 4 )
        sun.castShadow = true

        scene.add( ambient, sun, cube )

        const animate = () => {
            requestAnimationFrame( animate )

            cube.rotation.x += 0.005
            cube.rotation.y += 0.01

            renderer.render( scene, camera )
        }

        animate()

        document.body.appendChild(renderer.domElement)

        renderer.domElement.addEventListener('mousedown', clickEvent => {
            window.onmousemove = event => {
                Object.assign(
                    renderer.domElement.style,

                    {
                        position: 'absolute',
                        top: (event.clientY - clickEvent.offsetY) + 'px',
                        left: (event.clientX - clickEvent.offsetX) + 'px'
                    }
                )
            }

            window.onmouseup = event => {
                window.onmousemove = null
                window.onmouseup = null
            }
        })
        
        this.$nextTick( () => $('#threejs').appendChild($('canvas')) )
    }
})

const {
    remote,
    remote: {
        getCurrentWindow
    }
} = require('electron')

const fs = require('fs')

const currentWindow = getCurrentWindow()

if (!fs.existsSync('./data'))
    fs.mkdirSync('./data')

new Vue({
    el: '#title-bar',

    data () {
        return {
            bounds: currentWindow.getBounds(),
            remote, currentWindow
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

        currentWindow.on('move', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
            this.$forceUpdate()
        })

        currentWindow.on('resize', event => {
            Vue.set(this, 'bounds', event.sender.getBounds())
        })
    }
})

new Vue({
    el: '#main',
    
    data () {
        return {
            formActive: false,
            formText: 'Hello World!'
        }
    },

    methods: {
        popup (text) {
            alert(text)
        }
    }
})