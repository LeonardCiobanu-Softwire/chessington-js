import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";
import GameSettings from "../gameSettings";
import player from "../player";

export default class Pawn extends Piece {

    public constructor(player: Player) {
        super("pawn", player);
    }

    public pawnUp(board: Board) {
        if (this.player == Player.WHITE && !board.isSquareOccupied(board.findPiece(this).squareDown())) {
            return board.findPiece(this).squareUp();
        } else if (this.player == Player.BLACK) {
            return board.findPiece(this).squareDown();
        }
        return null;
    }

    public pawnTwoUp(board: Board) {
        if (this.player == Player.WHITE && board.findPiece(this).row == 1 && !board.isSquareOccupied(board.findPiece(this).squareUp())) {
            return board.findPiece(this).squareUp().squareUp();
        } else if (this.player == Player.BLACK && board.findPiece(this).row == GameSettings.BOARD_SIZE - 2 && !board.isSquareOccupied(board.findPiece(this).squareDown())) {
            return board.findPiece(this).squareDown().squareDown();
        }
        return null;
    }

    public capture(board: Board): Square[] {
        let curPos = board.findPiece(this);
        let moves: Square[] = [];
        if (this.player === Player.WHITE) {
            if (board.isSquareOccupied(Square.at(curPos.row + 1, curPos.col - 1))) {
                let otherPiece = board.getPiece(Square.at(curPos.row + 1, curPos.col - 1));
                if (otherPiece?.player === Player.BLACK && otherPiece?.pieceType !== 'king')
                    moves.push(Square.at(curPos.row + 1, curPos.col - 1));
            }
            if (board.isSquareOccupied(Square.at(curPos.row + 1, curPos.col + 1))) {
                let otherPiece = board.getPiece(Square.at(curPos.row + 1, curPos.col + 1));
                if (otherPiece?.player === Player.BLACK && otherPiece?.pieceType !== 'king')
                    moves.push(Square.at(curPos.row + 1, curPos.col + 1));
            }
        } else if (this.player == Player.BLACK) {
            if (board.isSquareOccupied(Square.at(curPos.row - 1, curPos.col - 1))) {
                let otherPiece = board.getPiece(Square.at(curPos.row - 1, curPos.col - 1));
                if (otherPiece?.player === Player.WHITE && otherPiece?.pieceType !== 'king')
                    moves.push(Square.at(curPos.row - 1, curPos.col - 1));
            }
            if (board.isSquareOccupied(Square.at(curPos.row - 1, curPos.col + 1))) {
                let otherPiece = board.getPiece(Square.at(curPos.row - 1, curPos.col + 1));
                if (otherPiece?.player === Player.WHITE && otherPiece?.pieceType !== 'king')
                    moves.push(Square.at(curPos.row - 1, curPos.col + 1));
            }
        }
        return moves;
    }

    public getAvailableMoves(board: Board) {
        let availableMoves: Square[] = [];
        let oneUp: Square | null = this.pawnUp(board);
        if (oneUp)
            availableMoves.push(oneUp);
        let twoUp = this.pawnTwoUp(board);
        if (twoUp)
            availableMoves.push(twoUp);
        availableMoves = availableMoves.filter(move => !board.isSquareOccupied(move) && board.isInBounds(move));
        availableMoves = availableMoves.concat(this.capture(board));
        return availableMoves;
    }
}
