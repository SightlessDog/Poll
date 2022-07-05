$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/polls", (data) => {
            if (!data) {
                return;
            }
            data.forEach((poll) => {
                    $(".modal-body").append(
                        `<div>
                        <span class="polls-title">  Title: ${poll.title} </span>
                        <div class="polls-description"> Description: ${poll.description} </div>
                        </div>`
                    );
            });
        });
    });
});
