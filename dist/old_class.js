var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _SaveFile_fileList, _SaveFile_formData, _SaveFile_form, _SaveFile_fileInput;
export class SaveFile {
    constructor(form, fileField, submitButtonClass) {
        _SaveFile_fileList.set(this, void 0);
        _SaveFile_formData.set(this, void 0);
        _SaveFile_form.set(this, void 0);
        _SaveFile_fileInput.set(this, void 0);
        __classPrivateFieldSet(this, _SaveFile_fileList, new Set(), "f");
        __classPrivateFieldSet(this, _SaveFile_formData, new FormData(), "f");
        __classPrivateFieldSet(this, _SaveFile_fileInput, fileField, "f");
        __classPrivateFieldSet(this, _SaveFile_form, form, "f");
        this.submitButtonClass = submitButtonClass;
    }
    listenSubmitAndRun() {
        let Instance = this;
        __classPrivateFieldGet(this, _SaveFile_form, "f")?.addEventListener("submit", function (e) {
            e.preventDefault();
            Instance.fetchSaveFiles();
        });
        return this;
    }
    listenChangeAndFilter() {
        console.log("ok");
        let Self = this;
        __classPrivateFieldGet(this, _SaveFile_fileInput, "f")?.addEventListener("change", function () {
            __classPrivateFieldGet(Self, _SaveFile_fileList, "f").clear();
            if (__classPrivateFieldGet(Self, _SaveFile_fileInput, "f") !== null && __classPrivateFieldGet(Self, _SaveFile_fileInput, "f").files !== null) {
                for (var i = 0; i < __classPrivateFieldGet(Self, _SaveFile_fileInput, "f").files.length; i++) {
                    if (!SaveFile.authorized_format_file?.includes(__classPrivateFieldGet(Self, _SaveFile_fileInput, "f")?.files[i]?.type)) {
                        alert(`
                    You can only upload  jpeg/jpg/png
                    `);
                        continue;
                    }
                    __classPrivateFieldGet(Self, _SaveFile_fileList, "f").add(__classPrivateFieldGet(Self, _SaveFile_fileInput, "f").files[i]);
                }
            }
        });
    }
    fetchSaveFiles() {
        let Self = this;
        // console.log("test2");
        if (__classPrivateFieldGet(Self, _SaveFile_fileList, "f").size < 1) {
            alert("Add a image");
            return false;
        }
        if (__classPrivateFieldGet(Self, _SaveFile_fileList, "f").size > 3) {
            alert("You can only upload a maximum of 3 files");
            return false;
        }
        let isImageFile = true;
        __classPrivateFieldGet(Self, _SaveFile_fileList, "f").forEach(function (file) {
            if (SaveFile.authorized_format_file.includes(file?.type)) {
                Self.saveFiles(file);
            }
            else {
                alert("You can only upload .jpeg or .jpg files");
                isImageFile = false;
            }
        });
        return isImageFile;
    }
    saveFiles(file) {
        let Self = this;
        __classPrivateFieldGet(Self, _SaveFile_formData, "f")?.set("file", file);
        __classPrivateFieldGet(Self, _SaveFile_formData, "f")?.set("file_name", file?.name);
        console.log("ok2");
        console.log("log1", file);
        $.ajax({
            url: "/run.php",
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            data: __classPrivateFieldGet(Self, _SaveFile_formData, "f"),
            type: "post",
            success: function (response) {
                console.log("log2", response);
                if (response?.error !== undefined) {
                    return false;
                }
                let mon_message = response[0] ? response[0] : "";
                let html = `<div class="px-5">
                    <span class="text-light">Succes! Reload on more ?</span>
                    </div>`;
                $("#form_controller").append($(html));
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
}
_SaveFile_fileList = new WeakMap(), _SaveFile_formData = new WeakMap(), _SaveFile_form = new WeakMap(), _SaveFile_fileInput = new WeakMap();
SaveFile.authorized_format_file = ["image/jpeg", "image/jpg"];
/*
function run_spinner() {
    document.getElementById("loading").style.display = "";
}
function stop_spinner() {
    document.getElementById("loading").style.display = "none";
    // setTimeout()
}
*/
