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
        <div style={styles.shell}>
            <LeftBar onNavigate={setActiveView} />
            <main style={styles.main}>
                {activeView === "journal" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Daily Journal</p>
                    <DisplayJournal 
                        // Journal query response sent down to Journal.jsx
                        journalParentData={journalEntries}
                        // Update Journal.jsx dynamically when new submissions are added
                        onJournalUpdated={fetchJournal}
                    /> 
                </div>
                }
                {activeView === "database" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Database Management</p>
                    <DatabaseManagement />
                </div>
                }
                {activeView === "calculator" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>BMR Calculator</p>
                    <DisplayCalculator />
                </div>
                }
                {activeView === "goals" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Goals</p>
                    <SetGoals />
                </div>
                }
                {activeView === "summary" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Summary</p>
                </div>
                }
            </main>
            <RightBar updatedIntake={consumedData}
            />
        </div>
    )
}

const styles = {
    viewContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "24px",
    },
    shell: {
        display: "flex",
        height: "100vh",
        backgroundColor: "#100f0f",
        color: "#e0e0e0",
    },
    main: {
        flex: 1,
        padding: "30px",
        overflowY: "auto",
    },
    title: {
        color: "#097b72",
        fontSize: "1.5rem",
        fontWeight: "bold",
        margin: "0 0 4px 0",
    }
}

export default App
