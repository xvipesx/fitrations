import { useState, useEffect } from "react"

// Local component imports //
import './App.css'
import api from "./api.js"
import SideBar from "./components/SideBar"
import RightBar from "./components/RightBar"
import DisplayJournal from "./components/Journal"
import DisplayCalculator from "./components/Calculator"


function App() {
    // Journal retrieval logic is at app level to ensure a single state and API call, 
    // but data is available to goals and journal display

    // Set and format date needed for journal query
    const now = new Date()
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
    const[query, setQuery] = useState(date)

    // Prepare array for journal entries display
    const[journalEntries, setJournalEntries] = useState([])

    // API requires query param to be date= rather than query=
    useEffect(() => {
        const fetchJournal = async () => {
            try {
                const response = await api.get('/query_journal_by_date', { params: { date : query }});
                setJournalEntries(response.data)
            }
            catch (error) {
                console.error("Failed to receive journal data:", error)
            }
            
        }
        fetchJournal()
    }, [query])


    const [activeView, setActiveView] = useState("journal")

    return (
        <div style={styles.shell}>
            <SideBar onNavigate={setActiveView} />
            <main style={styles.main}>
                {activeView === "journal" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Daily Journal</p>
                    <DisplayJournal onJournalData={journalEntries}/> 
                </div>
                }
                {activeView === "database" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Database Management</p>
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
                </div>
                }
                {activeView === "summary" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Summary</p>
                </div>
                }
            </main>
            <RightBar />
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
