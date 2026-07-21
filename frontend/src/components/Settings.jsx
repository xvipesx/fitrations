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
    // Clear the entire food database
    const handleDBClear = async () => {
        try {
            const response = await api.delete('/clear_foods')
            return(response)
    }
        catch (error) {
            console.error('Failed to clear the entire food database:', error)
        }
    }

    // Request the backend compress the database and return a zipped archive download
    const handleDBBackup = async () => {
        try {
            // First: Send a request to the backend API ensuring that the responseType is set to blob
            const response = await api.get(
                '/backup_db', 
                {responseType: "blob"}
            )

            // Second: Extract the filename from the content disposition
            // If the filename cannot be determined, set default as just FitRationsDB.zip
            const disposition = response.headers['content-disposition'];
            console.log(disposition)
            let fileName = 'FitRationsDB.zip';
            if (disposition) {
                const match = /filename="?([^"]+)"?/.exec(disposition);
                if (match) fileName = match[1];
            }

            // Third: Create the file's URL and trigger the download
            const url = URL.createObjectURL(new Blob([response.data]));
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();

            // Fourth: Finalize the process by tidying up the loose ends
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        catch (error) {
            console.error('Failed to download the database:', error)
        }
    }

    return (
    <div className="container-shell">
        <h2>Settings</h2>
        <hr/>
        <div className="container-section">
            <p><b>Database Backup</b></p>
            <p className="hint">Download a copy of your database and save it locally.</p>
            <br/>
            <button type="button" className="button-add" onClick={() => handleDBBackup()}>Backup Database</button>
        </div>
        <hr/>
        <div className="container-section">
            <p><b>Journal Clear</b></p>
            <p className="hint">Reset your journal and delete all entries. Please be sure you wish to do this as there is no way to revert the clear. <b>This cannot be undone!</b></p>
            <br/>
            <button type="button" className="button-delete" onClick={() => handleJournalClear()}>Clear Journal</button>
        </div>
        <hr/>
        <div className="container-section">
            <p><b>Database Clear</b></p>
            <p className="hint">Reset the entire database to a clean slate. Please be sure you wish to do this as there is no way to revert the clear. <b>This cannot be undone!</b></p>
            <br/>
            <button type='button' className="button-delete" onClick={() => handleDBClear()}>Clear Database</button>
        </div>
    </div>
    )

}


export default DisplaySettings