# Baymax

# Baymax UI Project

## Project Overview
The **Baymax UI Project** is an interactive personal healthcare companion interface inspired by Baymax. This web-based project simulates a futuristic HUD (Heads-Up Display) with real-time features like camera background, battery monitoring, heart rate, weather updates, notifications, and a battle mode toggle.

The project demonstrates advanced **HTML, CSS, and JavaScript** usage for interactive web development with animated elements, dynamic content updates, and real-time simulations.

IMPORTANT NOTE : ALLOW CAMERA ACCESS AND LOCATION ACCES BEFORE CLICKING INITIATE.

## Features

### 1. Start Screen & Boot Sequence
- **Start Overlay:** A fullscreen start button (`INITIALIZE`) that begins the experience.
- **Boot Screen Animation:** Shows a floating Baymax logo and a loading percentage from 0% to 100%.
- **Boot Circle Expansion:** Fullscreen circle expansion effect when boot completes.
- **Audio Effects:** Boot and loading sounds play during the sequence for immersive feedback.

### 2. Camera Background
- Uses the device camera (`getUserMedia`) as a live background.
- Overlay image with blend mode and filters adds a futuristic visual effect.
- Fully responsive and fills the entire screen.

### 3. Heads-Up Display (HUD)
- **Center Greeting:** Animated welcome message (“Hello. I am Baymax. Your personal healthcare companion.”) fades out after a few seconds.
- **Top Right:** Displays live **clock, date**, and **weather information** (temperature and location via OpenWeatherMap API).
- **Top Left:** Microphone indicator with pulse animation simulating voice input.
- **Bottom Left:**  
  - Battery HUD with segmented display and color-coded levels.  
  - Heart rate display simulating BPM changes every 5 seconds.
- **Bottom Right:** Notifications panel updating periodically with helpful tips.
- **Bottom Center:** Tips panel that shows random reminders like drinking water or stretching.
- **Tasks Menu:** Displays a list of predefined health-related tasks.

### 4. Battle Mode
- Toggle button that switches HUD to **Battle Mode**.
- Changes all HUD colors to red for a dynamic “alert” look.
- Battle mode affects all HUD elements, including battery, heart rate, tasks, and overlays.

### 5. Dynamic Interactivity
- Random tips and notifications update at intervals.
- Heart rate and battery levels update in real-time (simulation).
- Random audio cues for engagement.

## How to Use
1. Open `index.html` in a modern web browser.
2. Click the **INITIALIZE** button to start the boot sequence.
3. Allow camera access to enable the live background.
4. Observe the HUD updating dynamically with time, weather, battery, heart rate, and notifications.
5. Click **Battle Mode** to switch HUD to red alert mode and back to normal mode as desired.

## Technologies Used
- **HTML5** – Structure of the UI and boot sequence.
- **CSS3** – Animations, transitions, HUD layout, and Battle Mode styling.
- **JavaScript (ES6)** – Dynamic updates, camera integration, boot sequence logic, battery simulation, heart rate, notifications, and audio playback.
- **OpenWeatherMap API** – Real-time weather data display.
- **Web Audio API** – Boot, loading, and random audio cues.

## Contributors
This project was collaboratively developed by:  
- **Avni**  
- **Prathamesh**  
- **Yashika**  

## Credits
- Inspired by Baymax’s healthcare companion UI.  
- Uses OpenWeatherMap API for weather updates.  
- All sounds, images, and fonts are either custom or free for educational use.

---

*This project is intended for educational purposes and interactive UI learning.*
