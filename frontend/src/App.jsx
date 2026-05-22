import { useState } from "react"
import './App.css'

// Local component imports //
import SideBar from "./components/SideBar"
import RightBar from "./components/RightBar"
import DisplayJournal from "./components/Journal"
import DisplayCalculator from "./components/Calculator"


function App() {
    const [activeView, setActiveView] = useState("journal")

    return (
        <div style={styles.shell}>
            <SideBar onNavigate={setActiveView} />
            <main style={styles.main}>
                {activeView === "journal" && 
                <div style={styles.viewContainer}>
                    <p style={styles.title}>Daily Journal</p>
                    <DisplayJournal />
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
