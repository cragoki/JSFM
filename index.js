
//Global Player Array
var playerList = [];

//Table Management
//This function will initialize the table, retrieving the local storage values previously set, and adding them to the table
document.addEventListener('DOMContentLoaded', function() {

    var tbodyRef = document.getElementById('players-table').getElementsByTagName('tbody')[0];

    resetArray();
    
    for(let i = 0; i < playerList.length; i++){
    let player = playerList[i];
    
    //Unsure why I needed to add .textContent extension here for PlayerId only.
    let playerId = document.createTextNode(player.playerId).textContent;
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

    //Using template literals here to incorperate the playerid into the onclick function, more information: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    newCell.innerHTML = `<input type="button" value="Edit" onclick='editPlayer("${playerId}")'></input> <input type="button" value="Remove" onclick='removePlayer("${playerId}")'></input>`;
    }
}, false);


//Button Listener:
//This function will add a player to the users local storage array, based on the details submitted from the form.
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
//This function will add the player object to the local storage array
function addPlayerToLocalStorage (player){

    resetArray();

    playerList.push(player);

    localStorage.setItem('playerList', JSON.stringify(playerList));
}

//This function is used when the page loads, its function is to check the users local storage for any existing player list, and if it exists,
//override the local array with the storage array.
function resetArray(){
    if(localStorage.getItem('playerList') != null){
        playerList =  JSON.parse(localStorage.getItem('playerList'));
    }
}

//This function is going to be used to calculate a players age, based off of their DOB
function calculateAge(dob){
    return 0;
}

//This function will be used to remove a player from the users local storage array.
function removePlayer(playerId){
    console.log(playerId);
}

//This function will be used to edit a player from the users local storage array.
function editPlayer(playerId){
    console.log(playerId);
}