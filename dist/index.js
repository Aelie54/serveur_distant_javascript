import { SaveFile } from "./old_class.js";
const saveFile = new SaveFile(document.getElementById('form_controller'), document.getElementById('_files'), 
// "_spinner",
"_submit").listenSubmitAndRun().listenChangeAndFilter();
