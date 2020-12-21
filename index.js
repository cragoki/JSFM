
//Variable names
//1. Cannot be a reserved keyword
//2. They should be meaningful
//3. They cannot start with a number
//4. They cannot contain a space or a hyphen(-)
//5. They are case sensitive



//Constants can never have their value changed.
    //const interestRate = 0.3;

    //interestRate = 1;

    //console.log(interestRate);


//Primitive Value Types
    //let name = 'Craig';
    //let age = 30;
    //let isApproved = true;
    //let firstName; //undefined
    //let selectedColor = null;

//Type Of
    //let name = 'Craig';
    //typeof name;

//Reference Types
    //Objects:

    //let person = {
        //name: 'Craig',
        //age: 26
    //};

    //function birthday(){
        //person.age = person.age + 1;
    //}
    //birthday();
    //console.log(person);

//Arrays
    //let selectedColors = ['red', 'blue'];
    //console.log(selectedColors[0]);

//Global Player Array
var playerList = [];

//Table Management
document.addEventListener('DOMContentLoaded', function() {

    var tbodyRef = document.getElementById('players-table').getElementsByTagName('tbody')[0];

    resetArray();
    
    for(let i = 0; i < playerList.length; i++){
    let player = playerList[i];
    
    let playerId = document.createTextNode(player.playerId);
    //FirstName
    let fName = document.createTextNode(player.firstName);
    //LastName
    let lName = document.createTextNode(player.lastName);
    //DOB
    let dob = document.createTextNode(player.dateOfBirth);
    let age = calculateAge(dob);
    //Nationality
    let nat = document.createTextNode(player.country);
    //Position
    let pos = document.createTextNode(player.position);
    //Team
    let team = document.createTextNode(player.playerTeam);

    // Insert a row at the end of table
    var newRow = tbodyRef.insertRow();

    // Insert a cell for each attribute of the player  
    var newCell = newRow.insertCell();
    newCell.appendChild(fName);
    var newCell = newRow.insertCell();
    newCell.appendChild(lName);
    var newCell = newRow.insertCell();
    newCell.appendChild(dob);
    var newCell = newRow.insertCell();
    newCell.appendChild(nat);
    var newCell = newRow.insertCell();
    newCell.appendChild(pos);
    var newCell = newRow.insertCell();
    newCell.appendChild(team);
    var newCell = newRow.insertCell();
    newCell.innerHTML = '<input type="button" value="Edit" onclick="editPlayer(' + playerId.toString() +')"></input> <input type="button" value="Remove"></input>';
    }
}, false);


//Button Listener:
function addPlayer(){

    var initCount = playerList.length;
    var playerId = 0;

    if(initCount > 0){
        let newestPlayer = playerList[initCount -1];
        playerId = newestPlayer['playerId'] +1;
    }

    var fName = document.getElementById('first-name').value;
    var lName = document.getElementById('last-name').value;
    var dob = document.getElementById('dob').value;
    var dobConverted = new Date(dob);
    var nationality = document.getElementById('nationality').value;
    var pos = document.getElementById('position').value;
    var team = document.getElementById('team').value;

    let player = {
        playerId: playerId,
        firstName: fName,
        lastName: lName,
        dateOfBirth: dobConverted,
        country: nationality,
        position: pos,
        playerTeam: team
    }

    let currentCount = playerList.length;
    if(currentCount >= initCount)
    {
        addPlayerToLocalStorage(player);
    }

    //location.reload();
}

//Add Player to local storage Array
function addPlayerToLocalStorage (player){

    resetArray();

    playerList.push(player);

    localStorage.setItem('playerList', JSON.stringify(playerList));
}

function resetArray(){
    if(localStorage.getItem('playerList') != null){
        playerList =  JSON.parse(localStorage.getItem('playerList'));
    }
}

function calculateAge(dob){
    return 0;
}

function removePlayer(playerId){}

function editPlayer(playerId){}