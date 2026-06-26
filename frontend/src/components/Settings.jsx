import React from "react"
import api from "../api.js"



function DisplaySettings ( {onJournalClear} ) {

    // Submit request to clear the entire journal. This isn't just for the day, but the entire table in the database.
    const handleJournalClear = async () => {
        try {
            const response = await api.delete('/clear_journal')
            onJournalClear()
            return(response)
        }
        catch (error) {
            console.error("Failed to delete journal entry:", error)
        }
    }
    // Delete items from the database by providing the food_uuid obtained by FoodSearch 
    const handleDBClear = async () => {
        try {
            // Template literal to pass food_uuid to API
            const response = await api.delete('/clear_foods')
            return(response)
    }
        catch (error) {
            console.error('Failed to clear the entire food database:', error)
        }
    }

    return (
    <div className="container-default">
        <h2>Settings</h2>
        <br/>
        <hr/>
        <br/>
        <p><b>Database Backup (PLACEHOLDER)</b></p>
        <p className="hint">Download a copy of your database.</p>
        <br/>
        <button type="button" className="button-add" onClick={() => handleClear()}>Backup Database</button>
        <br/>
        <br/>
        <hr/>
        <br/>
        <p><b>Journal Clear</b></p>
        <p className="hint">The below action will reset the entire journal to a clean slate. Please be sure you wish to do this as there is no way to revert the clear.</p>
        <br/>
        <button type="button" className="button-delete" onClick={() => handleJournalClear()}>Clear Journal</button>
        <br/>
        <br/>
        <hr/>
        <br/>
        <p><b>Database Clear</b></p>
        <p className="hint">The below action will reset the entire database to a clean slate. Please be sure you wish to do this as there is no way to revert the clear.</p>
        <br/>
        <button type='button' className="button-delete" onClick={() => handleDBClear()}>Clear Database</button>
        <br/>
        <br/>
    </div>
    )

}


export default DisplaySettings