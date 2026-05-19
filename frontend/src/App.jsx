import { useState } from "react"
import './App.css'
import SideBar from "./components/SideBar"
import RightBar from "./components/RightBar"


function App() {
    const [activeView, setActiveView] = useState("journal")

    return (
        <div style={styles.shell}>
            <SideBar onNavigate={setActiveView} />
            <main style={styles.main}>
                {activeView === "journal" && <div>Journal View</div>}
                {activeView === "addFood" && <div>Add Food View</div>}
                {activeView === "modifyFood" && <div>Modify Food View</div>}
                {activeView === "goals" && <div>Goals View</div>}
                {activeView === "summary" && <div>Summary View</div>}
            </main>
            <RightBar />
        </div>
    )
}

const styles = {
    shell: {
        display: "flex",
        height: "100vh",
        backgroundColor: "#100f0f",
        color: "#e0e0e0",
    },
    main: {
        flex: 1,
        padding: "24px",
        overflowY: "auto",
    },
}

export default App
