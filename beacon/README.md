# Beacon

## Completed steps

- [x] Basic UI
- [x] Local storage API
- [x] Notifications API
- [x] Service worker
- [x] Geolocate API
- [x] Battery API

## Contents

- [Beacon](#beacon)
  - [Completed steps](#completed-steps)
  - [Contents](#contents)
  - [APIs and Tools](#apis-and-tools)
  - [Description](#description)
  - [Future considerations](#future-considerations)
  - [Installation](#installation)
  - [Testing application](#testing-application)

---

## APIs and Tools

- Local storage API
- Notifications API
- Service worker
- Geolocate API
- Battery API

---

## Description

The application periodically reminds the user to record their location within the app. Due to limitations of the Periodic Background Sync API, notifications are currently scheduled at a 12-hour interval. In a production environment, the Push API would be preferable as it would allow more flexible and reliable notification scheduling.

When a notification is received, the user can open the application and record their current location using the device’s Geolocation API. Each recorded location is stored locally using the Local Storage API and displayed in a list within the interface.

Users can review their previously logged locations within the application, and each entry includes an option to open the coordinates directly in Google Maps for visual reference.

The application also incorporates a battery status check. When a location is recorded, the system checks the device’s battery level. If the battery level falls below a defined threshold (e.g., 15%) and the device is not charging, a notification is triggered advising the user to record another location soon before the device powers down.

This feature demonstrates how device context (in this case battery status) can be used to trigger safety-related reminders.

---

## Future considerations

The current prototype stores location data locally. Future development could extend the system to include:

- Backend database integration to store location data remotely
- User authentication to associate recorded locations with specific users
- SMS API integration allowing users to trigger an emergency alert that sends their most recent locations to a designated contact
- Shared access controls, allowing authorised contacts to view a user's location history
- Server-side endpoints capable of receiving and storing location data sent from the application
- These extensions would transform the application from a standalone prototype into a more complete safety-tracking platform.

---

## Installation

> Root folder starts at **beacon**

1. `cd beacon`
2. `npm install`
3. `npm run dev`

## Testing application

For this to function best to use Google Chrome and follow the below steps.

- Open DevTools
- Go to "Application" > "Sevrice Workers"

From here you can see the registered worker, and by pressing "Periodic Sync" it will send a notification (bypassing the 12 hour wait). The next steps involve testing the geolocation and battery listeners.

- Inside DevTools go to "Console"
- To explain, what we need to do is "fake" the battery being low (unless you're on a phone that is and it's below 15%)
- To do this we need to paste into the console
- First write "allow pasting" into the console
- Then paste in the below and hit enter button

```
navigator.getBattery = () => Promise.resolve({
    charging: false,
    chargingTime: 0,
    dischargingTime: Infinity,
    level: 0.1,
    onchargingchange: null,
    onlevelchange: null,
    ondischargingtimechange: null,
    onchargingtimechange: null
});
```

- Once done, hit the "Add current location" button [accepting permissions if needed] and you should see an alert to track your location again soon due to low battery!
