import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class King extends Piece {
    public constructor(player: Player) {
        super("king", player);
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
        availableMoves = availableMoves.filter(move => {
            if (!board.isSquareOccupied(move))
                return board.isInBounds(move);

            let blockingPiece: Piece | undefined = board.getPiece(move);
            let player: boolean = blockingPiece?.player !== this.player;
            let king: boolean = blockingPiece?.pieceType !== "king";
            return board.isInBounds(move) && blockingPiece && player && king;
        });
        return availableMoves;
    }
}
