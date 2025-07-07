import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }



    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);
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
}
