# Beacon

## Contents

- [Description](#description)
- [APIs and Tools](#apis-and-tools)
- [Developer Guide](#developer-guide)
  - [Developer Installation](#developer-installation)
  - [Developer Walkthrough](#developer-walkthrough)
- [User Guide](#user-guide)
  - [User Installation](#user-installation)
  - [User Walkthrough](#user-walkthrough)
- [Future Considerations](#future-considerations)

## Description
Beacon is a React-based Progressive Web Application (PWA) that enables users to manually log their location, store it locally using IndexedDB, amend stored records (including titles and images), and automatically send location data to a user-defined email address.

## APIs and Tools

### Web APIs
- Battery Status API
- Geolocation API
- Notifications API
- Periodic Background Sync API
- Web Storage API

### Storage
- IndexedDB (via Dexie)
- LocalStorage

### Libraries
- EmailJS (email communication)
- React-Webcam (camera integration)

### Core Stack
- React (Hooks & Components)
- Vite

### Progressive Web Application (PWA) functionality
- Manifest
- Service Worker

### Deployment
- GitHub Actions (CI/CD) with deployment to Vercel

## Developer Guide

### Developer Installation
Requirements:
- Node.js (latest LTS recommended)
- Node Package Manager (npm)
- Modern browser (Chrome recommended for full API support)

```
git clone https://github.com/FEDavid/DWT-CW
cd beacon  
npm install  
npm run dev
```

### Developer Walkthrough

- Application is fully client-side (no backend)
- IndexedDB is used for structured data persistence
- LocalStorage stores lightweight user preferences (e.g. email)
- Service Worker handles:
  - Caching
  - Notification triggering
  - Periodic background sync (browser-limited)

## User Guide

### User Installation

1. Open the deployed application in a browser (mobile recommended) - [Link](https://dwt-cw.vercel.app/)
2. Open browser menu (⋮)
3. Select **"Add to Home Screen"**
4. The app will install as a PWA

### User Walkthrough

1. Grant Permissions
   - Location
   - Notifications
   - Camera (for image capture)

2. Configure Email
   - Open settings
   - Enter a valid email address
   - This will be used to receive logged location data

3. Log Location
   - Press **"Get Current Location"**
   - Location is retrieved and stored locally
   - Data is automatically sent to the configured email address

4. Manage Entries
   - Edit location titles
   - Capture or replace images
   - Delete individual entries or clear all data

5. Notifications
   - Users receive reminders to log their location
   - Additional alerts may appear when battery is low

## Future Considerations
- Migration to React Native for true background tracking
- Replace Notifications API with Push API for reliability
- Introduce backend for persistent storage and authentication
- Add SMS integration (e.g. Twilio) for emergency alerts
- Expand data sharing and access control between users
