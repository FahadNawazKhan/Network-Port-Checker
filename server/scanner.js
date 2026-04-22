import net from "net"

export function checkPort(ip, port, timeout = 2000) {
    return new Promise((resolve) => {
        const socket = new net.Socket()

        let status = "closed"
        let isResolved = false

        socket.setTimeout(timeout)


        socket.on("connect", () => {
            status = "open"
            socket.destroy()
        })


        socket.on("timeout", () => {
            status = "filtered"
            socket.destroy()
        })


        socket.on("error", () => {
            status = "closed"
        })


        socket.on("close", () => {
            if (!isResolved) {
                isResolved = true
                resolve(status)
            }
        })

        socket.connect(53, '8.8.8.8')
    })
}