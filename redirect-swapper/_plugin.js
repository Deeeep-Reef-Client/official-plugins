let redirectswapper_sortedAnimalList = [];

let redirectswapper_petsList = [];

const redirectswapper_redirectSwapperOpenButton = document.createElement("button");
redirectswapper_redirectSwapperOpenButton.classList.add("assetswapper-new-button");
redirectswapper_redirectSwapperOpenButton.innerText = "Redirect";
assetSwapperNewButton.parentElement.insertBefore(redirectswapper_redirectSwapperOpenButton, assetSwapperNewButton.nextElementSibling);

const redirectswapper_redirectSwapperManagerDiv = DRC.Modal.buildModal("redirectswapper_", "Redirect Swapper", `
<button id="redirectswapper_newButton" class="assetswapper-new-button assetswapper-add-button"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        class="bi bi-plus" viewBox="0 0 16 16">
                        <path
                            d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>New</button>
<div id="redirectswapper_ruleList"></div>
`, true);

const redirectswapper_newButton = document.getElementById("redirectswapper_newButton");
const redirectswapper_ruleList = document.getElementById("redirectswapper_ruleList");

const redirectswapper_redirectSwapperNewDiv = DRC.Modal.buildModal("redirectswapper_newRedirect", "New Redirect", `
<div>Template: 
<select id="redirectswapper_OptionsTemplateCategory">
    <option value="assets">Assets</option>
    <option value="animals">Animals</option>
    <option value="pets">Pets</option>
    <option value="terrains">Terrains</option>
</select>
<select id="redirectswapper_OptionsTemplate">
</select>
</div>
<div class="assetswapper-list-rule">
<input type="text" id="redirectswapper_OptionsSource" placeholder="Source URL">
<div class="spacer"></div>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
        class="bi bi-arrow-right" viewBox="0 0 16 16">
        <path fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
</svg>
<div class="spacer"></div>
<input type="text" id="redirectswapper_OptionsRedirect" placeholder="Destination URL">
</div>
<button id="redirectswapper_addButton" class="assetswapper-add-button">Add</button>
`, true);

const redirectswapper_addButton = document.getElementById("redirectswapper_addButton");

const redirectswapper_OptionsSource = document.getElementById("redirectswapper_OptionsSource");
const redirectswapper_OptionsRedirect = document.getElementById("redirectswapper_OptionsRedirect");
const redirectswapper_OptionsTemplate = document.getElementById("redirectswapper_OptionsTemplate");
const redirectswapper_OptionsTemplateCategory = document.getElementById("redirectswapper_OptionsTemplateCategory");

function redirectswapper_updateRedirectList() {
    redirectswapper_ruleList.innerHTML = "";
    for (let i in settings.pluginUserData["redirect-swapper"].redirects) {
        const mainElem = document.createElement("div");
        mainElem.classList.add("assetswapper-list-rule");
        // redirect source
        const sourceElem = document.createElement("p");
        sourceElem.innerText = settings.pluginUserData["redirect-swapper"].redirects[i].sourceUrl;
        mainElem.appendChild(sourceElem);
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
        // Destination URL
        const destionationElem = document.createElement("p");
        destionationElem.innerText = settings.pluginUserData["redirect-swapper"].redirects[i].redirectUrl;
        mainElem.appendChild(destionationElem);
        const spacer3 = document.createElement("div");
        spacer3.classList.add("spacer");
        mainElem.appendChild(spacer3);
        // Delete button
        const deleteElem = document.createElement("button");
        deleteElem.classList.add("assetswapper-new-button");
        deleteElem.innerText = "Delete";
        deleteElem.addEventListener("click", () => {
            settings.pluginUserData["redirect-swapper"].redirects = settings.pluginUserData["redirect-swapper"].redirects.filter(item => item != settings.pluginUserData["redirect-swapper"].redirects[i]);
            saveSettings();
            redirectswapper_updateRedirectList();
        });
        mainElem.appendChild(deleteElem);
        redirectswapper_ruleList.appendChild(mainElem);
    }
}

redirectswapper_OptionsTemplateCategory.addEventListener("change", () => {
    let templateDropdown = "";
    switch (redirectswapper_OptionsTemplateCategory.value) {
        case "assets":
            templateDropdown = `
            <option value="assets1">Assets 1</option>
            <option value="assets2">Assets 2</option>
            <option value="assets3">Assets 3</option>
            `;
            break;
        case "animals":
            // animalList.push({
            //     name: translations[animals[i].name + "-name"] ?? animals[i].name,
            //     stringId: animals[i].name,
            //     id: animals[i].id
            // });
            for (let i in redirectswapper_sortedAnimalList) {
                templateDropdown += `
                <option value="${redirectswapper_sortedAnimalList[i].stringId}">${redirectswapper_sortedAnimalList[i].name}</option>
                `;
            }
            break;
        case "pets":
            for (let i in redirectswapper_petsList) {
                templateDropdown += `
                    <option value="${redirectswapper_petsList[i].asset}">${redirectswapper_petsList[i].name}</option>
                    `;
            }
            break;
        case "terrains":
            templateDropdown = `
            <option value="beach">Beach</option>
            <option value="beach_underwater">Beach Underwater</option>
            <option value="coldterrain">Cold Terrain</option>
            <option value="coldterrain_back">Cold Terrain Back</option>
            <option value="deepterrain">Deep Terrain</option>
            <option value="glacier">Glacier</option>
            <option value="swamp-island">Swamp Island</option>
            <option value="swamp-water">Swamp Water</option>
            <option value="glacier">Glacier</option>
            <option value="terrain">Regular</option>
            <option value="terrain_back">Regular Back</option>
            `;
            break;
    }
    redirectswapper_OptionsTemplate.innerHTML = templateDropdown;
    redirectswapper_OptionsTemplate.value = "";
    redirectswapper_OptionsSource.value = "";
});

redirectswapper_OptionsTemplate.addEventListener("change", () => {
    let sourceUrl = "";
    if (redirectswapper_OptionsTemplateCategory.value === "assets") {
        switch (redirectswapper_OptionsTemplate.value) {
            case "assets1":
                sourceUrl = "https://<DEEEEP_URL>/assets/spritesheets/assets.png";
                break;
            case "assets2":
                sourceUrl = "https://<DEEEEP_URL>/assets/spritesheets/assets-2.png";
                break;
            case "assets3":
                sourceUrl = "https://<DEEEEP_URL>/assets/spritesheets/assets-3.png";
                break;
        }
    } else if (redirectswapper_OptionsTemplateCategory.value === "animals") {
        sourceUrl = `https://<DEEEEP_URL>/assets/characters/${redirectswapper_OptionsTemplate.value}.png`;
    } else if (redirectswapper_OptionsTemplateCategory.value === "pets") {
        sourceUrl = `https://cdn.deeeep.io/custom/pets/${redirectswapper_OptionsTemplate.value}`;
    } else if (redirectswapper_OptionsTemplateCategory.value === "terrains") {
        sourceUrl = `https://<DEEEEP_URL>/assets/patterns/${redirectswapper_OptionsTemplate.value.replace('-', '/')}.png`;
    }

    redirectswapper_OptionsSource.value = sourceUrl;
});

redirectswapper_OptionsSource.addEventListener("change", () => {
    redirectswapper_OptionsTemplate.value = "";
    redirectswapper_OptionsTemplateCategory.value = "";
});

redirectswapper_addButton.addEventListener("click", () => {
    let sourceUrlObject;
    try {
        sourceUrlObject = new URL(redirectswapper_OptionsSource.value);
        new URL(redirectswapper_OptionsRedirect.value); // Check the destination URL for good measure
    } catch (e) {
        new Notification("Could not process URL", {
            body: "Redirect Swapper could not process your URL. Check that it is not malformed."
        });
        return;
    }
    settings.pluginUserData["redirect-swapper"].redirects.push({
        sourceUrl: redirectswapper_OptionsSource.value,
        scheme: `*://${sourceUrlObject.host}${sourceUrlObject.pathname}`,
        redirectUrl: redirectswapper_OptionsRedirect.value
    });

    saveSettings();
    ipcRenderer.send("redirectswapper_refreshListeners");
    redirectswapper_redirectSwapperNewDiv.classList.add("drc-modal-hidden");

    redirectswapper_updateRedirectList();

    new Notification("Redirect saved!", {
        body: "URL redirects have been refreshed."
    });
});

redirectswapper_redirectSwapperOpenButton.addEventListener("click", () => {
    redirectswapper_updateRedirectList();

    redirectswapper_redirectSwapperManagerDiv.classList.toggle("drc-modal-hidden");
});

redirectswapper_newButton.addEventListener("click", () => {
    redirectswapper_OptionsSource.value = "";
    redirectswapper_OptionsRedirect.value = "";
    redirectswapper_OptionsTemplate.value = "";
    redirectswapper_OptionsTemplateCategory.value = "";

    redirectswapper_redirectSwapperNewDiv.classList.toggle("drc-modal-hidden");
});

// Set animal list
setTimeout(function anon() {
    // Repeat if the fetch hasn't loaded yet
    if (animalList.length === 0) {
        setTimeout(anon, 100);
        return;
    }
    redirectswapper_sortedAnimalList = animalList.sort((a, b) => {
        var textA = a.name.toUpperCase();
        var textB = b.name.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
}, 100);

(async () => {
    redirectswapper_petsList = await fetch(API_URL + "/pets", { credentials: "include" })
        .then(response => response.json())
        .then(pets => pets.sort((a, b) => {
            var textA = a.name.toUpperCase();
            var textB = b.name.toUpperCase();
            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
        }));
})();