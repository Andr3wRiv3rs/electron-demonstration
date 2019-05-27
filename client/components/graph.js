const { mem } = require('systeminformation')
const os_utils = require('os-utils')

module.exports = Vue.component('graph', {
    computed: require('./default').computed,

    data () {
        return {
            ram: {
                total: 0,
                used: 0,
                free: 0,
                percentage: {
                    last: 0,
                    current: 0,
                }
            },

            cpu: {
                last: 0,
                current: 0
            }
        }
    },

    methods: {
        async memUsage () {
            const memory = await new Promise(resolve => mem(resolve))
            
            return {
                total: memory.total / 1073741824,
                used: memory.used / 1073741824,
                free: memory.free / 1073741824,
                percentage: (memory.used / memory.total) * 100
            }
        }
    },

    mounted () {
        const memory = this.$refs.memory
        const memoryContext = memory.getContext('2d')

        const cpu = this.$refs.cpu
        const cpuContext = cpu.getContext('2d')

        setInterval( async () => {
            const ram = await this.memUsage()

            ram.total = Math.round(ram.total * 100) / 100
            ram.used = Math.round(ram.used * 100) / 100
            ram.free = Math.round(ram.free * 100) / 100
            ram.percentage = Math.round(ram.percentage * 100) / 100

            ram.percentage = {
                last: this.ram.percentage.current,
                current: ram.percentage
            }

            Vue.set(this, 'ram', ram)

            memoryContext.putImageData(memoryContext.getImageData(2, 0, memory.width-2, memory.height), 0, 0)
            memoryContext.clearRect(memory.width-2, 0, 2, memory.height)

            memoryContext.strokeStyle = this.theme.colors['accent1']

            memoryContext.beginPath()
            memoryContext.moveTo(memory.width-2, memory.height - (memory.height/100) * ram.percentage.last)
            memoryContext.lineTo(memory.width, memory.height - (memory.height/100) * ram.percentage.current)
            memoryContext.stroke()

            let cpuUsage = Math.round(await new Promise(resolve => os_utils.cpuUsage(resolve))*100)

            Vue.set(this, 'cpu', {
                last: this.cpu.current,
                current: cpuUsage
            })

            cpuContext.putImageData(cpuContext.getImageData(2, 0, cpu.width-2, cpu.height), 0, 0)
            cpuContext.clearRect(cpu.width-2, 0, 2, cpu.height)

            cpuContext.strokeStyle = this.theme.colors['accent2']

            cpuContext.beginPath()
            cpuContext.moveTo(cpu.width-2, cpu.height - (cpu.height/100) * this.cpu.last)
            cpuContext.lineTo(cpu.width, cpu.height - (cpu.height/100) * cpuUsage)
            cpuContext.stroke()
        }, 1000/10)

        window.cpuUsage = os_utils.cpuUsage
    },

    template: `
        <div id="graph">
            <h1>Performance Graph</h1>

            <h3>CPU</h3>
            <p>{{cpu.current}}%/100%</p>
            <canvas 
                ref="cpu"
                style="
                    width: 640px; 
                    height: 160px;
                " 
                width="640" 
                height="160"
            ></canvas>

            <h3>Memory</h3>
            <p>{{ ram.used }}GB/{{ ram.total }}GB ({{ ram.free }}GB free)</p>
            <canvas 
                ref="memory" 
                style="
                    width: 640px; 
                    height: 160px;
                " 
                width="640" 
                height="160"
            ></canvas>
        </div>
    `
})