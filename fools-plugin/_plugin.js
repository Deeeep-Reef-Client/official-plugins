const logoWrapper = document.querySelector("div.el-image");
logoWrapper.innerHTML = "";
const text = document.createElement("h1");
text.setAttribute("style", "font-size:3em;height:1em;white-space:nowrap;line-height:1;font-family:Arial,Helvetica,sans-serif;");
text.innerText = "mope.io";
logoWrapper.appendChild(text);
document.querySelector("div.home-bg").style.setProperty("background-image", "url(https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin/mopeio.jpg)", "important");
window.addEventListener("load", () => {
    const style = document.createElement("style");
    style.innerHTML = `
    div.loading-bar > img.ball {
        display: block !important;
        box-sizing: border-box !important;
        background: url(https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin/mopeio-mouse.png) no-repeat !important;
        width: 127px !important;
        height: 91px !important;
        padding-left: 127px !important;
    }
    div.loading-bar > div {
        background-color: #0fa929 !important;
    }
    .loading-container {
        background-image: url(https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin/mopeio-loadingbg.jpg) !important;
    }
    div.stats > div.el-row.animal-data > div.el-col.el-col-24.auto-col.relative > div.meter.vertical.rounded-none.animal > div:nth-child(1) {
        background-color: #c0903e !important;
    }
    #app > div.overlay.gm-1 > div.choices > div.el-row.info {
        background-color: #0faa29 !Important;
    }
    div.leaderboard.ranking > div.entry {
        background-color: rgba(198,226,161,0.6) !important;
    }
    `;
    document.head.appendChild(style);
});