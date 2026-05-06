# Network Port Checker

A minimal full-stack tool to check whether a TCP port is open, closed, or filtered.

---

## Features

* Detects public IP automatically
* Checks port status using TCP connection
* Returns one of:

  * open
  * closed
  * filtered (timeout)

---

## How It Works

1. User inputs a port
2. Frontend sends request to backend
3. Backend:

   * extracts public IP
   * attempts TCP connection using `net.Socket`
4. Result mapping:

   * connect → open
   * ECONNREFUSED → closed
   * timeout → filtered

---

## Tech Stack

Frontend:

* HTML
* CSS
* JavaScript (Fetch API)

Backend:

* Node.js
* Express
* net module

---

## Project Structure

```id="a1b2c3"
Network-Port-Checker/
├── client/
├── server/
└── README.md
```

---

## Setup

Clone:

```bash id="d4e5f6"
git clone <repo-url>
cd Network-Port-Checker
```

Install:

```bash id="g7h8i9"
cd server
npm install
```

Environment:

```env id="j1k2l3"
PORT=3000
```

Run:

```bash id="m4n5o6"
npm start
```

Open:

```id="p7q8r9"
client/index.html
```

---

## API

GET `/checkport?port=PORT`

Response:

```json id="s1t2u3"
{
  "success": true,
  "ip": "x.x.x.x",
  "port": 443,
  "status": "open"
}
```

---

## Validation

* accepts integers only
* range: 1–65535
* invalid input returns 400

---

## Use Cases

* port forwarding debugging
* firewall testing
* service reachability checks

---

## Roadmap

* multi-port scan
* UDP support
* scan history
* custom IP input

---

## License

ISC
