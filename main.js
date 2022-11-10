song1 = "";
song2 = "";

scoreLeftWrist = 0;
scoreRightWrist = 0;

song1_status = "";
song2_status = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

function preload()
{
    song1 = loadSound("moh_moh_song.mp3");
    song2 = loadSound("ik_vaari_aa.mp3");
}
function setup()
{
    canvas = createCanvas(500,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded()
{
    console.log("Model is successfully Loaded!!!");
}
function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist Score = " + scoreRightWrist + "Left Wrist Score = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist; X = " + leftWristX + " Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist; X = " + rightWristX + " Y = " + rightWristY);
    }
}
function draw()
{
    image(video, 0, 0, 500, 500);
    song1_status = song1.isPlaying();
    song2_status = song2.isPlaying();

    fill("#FF0000");
    stroke("FF0000");
    
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 18);
        song2.stop();
        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing Moh Moh Ke Dhaage";
        }
    }

    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX, rightWristY, 18);
        song1.stop();
        if(song2_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing Ik Vaari ";
        }
    }
}
function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}