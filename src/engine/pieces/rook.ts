import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";

export default class Rook extends Piece {
    public constructor(player: Player) {
        super("rook", player);
    }

    private getHorizontalMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        for (let i: number = curPos.col - 1; i >= 0; i --) {
            if (board.isSquareOccupied(Square.at(curPos.row, i))) {
                let blockingPiece: Piece | undefined = board.getPiece(Square.at(curPos.row, i));
                if (this.player !== blockingPiece?.player && blockingPiece?.pieceType !== "king") {
                    moves.push(Square.at(curPos.row, i));
                }
                break;
            }
            moves.push(Square.at(curPos.row, i));
        }
        for (let i: number = curPos.col + 1; i < GameSettings.BOARD_SIZE; i++) {
            if (board.isSquareOccupied(Square.at(curPos.row, i))){
                let blockingPiece: Piece | undefined = board.getPiece(Square.at(curPos.row, i));
                if (this.player !== blockingPiece?.player && blockingPiece?.pieceType !== "king") {
                    moves.push(Square.at(curPos.row, i));
                }
                break;
            }
            moves.push(Square.at(curPos.row, i));
        }
        return moves;
    }

    private getVerticalMoves(board: Board): Square[] {
        let curPos: Square = board.findPiece(this);
        let moves: Square[] = [];
        for (let i: number = curPos.row - 1; i >= 0; i --) {
            if (board.isSquareOccupied(Square.at(i, curPos.col))){
                let blockingPiece: Piece | undefined = board.getPiece(Square.at(i, curPos.col));
                if (this.player !== blockingPiece?.player && blockingPiece?.pieceType !== "king") {
                    moves.push(Square.at(i, curPos.col));
                }
                break;
            }
            moves.push(Square.at(i, curPos.col));
        }
        for (let i: number = curPos.row + 1; i < GameSettings.BOARD_SIZE; i++) {
            if (board.isSquareOccupied(Square.at(i, curPos.col))){
                let blockingPiece: Piece | undefined = board.getPiece(Square.at(i, curPos.col));
                if (this.player !== blockingPiece?.player && blockingPiece?.pieceType !== "king") {
                    moves.push(Square.at(i, curPos.col));
                }
                break;
            }
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
