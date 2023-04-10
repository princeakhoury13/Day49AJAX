/*UC3-Ability to view Employee Data from JSON Server having ID, Name and Salary using AJAX and Promise */
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makePromiseCall(methodType, url, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed called. Ready State: " + xhr.readyState + " Status:" + xhr.status);
            if (xhr.status.toString().match('^[2][0-9]{2}$')) {
                resolve(xhr.responseText);
            }
            else if (xhr.status.toString().match('^[4,5][0-9]{2}$')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR Failed");
            }
        }
        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "applications/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + " request sent to the server");
    });
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data at: " + responseText)
    })
    .catch(error => console.log("GET Error Status: " + JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log(" User Delete at: " + responseText)
    })
    .catch(error => console.log("DELETE Error Status: " + JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };
makePromiseCall("POST", postURL, true, empData)
    .then(responseText => {
        console.log("User Added: " + responseText)
    })
    .catch(error => console.log("POST Error Status: " + JSON.stringify(error)));






/*function showTime(){
    const date= new Date();
    return date.getHours() + "Hrs:" +date.getMinutes() +"Mins:" +date.getSeconds() +"Secs";
}
function makeAJAXCall(methodType, url, callback, async=true, data=null){
    let xhr=new XMLHttpRequest ();
    xhr.open(methodType, url, async);
    xhr.onreadystatechange = function(){    
       if(xhr.readyState === 4)
       {
        //Matching all 200 series Reponses
        if(xhr.status ===200 || xhr.status === 201)
        {
            callback(xhr.responseText);
        }
        else if(xhr.status >= 400)
        {
            console.log("Handle 400 client error or 500 server Error at: "+ showTime());
        }
    }
    }
    xhr.send();
    console.log(methodType+" request sent to thw server at:" + showTime());
}
const getURL="http://localhost:3000/employees";
function getUserDetails(data){
console.log("Get User Data at: " +showTime() + "data:"+data)
}
makeAJAXCall ("GET", getURL, getUserDetails);
console.log(" Made GET AJAX Call to server at: "+showTime());
const deleteURL="http://localhost:3000/employees/4";
function userDeleted(data){
console.log(" User Deleted  "+data)
}
makeAJAXCall ("DELETE", deleteURL, userDeleted, false);
const postURL="http://localhost:3000/employees";
const empData={"name": "Harry","salary": "5000"};
function userAdded(data){
console.log(" User Added: "+data)
console.log("User Added at: "+ showTime() +"data: "+ data)
}
makeAJAXCall ("POST", postURL, userAdded, true, empData);
*/