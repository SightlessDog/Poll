$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/polls", (data) => {
            if (!data) {
                return;
            }
            console.log("Data is: ", data);
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

$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/allPolls", (data) => {
            if (!data) {
                return;
            }
            console.log("Data is: ", data);
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
