const plugindev_pluginManagerOpenButton = document.createElement("button");
plugindev_pluginManagerOpenButton.classList.add("assetswapper-new-button");
plugindev_pluginManagerOpenButton.innerText = "Developer";
searchPluginsButton.parentElement.insertBefore(plugindev_pluginManagerOpenButton, searchPluginsButton.nextElementSibling);
const plugindev_pluginManagerDiv = document.createElement("div");
document.getElementById("app").appendChild(plugindev_pluginManagerDiv);
plugindev_pluginManagerDiv.outerHTML = `
    <div id="plugindev_pluginManagerModalContainer" class="drc-modal-modal-container drc-modal-hidden">
    <div id="plugindev_pluginManagerContainer" class="drc-modal-container">
        <div id="plugindev_pluginManagerModal" class="modal-content drc-modal-modal-content">
            <span class="drc-modal-title">
                <div></div>
                <div class="justify-self-center">Developer Plugins Manager</div>
                <div></div>
            </span>
            <div class="drc-modal-content">
                <p>Welcome, Developer</p>
                <button id="plugindev_newPluginButton" class="assetswapper-new-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                    New
                </button>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                    <select id="plugindev_selectPlugin"></select>
                    <div class="spacer"></div>
                    <button id="plugindev_openPluginButton" class="assetswapper-new-button">
                        Open Existing
                    </button>
                    <div class="spacer"></div>
                    <button id="plugindev_exportPluginButton" class="assetswapper-new-button">
                        Export
                    </button>
                </div>
                <div class="spacer"></div>
                <div class="assetswapper-list-rule">
                <input id="plugindev_selectImportFile" type="file" accept=".json">
                    <div class="spacer"></div>
                    <button id="plugindev_importPluginButton" class="assetswapper-new-button">
                        Import
                    </button>
                </div>
            </div>
            <button id="plugindev_pluginManagerCloseButton" class="drc-modal-close"><svg width="1.125em"
                    height="1.125em" viewBox="0 0 24 24" class="svg-icon" color="gray"
                    style="--sx:1; --sy:1; --r:0deg;">
                    <path
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                    </path>
                </svg></button>
        </div>
    </div>
</div>
`;
const plugindev_pluginManagerModalContainer = document.getElementById("plugindev_pluginManagerModalContainer");
const plugindev_pluginManagerCloseButton = document.getElementById("plugindev_pluginManagerCloseButton");
const plugindev_newPluginButton = document.getElementById("plugindev_newPluginButton");
const plugindev_openPluginButton = document.getElementById("plugindev_openPluginButton");
const plugindev_exportPluginButton = document.getElementById("plugindev_exportPluginButton");
const plugindev_importPluginButton = document.getElementById("plugindev_importPluginButton");
const plugindev_selectPlugin = document.getElementById("plugindev_selectPlugin");
const plugindev_selectImportFile = document.getElementById("plugindev_selectImportFile");
// Dev button onclick
plugindev_pluginManagerOpenButton.addEventListener("click", () => {
    plugindev_pluginManagerModalContainer.classList.toggle("drc-modal-hidden");
    // reload open/export
    plugindev_selectPlugin.innerHTML = "";
    for (let i in settings.pluginsData) {
        const elem = document.createElement("option");
        elem.setAttribute("value", JSON.stringify(settings.pluginsData[i].id));
        elem.innerText = settings.pluginsData[i].name;
        plugindev_selectPlugin.appendChild(elem);
    }
});
plugindev_pluginManagerCloseButton.addEventListener("click", () => {
    plugindev_pluginManagerModalContainer.classList.toggle("drc-modal-hidden");
});
const plugindev_pluginEditorDiv = document.createElement("div");
document.getElementById("app").appendChild(plugindev_pluginEditorDiv);
plugindev_pluginEditorDiv.outerHTML = `
    <div id="plugindev_pluginEditorModalContainer" class="drc-modal-modal-container drc-modal-hidden">
    <div id="plugindev_pluginEditorContainer" class="drc-modal-container">
        <div id="plugindev_pluginEditorModal" class="modal-content drc-modal-modal-content">
            <span class="drc-modal-title">
                <div></div>
                <div class="justify-self-center">Plugin Editor</div>
                <div></div>
            </span>
            <div class="drc-modal-content">
                <div>
                    <div class="spacer"></div>
                    <div class="assetswapper-list-rule">
                        <p>Name: </p>
                        <div class="spacer"></div>
                        <input type="text" id="plugindev_OptionsName" placeholder="Plugin Name">
                    </div>
                    <div class="spacer"></div>
                    <div class="assetswapper-list-rule">
                        <p>ID: </p>
                        <div class="spacer"></div>
                        <input type="text" id="plugindev_OptionsId" placeholder="Plugin ID">
                    </div>
                    <div class="spacer"></div>
                    <div class="assetswapper-list-rule">
                        <p>Description: </p>
                        <div class="spacer"></div>
                        <input type="text" id="plugindev_OptionsDescription" placeholder="Plugin Description">
                    </div>
                    <div class="spacer"></div>
                    <div class="assetswapper-list-rule">
                        <p>Author: </p>
                        <div class="spacer"></div>
                        <input type="text" id="plugindev_OptionsAuthor" placeholder="Plugin Author">
                    </div>
                </div>
                <div class="spacer"></div>
                <button id="plugindev_newScript" class="assetswapper-new-button">
                    New Script
                </button>
                <div class="spacer"></div>
                <div id="plugindev_OptionsSrc">

                </div>
                <button id="plugindev_pluginEditorSaveButton" class="assetswapper-new-button">Save</button>
            </div>
            <button id="plugindev_pluginEditorCloseButton" class="drc-modal-close"><svg width="1.125em"
                    height="1.125em" viewBox="0 0 24 24" class="svg-icon" color="gray"
                    style="--sx:1; --sy:1; --r:0deg;">
                    <path
                        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z">
                    </path>
                </svg></button>
        </div>
    </div>
</div>
`;
const plugindev_pluginEditorModalContainer = document.getElementById("plugindev_pluginEditorModalContainer");
const plugindev_pluginEditorCloseButton = document.getElementById("plugindev_pluginEditorCloseButton");
const plugindev_pluginEditorSaveButton = document.getElementById("plugindev_pluginEditorSaveButton");
const plugindev_OptionsName = document.getElementById("plugindev_OptionsName");
const plugindev_OptionsId = document.getElementById("plugindev_OptionsId");
const plugindev_OptionsDescription = document.getElementById("plugindev_OptionsDescription");
const plugindev_OptionsAuthor = document.getElementById("plugindev_OptionsAuthor");
const plugindev_OptionsSrc = document.getElementById("plugindev_OptionsSrc");
const plugindev_newScriptButton = document.getElementById("plugindev_newScript");
plugindev_newScriptButton.addEventListener("click", () => {
    // new script
    const mainElem = document.createElement("div");
    plugindev_OptionsSrc.appendChild(mainElem);
    mainElem.setAttribute("style", "display:flex");
    const typeElem = document.createElement("select");
    mainElem.appendChild(typeElem);
    typeElem.innerHTML = `
        <option value="startup">startup</option>
        <option value="preload">preload</option>
        <option value="domloaded">domloaded</option>
        <option value="game">game</option>
        `;
    const spacer1 = document.createElement("div");
    spacer1.classList.add("spacer");
    mainElem.appendChild(spacer1);
    const srcElem = document.createElement("textarea");
    mainElem.appendChild(srcElem);
    const spacer2 = document.createElement("div");
    spacer2.classList.add("spacer");
    mainElem.appendChild(spacer2);
    const deleteElem = document.createElement("button");
    deleteElem.classList.add("assetswapper-new-button");
    deleteElem.innerText = "Delete Script";
    mainElem.appendChild(deleteElem);
    deleteElem.addEventListener("click", () => {
        mainElem.remove();
        spacer.remove();
    });
    const spacer = document.createElement("div");
    spacer.classList.add("spacer");
    plugindev_OptionsSrc.appendChild(spacer);
});
function plugindev_formatSrc() {
    let src = [];
    for (let i in plugindev_OptionsSrc.children) {
        if (typeof (plugindev_OptionsSrc.children[i]) != "object")
            continue;
        if (plugindev_OptionsSrc.children[i].classList.contains("spacer"))
            continue;
        src.push({
            type: plugindev_OptionsSrc.children[i].querySelector("select").value,
            src: plugindev_OptionsSrc.children[i].querySelector("textarea").value
        });
    }
    return src;
}
;
// Plugin editor button onclick
plugindev_newPluginButton.addEventListener("click", () => {
    plugindev_pluginEditorModalContainer.classList.toggle("drc-modal-hidden");
});
plugindev_pluginEditorCloseButton.addEventListener("click", () => {
    plugindev_pluginEditorModalContainer.classList.toggle("drc-modal-hidden");
});
plugindev_pluginEditorSaveButton.addEventListener("click", () => {
    settings.pluginsData = settings.pluginsData.filter(plugin => {
        return plugin.id != plugindev_OptionsId.value;
    });
    settings.pluginsData.push({
        name: plugindev_OptionsName.value,
        id: plugindev_OptionsId.value,
        description: plugindev_OptionsDescription.value,
        author: plugindev_OptionsAuthor.value,
        src: plugindev_formatSrc()
    });
    // clear
    plugindev_OptionsName.value = "";
    plugindev_OptionsId.value = "";
    plugindev_OptionsDescription.value = "";
    plugindev_OptionsAuthor.value = "";
    plugindev_OptionsSrc.innerHTML = "";
    plugindev_pluginEditorModalContainer.classList.toggle("drc-modal-hidden");
    saveSettings();
    updateInstalledPluginsList();
});
// open existing
plugindev_openPluginButton.addEventListener("click", () => {
    for (let i in settings.pluginsData) {
        if (("\"" + settings.pluginsData[i].id + "\"") != plugindev_selectPlugin.value)
            continue;
        plugindev_OptionsName.value = settings.pluginsData[i].name;
        plugindev_OptionsId.value = settings.pluginsData[i].id;
        plugindev_OptionsDescription.value = settings.pluginsData[i].description;
        plugindev_OptionsAuthor.value = settings.pluginsData[i].author;
        for (let j in settings.pluginsData[i].src) {
            // new script
            const mainElem = document.createElement("div");
            plugindev_OptionsSrc.appendChild(mainElem);
            mainElem.setAttribute("style", "display:flex");
            const typeElem = document.createElement("select");
            mainElem.appendChild(typeElem);
            typeElem.innerHTML = `
                <option value="startup">startup</option>
                <option value="preload">preload</option>
                <option value="domloaded">domloaded</option>
                <option value="game">game</option>
                `;
            typeElem.value = settings.pluginsData[i].src[j].type;
            const spacer1 = document.createElement("div");
            spacer1.classList.add("spacer");
            mainElem.appendChild(spacer1);
            const srcElem = document.createElement("textarea");
            mainElem.appendChild(srcElem);
            srcElem.value = settings.pluginsData[i].src[j].src;
            const spacer2 = document.createElement("div");
            spacer2.classList.add("spacer");
            mainElem.appendChild(spacer2);
            const deleteElem = document.createElement("button");
            deleteElem.classList.add("assetswapper-new-button");
            deleteElem.innerText = "Delete Script";
            mainElem.appendChild(deleteElem);
            deleteElem.addEventListener("click", () => {
                mainElem.remove();
                spacer.remove();
            });
            const spacer = document.createElement("div");
            spacer.classList.add("spacer");
            plugindev_OptionsSrc.appendChild(spacer);
        }
        break;
    }
    plugindev_pluginEditorModalContainer.classList.toggle("drc-modal-hidden");
});
// export
plugindev_exportPluginButton.addEventListener("click", () => {
    let exportedPlugin = "";
    for (let i in settings.pluginsData) {
        if (("\"" + settings.pluginsData[i].id + "\"") != plugindev_selectPlugin.value)
            continue;
        exportedPlugin = settings.pluginsData[i];
        break;
    }
    ;
    const content = JSON.stringify(exportedPlugin);
    ipcRenderer.send("getPath", "downloads");
    ipcRenderer.on("gettedPath", (_event, path) => {
        try {
            fs.writeFileSync(path + `/${exportedPlugin.name.replace(/[^a-zA-Z0-9]/g, '')}.drcplugin.json`, content);
            new Notification("Plugin exported!", {
                body: `Your plugin has been exported to ${exportedPlugin.name.replace(/[^a-zA-Z0-9]/g, '')}.drcplugin.json in your Downloads folder. `
            });
            // file written successfully
        }
        catch (err) {
            console.error(err);
            new Notification("Something went wrong", {
                body: `An error occurred while exporting your plugin.`
            });
        }
    });
});
// import
plugindev_importPluginButton.addEventListener("click", () => {
    // @ts-ignore I KNOW BETTER
    if (plugindev_selectImportFile.files.length == 0)
        return;
    // @ts-ignore I KNOW BETTER
    const theme = plugindev_selectImportFile.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
        let parsedPlugin = {};
        try {
            // @ts-ignore I KNOW BETTER
            parsedPlugin = JSON.parse(atob(event.target.result.split(new RegExp(","))[1]));
        }
        catch (e) {
            new Notification("Something went wrong", {
                body: "Something went wrong while importing your plugin. Check that it is not corrupted."
            });
        }
        settings.pluginsData.push(parsedPlugin);
        updateInstalledPluginsList();
        saveSettings();
    });
    reader.readAsDataURL(theme);
});