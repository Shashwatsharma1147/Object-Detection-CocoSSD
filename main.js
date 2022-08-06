img = "";
Status = "";
objects = [];

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector("COCOSSD", modelLoaded);
    document.getElementById("status").innerHTML = "status = detecting object";
}
function modelLoaded() {
    console.log("model is loaded");
    Status = true;
    objectDetector.detect(img, gotResult);
}

function gotResult(error, result) {
    if (error) {
        console.log("Error");
    }
    else {
        console.log(result);
        objects = result;
    }
}

function preload() {
    img = loadImage("dog_cat.jpg");
}

function draw() {
    image(img, 0, 0, 640, 420);

    if (Status != "") {
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected";
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x, objects[i].y);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }

    /*fill("red");
    text("dog", 170, 70);
    noFill();
    stroke("red");
    rect(105, 55, 200, 300);
    
    fill("red");
    text("cat", 400, 80);
    noFill();
    stroke("red");
    rect(300, 55, 300, 350);*/
}