import { act, useState } from "react"
import Gameboard from "./Components/Gameboard/Gameboard"
import Player from "./Components/Player/Player"
import Log from "./Components/Log/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import Gameover from "./Components/Gameover/Gameover";


function deriveActivePlayers(turns){
  let currentPlayer = "X";
  if(turns.length > 0 && turns[0].player === "X"){
    currentPlayer = "O";
  }
  return currentPlayer;
}

function deriveWinner(gameboard){
  for(const combination of WINNING_COMBINATIONS){
    // console.log(combination)
    const firstSquareSymbol = gameboard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameboard[combination[1].row][combination[1].column];
    const thirdSquareSymbol  =  gameboard[combination[2].row][combination[2].column];

    // console.log([firstSquareSymbol , secondSquareSymbol, thirdSquareSymbol ])
    if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol){
      winner = players[firstSquareSymbol];
      // log
      // console.log([firstSquareSymbol , secondSquareSymbol , thirdSquareSymbol])

    }
    return winner;
  }

}


const initialGameBoard = [
  [ null , null , null ],
  [ null , null , null ],
  [ null , null , null ],
]
function App() {

  
  const [gameTurns, setGameTurns] = useState([]);
  const [players , setPlayers] = useState({
    "X" : "Player1",
    "O" : "Player2"
  })  
  function restartGame(){
    setGameTurns([])
  }

  function handleActivePlayerChange(rowIndex, colIndex) {

    
    setGameTurns((prevTurn) => {

      let currentPlayer = deriveActivePlayers(prevTurn);
      const updatedTurns = [{
        
        square: { row: rowIndex, col: colIndex },
        player: currentPlayer
      
      } ,
       ...prevTurn]

      return updatedTurns;

    });
  }

  function handlePlayerNameChange(symbol , playerName){
    setPlayers( (prevPlayers) => {
      return {
        ...prevPlayers ,
        [symbol]: playerName
      }
    } )
  }

  let activePlayer = deriveActivePlayers(gameTurns);
  const winner = deriveWinner(gameboard)
  const gameboard = [...initialGameBoard.map( (rows) => [...rows] ) ];
  for(const turn of gameTurns){
      const {square , player} = turn;
      const { row , col } = square
      gameboard[row][col] = player       
  }
  const checkDraw = gameTurns.length === 9 && !winner;


  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player" >
          <Player playerName={"Player1"} playerSymbol={"X"} isActive={activePlayer === "X"} onPlayerChange={handlePlayerNameChange} />
          <Player playerName={"Player2"} playerSymbol={"O"} isActive={activePlayer === "O"} onPlayerChange={handlePlayerNameChange}/>
        </ol>
        {(winner !== undefined || checkDraw ) && <Gameover winner={winner} onRestart={restartGame}/>}
        
        <Gameboard onPlayerClick={handleActivePlayerChange} board={gameboard}  />

      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
