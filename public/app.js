var socket = io.connect();

socket.on('led', function (data) {
    if (data.id !== 6) {
        $('#inputSlider' + data.id)[0].value = Number(data.value);
        $('#outputText' + data.id).text(Number(data.value));
    }
});

function showValue(id, newValue) {
    $('#outputText' + id)[0].value = newValue;
    // document.getElementById("outputText").innerHTML = newValue;
    socket.emit('led', { id: id, value: newValue });
}

$("#inputSlider6").click(function () {
    let newValue;

    if (this.checked) {
        newValue = 255
    } else {
        newValue = 0;
    }
    $('#outputText6').text(Number(newValue));
    // document.getElementById("outputText").innerHTML = newValue;
    socket.emit('led', { id: 6, value: newValue });

});