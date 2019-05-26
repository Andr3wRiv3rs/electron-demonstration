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

module.exports = Vue.component('cube', {
    mounted () {
        const container = this.$refs.container
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

        container.appendChild(renderer.domElement)

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
        
        // this.$nextTick( () => $('#threejs').appendChild($('canvas')) )
    },

    template: `
        <div id="threejs" ref="container"></div>
    `
})