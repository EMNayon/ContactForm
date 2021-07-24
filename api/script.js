
//let's get all required elements

const form = document.querySelector("form");
statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e)=>{
    e.preventDefault(); //preventing form from submitting
    statusTxt.style.color = "#0D6EFD"
    statusTxt.style.display = "block";

    let xhr = new XMLHttpRequest(); //creating new xml object
    xhr.open("POST", "routes/message.php",true); // sending post request to message.php file

    xhr.onload = ()=>{ //once ajax loaded
        if(xhr.readyState == 4 && xhr.status == 200){  //if ajax response status is 200 & ready is 4 means there is no any error.
            let response = xhr.response; //storing ajax response in a response variable
            if(response.indexOf("Email and password field is required!") != -1 || response.indexOf("Enter a valid email address")|| response.indexOf("Sorry, failed to send your message!")){
                statusTxt.style.color = "red";
            }else {
                form.reset();
                setTimeout(()=>{
                    statusTxt.style.display = "none";
                },3000); //hide the statusTxt after 3 seconds if the msg is sent
            }
            statusTxt.innerText = response;
        }
    }
    let formData = new FormData(form); //creating new FormData obj. This obj is used to send form data
    xhr.send(formData); // sending form data
}