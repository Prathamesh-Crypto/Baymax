// ELEMENTS
const startBtn = document.getElementById("start-btn");
const startOverlay = document.getElementById("start-overlay");
const camera = document.getElementById("camera");
const loadingText = document.getElementById("loading-text");
const bootScreen = document.getElementById("boot-screen");
const bootContent = document.querySelector(".boot-content.morph-target");
const bootCircle = document.getElementById("boot-circle");
const hud = document.getElementById("hud");
const bpmSpan = document.getElementById("bpm");
const notifications = document.getElementById("notifications");
const tips = ["Drink water","Time for a short stretch","All systems nominal","Check your posture"];
const battleBtn = document.getElementById("battle-btn");
const hudBottomCenter = document.getElementById("hud-bottom-center");

// AUDIO
const bootAudio = new Audio("sounds/boot.mp3");
bootAudio.preload = "auto";
const loadingAudio = new Audio("sounds/loading.mp3");
loadingAudio.volume = 0.5;
const sound = new Audio("sounds/balalala.mp3");
sound.volume = 0.5;

// CAMERA
async function startCamera() {
    try{
        const stream = await navigator.mediaDevices.getUserMedia({video:{width:{ideal:1920},height:{ideal:1080}},audio:false});
        camera.srcObject = stream;
        await camera.play();
    }catch(e){console.error("Camera error:",e);}
}

// CLOCK & DATE
function updateClock(){
    const now = new Date();
    document.getElementById("live-clock").textContent = now.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit',hour12:true});
    document.getElementById("live-date").textContent = now.toLocaleDateString([], { weekday: 'long', day:'numeric', month:'long' });
}

// WEATHER
async function displayWeather(){
    const weatherDiv = document.getElementById("weather-info");
    const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
    const lat=22.750843, lon=75.796336;
    try{
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        const data = await res.json();
        weatherDiv.textContent = `${Math.round(data.main.temp)}°C, ${data.name}`;
    }catch{ weatherDiv.textContent="Weather unavailable"; }
}
displayWeather();
setInterval(displayWeather,10*60*1000);

// RANDOM SOUND
function playRandomSound(){ 
    const delay = Math.random()*(60000-20000)+20000;
    setTimeout(()=>{sound.play(); playRandomSound();},delay);
}
playRandomSound();

// BATTERY
async function updateBatteryHUD(){
    if(!navigator.getBattery) return;
    const battery = await navigator.getBattery();
    const segments = ["seg1","seg2","seg3","seg4"].map(id=>document.getElementById(id));
    const notch = document.querySelector(".battery-notch");
    const text = document.getElementById("battery-text");
    function refresh(){
        const level = battery.level*100;
        let activeSegments = Math.ceil(level/100*4);
        segments.forEach((seg,i)=>{
            if(i >= 4 - activeSegments){
                seg.style.opacity=1;
                if(hud.classList.contains("battle-mode")) seg.style.background="#ff3b3b";
                else seg.style.background = level>50?"#00f0ff":level>20?"#ffa500":"#ff0000";
            } else seg.style.opacity=0.2;
        });
        // Notch
        if(hud.classList.contains("battle-mode")) notch.style.background="#ff3b3b";
        else notch.style.background = level>50?"#00f0ff":level>20?"#ffa500":"#ff0000";
        text.textContent = `${level.toFixed(0)}% ${battery.charging?"(Charging)":""}`;
    }
    refresh();
    battery.addEventListener("levelchange",refresh);
    battery.addEventListener("chargingchange",refresh);
}
updateBatteryHUD();

// HEART RATE SIMULATION
function simulateHeartRate(){ bpmSpan.textContent = 60 + Math.floor(Math.random()*20); }
simulateHeartRate();
setInterval(simulateHeartRate,5000);

// NOTIFICATIONS
function randomNotification(){ notifications.textContent = tips[Math.floor(Math.random()*tips.length)]; }
setInterval(randomNotification,10000);

// START BUTTON
startBtn.addEventListener("click", async ()=>{
    startBtn.classList.add("fade-out");
    bootContent.classList.add("show");
    setTimeout(async ()=>{
        startOverlay.style.display="none";
        await startCamsera();
        startBoot();
    },800);
});

const tasks = ["Check heart rate","Drink water","Take a short walk","Check posture"];
const tasksMenuList = document.querySelector("#tasks-menu ul");

function updateTasks() {
    tasksMenuList.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        li.textContent = task;
        tasksMenuList.appendChild(li);
    });
}
updateTasks();

// BOOT SEQUENCE
function startBoot(){
    let progress=0;
    loadingAudio.currentTime=0; loadingAudio.play();
    const interval = setInterval(()=>{
        progress++;
        loadingText.textContent = `${progress}%`;
        if(progress>=100){
            clearInterval(interval);
            loadingAudio.pause(); loadingAudio.currentTime=0;
            bootAudio.volume=0.6; bootAudio.play();
            setTimeout(()=>bootContent.classList.add("fade-out"),100);
            setTimeout(()=>{ bootCircle.style.opacity="1"; bootCircle.classList.add("expand"); },150);
            setTimeout(()=>{
                bootScreen.style.opacity="0";
                bootScreen.style.display="none";
                hud.classList.add("show");
                updateClock(); setInterval(updateClock,1000);
                // Show battle button and tips
                document.getElementById("hud-middle-right").style.display="block";
                hudBottomCenter.textContent = tips[Math.floor(Math.random()*tips.length)];
            },900);
        }
    },40);
}

// BATTLE MODE
let battleMode=false;
battleBtn.addEventListener("click",()=>{
    battleMode = !battleMode;
    if(battleMode){
        hud.classList.add("battle-mode");
        battleBtn.textContent = "Battle Mode";
    }else{
        hud.classList.remove("battle-mode");
        battleBtn.textContent = "Normal Mode";
    }
});
