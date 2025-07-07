export default class Square {
    public row: number;
    public col: number;

    public constructor(row: number, col: number) {
        this.row = row;
        this.col = col;
    }

    public static at(row: number, col: number) {
        return new Square(row, col);
    }

    public equals(otherSquare: Square) {
        return !!otherSquare && this.row === otherSquare.row && this.col === otherSquare.col;
    }

    public toString() {
        return `Row ${this.row}, Col ${this.col}`;
    }

    public squareUp() {
        return Square.at(this.row + 1, this.col);
    }

    public squareDown() {
        return Square.at(this.row - 1, this.col);
    }

    public squareLeft() {
        return Square.at(this.row, this.col + 1);
    }

    public squareRight() {
        return Square.at(this.row, this.col - 1);
    }
}
