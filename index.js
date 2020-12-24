
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
    var nationality = document.getElementById('nationality').value;
    var pos = document.getElementById('position').value;
    var team = document.getElementById('team').value;

    let player = {
        playerId: playerId,
        firstName: fName,
        lastName: lName,
        dateOfBirth: dob,
        country: nationality,
        position: pos,
        playerTeam: team,
        addPlayer: function(){
            //Add Player to local storage Array
            //This function will add the player object to the local storage array

            //Ensure we have the latest version of the array based on the Users local storage
            resetArray();

            //Add the passed in player to the array.
            playerList.push(this);
        }
    
    }

    let currentCount = playerList.length;
    if(currentCount >= initCount)
    {
        player.addPlayer();
    }

    submitChanges();
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
    //Array.splice is used to remove an item from the array
    //In this case we use the playerId value as it is a unique identifier, to remove the specified player from the array.
    playerList.splice(playerList.findIndex(x => x.playerId === playerId), 1);

    //Reset the localStorage array to the new list with the removed player.
    submitChanges();
}

//This function will be used to launch the edit player pop up box, and assign its values based off of existing player information.
function editPlayer(playerId){
        //Display the popup box
        let popUpBox = document.getElementById('editPlayerBox');
        popUpBox.style.display = "block";

        //Get the player object from the array based of the playerId
        let player = playerList.find(x => x.playerId == playerId);

        //Assign the inputs based on the players existing information
        document.getElementById('edit-first-name').value = player.firstName;
        document.getElementById('edit-last-name').value = player.lastName;
        document.getElementById('edit-nationality').value = player.country;
        document.getElementById('edit-position').value = player.position;
        document.getElementById('edit-team').value = player.playerTeam;
        document.getElementById('edit-dob').value = player.dateOfBirth;
        
        document.getElementById('saveChanges-btn').innerHTML = `<button class="modal-btn" onclick='editPlayerDetails("${playerId}")'>Save</button>`;
        document.getElementById('closeModal-btn').innerHTML = '<button class="modal-btn" onclick="closePopUp()">Close</button>';
    }

function editPlayerDetails(playerId){
    //get the array index for the player in order to change the values assigned to the player.
    let arrayIndex = playerList.findIndex((x => x.playerId == playerId));

    playerList[arrayIndex].firstName = document.getElementById('edit-first-name').value;
    playerList[arrayIndex].lastName = document.getElementById('edit-last-name').value;
    let dob = document.getElementById('edit-dob').value; 
    playerList[arrayIndex].dateOfBirth = document.getElementById('edit-dob').value; 
    playerList[arrayIndex].country = document.getElementById('edit-nationality').value;
    playerList[arrayIndex].position = document.getElementById('edit-position').value;
    playerList[arrayIndex].playerTeam = document.getElementById('edit-team').value;
    
    submitChanges();
}

function closePopUp(){
    document.getElementById('editPlayerBox').style.display = "none";
    document.getElementById('popUpOverlay').style.display = "none";
    }

function submitChanges(){
    //Reset the local storage array
    localStorage.setItem('playerList', JSON.stringify(playerList));

    //Reload the page.
    location.reload();
    }