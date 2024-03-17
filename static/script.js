let intervalId;
let score = 0;

function startTimer() {
    let minuteValue = document.getElementById("minuteValue");
    let secondValue = document.getElementById("secondValue");
    let minute = parseInt(minuteValue.value);
    let second = parseInt(secondValue.value);

    intervalId = setInterval(function() {
        if(second === 0){
            if(minute === 0){
                functionAlert("Score:");
                resetTimer();
                return;
            } else {
                minute--;
                second=59;
            }  
        } else {
            second--;
        }    
        document.getElementById("displayTime").innerHTML = `${('0' + minute).slice(-2)}:${('0' + second).slice(-2)}`;
    }, 1000);

    punchCombi()
    setInterval(checkPoseLabel, 1000)
}

function resetTimer() {
    clearInterval(intervalId);
    document.getElementById("displayTime").innerHTML = `00:00`;
    document.getElementById("punchNum").innerHTML = ''; 
    return;
}

function checkPoseLabel() {
    // Fetch pose label from server
    fetch("/pose_label")
        .then(response => response.json()) // Parse response as JSON
        .then(data => {
            const poseLabel = data.pose_label;
            const punchNum = document.getElementById("punchNum").innerHTML.trim();
            
            if (poseLabel === punchNum) {
                score++;
                document.getElementById("scoreOutput").textContent = score;

                punchCombi();
            }
        })
        .catch(error => {
            console.error('Error fetching pose label:', error);
        });
}


let punchList = ['Left Punch', 'Right Punch', 'Right Hook', 'Left Hook'];

function punchCombi() {
    let randomIndex = Math.floor(Math.random() * punchList.length);
    document.getElementById("punchNum").innerHTML = punchList[randomIndex];
}

function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm");
    confirmBox.find(".message").text(msg);
    confirmBox.find(".finalScore").text(score);
    confirmBox.find(".yes").unbind().click(function() {
       confirmBox.hide();
       $('#mainTitle').removeClass('blur-background');
       $('#fullContainer').removeClass('blur-background');
    });
    confirmBox.find(".yes").click(myYes);
    confirmBox.show();

    $('#mainTitle').addClass('blur-background');
    $('#fullContainer').addClass('blur-background');
}

