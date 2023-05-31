const http = require('node:http');

// init setting if undefined
if (settings.pluginUserData["custom-skins"] === undefined || settings.pluginUserData["custom-skins"].skins === undefined) {
    settings.pluginUserData["custom-skins"] = { skins: [] };
    store.set("settings", settings);
    window.webContents.send("settings", settings);
}

// Create HTTP server
const httpServer = http.createServer(function (req, res) {
    console.log(req.url);
    res.setHeader("Access-Control-Allow-Origin", req.headers["origin"] ?? "https://beta.deeeep.io");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, authorization, CSRF-Token, Twitch, X-Timezone");
    res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");

    if (req.url.startsWith("/api/skins/")) {
        const skin = settings.pluginUserData["custom-skins"].skins
            .filter(skin => skin.id === req.url.slice(11))[0];
        if (skin === undefined) {
            res.end();
            return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        let resSkin = JSON.parse(JSON.stringify(skin));
        delete resSkin.assets;
        res.write(JSON.stringify(resSkin));
        res.end();
    } else if (req.url.startsWith("/cdn/skins/")) {
        const skin = settings.pluginUserData["custom-skins"].skins
            .filter(skin => skin.id === req.url.slice(11, 17))[0];
        if (skin === undefined || skin.assets[req.url.slice(11)] === undefined) {
            res.end();
            return;
        }
        const img = Buffer.from(skin.assets[req.url.slice(11)].replace("data:image/png;base64,", ""), "base64");
        res.writeHead(200, {
            "Content-Type": "image/png",
            "Content-Length": img.length
        });
        res.end(img);
    } else {
        res.end();
    }
});
let httpPort = 4319;
httpServer.on("error", e => {
    if (e.code === "EADDRINUSE") {
        httpPort++;
        httpServer.listen(httpPort);
    } else {
        new Notification({
            title: "Failed to start Custom Skins server",
            body: "An error occurred while trying to start Custom Skins plugin."
        }).show();
    }
});
httpServer.listen(httpPort);

const DRC_SERVER_URL = "http://127.0.0.1:";

const DRC_SKIN_REDIRECT_TEMPLATE = '/api/skins/'; // redirect URLs are all from this
const DRC_SKIN_SCHEME = '*://apibeta.deeeep.io/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_REGEX = /.+\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SERVER_URL + httpPort + DRC_SKIN_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_REGEX).groups.filename });
    }
);

const DRC_SKIN_CDN_REDIRECT_TEMPLATE = '/cdn/skins/'; // redirect URLs are all from this
const DRC_SKIN_CDN_SCHEME = '*://*.deeeep.io/assets/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_CDN_REGEX = /.+\/assets\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_CDN_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SERVER_URL + httpPort + DRC_SKIN_CDN_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_CDN_REGEX).groups.filename });
    },
);


const DRC_SKIN_CUSTOM_REDIRECT_TEMPLATE = '/cdn/skins/'; // redirect URLs are all from this
const DRC_SKIN_CUSTOM_SCHEME = '*://cdn.deeeep.io/custom/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_CUSTOM_REGEX = /.+\/custom\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_CUSTOM_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SERVER_URL + httpPort + DRC_SKIN_CUSTOM_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_CUSTOM_REGEX).groups.filename })
    }
);