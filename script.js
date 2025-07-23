function handleTeamClick(event, teamName) {
    event.preventDefault();
    localStorage.setItem("selectedTeam", teamName);
    window.location.href = "pageTwo.html";
}

function selectOvers(overs) {
    localStorage.setItem("selectedOvers", overs);
    window.location.href = "matchPage.html";
}

window.onload = function () {
    const path = window.location.pathname;

    if (path.includes("matchPage.html")) {
        setupMatchPage();
    }
};

function setupMatchPage() {
    const team = localStorage.getItem("selectedTeam");
    const overs = parseInt(localStorage.getItem("selectedOvers"));

    if (!team || isNaN(overs)) {
        alert("Missing team or overs selection. Redirecting...");
        window.location.href = "pageOne.html";
        return;
    }

    const balls = overs * 6;
    let target;

    if (overs === 2) target = getRandom(25, 30);
    else if (overs === 5) target = getRandom(45, 55);
    else if (overs === 10) target = getRandom(75, 85);

    localStorage.setItem("target", target);
    localStorage.setItem("ballsLeft", balls);
    localStorage.setItem("wicketsLeft", overs);
    localStorage.setItem("runsScored", 0);

    document.getElementById("displayTeam").textContent = team;
    document.getElementById("displayTarget").textContent = target;
    document.getElementById("oversDisplay").textContent = balls;
    document.getElementById("displayWkts").textContent = overs;
    document.getElementById("displayRuns").textContent = 0;
}

function bat() {
    let runs = parseInt(localStorage.getItem("runsScored")) || 0;
    let ballsLeft = parseInt(localStorage.getItem("ballsLeft")) || 0;
    let wicketsLeft = parseInt(localStorage.getItem("wicketsLeft")) || 0;
    const target = parseInt(localStorage.getItem("target")) || 0;

    if (ballsLeft === 0 || wicketsLeft === 0 || runs >= target) return;

    const shot = getRandom(0, 6); // Simulate shot
    const display = document.getElementById("numeral");

    if (shot === 0) {
        wicketsLeft--;
        display.textContent = "W";
    } else {
        runs += shot;
        display.textContent = shot;
    }

    ballsLeft--;

    localStorage.setItem("runsScored", runs);
    localStorage.setItem("ballsLeft", ballsLeft);
    localStorage.setItem("wicketsLeft", wicketsLeft);

    document.getElementById("displayRuns").textContent = runs;
    document.getElementById("oversDisplay").textContent = ballsLeft;
    document.getElementById("displayWkts").textContent = wicketsLeft;

    if (runs >= target) {
        alert("🎉 You Win! 🎉");
        window.location.href = "resw.html";
    } else if (ballsLeft === 0 || wicketsLeft === 0) {
        alert("💀 Game Over! 💀");
        window.location.href = "resl.html";
    }
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}








