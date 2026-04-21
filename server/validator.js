export function validatePort(port) {
    if (typeof port !== "number") return false
    if (!Number.isInteger(port)) return false
    if (port < 1 || port > 65535) return false
    return true
}