/**************************************************************************
* HeadphoneWumpus, Copyright (C) 2025 Juno Presken
* E-mail: juno.presken+HeadphoneWumpus@protonmail.com
*
* This program is free software: you can redistribute it and/or modify it
* under the terms of the GNU Affero General Public License as published by the
* Free Software Foundation, either version 3 of the License, or (at your
* option) any later version.

* This program is distributed in the hope that it will be useful, but
* WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General
* Public License for more details.

* You should have received a copy of the GNU Affero General Public License
* along with this program. If not, see <https://www.gnu.org/licenses/>.
*
**************************************************************************/

//audio-based wumpus (first javascript project, be nice)

const audioContext = new AudioContext();

// get the audioElement
//const audioElement = document.querySelector("audio");

//i'm sure there's a better way to do this, but i wanted minimum viable product for this commit
const audioElementwelcome = document.getElementById("welcome");
const audioElementpit_death = document.getElementById("pit_death");
const audioElementbumped_wumpus = document.getElementById("bumped_wumpus");
const audioElementlost = document.getElementById("lost");
const audioElementbats = document.getElementById("bats");
const audioElementcurrent_room = document.getElementById("current_room");
const audioElementdraft = document.getElementById("draft");
const audioElementflapping = document.getElementById("flapping");
const audioElementsmell = document.getElementById("smell");
const audioElementmove_shoot = document.getElementById("move_shoot");
const audioElementmove_options = document.getElementById("move_options");
const audioElementshoot_rooms = document.getElementById("shoot_rooms");
const audioElementarrow_options = document.getElementById("arrow_options");
const audioElementconfirm_arrow = document.getElementById("confirm_arrow");
const audioElementwon = document.getElementById("won");
const audioElementwild_arrow = document.getElementById("wild_arrow");
const audioElementarrow_gotcha = document.getElementById("arrow_gotcha");
const audioElementmissed = document.getElementById("missed");
const audioElement1 = document.getElementById("1");
const audioElement2 = document.getElementById("2");
const audioElement3 = document.getElementById("3");
const audioElement4 = document.getElementById("4");
const audioElement5 = document.getElementById("5");
const audioElement6 = document.getElementById("6");
const audioElement7 = document.getElementById("7");
const audioElement8 = document.getElementById("8");
const audioElement9 = document.getElementById("9");
const audioElement10 = document.getElementById("10");
const audioElement11 = document.getElementById("11");
const audioElement12 = document.getElementById("12");
const audioElement13 = document.getElementById("13");
const audioElement14 = document.getElementById("14");
const audioElement15 = document.getElementById("15");
const audioElement16 = document.getElementById("16");
const audioElement17 = document.getElementById("17");
const audioElement18 = document.getElementById("18");
const audioElement19 = document.getElementById("19");
const audioElement20 = document.getElementById("20");
const audioElementerror = document.getElementById("error");
const audioElementfirst = document.getElementById("first");
const audioElementsecond = document.getElementById("second");
const audioElementthird = document.getElementById("third");
const audioElementfourth = document.getElementById("fourth");
const audioElementfifth = document.getElementById("fifth");

var arrows = 5;

var playerCave = 0;
var wumpusCave = 11;//Math.floor(Math.random() * 20);
var pitCave1 = 9;//Math.floor(Math.random() * 20);
var pitCave2 = Math.floor(Math.random() * 20);
var batCave1 = 10;//Math.floor(Math.random() * 20);
var batCave2 = Math.floor(Math.random() * 20);

console.log("Wumpus cave: " + wumpusCave);
console.log("Bat caves: " + pitCave1 + "," + pitCave2);
console.log("Pit cave: " + batCave1 + "," + batCave2);

//each sub-array lists the caves connected to by the cave with the index
//this means that when telling things to the user, cave number MUST be incremented by 1
let caveSystem = [[1,4,7],[0,2,9],[1,3,11],[2,4,13],[0,3,5],[4,6,14],[5,7,16],[0,6,9],[7,9,17],[1,8,10],[9,11,18],[2,10,12],[11,13,19],[3,12,14],[5,13,15],[14,16,19],[6,15,17],[8,16,18],[10,17,19],[12,15,18]];

let difficulty = 0;

//asynchronous function to grab keycodes
readKey = () => new Promise(resolve => window.addEventListener('keydown', resolve, { once: true }));

async function validKey(){
    do{
        var keyCode = await readKey();
    }while(keyCode.which != 37 && keyCode.which != 40 && keyCode.which != 39)
    return keyCode.which;
}

// Select our play button
const playButton = document.querySelector("button");

playButton.addEventListener(
  "click",
  () => {
    // Check if context is in suspended state (autoplay policy)
    if (audioContext.state === "suspended") {
      playerMoved();
      audioContext.resume();
    }

    // Play or pause track depending on state
    if (playButton.dataset.playing === "false") {
      audioElementwelcome.play();
      playButton.dataset.playing = "true";
    }
  },
  false,
);





//report dangers and state, ask to move or shoot
async function playerMoved(){

    await new Promise(resolve => setTimeout(resolve, 2000)); // 3 sec


    //did they die?
        if(playerCave == pitCave1 || playerCave == pitCave2){
            audioElementpit_death.play();
            tell("You fucking died in a pit. Refresh to try again.");
            return;
        }

        if(playerCave == wumpusCave){
            audioElementbumped_wumpus.play();
            tell("...Oops! Bumped a Wumpus!");
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
            if(Math.random() < 0.75){//75% chance of wumpus moving
                wumpusCave = caveSystem[wumpusCave][Math.floor(Math.random() * 3)];//move to random connected cave
                console.log("Wumpus cave: " + wumpusCave);
                if(playerCave == wumpusCave){

                    audioElementlost.play();
                    tell("U got ate by a wumpus! Refresh to try again.");
                }
            }
            return;
        }
        if(playerCave == batCave1 || playerCave == batCave2){

            audioElementbats.play();
    await new Promise(resolve => setTimeout(resolve, 3000)); // 3 sec
            playerMessage += "U got batnapped bro.";
            playerCave = Math.floor(Math.random() * 20);
        }

    //tell player where they are

    audioElementcurrent_room.play();
    await new Promise(resolve => setTimeout(resolve, 750)); // 3 sec
    sayNumber(playerCave + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
    var playerMessage = "You are in room " + (playerCave + 1) + "."
    //tell them of any dangers
    caveSystem[playerCave].forEach((nearRoom) => {//TODO: delays wont work here, fix that
        if(nearRoom == pitCave1 || nearRoom == pitCave2){
            audioElementdraft.play();
            playerMessage += " It feels drafty.";
        }
        if(nearRoom == batCave1 || nearRoom == batCave2){
            audioElementflapping.play();
            playerMessage += " It sounds flappy.";
        }
        if(nearRoom == wumpusCave){
            audioElementsmell.play();
            playerMessage += " You smell the wumpus.";
        }
    })
    //give them their options

    playerMessage += " Move, shoot, repeat."

    tell(playerMessage);
    await new Promise(resolve => setTimeout(resolve, 3000));//workaround bc of above todo
    audioElementmove_shoot.play();

    //wait for keypress
    var keyCode = await validKey()

    //move/shoot/repeat
    switch (keyCode){
        case 37:    //left key, move
            audioElementerror.play();
            await new Promise(resolve => setTimeout(resolve, 2000));
            sayNumber(caveSystem[playerCave][0] + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(caveSystem[playerCave][1] + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(caveSystem[playerCave][2] + 1);
    await new Promise(resolve => setTimeout(resolve, 500));
            tell(" Move to: " + (caveSystem[playerCave][0] + 1) + "," + (caveSystem[playerCave][1] + 1) + "," + (caveSystem[playerCave][2] + 1));
            keyCode = await validKey();
            switch (keyCode){
                case 37:
                    //update player location
                    playerCave = caveSystem[playerCave][0];
                    playerMoved();
                    break;
                case 40:
                    //update player location
                    playerCave = caveSystem[playerCave][1];
                    playerMoved();
                    break;
                case 39:
                    //update player location
                    playerCave = caveSystem[playerCave][2];
                    playerMoved();
                    break;
            }
            break;
        case 40:    //down key, shoot
            shoot();
            break;
        case 39:    //right key, repeat
            tell(playerMessage);//TODO: this needs reworking to fit with the audio
            break;
    }
}

//shoot a crooked arrow
async function shoot(){

    //select number of rooms to shoot through, across two audio menus
    tell("Number of rooms to shoot through: 1, 2, more.");
    audioElementshoot_rooms.play();
    var numberOfArrowRooms = 0;
    keyCode = await validKey();
    switch (keyCode){
        case 37:
            numberOfArrowRooms = 1;
            break;
        case 40:
            numberOfArrowRooms = 2;
            break;
        case 39:
            tell("3, 4, or 5.");
            sayNumber(3);
    await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(4);
    await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(5);
            keyCode = await validKey();
            switch (keyCode){
                case 37:
                    numberOfArrowRooms = 3;
                    break;
                case 40:
                    numberOfArrowRooms = 4;
                    break;
                case 39:
                    numberOfArrowRooms = 5;
                    break;
            }
            break;
    }
    //holds the path of the arrow, with the first element being the cave that the next path element is being evaluated from
    //the arrow path gets overfilled by one, and then trimmed, since it makes the construction a bit easier
    var arrowPath = Array(numberOfArrowRooms + 1);
    arrowPath[0] = playerCave;

    //TODO - fucking fix this
    if(difficulty == 2){
        //don't hint about validity of caves
        tell("decrement next cave, confim cave, increment next cave");
        for(let i = 0; i < numberOfArrowRooms; i++){
            //until confirm is pressed
            var selectCave = 0;
            keyCode = 0;
            while(keyCode != 40){
                switch (keyCode){
                case 37:
                    //wrap if at 1
                    if(selectCave < 1){
                        selectCave = 19;
                    }else{
                        selectCave --;
                    }
                    break;
                case 39:
                    //wrap if at 1
                    if(selectCave > 19){
                        selectCave = 0;
                    }else{
                        selectCave ++;
                    }
                    break;
                }
                tell(selectCave + 1);
                keyCode = await validKey();
            }
            tell("you selected " + (selectCave + 1));
        }
    }else if(difficulty == 0){
        //present the user with all possible paths, easy mode
        //iterate over rooms until a full path is built up.
        playerMessage = "selected rooms are: ";
        for(let i = 0; i < numberOfArrowRooms; i++){
            //for each choice, until chosen, the current contents of the relevant element is the current room that the arrow is moving from. this makes it a little easier to calculate
            tell("Arrow room number " + (i + 1) + ". options are: " + (caveSystem[arrowPath[i]][0] + 1) + "," + (caveSystem[arrowPath[i]][1] + 1) + "," + (caveSystem[arrowPath[i]][2] + 1));

            //audioElementarrow_options.play();
            audioElementerror.play();
            await new Promise(resolve => setTimeout(resolve, 2000));
            sayNumber(caveSystem[arrowPath[i]][0] + 1);
            await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(caveSystem[arrowPath[i]][1] + 1);
            await new Promise(resolve => setTimeout(resolve, 500));
            sayNumber(caveSystem[arrowPath[i]][2] + 1);
            switch(await validKey()){
                case 37:
                    arrowPath[i] = caveSystem[arrowPath[i]][0];
                    break;
                case 40:
                    arrowPath[i] = caveSystem[arrowPath[i]][1];
                    break;
                case 39:
                    arrowPath[i] = caveSystem[arrowPath[i]][2];
                    break;
            }
            //add the path to the message so we dont have to iterate twice
            playerMessage += (arrowPath[i] + 1) + ", ";
            //fill the next element with the current room number
            arrowPath[i+1] = arrowPath[i];
        }
        //remove the last, useless array element
        arrowPath.pop();
        console.log(arrowPath);
        playerMessage += "confirm, redo, repeat."
        tell(playerMessage);
        audioElementconfirm_arrow.play();
        switch(await validKey()){
            case 37://confirm
                if(arrowPath.includes(wumpusCave)){
                    tell("Huzzah! The wumpus has been slain in cave " + (wumpusCave + 1) + "! Refresh to try again.");
                    audioElementwon.play()
                }else if(arrowPath.includes(playerCave)){
                    tell("Oof! The arrow got you! Refresh to try again.");
                    audioElementarrow_gotcha.play()
                }else{
                    tell("You missed! Any key to continue.");
                    audioElementmissed.play()
                    if(Math.random() < 0.75){//75% chance of wumpus moving
                        wumpusCave = caveSystem[wumpusCave][Math.floor(Math.random() * 3)];//move to random connected cave
                        console.log("Wumpus cave: " + wumpusCave);
                    }
                    await validKey();
                    playerMoved();
                }
                break;
            case 40://redo
                shoot();
                break;
            case 39://repeat
                tell(playerMessage);//TODO: doesnt work with audio
                break;
        }
    }
}

//print a single line to the player
function tell(message){
    document.getElementById("screen").innerHTML = message;
}

//read the given number out loud
function sayNumber(numberToSay){
    switch(numberToSay){
        case 1:
            audioElement1.play();
            break;
        case 2:
            audioElement2.play();
            break;
        case 3:
            audioElement3.play();
            break;
        case 4:
            audioElement4.play();
            break;
        case 5:
            audioElement5.play();
            break;
        case 6:
            audioElement6.play();
            break;
        case 7:
            audioElement7.play();
            break;
        case 8:
            audioElement8.play();
            break;
        case 9:
            audioElement9.play();
            break;
        case 10:
            audioElement10.play();
            break;
        case 11:
            audioElement11.play();
            break;
        case 12:
            audioElement12.play();
            break;
        case 13:
            audioElement13.play();
            break;
        case 14:
            audioElement14.play();
            break;
        case 15:
            audioElement15.play();
            break;
        case 16:
            audioElement16.play();
            break;
        case 17:
            audioElement17.play();
            break;
        case 18:
            audioElement18.play();
            break;
        case 19:
            audioElement19.play();
            break;
        case 20:
            audioElement20.play();
            break;
    }
}
