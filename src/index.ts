import { SaveFile } from "./old_class.js";

const saveFile = new SaveFile(
    <HTMLInputElement>document.getElementById('form_controller'),
    <HTMLInputElement>document.getElementById('_files'),
    // "_spinner",
    "_submit"
    ).listenSubmitAndRun().listenChangeAndFilter()