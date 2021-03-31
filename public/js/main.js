
var socket = io();

socket.on('port', function(data){
    if (data.port){
        $(".error").hide()
        $("#connect-button").html(data.port)
    }else{
        $(".error").hide()
        $("#connect-button").html("Connect")
    }
});


socket.on('error', function(data){
    if (data.error){
        $(".error").show()
        $(".error").html(data.error)
        $("#connect-button").html("Connect")
    }else{
        $(".error").hide()
    }
});

var element = document.getElementById('connect-button');
element.addEventListener("click", function(e) {

    let data = {
        port : $("#ports").val()
    }

    $.post("/connect", data, function (data, status) {
        if (status == 'success'){
            console.log(data)
            // location.reload()
            // if (data.data){
            //     $("#connect-button").html("Connected " + data.port)
            // }else{
            //     $("#connect-button").html("Connect")
            // }
        }else{
            $("#connect-button").html("Connect")
        }
    })
}, false);

var element = document.getElementById('run-button');
element.addEventListener("click", function(e) {

    let data = []

    const elementsFreq = document.querySelectorAll('.frequency');
    const elementsDur = document.querySelectorAll('.duration');
    Array.from(elementsFreq).forEach((element, index) => {
        data.push({
            frequency : elementsFreq[index].value,
            duration : elementsDur[index].value
        })
    })
    $.post("/run", {data : JSON.stringify(data)}, function (data, status) {
        if (status == 'success'){
            if (data.data){
                $(".success").show()
                htmlText = "<ul>"
                data.data.forEach(element => {
                    htmlText +=  "<li>"+element+"</li>"
                });
                htmlText += "</ul>"  
                $(".success").html(htmlText)
            }else{
                $(".success").hide()
            }            
        }
    })
}, false);

var element = document.getElementById('port-button');
element.addEventListener("click", function(e) {
    fetch('/refresh-port')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            refreshPort(myJson.data)
        });
}, false);


var element = document.getElementById('update-button');
element.addEventListener("click", function(e) {
    fetch('/refresh')
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            let data = [true, false, true, false];

            const elements = document.querySelectorAll('.card');
            Array.from(elements).forEach((element, index) => {
            // conditional logic here.. access element
                if (data[index]){
                    element.classList.remove('red');
                    element.classList.add('green');
                }else{
                    element.classList.remove('green');
                    element.classList.add('red');
                }
            });
            console.log(myJson);
        });
}, false);


function refreshPort(ports) {

    element = document.getElementById("ports")

    var length = element.options.length;
        for (i = length-1; i >= 0; i--) {
        element.options[i] = null;
    }

    ports.forEach((port, index) => {
        var option = document.createElement("option");
        option.text = port;
        if(index == 0){
            option.selected = true;
        }
        element.add(option); 
    });
}
