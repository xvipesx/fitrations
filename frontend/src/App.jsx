import { useState, useEffect } from "react"

// Local component imports //
import './App.css'
import api from "./api.js"
import LeftBar from "./components/LeftBar.jsx"
import RightBar from "./components/RightBar"
import DisplayJournal from "./components/Journal"
import DisplayCalculator from "./components/Calculator"
import calcJournalTotals from "./utils/journalTotals.js"
import DatabaseManagement from "./components/Database.jsx"
import SetGoals from "./components/Goals.jsx"
import DisplaySettings from "./components/Settings.jsx"


function App() {
    // Journal retrieval logic is at app level to ensure a single state and API call
    // Set variables related to journal query actions
    const now = new Date()
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const[query, setQuery] = useState(date)
    /* journalEntries are an array consisting of 
    CALORIES, CARBS, DATE, FAT, JOURNAL_UUID, MEAL_TYPE, NAME, PORTION, PROTEIN and SERVING_SIZE
    */ 
    const[journalEntries, setJournalEntries] = useState([])
    // Used to established updated macro and calorie totals and provided to RightBar
    const[consumedData, setConsumedData] = useState([])

    // API requires query param to be date= rather than query=
    const fetchJournal = async () => {
        try {
            const response = await api.get('/query_journal_by_date', { params: { date : query }});
            // set journal data in array from backend
            setJournalEntries(response.data)
            // send journal data to utility calc and return updated intake values for calories, carb, fat and protein
            setConsumedData(calcJournalTotals(response.data))
        }
        catch (error) {
            console.error("Failed to receive journal data:", error)
        }
            
    }

    // calls fetchJournal to pass updated data down to Journal Display child
    useEffect(() => {
        fetchJournal()
    }, [query])

    const [activeView, setActiveView] = useState("journal")

    return (
        <div className="container-appshell">
            <LeftBar onNavigate={setActiveView} />
            <main className="container-appmain">
                {activeView === "journal" && 
                <div className="container-appview">
                    <DisplayJournal 
                        // Journal query response sent down to Journal.jsx
                        journalParentData={journalEntries}
                        // Update Journal.jsx dynamically when new submissions are added
                        onJournalUpdated={fetchJournal}
                        // Update Journal.jsx dynamically when a submission is deleted
                        onJournalDelete={fetchJournal}
                    /> 
                </div>
                }
                {activeView === "database" && 
                <div className="container-appview">
                    <DatabaseManagement />
                </div>
                }
                {activeView === "calculator" && 
                <div className="container-appview">
                    <DisplayCalculator />
                </div>
                }
                {activeView === "goals" && 
                <div className="container-appview">
                    <SetGoals />
                </div>
                }
                {activeView === "settings" && 
                <div className="container-appview">
                    <DisplaySettings 
                        // Clear the entire journal table
                        onJournalClear={fetchJournal}
                    />
                </div>
                }
            </main>
            <RightBar updatedIntake={consumedData}
            />
        </div>
    )
}

export default App
