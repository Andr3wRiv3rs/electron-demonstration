const ID = 'user_' + (Math.round(Math.random() * 100000) + '').replace('.','')

const ws = new WebSocket('ws://localhost:8085')

const log = document.querySelector('#log')

ws.onopen = () => {
    const p = document.createElement('P')
    p.innerHTML = 'Connected!'
    log.appendChild(p)
}

ws.onmessage = message => {
    const p = document.createElement('P')
    p.innerHTML = message.data
    log.appendChild(p)
}

const send = message => {
    ws.send(`${ID}: ${message}`)
}

document.querySelector('button').onclick = () => {
    send(document.querySelector('input').value)
    document.querySelector('input').value = ''
}