import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super("bishop", player);
    }

    public getMainDiagonalMoves(board: Board) {
        let currentPosition = board.findPiece(this);
        let availableMoves: Square[] = [];
        for (let i = currentPosition.row + 1, j  = currentPosition.col + 1; i < GameSettings.BOARD_SIZE && j < GameSettings.BOARD_SIZE
            && !board.isSquareOccupied(Square.at(i, j)); i++, j++) {

            availableMoves.push(Square.at(i, j));
        }
        for (let i = currentPosition.row - 1, j  = currentPosition.col - 1; i >= 0 && j >= 0
            && !board.isSquareOccupied(Square.at(i, j)); i--, j--) {

            availableMoves.push(Square.at(i, j));
        }
        return availableMoves;
    }

    public getSecDiagonalMoves(board:Board) {
        let currentPosition = board.findPiece(this);
        let availableMoves: Square[] = [];
        for (let i = currentPosition.row + 1, j  = currentPosition.col - 1; i < GameSettings.BOARD_SIZE && j >= 0
            && !board.isSquareOccupied(Square.at(i, j)); i++, j--) {
            availableMoves.push(Square.at(i, j));
        }
        for (let i = currentPosition.row - 1, j  = currentPosition.col + 1; j < GameSettings.BOARD_SIZE && i >= 0
            && !board.isSquareOccupied(Square.at(i, j)); i--, j++) {
            availableMoves.push(Square.at(i, j));
        }
        return availableMoves;
    }

    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);

        let availableMoves: Square[] = this.getMainDiagonalMoves(board)

        availableMoves = availableMoves.concat(this.getSecDiagonalMoves(board));

        return availableMoves;
    }
}
