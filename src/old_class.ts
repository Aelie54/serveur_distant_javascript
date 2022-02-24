export class SaveFile {
  #fileList: Set<File>;
  #formData: FormData;
  #form: HTMLInputElement | null;
  #fileInput: HTMLInputElement | null;
  private submitButtonClass: string;
  static authorized_format_file: string[] = ["image/jpeg", "image/jpg"];

  constructor(
    form: HTMLInputElement | null,
    fileField: HTMLInputElement | null,
    submitButtonClass: string
  ) {
    this.#fileList = new Set();
    this.#formData = new FormData();
    this.#fileInput = fileField;
    this.#form = form;
    this.submitButtonClass = submitButtonClass;
  }

  listenSubmitAndRun(): this {
    let Instance = this;
    this.#form?.addEventListener("submit", function (e: Event): void {
      e.preventDefault();
      Instance.fetchSaveFiles();
    });

    return this;
  }

  listenChangeAndFilter() {
    console.log("ok");
    let Self = this;
    this.#fileInput?.addEventListener("change", function () {
      Self.#fileList.clear();

      if (Self.#fileInput !== null && Self.#fileInput.files !== null) {
        for (var i = 0; i < Self.#fileInput.files.length; i++) {
          if (
            !SaveFile.authorized_format_file?.includes(
              Self.#fileInput?.files[i]?.type
            )
          ) {
            alert(`
                    You can only upload  jpeg/jpg/png
                    `);

            continue;
          }

          Self.#fileList.add(Self.#fileInput.files[i]);
        }
      }
    });
  }

  fetchSaveFiles(): Boolean | void {
    let Self = this;

    // console.log("test2");

    if (Self.#fileList.size < 1) {
      alert("Add a image");
      return false;
    }

    if (Self.#fileList.size > 3) {
      alert("You can only upload a maximum of 3 files");
      return false;
    }

    let isImageFile: boolean = true;
    Self.#fileList.forEach(function (file: File) {
      if (SaveFile.authorized_format_file.includes(file?.type)) {
        Self.saveFiles(file);
      } else {
        alert("You can only upload .jpeg or .jpg files");
        isImageFile = false;
      }
    });
    return isImageFile;
  }

  saveFiles(file: File) {
    let Self = this;

    Self.#formData?.set("file", file);
    Self.#formData?.set("file_name", file?.name);

    console.log("ok2");
    console.log("log1", file);

    $.ajax({
      url: "/run.php",
      dataType: "text",
      cache: false,
      contentType: false,
      processData: false,
      data: Self.#formData,
      type: "post",

      success: function (response: serverResponse) {
        console.log("log2", response);
        if (response?.error !== undefined) {
          return false;
        }
        let mon_message: string = response[0] ? response[0] : "";
        let html: string = `<div class="px-5">
                    <span class="text-light">Succes! Reload on more ?</span>
                    </div>`;
        $("#form_controller").append($(html));
      },

      error: function (error: JQuery.jqXHR<any>) {
        console.log(error);
      },
    });
  }

}

type serverResponse = {

    "error" ? : string | undefined ;
    "0" ? : string | undefined ;
    "1" ? : string | undefined ;

}

/*
function run_spinner() {
    document.getElementById("loading").style.display = "";
}
function stop_spinner() {
    document.getElementById("loading").style.display = "none";
    // setTimeout()
}
*/
