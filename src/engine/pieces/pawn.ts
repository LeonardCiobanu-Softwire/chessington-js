import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Pawn extends Piece {

    public constructor(player: Player) {
        super(player);
    }

    public pawnUp(board: Board) {
        if (this.player == Player.WHITE) {
            return board.findPiece(this).squareUp();
        } else {
            return board.findPiece(this).squareDown();
        }
    }

    public getAvailableMoves(board: Board) {
        // return new Array(0);
        return new Array(this.pawnUp(board));
    }
}
