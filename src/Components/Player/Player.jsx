import { useState } from "react"



export default function Player({ playerName, playerSymbol , isActive , onPlayerChange }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedPlayerName, setEditedPlayerName] = useState(playerName);
    function handleClick() {
        setIsEditing((editingState) => !editingState);
        if(isEditing){
            onPlayerChange(playerSymbol , editedPlayerName);
        }

    }
    function handleInput(event) {
        setEditedPlayerName(event.target.value)
    }
    return (
        <li className={isActive ? "active" : undefined}>
            <span className="player">
                
                {isEditing ? (
                    <>
                        <input type="text" onChange={handleInput} />
                        <button onClick={handleClick}>Save</button>
                    </>

                ) : (
                    <>
                        <span className="player-name">{editedPlayerName}</span>
                        <button onClick={handleClick}>Edit</button>
                    </>

                )}

                <span className="player-symbol">{playerSymbol}</span>

            </span>
        </li>
    )
}