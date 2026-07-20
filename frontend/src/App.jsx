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
    /* 
    The app level processes both the journal and goal states, updating the lower level components as additional data is added through
    updated fetches. 
    */
    const now = new Date()
    const[date, setDate] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`)
    const[query, setQuery] = useState(date)
    /* 
    journalEntries are an array consisting of 
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
    /*
    When the user selects a new date for the journal view, we update the app level date with it, set the API query with the new date
    and then fetch the journal again with the updated query parameter
    */
    const fetchDate = (userdate) => {
        try {
            setDate(userdate)
            setQuery(userdate)
            fetchJournal()
        }
        catch (error) {
            console.error("Failed to set date properly:", error)
        }
    }

    useEffect(() => {
        fetchJournal()
    }, [query])

    /*
    Goal handling section containing state variables and the fetch capabilities to provide updates to those variables. 
    */
    const [calorieGoal, setCalorieGoal] = useState(0)
    const [proteinGoal, setProteinGoal] = useState(0)
    const [carbGoal, setCarbsGoal] = useState(0)
    const [fatGoal, setFatGoal] = useState(0)

    const fetchDailyGoal = async () => {
        try {
            const response = await api.get('/retrieve_goal');
            setCalorieGoal(response.data.CALORIES);
            setProteinGoal(response.data.PROTEIN);
            setCarbsGoal(response.data.CARBS);
            setFatGoal(response.data.FAT);
        }
        catch (error) {
            console.error("Failed to obtain daily goal information", error);
        }
    }

    useEffect(() => {
        fetchDailyGoal()
    }, [])


    // Default view is set to the journal on app load
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
                        // Provide today's date to the journal and also updates the date based on user selection
                        // App level control of this variable for consistency with journal and goal values
                        journalParentDate={date}
                        onJournalDateUpdated={fetchDate}
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
                    <SetGoals 
                        // Updates the RightBar with the new goals on update
                        onGoalUpdated={fetchDailyGoal} 
                    />
                </div>
                }
                {activeView === "settings" && 
                <div className="container-appview">
                    <DisplaySettings 
                        // When the journal is cleared, fetch the Journal again to show it is empty
                        onJournalClear={fetchJournal}
                    />
                </div>
                }
            </main>
            <RightBar 
                updatedCalorieGoal={calorieGoal}
                updatedProteinGoal={proteinGoal}
                updatedCarbGoal={carbGoal}
                updatedFatGoal={fatGoal}
                updatedIntake={consumedData}
            />
        </div>
    )
}

export default App
