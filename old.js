
    $("#form_controller").on("submit", (e) => {
        // console.log("ok");
        e.preventDefault();
        fetchSaveFiles();
    });
    var fileList = [];
    var fileInput = document.getElementById("_files");
    fileInput.addEventListener('change', function() {
        fileList = []
        for (var i = 0; i < fileInput.files.length; i++) {
            fileList.push(fileInput.files[i]);
        }
    });
    function fetchSaveFiles() {
        let authorized_format_file = [
            "image/jpeg",
            "image/jpg",
            "image/png",
        ];
        if (fileList.length < 1) {
            alert("Add an image")
            return false;
        }
        if (fileList.length > 3) {
            alert("You can only upload a maximum of three files");
            return false;
        }
        let isImageFile = true;
        fileList.forEach(function(file) {
            if (authorized_format_file.includes(file.type)) {
                saveFiles(file);
            } else {
                alert("you can only upload .jpeg .jpg or .png files");
                isImageFile = false;
            }
        });
        return isImageFile;
    }
    function saveFiles(file) {
        var formData = new FormData();
        formData.set('file', file);
        formData.set('file_name', file.name);
        run_spinner();
        $.ajax({
            url: '/run.php',
            dataType: 'text',
            cache: false,
            contentType: false,
            processData: false,
            data: formData,
            type: 'post',
            success: function(response) {
                response = JSON.parse(response);
                if (response.error !== undefined) {
                    return false;
                }
                let mon_message = response[0] ? response[0] : "";
                let html =
                    `<div class="px-5">
                    <span class="text-light">${mon_message}</span>
                </div>`;
                $("#form_controller").append($(html));
                setTimeout(stop_spinner, 2000);
            },
            error: function(error) {
                setTimeout(stop_spinner, 2000);
                console.log(error);
            }
        })
    }
    function run_spinner() {
        document.getElementById("loading").style.display = "";
    }
    function stop_spinner() {
        document.getElementById("loading").style.display = "none";
        // setTimeout()
    }