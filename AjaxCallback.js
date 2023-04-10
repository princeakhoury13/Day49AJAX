let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function showTime() {
    const date = new Date();
    return date.getHours() + "Hrs:" + date.getMinutes() + "Mins:" + date.getSeconds() + "Secs";
}
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.open(methodType, url, async);
    xhr.onreadystatechange = function () {
        //console.log("State changed called at: "+ showTime() +"RS: "+xhr.readyState+ " Status:"+xhr.status);
        if (xhr.readyState === 4) {
            //Matching all 200 series Reponses
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            }
            else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server Error at: " + showTime());
            }
        }
    }
    xhr.send();
    console.log(methodType + " request sent to thw server at:" + showTime());
}
const getURL = "http://localhost:3000/employees";
function getUserDetails(data) {
    console.log("Get User Data at: " + showTime() + "data:" + data)
}
makeAJAXCall("GET", getURL, getUserDetails);
console.log(" Made GET AJAX Call to server at: " + showTime());

const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data) {
    console.log(" User Deleted  " + data)
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

const postURL = "http://localhost:3000/employees";
const empData = { "name": "Harry", "salary": "5000" };
function userAdded(data) {
    console.log(" User Added: " + data)
    console.log("User Added at: " + showTime() + "data: " + data)
}
makeAJAXCall("POST", postURL, userAdded, true, empData);


/*function makeAJAXCall(methodType, url, callback, async=true, data=null){
    let xhr=new XMLHttpRequest ();
    xhr.onreadystatechange = function(){    
       console.log("State changed called. Ready state: "+ xhr.readyState+ " Status:"+xhr.status);
       if(xhr.readyState === 4)
       {
        //Matching all 200 series Reponses
        if(xhr.status ===200 || xhr.status === 201)
        {
            callback(xhr.responseText);
        }
        else if(xhr.status >= 400)
        {
            console.log("Handle 400 client error or 500 server Error");
        }
    }
}
xhr.open(methodType, url, async);
if(data){
    console.log(JSON.stringify(data));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}
else xhr.send();
console.log(methodType+" request sent to thw server at:" + showTime());
}
const getURL="http://localhost:3000/employees/1";
function getUserDetails(data){
console.log("Get User Data at: " +showTime() + "data:"+data)
}
makeAJAXCall ("GET", getURL, getUserDetails);
const deleteURL="http://localhost:3000/employees/4";
function userDeleted(data){
console.log(" User Deleted  "+data)
}
makeAJAXCall ("DELETE", deleteURL, userDeleted, false);
const postURL="http://localhost:3000/employees";
const empData={"name": "Harry","salary": "5000"};
function userAdded(data){
console.log(" User Added: "+data)
}
makeAJAXCall ("POST", postURL, userAdded, true, empData);*/