/*
{
    animal: number,
    name: string,
    id: string,
    active: boolean,
    asset: string,
    data: {
        offset: {
            x: number,
            y: number
        }
    },
    assets_data: {
        [name: string]: {
            asset: string
            offset: {
                x: number,
                y: number
            }
        }
    },
    assets: {
        [name: string]: string
    }
}
*/
/*
Asset Data
{
    name: string,
    asset: string,
    offset: {
        x: number,
        y: number
    }
}[]
*/
//(Math.random() + 1).toString(36).substring(2);

// Copyright © 2023 Remy Sharp, https://remysharp.com <remy@remysharp.com>
function customskins_trimCanvas(c) {
    var ctx = c.getContext('2d'),
        copy = document.createElement('canvas').getContext('2d'),
        pixels = ctx.getImageData(0, 0, c.width, c.height),
        l = pixels.data.length,
        i,
        bound = {
            top: null,
            left: null,
            right: null,
            bottom: null
        },
        x, y;

    for (i = 0; i < l; i += 4) {
        if (pixels.data[i + 3] !== 0) {
            x = (i / 4) % c.width;
            y = ~~((i / 4) / c.width);

            if (bound.top === null) {
                bound.top = y;
            }

            if (bound.left === null) {
                bound.left = x;
            } else if (x < bound.left) {
                bound.left = x;
            }

            if (bound.right === null) {
                bound.right = x;
            } else if (bound.right < x) {
                bound.right = x;
            }

            if (bound.bottom === null) {
                bound.bottom = y;
            } else if (bound.bottom < y) {
                bound.bottom = y;
            }
        }
    }

    var trimHeight = bound.bottom - bound.top,
        trimWidth = bound.right - bound.left,
        trimmed = ctx.getImageData(bound.left, bound.top, trimWidth, trimHeight);

    copy.canvas.width = trimWidth;
    copy.canvas.height = trimHeight;
    copy.putImageData(trimmed, 0, 0);

    // open new window with trimmed image:
    return copy.canvas;
}
// END COPYRIGHT

let customskins_skinAssets = [
    {
        name: "<main>",
        asset: "",
        originalAsset: "",
        scale: 0,
        offset: {
            x: 0,
            y: 0
        }
    }
];
let customskins_selectedAsset = "<main>";

const customskins_customSkinManagerOpenButton = document.createElement("button");
customskins_customSkinManagerOpenButton.classList.add("assetswapper-new-button");
customskins_customSkinManagerOpenButton.innerText = "Make";
assetSwapperNewButton.parentElement.insertBefore(customskins_customSkinManagerOpenButton, assetSwapperNewButton.nextElementSibling);

const customskins_customSkinManagerDiv = DRC.Modal.buildModal("customskins_", "Custom Skin Maker", `
<button id="customskins_newButton" class="assetswapper-new-button assetswapper-add-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>New</button>
                    <button id="customskins_clearSelectedButton" class="assetswapper-new-button assetswapper-add-button">Clear Selected</button>
                    <div class="assetswapper-list-rule">
                         <select id="customskins_selectSkin"></select>
                         <div class="spacer"></div>
                         <button id="customskins_exportButton" class="assetswapper-new-button assetswapper-add-button">Export</button>
                    </div>
                    <div class="assetswapper-list-rule">
                        <input id="customskins_importSkinFile" type="file" accept=".json">
                         <div class="spacer"></div>
                         <button id="customskins_importButton" class="assetswapper-new-button assetswapper-add-button">Import</button>
                    </div>
                    <div class="spacer"></div>
<div id="customskins_skinList">
</div>
`, true);

customskins_customSkinManagerOpenButton.addEventListener("click", () => {
    customskins_purgeSkinActiveList();
    customskins_updateCustomSkinsList();
    customskins_reloadImportExport();
    customskins_customSkinManagerDiv.classList.toggle("drc-modal-hidden");
});

const customskins_newButton = document.getElementById("customskins_newButton");
const customskins_skinList = document.getElementById("customskins_skinList");
const customskins_clearSelectedButton = document.getElementById("customskins_clearSelectedButton");

const customskins_selectSkin = document.getElementById("customskins_selectSkin");
const customskins_exportSkinButton = document.getElementById("customskins_exportButton");
const customskins_importSkinButton = document.getElementById("customskins_importButton");
const customskins_importSkinFile = document.getElementById("customskins_importSkinFile");

const customskins_skinEditorDiv = DRC.Modal.buildModal("customskins_skinEditor", "Skin Editor", `
<div id="customskins_skinTabsContainer"></div>
<button id="customskins_saveButton" class="assetswapper-new-button assetswapper-add-button">Save</button>
`, true);

const customskins_skinEditorTabs = DRC.Modal.buildTab("customskins_skinEditor", [
    {
        name: "General",
        content: `
        <div class="spacer"></div>
        <div class="assetswapper-list-rule">
            <p>Name: </p>
            <div class="spacer"></div>
            <input type="text" id="customskins_OptionsName" placeholder="Skin Name">
        </div>
        <div class="spacer"></div>
        <div class="assetswapper-list-rule">
            <p>Animal: </p>
            <div class="spacer"></div>
            <select id="customskins_OptionsAnimal">
            </select>
        </div>
        `
    },
    {
        name: "Assets",
        content: `
        <div style="display:flex;">
            <select id="customskins_OptionsSelectAsset">
            </select>
            <div class="spacer"></div>
            <button id="customskins_newAssetButton" class="assetswapper-new-button assetswapper-add-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-plus" viewBox="0 0 16 16">
                            <path
                                d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>New</button>
            <div class="spacer"></div>
            <button id="customskins_deleteAssetButton" class="assetswapper-new-button assetswapper-add-button">Delete</button>
        </div>
        <div style="display:flex;">
            <canvas id="customskins_assetDisplayCanvas" width="144px" height="204px" style="margin:15px;"></canvas>
            <div class="spacer"></div>
            <div style="margin:15px">
                <div class="assetswapper-list-rule">
                    <p>Name: </p>
                    <div class="spacer"></div>
                    <input type="text" id="customskins_OptionsAssetName" placeholder="Asset Name">
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <p>Display Animal: </p>
                    <div class="spacer"></div>
                    <input type="checkbox" id="customskins_OptionsDisplayAnimal" checked>
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <p>Scale: </p>
                    <div class="spacer"></div>
                    <input type="range" id="customskins_OptionsScale" min="0" max="10" value="5">
                    <span id="customskins_DisplayScale"></span>
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <p>Offset X: </p>
                    <div class="spacer"></div>
                    <input type="number" id="customskins_OptionsOffsetX" placeholder="0">
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <p>Offset Y: </p>
                    <div class="spacer"></div>
                    <input type="number" id="customskins_OptionsOffsetY" placeholder="0">
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <p>Load File: </p>
                    <div class="spacer"></div>
                    <input type="file" id="customskins_OptionsAssetFile" accept="image/png">
                </div>
            </div>
        </div>
        `
    }
], document.getElementById("customskins_skinTabsContainer"));

function customskins_updateCustomSkinsList() {
    let assetSwapperRuleAnimalName = "";
    let assetSwapperRuleSkinName = "";
    customskins_skinList.innerHTML = "";
    for (let i in settings.pluginUserData["custom-skins"].skins) {
        for (let j in animalList) {
            if (animalList[j].id == settings.pluginUserData["custom-skins"].skins[i].animal) {
                assetSwapperRuleAnimalName = animalList[j].name;
                break;
            }
        }
        assetSwapperRuleSkinName = settings.pluginUserData["custom-skins"].skins[i].name;

        const mainElem = document.createElement("div");
        mainElem.classList.add("assetswapper-list-rule");

        // checkbox
        const selectElem = document.createElement("input");
        selectElem.type = "checkbox";
        selectElem.name = "customskins_selectSkins"
        if (settings.pluginUserData["custom-skins"].skins[i].active) selectElem.checked = true;
        selectElem.addEventListener("click", () => {
            settings.pluginUserData["custom-skins"].skins[i].active = selectElem.checked;
            saveSettings();
            customskins_purgeAssetswapper();
        });
        mainElem.appendChild(selectElem);


        const spacer0 = document.createElement("div");
        spacer0.classList.add("spacer");
        mainElem.appendChild(spacer0);

        // animal name
        const animalElem = document.createElement("p");
        animalElem.innerText = assetSwapperRuleAnimalName;
        mainElem.appendChild(animalElem);

        const spacer1 = document.createElement("div");
        spacer1.classList.add("spacer");
        mainElem.appendChild(spacer1);

        // => icon
        const iconElem = document.createElement("div");
        mainElem.appendChild(iconElem);
        iconElem.outerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
    </svg>`;
        const spacer2 = document.createElement("div");
        spacer2.classList.add("spacer");
        mainElem.appendChild(spacer2);

        // Skin name
        const skinElem = document.createElement("p");
        skinElem.innerText = assetSwapperRuleSkinName;
        mainElem.appendChild(skinElem);
        const spacer3 = document.createElement("div");
        spacer3.classList.add("spacer");
        mainElem.appendChild(spacer3);

        // Edit button
        const editElem = document.createElement("button");
        editElem.classList.add("assetswapper-new-button");
        editElem.innerText = "Edit";
        editElem.addEventListener("click", () => {
            customskins_clearMaker();

            customskins_OptionsName.value = settings.pluginUserData["custom-skins"].skins[i].name;
            customskins_OptionsAnimal.value = settings.pluginUserData["custom-skins"].skins[i].animal;

            customskins_OptionsSelectAsset.innerHTML;
            customskins_OptionsAssetName.value = "";
            customskins_OptionsOffsetX.value = 0;
            customskins_OptionsOffsetY.value = 0;
            customskins_OptionsAssetFile.value = "";
            customskins_OptionsScale.value = 5;
            customskins_DisplayScale.innerText = "";

            customskins_skinAssets = [
                {
                    name: "<main>",
                    asset: settings.pluginUserData["custom-skins"].skins[i].assets[settings.pluginUserData["custom-skins"].skins[i].id + ".png"],
                    originalAsset: settings.pluginUserData["custom-skins"].skins[i].assets["original-" + settings.pluginUserData["custom-skins"].skins[i].id + ".png"],
                    scale: settings.pluginUserData["custom-skins"].skins[i].skins[i].scale,
                    offset: {
                        x: Number(settings.pluginUserData["custom-skins"].skins[i].data.offset.x),
                        y: Number(settings.pluginUserData["custom-skins"].skins[i].data.offset.y)
                    }
                }
            ];

            const assetKeys = Object.keys(settings.pluginUserData["custom-skins"].skins[i].assets_data);
            for (let k in assetKeys) {
                customskins_skinAssets.push({
                    name: assetKeys[k],
                    asset: settings.pluginUserData["custom-skins"].skins[i].assets[settings.pluginUserData["custom-skins"].skins[i].id + "-" + assetKeys[k] + ".png"],
                    originalAsset: settings.pluginUserData["custom-skins"].skins[i].assets["original-" + settings.pluginUserData["custom-skins"].skins[i].id + "-" + assetKeys[k] + ".png"],
                    scale: settings.pluginUserData["custom-skins"].skins[i].assets_data[assetKeys[k]].scale,
                    offset: {
                        x: Number(settings.pluginUserData["custom-skins"].skins[i].assets_data[assetKeys[k]].offset.x),
                        y: Number(settings.pluginUserData["custom-skins"].skins[i].assets_data[assetKeys[k]].offset.y)
                    }
                });
            }

            customskins_selectedAsset = "<main>";

            customskins_updateAssetList();
            customskins_loadAsset();

            customskins_skinEditorDiv.classList.remove("drc-modal-hidden");
        });
        mainElem.appendChild(editElem);

        // Delete button
        const deleteElem = document.createElement("button");
        deleteElem.classList.add("assetswapper-new-button");
        deleteElem.innerText = "Delete";
        deleteElem.addEventListener("click", () => {
            settings.pluginUserData["custom-skins"].skins = settings.pluginUserData["custom-skins"].skins.filter(item => item != settings.pluginUserData["custom-skins"].skins[i]);
            saveSettings();
            customskins_purgeAssetswapper();
            customskins_updateCustomSkinsList();
            customskins_reloadImportExport();
        });
        mainElem.appendChild(deleteElem);
        customskins_skinList.appendChild(mainElem);
    }
}

const customskins_saveButton = document.getElementById("customskins_saveButton");

const customskins_OptionsName = document.getElementById("customskins_OptionsName");
const customskins_OptionsAnimal = document.getElementById("customskins_OptionsAnimal");

const customskins_assetDisplayCanvas = document.getElementById("customskins_assetDisplayCanvas");
const customskins_assetDisplayCanvasCtx = customskins_assetDisplayCanvas.getContext("2d");

const customskins_OptionsSelectAsset = document.getElementById("customskins_OptionsSelectAsset");
const customskins_newAssetButton = document.getElementById("customskins_newAssetButton");
const customskins_deleteAssetButton = document.getElementById("customskins_deleteAssetButton");

const customskins_OptionsAssetName = document.getElementById("customskins_OptionsAssetName");
const customskins_OptionsOffsetX = document.getElementById("customskins_OptionsOffsetX");
const customskins_OptionsOffsetY = document.getElementById("customskins_OptionsOffsetY");
const customskins_OptionsAssetFile = document.getElementById("customskins_OptionsAssetFile");

const customskins_OptionsScale = document.getElementById("customskins_OptionsScale");
const customskins_DisplayScale = document.getElementById("customskins_DisplayScale");

const customskins_OptionsDisplayAnimal = document.getElementById("customskins_OptionsDisplayAnimal");


function customskins_saveAsset() {
    customskins_skinAssets.forEach(asset => {
        if (asset.name !== customskins_selectedAsset) return;
        if (
            asset.name !== customskins_OptionsAssetName.value
            && customskins_skinAssets.find(a => a.name === customskins_OptionsAssetName.value)) {
            customskins_OptionsAssetName.value = asset.name;
            return;
        }
        asset.name = customskins_OptionsAssetName.value;
        asset.offset.x = Number(customskins_OptionsOffsetX.value);
        asset.offset.y = Number(customskins_OptionsOffsetY.value);
        const newScale = Number(((-(5 - customskins_OptionsScale.value) / 100) + asset.scale).toFixed(2));
        if (asset.scale !== newScale && Math.sign(newScale) !== -1) asset.scale = newScale;
        customskins_DisplayScale.innerText = asset.scale;

        const canvas = document.createElement("canvas");
        const img = new Image();
        img.addEventListener("load", () => {
            img.width *= asset.scale;
            img.height *= asset.scale;

            canvas.width = img.width;
            canvas.height = img.height;

            canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);

            customskins_skinAssets.forEach(asset => {
                if (asset.name !== customskins_selectedAsset) return;
                asset.asset = customskins_trimCanvas(canvas).toDataURL("image/png");
            });

            customskins_renderAsset();

            console.log("resize asset");
            console.log(customskins_skinAssets);
            console.log(customskins_selectedAsset);
        });
        img.src = asset.originalAsset;
    });

    customskins_OptionsScale.value = 5;

    console.log("save asset");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);
}

function customskins_updateAssetList() {
    console.log("update asset list");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);

    customskins_OptionsSelectAsset.innerHTML = "";

    for (let i in customskins_skinAssets) {
        const selectElem = document.createElement("option");
        selectElem.setAttribute("value", customskins_skinAssets[i].name);
        selectElem.innerText = customskins_skinAssets[i].name;

        customskins_OptionsSelectAsset.appendChild(selectElem);
    }

    customskins_OptionsSelectAsset.value = customskins_selectedAsset;
}

function customskins_renderAsset() {
    console.log("render asset");

    const asset = customskins_skinAssets.filter(a => a.name === customskins_selectedAsset)[0];
    if (asset === undefined) return;

    customskins_assetDisplayCanvasCtx.fillRect(0, 0, 1000, 1000);

    function renderSkin() {
        const img = new Image();
        img.src = asset.asset;
        img.addEventListener("load", () => {
            const ratio = 0.8;
            let centerShift_x = ((customskins_assetDisplayCanvas.width - img.width * ratio) / 2) + asset.offset.x;
            let centerShift_y = ((customskins_assetDisplayCanvas.height - img.height * ratio) / 2) + asset.offset.y;
            customskins_assetDisplayCanvasCtx.drawImage(img, 0, 0, img.width, img.height,
                centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
            // customskins_assetDisplayCanvasCtx.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
            //     0, 0, customskins_assetDisplayCanvas.width, customskins_assetDisplayCanvas.height); // destination 
        });
    }

    if (customskins_OptionsDisplayAnimal.checked) {
        const animalImg = new Image();
        animalImg.addEventListener("load", () => {
            let ratio = 0.8;
            let centerShift_x = (customskins_assetDisplayCanvas.width - animalImg.width * ratio) / 2;
            let centerShift_y = (customskins_assetDisplayCanvas.height - animalImg.height * ratio) / 2;
            // customskins_assetDisplayCanvasCtx.drawImage(animalImg, 0, 0, animalImg.width, animalImg.height,     // source rectangle
            //     centerShift_x, centerShift_y, animalImg.width * ratio, animalImg.height * ratio); // destination
            customskins_assetDisplayCanvasCtx.drawImage(animalImg, 0, 0, animalImg.width, animalImg.height,     // source rectangle
                centerShift_x, centerShift_y, animalImg.width * ratio, animalImg.height * ratio); // destination

            renderSkin();
        });
        animalImg.src = "https://beta.deeeep.io/assets/characters/"
            + animalList.find(a => a.id == customskins_OptionsAnimal.value || 0).stringId
            + ".png";
    } else renderSkin();
}

customskins_OptionsAnimal.addEventListener("change", () => {
    customskins_renderAsset();
});

customskins_newAssetButton.addEventListener("click", () => {
    let name = 1;
    while (customskins_skinAssets.find(a => a.name === "New_Asset_" + name)) {
        name++
        console.log(name);
    }
    customskins_skinAssets.push({
        name: "New_Asset_" + name,
        asset: "",
        originalAsset: "",
        scale: 0,
        offset: {
            x: 0,
            y: 0
        }
    });

    customskins_saveAsset();

    customskins_selectedAsset = "New_Asset_" + name;

    console.log("new asset");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);

    customskins_loadAsset();
    customskins_updateAssetList();
});

customskins_clearSelectedButton.addEventListener("click", () => {
    for (let i in settings.pluginUserData["custom-skins"].skins) {
        settings.pluginUserData["custom-skins"].skins[i].active = false;
    }
    const elems = document.querySelectorAll("input[name=customskins_selectSkins]");
    for (let e in elems) {
        if (typeof (elems[e]) != "object") continue;
        elems[e].checked = false;
    }
    saveSettings();
    customskins_purgeAssetswapper();
});

customskins_OptionsDisplayAnimal.addEventListener("change", () => {
    customskins_renderAsset();
});

customskins_OptionsAssetFile.addEventListener("change", () => {
    if (!customskins_OptionsAssetFile.files[0]) return;

    const canvas = document.createElement("canvas");
    const img = new Image();
    img.addEventListener("load", () => {
        const originalReader = new FileReader();
        originalReader.readAsDataURL(customskins_OptionsAssetFile.files[0]);
        originalReader.addEventListener("load", () => {
            const animal = animalStatData.find(a => a.fishLevel == (customskins_OptionsAnimal.value || 0));

            // {
            //     "name":"fish",
            //     "size":{"x":48,"y":68},
            //     "mass":1,"boosts":1,
            //     "level":0,"fishLevel":0,
            //     "oxygenTime":20,"oxygenTimeMs":20000,"temperatureTime":10,"temperatureTimeMs":10000,"pressureTime":5,"pressureTimeMs":5000,"salinityTime":20,"salinityTimeMs":20000,"speedMultiplier":1,"walkSpeedMultiplier":1,"jumpForceMultiplier":1,"sizeMultiplier":0.9,"sizeScale":{"x":1,"y":1},"damageMultiplier":1,"healthMultiplier":1.5,"damageBlock":0,"damageReflection":0,"bleedReduction":0,"armorPenetration":0,"poisonResistance":0,"permanentEffects":0,"
            // Resize to fit
            console.log(animal)
            let hRatio = 180 / img.width;
            let vRatio = 255 / img.height;
            let ratio = Number(Math.min(hRatio, vRatio).toFixed(2));

            img.width *= ratio;
            img.height *= ratio;

            canvas.width = img.width;
            canvas.height = img.height;
            canvas.getContext("2d").drawImage(img, 0, 0, img.width, img.height);

            customskins_skinAssets.forEach(asset => {
                if (asset.name !== customskins_selectedAsset) return;
                asset.asset = customskins_trimCanvas(canvas).toDataURL("image/png");
                asset.originalAsset = originalReader.result
                asset.scale = ratio;
            });


            console.log("file asset");
            console.log(customskins_skinAssets);
            console.log(customskins_selectedAsset);

            customskins_saveAsset();
            customskins_updateAssetList();
            customskins_renderAsset();
        });
    });
    img.src = URL.createObjectURL(customskins_OptionsAssetFile.files[0]);
});

function customskins_loadAsset() {
    const asset = customskins_skinAssets.filter(a => a.name === customskins_selectedAsset)[0];
    if (asset === undefined) return;

    if (asset.name === "<main>") customskins_OptionsAssetName.setAttribute("disabled", "");
    else customskins_OptionsAssetName.removeAttribute("disabled");

    customskins_OptionsAssetName.value = asset.name;
    customskins_OptionsOffsetX.value = asset.offset.x;
    customskins_OptionsOffsetY.value = asset.offset.y;
    customskins_OptionsAssetFile.value = "";

    customskins_OptionsScale.value = asset.scale;
    customskins_DisplayScale.innerText = asset.scale;

    customskins_assetDisplayCanvasCtx.fillRect(0, 0, 1000, 1000);
    customskins_OptionsSelectAsset.value = customskins_selectedAsset;

    customskins_renderAsset();

    console.log("load asset end");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);
}

customskins_OptionsSelectAsset.addEventListener("change", () => {
    console.log("select asset");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);

    customskins_saveAsset();

    customskins_selectedAsset = customskins_OptionsSelectAsset.value;

    customskins_loadAsset();
    customskins_updateAssetList()
});

customskins_deleteAssetButton.addEventListener("click", () => {
    // You can't delete the main asset!
    if (customskins_skinAssets.filter(a => a.name === customskins_OptionsSelectAsset.value)[0].name === "<main>") return;

    console.log("delete asset");
    console.log(customskins_skinAssets);
    console.log(customskins_selectedAsset);

    customskins_skinAssets = customskins_skinAssets.filter(a => a.name !== customskins_OptionsSelectAsset.value);
    customskins_selectedAsset = customskins_skinAssets[0].name;
    customskins_OptionsSelectAsset.value = customskins_skinAssets[0].name;

    customskins_loadAsset();
    customskins_updateAssetList();
});

customskins_OptionsAssetName.addEventListener("change", () => {
    console.log('chang');

    customskins_saveAsset();
    customskins_selectedAsset = customskins_OptionsAssetName.value;
    customskins_updateAssetList();
});

customskins_OptionsOffsetX.addEventListener("change", () => {
    console.log('chang')
    customskins_saveAsset();
});

customskins_OptionsOffsetY.addEventListener("change", () => {
    console.log('chang')
    customskins_saveAsset();
});

customskins_OptionsScale.addEventListener("change", () => {
    customskins_saveAsset();
});

/*
ctx.drawImage(img, 0, 0, img.width,    img.height,     // source rectangle
                   0, 0, canvas.width, canvas.height); // destination 
                   */

// Set animal list
setTimeout(function anon() {
    // Repeat if the fetch hasn't loaded yet
    if (animalList.length === 0) {
        setTimeout(anon, 100);
        return;
    }
    const sortedAnimalList = animalList.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    for (let i in sortedAnimalList) {
        const selectElem = document.createElement("option");
        selectElem.setAttribute("value", sortedAnimalList[i].id);
        selectElem.innerText = sortedAnimalList[i].name;

        customskins_OptionsAnimal.appendChild(selectElem);
    }
    customskins_OptionsAnimal.setAttribute("value", "0");
}, 100);


function customskins_purgeAssetswapper() {
    // Purge Custom Skin assets
    settings.assetSwapperConfig = settings.assetSwapperConfig.filter(a => !a.skin.startsWith("drcskin_"));

    for (let i in settings.pluginUserData["custom-skins"].skins) {
        if (!settings.pluginUserData["custom-skins"].skins[i].active) continue;
        settings.assetSwapperConfig.push({
            animal: settings.pluginUserData["custom-skins"].skins[i].animal,
            skin: "drcskin_" + settings.pluginUserData["custom-skins"].skins[i].id
        });
    }

    updateAssetSwapperList();
}

function customskins_purgeSkinActiveList() {
    for (let i in settings.pluginUserData["custom-skins"].skins) {
        if (settings.assetSwapperConfig.find(
            s => s.skin === "drcskin_" + settings.pluginUserData["custom-skins"].skins[i].id)) {
            settings.pluginUserData["custom-skins"].skins[i].active = true;
        } else settings.pluginUserData["custom-skins"].skins[i].active = false;
    }

    saveSettings();
}

function customskins_clearMaker() {
    customskins_OptionsName.value = "";
    customskins_OptionsAnimal.value = "0";
    customskins_assetDisplayCanvasCtx.fillRect(0, 0, 1000, 1000);
    customskins_OptionsSelectAsset.innerHTML = "";
    customskins_OptionsAssetName.value = "";
    customskins_OptionsOffsetX.value = 0;
    customskins_OptionsOffsetY.value = 0;
    customskins_OptionsAssetFile.value = "";
    customskins_OptionsScale.value = 5;
    customskins_DisplayScale.innerText = "";

    customskins_selectedAsset = "<main>";

    customskins_skinAssets = [
        {
            name: "<main>",
            asset: "",
            originalAsset: "",
            scale: 0,
            offset: {
                x: 0,
                y: 0
            }
        }
    ];
}

customskins_clearMaker();

customskins_newButton.addEventListener("click", () => {
    customskins_clearMaker();
    customskins_updateAssetList();
    customskins_loadAsset();
    customskins_skinEditorDiv.classList.toggle("drc-modal-hidden");
});

customskins_saveButton.addEventListener("click", () => {
    const id = (Math.random() + 1).toString(36).substring(2, 8);

    let assets = {};
    let assetsData = {};
    let mainScale = 0;

    for (let i in customskins_skinAssets) {
        if (customskins_skinAssets[i].name !== "<main>") {
            assetsData[customskins_skinAssets[i].name] = {
                asset: "drcskin_" + id + "-" + customskins_skinAssets[i].name + ".png",
                scale: customskins_skinAssets[i].scale,
                offset: {
                    x: customskins_skinAssets[i].offset.x,
                    y: customskins_skinAssets[i].offset.y
                }
            };
        } else mainScale = customskins_skinAssets[i].scale;

        assets[customskins_skinAssets[i].name === "<main>" ?
            id + ".png" :
            id + "-" + customskins_skinAssets[i].name + ".png"
        ] = customskins_skinAssets[i].asset;

        assets[customskins_skinAssets[i].name === "<main>" ?
            "original-" + id + ".png" :
            "original-" + id + "-" + customskins_skinAssets[i].name + ".png"
        ] = customskins_skinAssets[i].originalAsset;
    }

    settings.pluginUserData["custom-skins"].skins.push({
        animal: Number(customskins_OptionsAnimal.value) || 0,
        name: customskins_OptionsName.value,
        id,
        active: true,
        asset: "drcskin_" + id + ".png",
        data: {
            offset: {
                x: customskins_OptionsOffsetX.value,
                y: customskins_OptionsOffsetY.value
            }
        },
        assets_data: assetsData,
        assets,
        scale: mainScale
    });

    customskins_skinEditorDiv.classList.add("drc-modal-hidden");

    customskins_clearMaker();
    customskins_updateCustomSkinsList();
    saveSettings();
    customskins_purgeAssetswapper();
    customskins_reloadImportExport();
});

function customskins_reloadImportExport() {
    // reload open/export
    customskins_selectSkin.innerHTML = "";
    for (let i in settings.pluginUserData["custom-skins"].skins) {
        const elem = document.createElement("option");
        elem.setAttribute("value", settings.pluginUserData["custom-skins"].skins[i].id);
        elem.innerText = settings.pluginUserData["custom-skins"].skins[i].name;
        customskins_selectSkin.appendChild(elem);
    }
}

// export
customskins_exportSkinButton.addEventListener("click", () => {
    let exportedSkin = {};
    for (let i in settings.pluginUserData["custom-skins"].skins) {
        if (settings.pluginUserData["custom-skins"].skins[i].id != customskins_selectSkin.value)
            continue;
        exportedSkin = structuredClone(settings.pluginUserData["custom-skins"].skins[i]);
        break;
    };

    exportedSkin.active = true;

    const content = JSON.stringify(exportedSkin);
    ipcRenderer.invoke("getPath", "downloads")
        .then(path => {
            try {
                fs.writeFileSync(path + `/${exportedSkin.name.replace(/[^a-zA-Z0-9]/g, '')}.drcskin.json`, content);
                new Notification("Skin exported!", {
                    body: `Your skin has been exported to ${exportedSkin.name.replace(/[^a-zA-Z0-9]/g, '')}.drcskin.json in your Downloads folder. `
                });
                // file written successfully
            }
            catch (err) {
                console.error(err);
                new Notification("Something went wrong", {
                    body: `An error occurred while exporting your skin.`
                });
            }
        });
});
// import
customskins_importSkinButton.addEventListener("click", () => {
    // @ts-ignore I KNOW BETTER
    if (customskins_importSkinFile.files.length == 0)
        return;
    // @ts-ignore I KNOW BETTER
    const theme = customskins_importSkinFile.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let parsedPlugin = {};
        try {
            // @ts-ignore I KNOW BETTER
            parsedPlugin = JSON.parse(atob(event.target.result.split(new RegExp(","))[1]));
        }
        catch (e) {
            new Notification("Something went wrong", {
                body: "Something went wrong while importing your skin. Check that it is not corrupted."
            });
        }
        settings.pluginUserData["custom-skins"].skins.push(parsedPlugin);
        saveSettings();
        customskins_updateCustomSkinsList()
        customskins_reloadImportExport();
        customskins_purgeAssetswapper();
    });
    reader.readAsDataURL(theme);
});

customskins_purgeSkinActiveList();