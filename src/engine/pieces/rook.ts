import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    private getHorizontalMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        for (let i: number = curPos.col - 1; i >= 0 && !board.isSquareOccupied(Square.at(curPos.row, i)); i --) {
            moves.push(Square.at(curPos.row, i));
        }
        for (let i: number = curPos.col + 1; i < GameSettings.BOARD_SIZE && !board.isSquareOccupied(Square.at(curPos.row, i)); i++) {
            moves.push(Square.at(curPos.row, i));
        }
        return moves;
    }

    private getVerticalMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        for (let i: number = curPos.row - 1; i >= 0 && !board.isSquareOccupied(Square.at(i, curPos.col)); i --) {
            moves.push(Square.at(i, curPos.col));
        }
        for (let i: number = curPos.row + 1; i < GameSettings.BOARD_SIZE && !board.isSquareOccupied(Square.at(i, curPos.col)); i++) {
            moves.push(Square.at(i, curPos.col));
        }
        return moves;
    }

    public getAvailableMoves(board: Board) {
        let currentPosition: Square = board.findPiece(this);
        let availableMoves: Square[] = this.getHorizontalMoves(board);
        availableMoves = availableMoves.concat(this.getVerticalMoves(board));
        return availableMoves;
    }
}
