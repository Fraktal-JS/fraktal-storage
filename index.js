const electron = require("electron");
const fs = require("fs");
const path = require("path");

const app = electron.app || electron.remote.app;

const storeDir = app.getPath("userData");

if (!fs.existsSync(storeDir)) fs.mkdirSync(storeDir);
if (!fs.existsSync(path.join(storeDir, "storage.json"))) fs.writeFileSync(path.join(storeDir, "storage.json"), "{}");

module.exports = new Proxy(JSON.parse(fs.readFileSync(path.join(storeDir, "storage.json")), { encoding: "utf8" }), {
    set: (object, key, value) => {
        object[key] = value;

        //console.log(JSON.stringify(object));
        fs.writeFile(path.join(storeDir, "storage.json"), JSON.stringify(object), (err) => err ? console.log(err) : null);

        return object;
    }
});