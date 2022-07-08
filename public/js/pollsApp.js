$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/polls", (data) => {
            if (!data) {
                return;
            }
                data.forEach((poll) => {
                        $(".modal-body").append(
                            `<a data-id="${poll._id}" href="/singlePoll/${poll._id}" onclick="handlePollClick(event)">
                        <span class="polls-title">  Title: ${poll.title} </span>
                        <div class="polls-description"> Description: ${poll.description} </div>                 
                        </a>`
                        );
            });
        });
    });
});

function handlePollClick(event) {
    const pollId = event.srcElement.parentElement.dataset.id;

    $.post(`/api/poll/${pollId}`, (data) => {
        if (!data) {
            return;
        }
    })
}