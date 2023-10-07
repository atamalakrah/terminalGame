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
    };

    print(self) {
        this.field.forEach(item =>{
            console.log(item.join(''));
        });
    };

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
    if((v > 3) || (h > 3) || (v < 0) || (h < 0)){
        console.log("You've stumbled out of bounds! Try again!");
        return true;
    }
    else if(boardState.field[v][h] == hole){
        console.log('Oh no, you fell in a hole! Try again!');
        return true;
    };
};
/*Manages the movement request and updates the board state*/
function manageMovement(boardState){
    
    const directionToMove = prompt('Pick a direction to move: ').toLowerCase();
    let attemptH = boardState.h;
    let attemptV = boardState.v;
    /*if the player enters 'exit' allows for exiting from the game immediately*/
    if(directionToMove == 'exit'){
        gameCondition = false;
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
/*Initiates the field for play. The board is split into X and Y coordinates. for example:
    0,0 0,1 0,2
    1,0 1,1 1,2
    2,0 2,1 2,2
*/
const myField = new Field([[pathCharacter, fieldCharacter, hole], [fieldCharacter, hole, fieldCharacter], [fieldCharacter, hat, fieldCharacter]])
/*Maintains the game state.  True = On, False = Off */
let gameCondition = true;
/*Loops while the game condition is still true.  */
while (gameCondition == true){
    myField.print();
    manageMovement(myField);
    
}
