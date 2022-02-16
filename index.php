<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=, initial-scale=1.0">
    <title>TD AJAX</title>

    <script src="https://code.jquery.com/jquery-3.6.0.js" integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk=" crossorigin="anonymous"></script>

    <link rel="stylesheet" href="style.css">

</head>

<body>


    </div>

    <div>
        <div>
            <div>
                <h1> Sauvegarder un fichier sur mon serveur distant</hi>
            </div>
        </div>

        <form action="#" method="POST" id="form_controller">

            <div>
                <input type="file" name="_file" id="_files" multiple>
            </div> <br>


            <div>
                <input type="submit" value="ENREGISTRER">
            </div>
        </form>
        <br>


            <div id="loading" style="margin:0;display:none">
            </div>


</body>


<script>
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
</script>

</html>