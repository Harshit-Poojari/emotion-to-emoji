Webcam.set( {
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');

function captureimage() {
    Webcam.snap(function(data_uri){
      document.getElementById("result").innerHTML = '<img id="capturedimage" src="'+data_uri+'"/>';    
  })
}
console.log('ml5.version',ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/FmlEYiV_k9/model.json",modelLoaded);

function speak() {
    synth = window.speechSynthesis;
    speakData1 = "The First Prediction is"+prediction_1;
    speakData2 = "The Second Prediction is"+prediction_2;
    utterThis = new SpeechSynthesisUtterance(speakData1+speakData2);
    synth.speak(utterThis);
}

function modelLoaded() {
    console.log('modelLoaded');
}

function result() {
    img = document.getElementById("capturedimage");
    classifier.classify(img,got_results);
}

function got_results(error,results) 
{
if (error) {
    console.error(error);
} else {
    console.log(results);
    document.getElementById("result_emotion_name").innerHTML = results[0].label;
    document.getElementById("result_emotion_name2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Happy") {
        document.getElementById("update_emoji-1").innerHTML = "&#128512;";
    }
    if(results[0].label =="Sad") {
        document.getElementById("update_emoji-1").innerHTML = "&#128524;";
    }
    if(results[0].label =="Angry") {
        document.getElementById("update_emoji-1").innerHTML = "&#128545;";
    }


    if(results[1].label =="Happy") {
        document.getElementById("update_emoji-2").innerHTML = "&#128512;";
    }
    if(results[1].label =="Sad") {
     document.getElementById("update_emoji-2").innerHTML = "&#128524;";
    }
    if(results[1].label =="Angry") {
        document.getElementById("update_emoji-2").innerHTML = "&#128545;";
    }
}

}