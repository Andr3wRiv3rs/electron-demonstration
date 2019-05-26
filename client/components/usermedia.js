module.exports = Vue.component('usermedia', {
    data () {
        return {
            VideoStream: null,
            AudioStream: null,
        }
    },

    methods: {
        async requestMediaDevices ({audio, video}) {
            console.log('requested')

            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({
                    audio, video
                })

                if (video) {
                    this.$refs.video.srcObject = mediaStream
                    this.$refs.video.play()
                    Vue.set(this, 'VideoStream', mediaStream)
                }

                if (audio) {
                    this.$refs.audio.srcObject = mediaStream
                    this.$refs.audio.play()
                    Vue.set(this, 'AudioStream', mediaStream)
                }
            } catch (error) {
                console.error(error)
            }
        }
    },

    template: `
        <div id="usermedia">
            <h1>User Media</h1>
            <video ref="video" v-show="VideoStream"></video>
            <div class="video_off" v-show="!VideoStream">No video stream.</div>
            <br>
            <button @click="requestMediaDevices({ video: true })">Request Camera</button>
            <audio ref="audio"></audio><br>
            <button @click="requestMediaDevices({ audio: true })">Request Microphone</button>
        </div>
    `
})