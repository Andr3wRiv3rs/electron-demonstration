const fs = require('fs')

const appdata = process.env.APPDATA + '\\' || (
      process.platform == 'darwin' 
    ? process.env.HOME + 'Library/Preferences/' 
    : process.env.HOME + "/.local/share/"
)

try {
    if (!fs.existsSync(appdata + 'electron-demonstration'))
        fs.mkdirSync(appdata + 'electron-demonstration')
} catch {}

const path = appdata + 'electron-demonstration' + (process.env.APPDATA ? '\\' : '/') 

module.exports = Vue.component('saving', {
    methods: {
        save () {
            fs.writeFileSync(path + 'textarea.txt', this.$refs.textarea.value, {encoding: 'utf8'})
        },

        load () {
            if (fs.existsSync(path + 'textarea.txt')) {
                this.$refs.textarea.value = fs.readFileSync(path + 'textarea.txt')
            }
        }
    },

    template: `
        <div>
            <h1>Saving/Loading</h1>
            <textarea ref="textarea"></textarea><br>
            <button @click="save()">Save</button>
            <button @click="load()">Load</button>
        </div>
    `
})