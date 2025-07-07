import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }
    private getPossibleMoves(currentPosition:Square): Square[] {
        return [
        Square.at(currentPosition.row - 1, currentPosition.col + 2),
        Square.at(currentPosition.row - 1, currentPosition.col - 2),
        Square.at(currentPosition.row + 1, currentPosition.col + 2),
        Square.at(currentPosition.row + 1, currentPosition.col - 2),

        Square.at(currentPosition.row + 2, currentPosition.col - 1),
        Square.at(currentPosition.row - 2, currentPosition.col - 1),
        Square.at(currentPosition.row + 2, currentPosition.col + 1),
        Square.at(currentPosition.row - 2, currentPosition.col + 1)];
    }
    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);

        let availableMoves: Square[] = [];
        for (let s of this.getPossibleMoves(currentPosition)) {
            if (s.row >= 0 && s.row < GameSettings.BOARD_SIZE && s.col >= 0 && s.col < GameSettings.BOARD_SIZE) {
                availableMoves.push(s);
            }
        }
        return availableMoves;
    }
}
