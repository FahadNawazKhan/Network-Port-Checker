const API_BASE = window.location.protocol === 'file:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:3000'
  : 'https://network-port-checker.onrender.com';

const checkBtn = document.getElementById('btn')

checkBtn.addEventListener('click', checkPort)

async function loadIP() {
    const ipInput = document.getElementById('ip')

    try {
        const res = await fetch(`${API_BASE}/checkport?port=80`)
        const data = await res.json()

        ipInput.value =  data.ip
    } catch (err) {
        ipInput.value = "Unable to fetch IP"
    }
}


loadIP()

async function checkPort() {
    const portInput = document.getElementById("port")
    const statusEl = document.getElementById("status")
    const ipEl = document.getElementById("ip")
    const ResponseTime = document.getElementById("response-time")
    const button = document.querySelector("button")

    const port = portInput.value
    const ip = ipEl.value

    if (!port) {
        statusEl.innerText = "Status: Enter a valid port"
        return
    }

    statusEl.innerText = "Status: Checking..."


    try {
        let url = `${API_BASE}/checkport?port=${port}`
        if (ip && ip !== "Unable to fetch IP") {
            url += `&ip=${encodeURIComponent(ip)}`
        }
        
        const res = await fetch(url)
        const data = await res.json()

        statusEl.innerText = `Status: ${data.status}`

        if (data.status === 'open') {
            statusEl.classList.add('open')
        } else if (data.status === 'closed') {

            statusEl.classList.add('closed')
        } else if (data.status == 'filtered') {
            statusEl.classList.add('filtered')
        }

    } catch (err) {
        statusEl.innerText = "Status: Error checking port"
       
    }

}