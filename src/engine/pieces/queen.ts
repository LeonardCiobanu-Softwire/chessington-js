import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getLateralMoves(currentPosition: Square): Square[] {
        let availableMoves: Square[] = [];
        for (let i: number = 0; i < GameSettings.BOARD_SIZE; i++) {
            if (i != currentPosition.row) {
                availableMoves.push(Square.at(i, currentPosition.col));
            }
            if (i != currentPosition.col) {
                availableMoves.push(Square.at(currentPosition.row, i));
            }
        }
        return availableMoves;
    }

    public getMainDiagonalMoves(currentPosition: Square) {
        let availableMoves: Square[] = [];
        for (let i = currentPosition.row + 1, j  = currentPosition.col + 1; i < GameSettings.BOARD_SIZE && j < GameSettings.BOARD_SIZE; i++, j++) {
            availableMoves.push(Square.at(i, j));
        }
        for (let i = currentPosition.row - 1, j  = currentPosition.col - 1; i >= 0 && j >= 0; i--, j--) {
            availableMoves.push(Square.at(i, j));
        }
        return availableMoves;
    }

    public getSecDiagonalMoves(currentPosition: Square) {
        let availableMoves: Square[] = [];
        for (let i = currentPosition.row + 1, j  = currentPosition.col - 1; i < GameSettings.BOARD_SIZE && j >= 0; i++, j--) {
            availableMoves.push(Square.at(i, j));
        }
        for (let i = currentPosition.row - 1, j  = currentPosition.col + 1; j < GameSettings.BOARD_SIZE && i >= 0; i--, j++) {
            availableMoves.push(Square.at(i, j));
        }
        return availableMoves;
    }

    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);
        let availableMoves: Square[] = this.getLateralMoves(currentPosition);
        availableMoves = availableMoves.concat(this.getMainDiagonalMoves(currentPosition));
        availableMoves = availableMoves.concat(this.getSecDiagonalMoves(currentPosition));
        return availableMoves;
    }
}
