$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/polls?format=json", (data, res) => {
            data.forEach((polls) => {
                    $(".modal-body").append(
                        `<div>
                        <span class="polls-title">  Title: ${polls.title} </span>
                        <div class="polls-description"> Description: ${polls.description} </div>
                    </div>`
                    );
            });
        });
    });
});
