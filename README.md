# Pick and Drop: Air Gesture Image Transfer

A web application inspired by Huawei's Air Gesture feature, enabling users to transfer images between devices using hand gestures detected via webcam. Built with React, Express, and ml5.js (Teachable Machine), this project demonstrates real-time gesture recognition and seamless image sharing.

---

## Features
- **Gesture-based Image Transfer:** Upload and send images using "GRAB" and "DROP" hand gestures.
- **Real-time Webcam Detection:** Utilizes Teachable Machine and ml5.js for gesture classification.
- **Two-User Demo Flow:** Simulates sender and receiver with unique IDs.
- **Modern UI:** Responsive, animated interface with clear feedback.

---


## Getting Started (Local Setup)

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/Galib-23/grab-and-drop.git
cd pick-and-drop
```

### 2. Install Dependencies
#### Client
```bash
cd client
npm install
```
#### Server
```bash
cd ../server
npm install
```

### 3. Run Locally
#### Start the Server
```bash
npm start
# or
node index.js
```
Server runs on [http://localhost:5000](http://localhost:5000)

#### Start the Client
```bash
cd ../client
npm run dev
```
Client runs on [http://localhost:5173](http://localhost:5173)

---

## Deployment

### Client (Netlify)
1. Push the `client` folder to a GitHub repository.
2. Connect the repo to Netlify.
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Deploy!

### Server (Render)
1. Push the folder to a GitHub repository.
2. Create a new Web Service on Render.
3. Select the root as `server` directory
4. Set build command: `npm install`
5. Set start command: `node index.js`
6. Set environment (if needed): `PORT=5000`
7. Deploy!

> **Note:** Update the `API_URL` in the client code to match your deployed backend URL (e.g., `https://your-backend.onrender.com`).

---

## Usage
1. Open the client app in your browser.
2. On the Home page, select an image and perform a **GRAB** gesture to upload.
3. Navigate to the Drop page (or use a second device/browser), and perform a **DROP** gesture to receive the image.
4. The app simulates two users: `id1` (sender) and `id2` (receiver).

---

## Technical Details
- **Frontend:** React, Vite, Tailwind CSS, ml5.js, Teachable Machine
- **Backend:** Express.js, Multer (file uploads), CORS
- **Gesture Model:** [Teachable Machine](https://teachablemachine.withgoogle.com/)
- **APIs:**
  - `POST /upload` — Upload image (sender)
  - `GET /drop/:receiverId` — Receive image (receiver)

### Folder Structure
```
client/    # React frontend
server/    # Express backend
```

---

## FAQ

**Q: Why isn't my webcam working?**
- Make sure you allow camera access in your browser.
- Check browser console for errors.

**Q: The gesture isn't detected. What can I do?**
- Ensure good lighting and clear hand visibility.
- Try retraining the model or adjusting your gesture.

**Q: Image not transferring?**
- Ensure both client and server are running and API URLs are correct.
- Check CORS settings and deployment URLs.

**Q: Can I use this with more than two users?**
- The demo is set up for two users, but you can extend the `friendsMap` in the backend for more.

---

## Credits & Acknowledgments
- Inspired by Huawei Air Gesture
- [ml5.js](https://ml5js.org/) & [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [React](https://react.dev/), [Express](https://expressjs.com/)

---

## License
[MIT](LICENSE)
