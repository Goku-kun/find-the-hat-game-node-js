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
    print() {
        for (let value of this.field) {
            value = value.join('');
            console.log(value);
        }
    }
    moveChecker() {
        if ((this.currentX < 0) || (this.currentY < 0) || (this.currentX >= this.length) || (this.currentY >= this.length)) {
            this.playing = false;
            console.log('Moved outside field. Start again!');
            return false;
        }
    }
    move(direction) {
        if (direction == 'r') {
            this.currentY += 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                console.log('You fell into a hole');
                this.playing = false;
                this.print();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                console.log('You found the hat! You won!');
                this.playing = false;
                this.print();
            }
        } else if (direction == 'l') {
            this.currentY -= 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                console.log('You fell into a hole');
                this.playing = false;
                this.print();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                console.log('You found the hat! You won!');
                this.playing = false;
                this.print();
            }
        } else if (direction == 'd') {
            this.currentX += 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                console.log('You fell into a hole');
                this.playing = false;
                this.print();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                console.log('You found the hat! You won!');
                this.print();
                this.playing = false;
            }
        } else if (direction == 'u') {
            this.currentX -= 1;
            if (!this.moveChecker()) {
                return;
            }
            if (this.field[this.currentX][this.currentY] === '░') {
                this.field[this.currentX][this.currentY] = '*';
            } else if (this.field[this.currentX][this.currentY] === 'O') {
                console.log('You fell into a hole');
                this.playing = false;
                this.print();
            } else if (this.field[this.currentX][this.currentY] === '^') {
                console.log('You found the hat! You won!');
                this.playing = false;
                this.print();
            }
        }
    }

    static generateField(size = 4) {
        const characterArray = ['░', 'O'];
        const percent = 0.33;
        const hat = '^';
        const pathCharacter = '*';
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


// console.log(Field.generateField().join(''));
let field = Field.generateField(5);
for (let value of field) {
    value = value.join('');
    console.log(value);
}


function play() {
    let direction = true;
    while (direction && (direction !== "exit") && (myField.playing)) {
        myField.print();
        direction = prompt('Which way?');
        myField.move(direction);
    }
}