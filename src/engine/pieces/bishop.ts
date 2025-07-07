import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
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

        let availableMoves: Square[] = this.getMainDiagonalMoves(currentPosition)

        availableMoves = availableMoves.concat(this.getSecDiagonalMoves(currentPosition));

        return availableMoves;
    }
}
