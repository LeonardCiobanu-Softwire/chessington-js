import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Knight extends Piece {
    public constructor(player: Player) {
        super("knight", player);
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

        let availableMoves: Square[] = this.getPossibleMoves(currentPosition);
        availableMoves = availableMoves.filter(move => {
            if (!board.isSquareOccupied(move)) return board.isInBounds(move);
            let blockingPiece: Piece | undefined = board.getPiece(move);
            let player: boolean = blockingPiece?.player !== this.player;
            let king: boolean = blockingPiece?.pieceType !== "king";

            return board.isInBounds(move) && blockingPiece && player && king;
        } );
        return availableMoves;
    }
}
