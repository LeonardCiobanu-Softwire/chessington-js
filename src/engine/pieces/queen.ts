import Piece from './piece';
import Player from '../player';
import Board from '../board';
import GameSettings from "../gameSettings";
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super("queen", player);
    }

    private getLateralMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        function getHorizontalMoves(){
            for (let i: number = curPos.col - 1; i >= 0 && !board.isSquareOccupied(Square.at(curPos.row, i)); i --) {
                moves.push(Square.at(curPos.row, i));
            }
            for (let i: number = curPos.col + 1; i < GameSettings.BOARD_SIZE && !board.isSquareOccupied(Square.at(curPos.row, i)); i++) {
                moves.push(Square.at(curPos.row, i));
            }
        }

        function getVerticalMoves(){
            for (let i: number = curPos.row - 1; i >= 0 && !board.isSquareOccupied(Square.at(i, curPos.col)); i --) {
                moves.push(Square.at(i, curPos.col));
            }
            for (let i: number = curPos.row + 1; i < GameSettings.BOARD_SIZE && !board.isSquareOccupied(Square.at(i, curPos.col)); i++) {
                moves.push(Square.at(i, curPos.col));
            }
        }
        getVerticalMoves();
        getHorizontalMoves();
        return moves;
    }

    private getDiagonalMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        function getMainDiagonalMoves() {

            for (let i = curPos.row + 1, j  = curPos.col + 1; i < GameSettings.BOARD_SIZE && j < GameSettings.BOARD_SIZE
                && !board.isSquareOccupied(Square.at(i, j)); i++, j++) {

                moves.push(Square.at(i, j));
            }
            for (let i = curPos.row - 1, j  = curPos.col - 1; i >= 0 && j >= 0
                && !board.isSquareOccupied(Square.at(i, j)); i--, j--) {

                moves.push(Square.at(i, j));
            }
        }

        function getSecDiagonalMoves() {
            for (let i = curPos.row + 1, j  = curPos.col - 1; i < GameSettings.BOARD_SIZE && j >= 0
                && !board.isSquareOccupied(Square.at(i, j)); i++, j--) {
                moves.push(Square.at(i, j));
            }
            for (let i = curPos.row - 1, j  = curPos.col + 1; j < GameSettings.BOARD_SIZE && i >= 0
                && !board.isSquareOccupied(Square.at(i, j)); i--, j++) {
                moves.push(Square.at(i, j));
            }
            return moves;
        }
        getMainDiagonalMoves();
        getSecDiagonalMoves();
        return moves;
    }

    public getAvailableMoves(board: Board) {
        let curPos
: Square = board.findPiece(this);
        let availableMoves: Square[] = this.getLateralMoves(board);
        availableMoves = availableMoves.concat(this.getDiagonalMoves(board));
        return availableMoves;
    }
}
