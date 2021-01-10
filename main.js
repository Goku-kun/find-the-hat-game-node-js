const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.currentX = 0;
        this.currentY = 0;
        this.playing = true;
        this.length = this.field.length;
    }

    static instructions() {
        console.log('Welcome to Find the Hat!');
        console.log('Your character is a * and here are the instructions to control it.');
        console.log('Enter r to go right, l to go left, d to do down and u to go up.');
    }

    print() {
        for (let value of this.field) {
            value = value.join('');
            console.log(value);
        }
    }
    moveChecker() {
        if ((this.currentX < 0) || (this.currentY < 0) || (this.currentX > this.length) || (this.currentY > this.length)) {
            this.playing = false;
            console.log('Moved outside field. Start again!');
            return false;
        }
        return true;
    }

    victory() {
        console.log('');
        console.log('You found the hat! You won!');
        this.field[this.currentX][this.currentY] = '*';
        this.playing = false;
        this.print();
    }

    defeat() {
        console.log('');
        console.log('You fell into a hole');
        this.playing = false;
        this.print();
    }
    move(direction) {
        if (direction == 'r') {
            this.currentY += 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY - 1] = '░';
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                this.defeat();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                this.field[this.currentX][this.currentY - 1] = '░';
                this.victory();
            }
        } else if (direction == 'l') {
            this.currentY -= 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY + 1] = '░';
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                this.defeat();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                this.field[this.currentX][this.currentY + 1] = '░';
                this.victory();
            }
        } else if (direction == 'd') {
            this.currentX += 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX - 1][this.currentY] = '░';
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                this.defeat();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                this.field[this.currentX - 1][this.currentY] = '░';
                this.victory();
            }
        } else if (direction == 'u') {
            this.currentX -= 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX + 1][this.currentY] = '░';
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                this.defeat();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                this.field[this.currentX][this.currentY + 1] = '░';
                this.victory();
            }
        }
    }

    static generateField(size = 4) {
        const characterArray = ['░', 'O'];
        const percent = 0.33;
        const field = [];
        for (let i = 0; i < size; i++) {
            let row = [];
            let counterO = 0;
            for (let i = 0; i < size; i++) {
                let character = Math.floor(Math.random() * 2);
                if (characterArray[character] === 'O') {
                    counterO += 1;
                }
                if (counterO / size > percent) {
                    character = 0;
                }
                row.push(characterArray[character]);
            }
            field.push(row);
        }
        field[Math.floor(Math.random() * size)][Math.floor(Math.random() * size)] = hat;
        field[Math.floor(Math.random() * 0)][Math.floor(Math.random() * 0)] = pathCharacter;
        return field;
    }
}

const myField = new Field([
    ['*', '░', 'O'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);


function play() {
    Field.instructions();
    myField.print();
    console.log('This is the current field. Would you like to change it?');
    randomField = prompt('Enter 1 to change and 0 to play the default: =>');
    if (randomField === '1') {
        console.log('Default size of the field is 4.');
        size = parseInt(prompt('Enter the size of the square field which should be more than 0 and less than 6: =>'))
        while ((size > 6) || (size < 0)) {
            size = prompt('Enter the size of the square field which should be more than 0 and less than 6: =>')
        }
        myField.field = Field.generateField(size)
    }
    console.log('Alright! We\'re ready to play!');
    console.log('')
    let direction = true;
    while (direction && (direction !== "exit") && (myField.playing)) {
        myField.print();
        direction = prompt('Which way?');
        myField.move(direction);
    }
}
play();