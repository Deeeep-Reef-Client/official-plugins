// init setting if undefined
if (settings.pluginUserData["background-music"] === undefined || settings.pluginUserData["background-music"].music === undefined) {
    settings.pluginUserData["background-music"] = { music: [] };
    saveSettings();
}

let backgroundmusic_musicElements = [];

for (let i in settings.pluginUserData["background-music"].music) {
    try {
        let audioElement = new Audio(settings.pluginUserData["background-music"].music[i].musicUrl);
        backgroundmusic_musicElements.push({
            trigger: settings.pluginUserData["background-music"].music[i].trigger,
            biome: settings.pluginUserData["background-music"].music[i].biome ?? null,
            audio: audioElement
        });
    } catch (e) {
        new Notification("Failed to load music", {
            body: "There was a problem when loading music. Check that the URL is not malformed."
        });
    }
}

let TRIGGER_NAMES = {
    ambient: "Ambient",
    mainmenu: "Main Menu",
    playing: "Playing",
    biome: "Biome",
    boost: "On Boost",
    kill: "On Kill",
    death: "On Death",
    evolve: "On Evolve",
    biomeChange: "On Biome Change"
};

// Style
const backgroundmusic_style = document.createElement("style");
backgroundmusic_style.innerHTML = `
.drcplugin-backgroundmusic-biome-checkbox-container {
    display: grid;
    grid-template-columns: auto auto auto;
}

.drcplugin-backgroundmusic-biome-checkbox-container > div > * {
    vertical-align: middle;
}

.drcplugin-backgroundmusic-biome-checkbox-container > div > input:indeterminate {

}
`;
document.head.appendChild(backgroundmusic_style);

// Background music button
const backgroundmusic_openButtonWrapper = settingsButtonWrapper.cloneNode(true);
const backgroundmusic_openButton = backgroundmusic_openButtonWrapper.firstElementChild;
backgroundmusic_openButtonWrapper.setAttribute("id", "backgroundmusic_openButtonWrapper");
backgroundmusic_openButton.setAttribute("id", "backgroundmusic_openButton");
backgroundmusic_openButton.querySelector("span[class]").innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-music-note-beamed" viewBox="0 0 16 16">
<path d="M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z"/>
<path fill-rule="evenodd" d="M14 11V2h1v9h-1zM6 3v10H5V3h1z"/>
<path d="M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z"/>
</svg>`
topRightNav.insertBefore(backgroundmusic_openButtonWrapper, aboutDrcButtonWrapper);

const backgroundmusic_backgroundMusicManagerDiv = DRC.Modal.buildModal("backgroundmusic_", "Background Music", `
<button id="backgroundmusic_newButton" class="assetswapper-new-button assetswapper-add-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>New</button>
<div id="backgroundmusic_musicList"></div>
`);

const backgroundmusic_newButton = document.getElementById("backgroundmusic_newButton");
const backgroundmusic_musicList = document.getElementById("backgroundmusic_musicList");

const backgroundmusic_backgroundMusicNewDiv = DRC.Modal.buildModal("backgroundmusic_newMusic", "New Music", `
<div class="assetswapper-list-rule">
    <select id="backgroundmusic_OptionsTrigger">
        <option value="ambient">Ambient</option>
        <option value="mainmenu">Main Menu</option>
        <option value="playing">Playing</option>
        <option value="biome">Biome</option>
        <option value="boost">On Boost</option>
        <option value="kill">On Kill</option>
        <option value="death">On Death</option>
        <option value="evolve">On Evolve</option>
        <option value="biomeChange">On Biome Change</option>
    </select>
    <div class="spacer"></div>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
    </svg>
    <div class="spacer"></div>
    <input type="text" id="backgroundmusic_OptionsMusic" placeholder="Music URL">
</div>
<div id="backgroundmusic_biomeSelection" class="drc-modal-hidden">
    <div class="spacer"></div>
    <b>Biome</b>
    <div class="drcplugin-backgroundmusic-biome-checkbox-container">
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeCold" />
            <label for="backgroundmusic_BiomeCold">Cold</label>
        </div>
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeWarm" />
            <label for="backgroundmusic_BiomeWarm">Warm</label>
        </div>
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeShallow" />
            <label for="backgroundmusic_BiomeShallow">Shallow</label>
        </div>
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeDeep" />
            <label for="backgroundmusic_BiomeDeep">Deep</label>
        </div>
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeFresh" />
            <label for="backgroundmusic_BiomeFresh">Fresh</label>
        </div>
        <div>
            <input type="checkbox" id="backgroundmusic_BiomeSalt" />
            <label for="backgroundmusic_BiomeSalt">Salt</label>
        </div>
    </div>
</div>
<button id="backgroundmusic_addButton" class="assetswapper-add-button">Add</button>
`, true);

const backgroundmusic_OptionsTrigger = document.getElementById("backgroundmusic_OptionsTrigger");
const backgroundmusic_OptionsMusic = document.getElementById("backgroundmusic_OptionsMusic");
const backgroundmusic_addButton = document.getElementById("backgroundmusic_addButton");
const backgroundmusic_biomeSelection = document.getElementById("backgroundmusic_biomeSelection");
const backgroundmusic_BiomeCold = document.getElementById("backgroundmusic_BiomeCold");
const backgroundmusic_BiomeWarm = document.getElementById("backgroundmusic_BiomeWarm");
const backgroundmusic_BiomeShallow = document.getElementById("backgroundmusic_BiomeShallow");
const backgroundmusic_BiomeDeep = document.getElementById("backgroundmusic_BiomeDeep");
const backgroundmusic_BiomeFresh = document.getElementById("backgroundmusic_BiomeFresh");
const backgroundmusic_BiomeSalt = document.getElementById("backgroundmusic_BiomeSalt");

backgroundmusic_OptionsTrigger.addEventListener("change", () => {
    if (backgroundmusic_OptionsTrigger.value === "biome") backgroundmusic_biomeSelection.classList.remove("drc-modal-hidden");
    else backgroundmusic_biomeSelection.classList.add("drc-modal-hidden");
});

function backgroundmusic_makeHabitatCheckbox(checkbox) {
    let state = 0;

    checkbox.addEventListener("change", () => {
        state = state < 2 ? state + 1 : 0;

        if (state === 0) {
            checkbox.checked = false;
            checkbox.indeterminate = false;
        } else if (state === 1) {
            checkbox.checked = true;
            checkbox.indeterminate = false;
        } else {
            checkbox.checked = false;
            checkbox.indeterminate = true;
        }
    });
}

backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeCold);
backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeWarm);
backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeShallow);
backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeDeep);
backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeFresh);
backgroundmusic_makeHabitatCheckbox(backgroundmusic_BiomeSalt);

function backgroundmusic_updateMusicList() {
    backgroundmusic_musicList.innerHTML = "";
    for (let i in settings.pluginUserData["background-music"].music) {
        const mainElem = document.createElement("div");
        mainElem.classList.add("assetswapper-list-rule");
        // Trigger
        const triggerElem = document.createElement("p");
        triggerElem.innerText = TRIGGER_NAMES[settings.pluginUserData["background-music"].music[i].trigger];
        if (settings.pluginUserData["background-music"].music[i].trigger === "biome") {
            const biome = settings.pluginUserData["background-music"].music[i].biome;
            const biomeNames = [];

            if (biome.cold === true) biomeNames.push("Cold");
            else if (biome.cold === false) biomeNames.push("No Cold");

            if (biome.warm === true) biomeNames.push("Warm");
            else if (biome.warm === false) biomeNames.push("No Warm");

            if (biome.shallow === true) biomeNames.push("Shallow");
            else if (biome.shallow === false) biomeNames.push("No Shallow");

            if (biome.deep === true) biomeNames.push("Deep");
            else if (biome.deep === false) biomeNames.push("No Deep");

            if (biome.fresh === true) biomeNames.push("Fresh");
            else if (biome.fresh === false) biomeNames.push("No Fresh");

            if (biome.salt === true) biomeNames.push("Salt");
            else if (biome.salt === false) biomeNames.push("No Salt");

            triggerElem.innerText += " (" + biomeNames.join(", ") + ")";
        }
        mainElem.appendChild(triggerElem);
        const spacer1 = document.createElement("div");
        spacer1.classList.add("spacer");
        mainElem.appendChild(spacer1);
        // sound icon
        const iconElem = document.createElement("div");
        mainElem.appendChild(iconElem);
        iconElem.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-soundwave" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M8.5 2a.5.5 0 0 1 .5.5v11a.5.5 0 0 1-1 0v-11a.5.5 0 0 1 .5-.5zm-2 2a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zm-6 1.5A.5.5 0 0 1 5 6v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm8 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm-10 1A.5.5 0 0 1 3 7v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5zm12 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0V7a.5.5 0 0 1 .5-.5z"/>
      </svg>`;
        const spacer2 = document.createElement("div");
        spacer2.classList.add("spacer");
        mainElem.appendChild(spacer2);
        // Music URL
        const musicElem = document.createElement("p");
        musicElem.innerText = settings.pluginUserData["background-music"].music[i].musicUrl;
        mainElem.appendChild(musicElem);
        const spacer3 = document.createElement("div");
        spacer3.classList.add("spacer");
        mainElem.appendChild(spacer3);
        // Delete button
        const deleteElem = document.createElement("button");
        deleteElem.classList.add("assetswapper-new-button");
        deleteElem.innerText = "Delete";
        deleteElem.addEventListener("click", () => {
            settings.pluginUserData["background-music"].music = settings.pluginUserData["background-music"].music.filter(item => item != settings.pluginUserData["background-music"].music[i]);
            saveSettings();
            backgroundmusic_updateMusicList();
        });
        mainElem.appendChild(deleteElem);
        backgroundmusic_musicList.appendChild(mainElem);
    }
}

function backgroundmusic_clearBiomeSelection() {
    backgroundmusic_BiomeCold.checked = false;
    backgroundmusic_BiomeWarm.checked = false;
    backgroundmusic_BiomeShallow.checked = false;
    backgroundmusic_BiomeDeep.checked = false;
    backgroundmusic_BiomeFresh.checked = false;
    backgroundmusic_BiomeSalt.checked = false;
}

backgroundmusic_addButton.addEventListener("click", () => {
    const music = {
        trigger: backgroundmusic_OptionsTrigger.value,
        musicUrl: backgroundmusic_OptionsMusic.value,
    };

    if (backgroundmusic_OptionsTrigger.value === "biome") {
        music.biome = {
            cold: null,
            warm: null,
            shallow: null,
            deep: null,
            fresh: null,
            salt: null
        };

        if (backgroundmusic_BiomeCold.indeterminate) music.biome.cold = false;
        else if (backgroundmusic_BiomeCold.checked) music.biome.cold = true;

        if (backgroundmusic_BiomeWarm.indeterminate) music.biome.warm = false;
        else if (backgroundmusic_BiomeWarm.checked) music.biome.warm = true;

        if (backgroundmusic_BiomeShallow.indeterminate) music.biome.shallow = false;
        else if (backgroundmusic_BiomeShallow.checked) music.biome.shallow = true;

        if (backgroundmusic_BiomeDeep.indeterminate) music.biome.deep = false;
        else if (backgroundmusic_BiomeDeep.checked) music.biome.deep = true;

        if (backgroundmusic_BiomeFresh.indeterminate) music.biome.fresh = false;
        else if (backgroundmusic_BiomeFresh.checked) music.biome.fresh = true;

        if (backgroundmusic_BiomeSalt.indeterminate) music.biome.salt = false;
        else if (backgroundmusic_BiomeSalt.checked) music.biome.salt = true;
    }

    settings.pluginUserData["background-music"].music.push(music);

    saveSettings();
    backgroundmusic_updateMusicList();
    backgroundmusic_backgroundMusicNewDiv.classList.add("drc-modal-hidden");

    backgroundmusic_OptionsTrigger.value = "ambient";
    backgroundmusic_biomeSelection.classList.add("drc-modal-hidden");
    backgroundmusic_clearBiomeSelection();

    new Notification("Music saved!", {
        body: "Your background music has been saved."
    });
});

backgroundmusic_openButton.addEventListener("click", () => {
    backgroundmusic_updateMusicList();

    backgroundmusic_backgroundMusicManagerDiv.classList.toggle("drc-modal-hidden");
});

backgroundmusic_newButton.addEventListener("click", () => {
    backgroundmusic_OptionsTrigger.value = "ambient";
    backgroundmusic_OptionsMusic.value = "";

    backgroundmusic_backgroundMusicNewDiv.classList.toggle("drc-modal-hidden");
});

// All the music logic

// Interval for checking changes
let backgroundmusic_checkInterval;

let backgroundmusic_lastArea = null;

function backgroundmusic_intervalChecker() {
    DRC.Preload.evalInBrowserContext(`
        if (game.currentScene.myAnimal) window.drcplugin_backgroundmusic.mainWorldChecker(game.currentScene.myAnimal.currentArea);
    `);
}

function backgroundmusic_mainWorldChecker(currentArea) {
    if (backgroundmusic_lastArea === null) backgroundmusic_lastArea = currentArea;

    // Biome change
    if (currentArea !== backgroundmusic_lastArea) {
        backgroundmusic_musicElements.filter(m => m.trigger === "biomeChange").forEach(m => {
            console.log("Biome change music played");
            m.audio.currentTime = 0;
            m.audio.play();
        });

        backgroundmusic_lastArea = currentArea;

        backgroundmusic_musicElements.filter(m => m.trigger === "biome").forEach(m => {
            m.audio.pause();
        });

        const habitatArray = DRC.Utils.habitatToArray(currentArea);

        backgroundmusic_musicElements.filter(m => {
            if (m.trigger === "biome") {
                if (
                    (m.biome.cold === true && !habitatArray.includes("Cold"))
                    || (m.biome.cold === false && habitatArray.includes("Cold"))

                    || (m.biome.warm === true && !habitatArray.includes("Warm"))
                    || (m.biome.warm === false && habitatArray.includes("Warm"))

                    || (m.biome.shallow === true && !habitatArray.includes("Shallow"))
                    || (m.biome.shallow === false && habitatArray.includes("Shallow"))

                    || (m.biome.deep === true && !habitatArray.includes("Deep"))
                    || (m.biome.deep === false && habitatArray.includes("Deep"))

                    || (m.biome.fresh === true && !habitatArray.includes("Fresh"))
                    || (m.biome.fresh === false && habitatArray.includes("Fresh"))

                    || (m.biome.salt === true && !habitatArray.includes("Salt"))
                    || (m.biome.salt === false && habitatArray.includes("Salt"))
                ) return false;

                return true;
            } else return false;
        }).forEach(m => {
            console.log("Biome music played");
            m.audio.loop = true;
            m.audio.play();
        });
    }
}

// Expose checker to main world
contextBridge.exposeInMainWorld("drcplugin_backgroundmusic", {
    mainWorldChecker: backgroundmusic_mainWorldChecker
});

// Ambient
backgroundmusic_musicElements.filter(m => m.trigger === "ambient").forEach(m => {
    console.log("Ambient music played");
    m.audio.loop = true;
    m.audio.play();
});

// Main Menu
backgroundmusic_musicElements.filter(m => m.trigger === "mainmenu").forEach(m => {
    console.log("Main Menu music played");
    m.audio.currentTime = 0;
    m.audio.loop = true;
    m.audio.play();
});

DRC.EventObject.addEventListener(DRC.Events.GameStarted, () => {
    // Playing
    console.log("Playing music played");

    backgroundmusic_musicElements.filter(m => m.trigger === "playing").forEach(m => {
        m.audio.currentTime = 0;
        m.audio.loop = true;
        m.audio.play();
    });

    // Main Menu
    console.log("Main Menu music stopped");

    backgroundmusic_musicElements.filter(m => m.trigger === "mainmenu").forEach(m => {
        m.audio.pause();
    });

    // Interval
    backgroundmusic_checkInterval = setInterval(backgroundmusic_intervalChecker, 200);
});

DRC.EventObject.addEventListener(DRC.Events.GameEnded, () => {
    // Playing
    console.log("Playing music stopped");
    backgroundmusic_musicElements.filter(m => m.trigger === "playing").forEach(m => {
        m.audio.pause();
    });

    // Main Menu
    backgroundmusic_musicElements.filter(m => m.trigger === "mainmenu").forEach(m => {
        console.log("Main Menu music played");
        m.audio.currentTime = 0;
        m.audio.play();
    });

    // Interval
    clearInterval(backgroundmusic_checkInterval);
    backgroundmusic_lastArea = null;
});

DRC.EventObject.addEventListener(DRC.Events.GameEvolved, () => {
    // Evolve
    backgroundmusic_musicElements.filter(m => m.trigger === "evolve").forEach(m => {
        console.log("Evolve music played");
        m.audio.currentTime = 0;
        m.audio.play();
    });
});

DRC.EventObject.addEventListener(DRC.Events.GameBoost, () => {
    // Boost
    backgroundmusic_musicElements.filter(m => m.trigger === "boost").forEach(m => {
        console.log("Boost music played");
        m.audio.currentTime = 0;
        m.audio.play();
    });
});