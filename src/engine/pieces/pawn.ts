import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

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

    public pawnTwoUp(board: Board) {
        if (this.player == Player.WHITE && board.findPiece(this).row == 1) {
            return board.findPiece(this).squareUp().squareUp();
        } else if (this.player == Player.BLACK && board.findPiece(this).row == GameSettings.BOARD_SIZE - 2) {
            return board.findPiece(this).squareDown().squareDown();
        }
        return null;
    }

    public getAvailableMoves(board: Board) {
        // return new Array(0);
        let availableMoves: Square[] = [];
        availableMoves.push(this.pawnUp(board));
        let twoUp = this.pawnTwoUp(board);
        if (twoUp)
            availableMoves.push(twoUp);
        return availableMoves;
    }
}
