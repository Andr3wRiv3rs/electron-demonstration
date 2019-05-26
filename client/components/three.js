const {
    BrowserWindow
} = require('electron').remote

module.exports = Vue.component('three', {
    components: {
        cube: require('./cube')
    },

    mounted () {
        const cubeWindow = new BrowserWindow({
            width: 320,
            height: 320,
            minWidth: 300, 
            minHeight: 300, 
            transparent: true,
            frame: false,
            webPreferences: {
                nodeIntegration: true
            }
        })

        cubeWindow.loadFile('./client/components/cube.html')

        cubeWindow.setAlwaysOnTop(true); 
    },

    // template: `
    //     <div>
    //         <h1>3D Model (three.js)</h1>
    //         <p>Drag the cube around the screen.</p>
    //         <cube ref="cube"></cube>
    //     </div>
    // `

    template: `
        <div>
            <h1>3D Model (three.js)</h1>
        </div>
    `
})