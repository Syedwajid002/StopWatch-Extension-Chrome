// Create a container for the stopwatch and inject the HTML content
const stopwatchHTML = `
  <div id="stopwatch-extension">
    <div id="stopwatch-container">
      <div id="display">00:00:00</div>
      <div id="buttons">
        <button id="start" class="btn">Start</button>
        <button id="stop" class="btn">Stop</button>
        <button id="reset" class="btn">Reset</button>
        <button id="close" class="btn">Close</button>
      </div>
    </div>
  </div>
`;

const div = document.createElement('div');
div.innerHTML = stopwatchHTML;
document.body.appendChild(div);

let [hours, minutes, seconds] = [0, 0, 0];
let displayer = document.getElementById("display");
let timer = null;

function stopwatch() {
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
        if (minutes == 60) {
            minutes = 0;
            hours++;
        }
    }
    displayer.innerHTML = (hours < 10 ? "0" + hours : hours) + " : " + 
                          (minutes < 10 ? "0" + minutes : minutes) + " : " + 
                          (seconds < 10 ? "0" + seconds : seconds);
}

function startStopwatch() {
    if (timer !== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch, 1000);
}

function stopStopwatch() {
    clearInterval(timer);
}

function resetStopwatch() {
    clearInterval(timer);
    [hours, minutes, seconds] = [0, 0, 0];
    displayer.innerHTML = "00:00:00";
}

function closeStopwatch() {
    document.getElementById("stopwatch-extension").remove();
}

// Prevent clicks inside the extension from closing it
document.getElementById("stopwatch-extension").addEventListener("click", function(event) {
    event.stopPropagation();
});

// Event listeners for buttons
document.getElementById("start").addEventListener("click", startStopwatch);
document.getElementById("stop").addEventListener("click", stopStopwatch);
document.getElementById("reset").addEventListener("click", resetStopwatch);
document.getElementById("close").addEventListener("click", closeStopwatch);
