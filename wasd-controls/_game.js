var wasd_controls_gameCanvas = document.querySelector("#canvas-container > canvas");
var wasd_controls_settingsModalContainer = document.querySelector("div.modals-container");
var wasd_controls_settingsOpened = false;
window.addEventListener("keydown", (key) => {
    if (key.code === "KeyW") {
        wasd_controls_gameCanvas.dispatchEvent(new MouseEvent("pointermove", {
            clientX: window.innerWidth / 2,
            clientY: 0
        }));
    } else if (key.code === "KeyA") {
        wasd_controls_gameCanvas.dispatchEvent(new MouseEvent("pointermove", {
            clientX: 0,
            clientY: window.innerHeight / 2
        }));
    } else if (key.code === "KeyS") {
        if (!wasd_controls_settingsOpened) {
            console.log("h")
            wasd_controls_gameCanvas.dispatchEvent(new MouseEvent("pointermove", {
                clientX: window.innerWidth / 2,
                clientY: window.innerHeight
            }));
            wasd_controls_settingsModalContainer.setAttribute("style", "display:none");
            DRC_API.DRC.EventObject.addEventListener(DRC_API.DRC.Events.SettingsOpened, () => {
                console.log("setting")
                window.dispatchEvent(new KeyboardEvent(""))
            });
        } else {
            wasd_controls_settingsModalContainer.setAttribute("style", "");
        }
    } else if (key.code === "KeyD") {
        wasd_controls_gameCanvas.dispatchEvent(new MouseEvent("pointermove", {
            clientX: window.innerWidth,
            clientY: window.innerHeight / 2
        }));
    }
});