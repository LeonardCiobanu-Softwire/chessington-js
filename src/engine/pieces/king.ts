import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private getPossibleMoves(currentPosition: Square) {
        return [
          Square.at(currentPosition.row - 1, currentPosition.col),
            Square.at(currentPosition.row + 1, currentPosition.col),
            Square.at(currentPosition.row, currentPosition.col - 1),
            Square.at(currentPosition.row, currentPosition.col + 1),
            Square.at(currentPosition.row + 1, currentPosition.col + 1),
            Square.at(currentPosition.row + 1, currentPosition.col - 1),
            Square.at(currentPosition.row - 1, currentPosition.col + 1),
            Square.at(currentPosition.row - 1, currentPosition.col - 1)];
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = this.getPossibleMoves(board.findPiece(this));
        availableMoves = availableMoves.filter(
            move =>
                move.row < GameSettings.BOARD_SIZE &&
                move.col < GameSettings.BOARD_SIZE &&
                move.row > 0 &&
                move.col > 0
        );
        return availableMoves;
    }
}
