const modelParams = {
    flipHorizontal: true, // kveikja á lárétta flip.
    imageScaleFactor: 0.7, // draga úr stærð innsláttarmyndar til að auka hraðann.
    maxNumBoxes: 20, // hámarksfjölda kassa til að greina.
    iouThreshold: 0.5, // ioU þröskuldur fyrir non-max kúgun.
    scoreThreshold: 0.90, // sjálfstraust þröskuldur fyrir spár.
}

navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.mozGetUserMedia;


// Select everything in HTML
const video = document.querySelector('#video');
const canvas = document.querySelector('#canvas');
const context = canvas.getContext('2d');
let model;

handTrack.startVideo(video)
    .then(status => {
        if (status) {
            navigator.getUserMedia({ video: {} }, stream => {
                    video.srcObject = stream;
                    setInterval(runDetection, 1000)
                },
                err => console.log(err)
            );
        }
    });

function runDetection() {
    model.detect(video)
        .then(predictions => {
            console.log(predictions);
            if (predictions.length > 0) {
                alert("Þú snert andlit þitt!");
            }
        });
}


handTrack.load(modelParams)
    .then(lmodel => {
        model = lmodel;
    });

function notifyMe() {
    if (!("Notification" in window)) {
        alert("Þessi netvafri styður ekki tilkynningar, notaðu annan vafra.");
    } else if (Notification.permission === "veittur") {
        notify();
    } else if (Notification.permission !== 'hafnað') {
        Notification.requestPermission(function(permission) {
            if (permission === "veittur") {
                notify();
            }
        });
    }

    function notify() {
        var notification = new Notification('TITLE OF NOTIFICATION', {
            icon: 'http://carnes.cc/jsnuggets_avatar.jpg',
            body: "viðvörun",
        });

        notification.onclick = function() {
            window.open("http://carnes.cc");
        };
        setTimeout(notification.close.bind(notification), 7000);
    }

}