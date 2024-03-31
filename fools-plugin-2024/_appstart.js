const animalNames = JSON.parse(`["fish","crab","jellyfish","squid","seagull","ray","beaver","penguin","tshark","dolphin","shark","killerwhale","whale","worm","anglerfish","leopardseal","blobfish","kingcrab","pollock","seaturtle","oarfish","octopus","giantsquid","narwhal","cachalot","polarbear","lamprey","pelican","whaleshark","remora","marlin","sunfish","stonefish","ghost","crocodile","electriceel","frog","hippo","manatee","snappingturtle","piranha","snake","baldeagle","lionfish","dragonfly","mantaray","elephantseal","lanternfish","sleepershark","gulpereel","giantisopod","giantisopodclosed","babypenguin","seal","icefish","barreleye","dragonfish","humboldtsquid","sealion","flyingfish","duck","goblinshark","catfish","littleauk","pufferfish","pufferfishfilled","tigershark","lionmanejellyfish","anaconda","bobbitworm","mahimahi","walrus","frilledshark","sawfish","mantisshrimp","axolotl","bat","firefly","blindcavefish","crayfish","goliathbullfrog","giantsalamander","alligatorsnappingturtle","giantsoftshellturtle","giantsoftshellturtleclosed","olm","alligatorgar","humpbackwhale","sardine","horseshoecrab","baskingshark","colossalsquid","climbingcavefish","archerfish","seaotter","lobster","barracuda","frogfish","morayeel","wobbegongshark","leatherbackturtle","threshershark","atlantictorpedo","coconutcrab","bullshark","hermitcrab","giantpacificoctopus","beakedwhale","megamouthshark","belugawhale","vampiresquid","halibut","bowheadwhale","japanesespidercrab","cookiecuttershark","sarcasticfringehead","parrotfish","wolfeel","giantsiphonophore","coelacanth","napoleonwrasse"]`);
const filterUrls = [];
for (const n of animalNames) {
    if (n !== "sunfish") {
        filterUrls.push("*://deeeep.io/assets/characters/" + n + ".png");
        filterUrls.push("*://beta.deeeep.io/assets/characters/" + n + ".png");
    }
}

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: filterUrls
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep.io/assets/characters/sunfish.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://deeeep.io/assets/spritesheets/assets.png",
            "*://beta.deeeep.io/assets/spritesheets/assets.png"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_assets.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://deeeep.io/assets/spritesheets/assets-1.png",
            "*://beta.deeeep.io/assets/spritesheets/assets-1.png"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_assets-1.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://deeeep.io/assets/spritesheets/assets-2.png",
            "*://beta.deeeep.io/assets/spritesheets/assets-2.png"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_assets-2.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://deeeep.io/assets/spritesheets/assets-3.png",
            "*://beta.deeeep.io/assets/spritesheets/assets-3.png"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_assets-3.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://deeeep.io/assets/spritesheets/swamp.png",
            "*://beta.deeeep.io/assets/spritesheets/swamp.png"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_swamp.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://cdn.deeeep.io/custom/skins/*",
            "*://deeeep.io/assets/skins/*",
            "*://beta.deeeep.io/assets/skins/*"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep.io/assets/characters/sunfish.png" });
    }
);

DRC.Main.defaultSession.webRequest.addListener(
    "onBeforeRequest",
    {
        urls: [
            "*://cdn.deeeep.io/custom/pets/*"
        ]
    },
    (details, callback) => {
        callback({ redirectURL: "https://deeeep.io/assets/characters/sunfish.png" });
    }
);