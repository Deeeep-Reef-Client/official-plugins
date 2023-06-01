// init setting if undefined
if (settings.pluginUserData["redirect-swapper"] === undefined || settings.pluginUserData["redirect-swapper"].redirects === undefined) {
    settings.pluginUserData["redirect-swapper"] = { redirects: [] };
    store.set("settings", settings);
    window.webContents.send("settings", settings);
}

let redirectswapper_listeners = [];

function redirectswapper_refreshListeners() {
    console.log("Redirect Swapper Listeners have been refreshed");
    for (let i in redirectswapper_listeners) {
        DRC.Main.defaultSession.webRequest.removeListener(redirectswapper_listeners[i].method, redirectswapper_listeners[i].id);
    }

    for (let i in settings.pluginUserData["redirect-swapper"].redirects) {
        const method = (details, callback) => {
            callback({ redirectURL: settings.pluginUserData["redirect-swapper"].redirects[i].redirectUrl });
        }
        const listener = DRC.Main.defaultSession.webRequest.addListener(
            "onBeforeRequest",
            {
                urls: [settings.pluginUserData["redirect-swapper"].redirects[i].scheme.replace("%3Cdeeeep_url%3E", "deeeep.io")]
            },
            method
        );
        redirectswapper_listeners.push({
            method,
            id: listener.id
        });
        const listener2 = DRC.Main.defaultSession.webRequest.addListener(
            "onBeforeRequest",
            {
                urls: [settings.pluginUserData["redirect-swapper"].redirects[i].scheme.replace("%3Cdeeeep_url%3E", "beta.deeeep.io")]
            },
            method
        );
        redirectswapper_listeners.push({
            method,
            id: listener2.id
        });
    }
}

redirectswapper_refreshListeners();

ipcMain.on("redirectswapper_refreshListeners", () => redirectswapper_refreshListeners());