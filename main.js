const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field{
    constructor(Field){
    this.field = Field;
    this.playerHorizonal = 0;
    this.playerVertical = 0;
    };

    print(self) {
        this.field.forEach(item =>{
            console.log(item.join(''));
        });
    };

}

winCondition(boardState, h, v){
    if(boardState[v][h] == 'hat'){
        return foundHat = true;
    }
};

const myField = new Field([[pathCharacter, fieldCharacter, hole], [fieldCharacter, hole, fieldCharacter], [fieldCharacter, hat, fieldCharacter]])
let foundHat = false;

while (foundHat == false){
    const directionToMove = prompt('Pick a direction to move: ');
    if(directionToMove == 'exit'){
        foundHat = true;
    }
    directionToMove.toLowerCase();
    
}
