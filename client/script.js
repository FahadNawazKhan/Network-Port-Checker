const checkBtn = document.getElementById('btn')

checkBtn.addEventListener('click', checkPort)

async function loadIP() {
    const ipInput = document.getElementById('ip')

    try {
        const res = await fetch('https://network-port-checker.onrender.com/checkport?port=80')
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

    if (!port) {
        statusEl.innerText = "Status: Enter a valid port"
        return
    }

    statusEl.innerText = "Status: Checking..."


    try {
        const res = await fetch(`https://network-port-checker.onrender.com/checkport?port=${port}`)
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