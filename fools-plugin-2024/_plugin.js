const logoWrapper = document.querySelector("div.el-image");
logoWrapper.innerHTML = "";
const text = document.createElement("h1");
text.setAttribute("style", "font-size:3em;height:1em;white-space:nowrap;line-height:1;");
text.innerText = "funfish.io";
logoWrapper.appendChild(text);

window.addEventListener("load", () => {
    const style = document.createElement("style");
    style.innerHTML = `
    div.loading-bar > img.ball {
        display: block !important;
        box-sizing: border-box !important;
        background: url(https://deeeep-reef-client.github.io/plugins-api/plugins/fools-plugin-2024/funfish_ball.png) no-repeat !important;
        width: 127px !important;
        height: 91px !important;
        padding-left: 127px !important;
    }
    div.loading-bar > div {
        background-color: #b0c4c9 !important;
    }
    `;
    document.head.appendChild(style);
});