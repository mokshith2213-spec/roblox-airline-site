const ADMIN_PASSWORD="QRADMIN2026";
const CREW_CODE="432123";

let flights=JSON.parse(localStorage.getItem("flights"))||[];
let passengers=JSON.parse(localStorage.getItem("passengers"))||[];
let crew=JSON.parse(localStorage.getItem("crew"))||[];

function saveData(){
localStorage.setItem("flights",JSON.stringify(flights));
localStorage.setItem("passengers",JSON.stringify(passengers));
localStorage.setItem("crew",JSON.stringify(crew));
}

/* PUBLIC FLIGHTS */
function loadPublicFlights(){
let container=document.getElementById("publicFlights");
if(container){
container.innerHTML=flights.map(f=>`
<div class="list-item">
Flight ${f.number} → ${f.destination}
</div>
`).join("");
}
}

/* BOOKING */
function bookFlight(){
let travelClass=document.getElementById("bclass").value;

if(travelClass==="First Class"){
window.location.href="https://www.roblox.com/catalog/14462518381/First-Class";
return;
}

alert("Booking Confirmed!");
}

/* CHECK IN */
function checkIn(){
passengers.push({
name:document.getElementById("pname").value,
flight:document.getElementById("pflight").value
});
saveData();
alert("Check-In Successful");
}

/* CREW LOGIN */
function crewLogin(){
if(document.getElementById("crewCode").value===CREW_CODE){
crew.push({
name:document.getElementById("crewName").value,
rank:document.getElementById("crewRank").value
});
saveData();
alert("Crew Logged In");
}else{
alert("Invalid Crew Code");
}
}

/* ADMIN */
function adminLogin(){
if(document.getElementById("adminPass").value===ADMIN_PASSWORD){
document.getElementById("adminPanel").style.display="block";
loadAdmin();
}else{
alert("Incorrect Password");
}
}

function postFlight(){
flights.push({
number:document.getElementById("flightNumber").value,
destination:document.getElementById("destination").value
});
saveData();
loadAdmin();
loadPublicFlights();
}

function loadAdmin(){
document.getElementById("flightList").innerHTML=
flights.map((f,i)=>`
<div class="list-item">
${f.number} → ${f.destination}
<button onclick="deleteFlight(${i})">Delete</button>
</div>`).join("");

document.getElementById("passengerList").innerHTML=
passengers.map(p=>`<div class="list-item">${p.name} - ${p.flight}</div>`).join("");

document.getElementById("crewList").innerHTML=
crew.map(c=>`<div class="list-item">${c.name} (${c.rank})</div>`).join("");
}

function deleteFlight(i){
flights.splice(i,1);
saveData();
loadAdmin();
loadPublicFlights();
}

document.addEventListener("DOMContentLoaded",loadPublicFlights);
