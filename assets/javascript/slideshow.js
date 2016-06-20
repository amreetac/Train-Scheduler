var images = ["assets/images/mail-train-painting.jpg", "assets/images/monorail-train.jpg", "assets/images/on-the-right-track.jpg", "assets/images/train-track.jpg"];

var count = 0;


$('#start').click(startSlideshow);
$('#stop').click(stopSlideshow);


function displayImage (){
    $('#image-holder').html('<img src='+images[count]+ ' width="400px">');
}

function nextImage (){
    count++;
    $('#image-holder').html('<img src="assets/images/loading.jpg" width="200px"/>');
    setTimeout(displayImage, 1000);
    if (count==images.length){
        count = 0;
    }
}
function startSlideshow (){
    showImage = setInterval(nextImage, 3000);
}
function stopSlideshow () {
    clearInterval(showImage);
}

displayImage();
