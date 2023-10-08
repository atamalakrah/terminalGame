const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

/*Constructor for the field of play in the game*/
class Field{
    constructor(Field){
    this.field = Field;
    /*Players start at 0,0 by default*/
    this.h = 0;
    this.v = 0;
    this.maxH = 0;
    this.maxV = 0;
    };
    /*Prints the current field state */
    print() {
        this.field.forEach(item =>{
            console.log(item.join(''));
        });
    };
    /*generates a new field */
    generateField(h, v, percentage){
        /*Creates a blank array and random H and V holders*/
        let fieldCreationState = [];
        let randH = getRandomInt(h);
        let randV = getRandomInt(v);

        /*Sets the max bounds of the field */
        this.maxH = h;
        this.maxV = v;

        /*Creates the 2 dimensional arrays based on the passed in horizontal and vertical values */
        for(let i = 0; i < h; i++){
            fieldCreationState.push([]);
            for(let j = 0; j < v; j++){
                fieldCreationState[i].push([]);
            }
        };
        /*Sets the player character to a random location */
        fieldCreationState[randV][randH] = pathCharacter;
        fieldCreationState.maxH = randH;
        fieldCreationState.maxV = randV;
        /*Sets the hat to a random location and ensures the location is not occupied by the player*/
        while(fieldCreationState[randV][randH] == pathCharacter){
            randH = getRandomInt(h);
            randV = getRandomInt(v);
            fieldCreationState[randV][randH] = hat;
        }
        /*calculates the number of holes that should be in the map*/
        let numberOfHoles = Math.floor((h*v) * percentage);
        /*Randomly fills in the holes only if there is an undefined value in the array, otherwise decrements i and tries again*/
        for(let i = 0; i < numberOfHoles; i++){
            randH = getRandomInt(h);
            randV = getRandomInt(v);
            if(fieldCreationState[randV][randH].length == 0){
                fieldCreationState[randV][randH] = hole;
            }
            else{
                i--;
            }
        }
        /*Fills in the remaining undefined slots with the field character*/ 
        for(let i = 0; i < v; i ++){
            for (let j = 0; j < h; j++){
                if(fieldCreationState[i][j].length == 0){
                    fieldCreationState[i][j] = fieldCharacter;
                }
            }
        }
        return fieldCreationState;
    }
    /*This function creates a board based on selected difficulty
    The board is split into X and Y coordinates. for example:
    0,0 0,1 0,2
    1,0 1,1 1,2
    2,0 2,1 2,2*/
    boardCreation(){
        let correctValue = false;
        /*Requests user to enter a difficulty*/
        const selectDifficulty = prompt('Pick a difficulty!(e)asy, (m)edium, or (h)ard: ').toLowerCase();
        while(!correctValue){
            if(selectDifficulty == 'e'){
                this.field = this.generateField(9,9,.25);
                correctValue = true;
            }
            else if(selectDifficulty == 'm'){
                this.field = this.generateField(12,12,.3);
                correctValue = true;
            }
            else if(selectDifficulty == 'h'){
                this.field = this.generateField(20,20,.4);
                correctValue = true;
            }
            else{
                console.log('Please select either e, m, or h for difficulty: ')
            }
        }
    }
}
/*This function provides a random number based on the max value given to it*/
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

/*Checks if the player is on the hat */
function winCondition(boardState, h, v){
    if(boardState.field[v][h] == hat){
        console.log('Congratulations, you won!')
        return true;
    };
};

/*Determines lose condition. Player enters a hole on the field or player walks out of bounds*/
function loseCondition(boardState, h, v){
    /*Checks the player state via the (v)ertical and (h)orizontal position coordinates */
    if((v > boardState.maxV) || (h > boardState.maxH) || (v < 0) || (h < 0)){
        console.log("You've stumbled out of bounds! Try again!");
        return true;
    }
    else if(boardState.field[v][h] == hole){
        console.log('Oh no, you fell in a hole! Try again!');
        return true;
    };
};
/*Checks to see if there are nearby holes that could be filled */
function checkNearbyHoles(boardState){
    const v = boardState.v;
    const h = boardState.h;
    
    if (v + 1 < boardState.maxV && boardState.field[v + 1][h] === hole) {
        boardState.field[v + 1][h] = fieldCharacter;
        console.log('Bridge placed!');
    } else if (v - 1 >= 0 && boardState.field[v - 1][h] === hole) {
        boardState.field[v - 1][h] = fieldCharacter;
        console.log('Bridge placed!');
    } else if (h + 1 < boardState.maxH && boardState.field[v][h + 1] === hole) {
        boardState.field[v][h + 1] = fieldCharacter;
        console.log('Bridge placed!');
    } else if (h - 1 >= 0 && boardState.field[v][h - 1] === hole) {
        boardState.field[v][h - 1] = fieldCharacter;
        console.log('Bridge placed!');
    } else {
        console.log('No hole to fill!');
    }
}

/*Manages the movement request and updates the board state*/
function manageMovement(boardState){
    
    const directionToMove = prompt('Pick a direction to move or lay down a (b)ridge if there are no nearby moves: ').toLowerCase();
    let attemptH = boardState.h;
    let attemptV = boardState.v;
    /*if the player enters 'exit' allows for exiting from the game immediately*/
    if(directionToMove == 'exit'){
        console.log('Thanks for playing! Exiting...')
        return gameCondition = false;
    }
    else if(directionToMove == 'b'){
        checkNearbyHoles(boardState);
    }
    else if(directionToMove == 'l'){
        attemptH = boardState.h - 1;  
    }
    else if(directionToMove == 'r'){
        attemptH = boardState.h + 1;
    }
    else if (directionToMove == 'u'){
        attemptV = boardState.v - 1;
    }
    else if(directionToMove == 'd'){
        attemptV = boardState.v + 1;
    }
    else{
        console.log('Enter a direction as (l)eft, (r)ight, (d)own, (u)p');
        return;
    }
    /*Checks the win and lose conditions, if either is met sets gamecondition to false to exit the program*/ 
    if(loseCondition(boardState,attemptH,attemptV) || winCondition(boardState,attemptH,attemptV))
    {
        return gameCondition = false;
    }
    /*Checks the win condition, if met sets gamecondition to false to exit the program */ 
    boardState.h = attemptH;
    boardState.v = attemptV;
    boardState.field[boardState.v][boardState.h] = pathCharacter;
}

/*Creates the field for the game*/
const userField = new Field();
userField.boardCreation();

/*Maintains the game state.  True = On, False = Off */
let gameCondition = true;

/*Loops while the game condition is still true.  */
while (gameCondition == true){
    userField.print();
    manageMovement(userField);
}
