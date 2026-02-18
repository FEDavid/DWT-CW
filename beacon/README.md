# Beacon

## Completed steps
- [x] Basic UI
- [x] Local storage API
- [x] Notifications API
- [x] Service worker
- [x] Geolocate API

## Next steps
- [ ] Contacts API
- [ ] SMS API
- [ ] DB CONNECTION
- [ ] OFFLINE PROTECTION

## Contents
- [Beacon](#beacon)
  - [Completed steps](#completed-steps)
  - [Next steps](#next-steps)
  - [Contents](#contents)
  - [Installation](#installation)
  - [APIs and Tools](#apis-and-tools)
  - [Description](#description)
    - [Travel App](#travel-app)

---

## Installation
> Root folder starts at **beacon**

1. `cd beacon`
2. `npm install`
3. `npm run dev`

---

## APIs and Tools
- Geolocation API
- Local Storage API
- SMS API
- Notifications API
- Service Workers

---

## Description

### Travel App
Periodically record location (e.g., GPS) and send to a person/system monitoring safety using a web API (if data connection available) or SMS (low signal area without data connection). For example, send location at a fixed interval (e.g., every 30 mins) but make multiple attempts (e.g., every 3 mins) when location has not been successfully sent in the last 30 mins.

Object stored on device might/should include:

- Geolocation API* (continuous or regular GPS)
- SMS API*
- Datetime stamp
- Key features:
  - Use of both web (HTTP request from app) & SMS as necessary, with multiple attempts to send location if the first attempt fails
  - There must be a server to receive and store the location data
  - The server can be a simple demo that accepts and stores the information without any functionality to raise an alert when somebody/something goes missing
- Camera API* – this could be a doorstep delivery app or microblog travel app
- SMS recipient may not be a person — consider use of SMS to HTTP gateway
- Could be an app for theft detection (e.g., hidden blackbox tracking location of vehicle) triggered when device enters/leaves an area