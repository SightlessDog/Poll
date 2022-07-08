$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/polls", (data) => {
            if (!data) {
                return;
            }
                data.forEach((poll) => {
                    console.log(poll , poll.participants);
                    console.log("Has at least 1 participant? ", poll.participants.length > 0);
                    if(poll.participants.length > 0) {
                        $(".modal-body").append(
                            `<div>
                        <span class="polls-title">  Title: ${poll.title} </span>
                        <div class="polls-description"> Description: ${poll.description} </div>                 
                        </div>`
                        );
                    }
                });
        });
    });
});
