import { BoardState, Move, BoardResult} from './types'

export const BoardAPI = {
 printFormattedBoard(state: BoardState) {
    let formattedString = "";
    state.forEach((cell, index) => {
      formattedString += cell ? ` ${cell} |` : "   |" 
      if((index + 1)%3 == 0) {
        formattedString = formattedString.slice(0, -1);
        if(index < 8 ){
          formattedString += "\n\u2015\u2015\u2015 \u2015\u2015\u2015 \u2015\u2015\u2015\n";   
        }
      }
    });
    console.log(formattedString);
  },
  isEmpty(state: BoardState): boolean {
    return state.every(cell => cell === null);
  },
  isFull(state: BoardState): boolean {
    return state.every(cell => cell);
  },
  getAvailableMoves(state: BoardState): Move[] {
    var availableMoves: Move[] = []
    state.forEach((cell, index) => {
      if(cell === null) {
        availableMoves.push(index as Move);
      }
    })
    return availableMoves;
  },
  isTerminal(state: BoardState): BoardResult | false {
    if (this.isEmpty(state)) {
      return false
    }
    const winningLines: Move[][] = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
  
      [0,3,6],
      [1,4,7],
      [2,5,8],
  
      [0,4,8],
      [2,4,6],
    ]
    for (let index = 0; index < winningLines.length; index++) {
      const line = winningLines[index];
      const [cell1, cell2, cell3] = line;
  
      if(state[cell1] && state[cell1] === state[cell2] && state[cell1] === state[cell3]) {
        const result: BoardResult = {
          winner: state[cell1]
        }
        if(index < 3) {
          result.direction = "H";
          result.row = index === 0 ? 1 : index === 1 ? 2 : 3;
        }
        if(index >= 3 && index <= 5) {
          result.direction = "V";
          result.column = index === 3 ? 1 : index === 4 ? 2 : 3;
        }
        if(index > 5) {
          result.direction = "D";
          result.diagonal = index === 6 ? "MAIN" : "COUNTER";
        }
        return result;
      }
    }
    if (this.isFull(state)) {
      return {
        winner: null
      }
    }
  
    return false
  }
}