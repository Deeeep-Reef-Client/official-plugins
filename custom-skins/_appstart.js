const DRC_SKIN_REDIRECT_TEMPLATE = 'http://127.0.0.1:4319/api/skins/'; // redirect URLs are all from this
const DRC_SKIN_SCHEME = '*://apibeta.deeeep.io/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_REGEX = /.+\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SKIN_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_REGEX).groups.filename });
    }
);

const DRC_SKIN_CDN_REDIRECT_TEMPLATE = 'http://127.0.0.1:4319/cdn/skins/'; // redirect URLs are all from this
const DRC_SKIN_CDN_SCHEME = '*://*.deeeep.io/assets/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_CDN_REGEX = /.+\/assets\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_CDN_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SKIN_CDN_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_CDN_REGEX).groups.filename });
    },
);


const DRC_SKIN_CUSTOM_REDIRECT_TEMPLATE = 'http://127.0.0.1:4319/cdn/skins/'; // redirect URLs are all from this
const DRC_SKIN_CUSTOM_SCHEME = '*://cdn.deeeep.io/custom/skins/drcskin_*'; // these urls will be redirected like ui sprites
const DRC_SKIN_CUSTOM_REGEX = /.+\/custom\/skins\/drcskin_(?<filename>[^/?]+)(?:\?.*)?$/ // might it be a valid ui sprite? 

DRC.Main.defaultSession.webRequest.onBeforeRequest(
    {
        urls: [DRC_SKIN_CUSTOM_SCHEME]
    },
    (details, callback) => {
        callback({ redirectURL: DRC_SKIN_CUSTOM_REDIRECT_TEMPLATE + details.url.match(DRC_SKIN_CUSTOM_REGEX).groups.filename })
    }
);