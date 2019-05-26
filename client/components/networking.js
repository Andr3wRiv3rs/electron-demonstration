const express = require('express')
const WebSocket = require('ws')

module.exports = Vue.component('networking', {
    data () {
        return {
            VideoStream: null,
            AudioStream: null,

            ports: {
                http: 8080,
                ws: 8085
            },

            httpactive: false
        }
    },

    methods: {
        server (http, ws) {
            const app = express()

            app.use('/', express.static(__dirname.replace(/components$/, 'chatroom')))

            app.listen(http)

            const wss = new WebSocket.Server({
                port: ws
            })

            const connections = []

            wss.on('connection', ws => {
                connections.push(ws)
                ws.on('message', message => {
                    for (const i of connections) {
                        i.send(message)
                    }
                })
            })

            Vue.set(this, 'httpactive', true)
        },

        wsserver (port1, port2) {

        }
    },

    template: `
        <div id="networking">
            <h1>Networking</h1>
            <h3>HTTP / WebSockets Chatroom</h3>
            <p>A WebSockets chatroom using a frontend served on HTTP (iframes).</p><br />
            <div v-show="!httpactive">
                <button @click="server(ports.http, ports.ws)">Start chat server on port {{ports.http}}.</button>
                
                <br /><br />
            </div>

            <div v-if="httpactive">
                <iframe :src="\`http://localhost:${8080}\`"/>
                <iframe :src="\`http://localhost:${8080}\`"/>
                
                <br /><br />
            </div>
        </div>
    `
})