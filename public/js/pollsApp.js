const socket = io();

$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("/api/polls", (data) => {
            if (!data) {
                return;
            }
                data.forEach((poll) => {
                        const closed = poll.closed ? "/closed" : "" 
                        $(".modal-body").append(
                            `<a data-id="${poll._id}" href="/singlePoll/${poll._id}${closed}" onclick="handlePollClick(event)">
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

$("#chatForm").submit(() => {
    socket.emit("message");
    $("#chat-input").val("");
    return false;
});
socket.on("message", (message) => {
    displayMessage(message.content);
});
let displayMessage = (message) => {
    $("#chat").prepend($("<li>").html(message));
};
   