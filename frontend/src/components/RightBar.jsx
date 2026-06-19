import { useState, useEffect } from "react"
import api from "../api.js"
import "../styles/rightbar.css"

function RightBar( {updatedIntake}) {
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
    /* updatedIntake values are obtained through journal updates provided by the primary app and a utility calculator.
    In order to keep a single API call, data is already handled at the app level. The updated journal happens via fetchJournal
    and the array is sent to journalTotals. Primary app then passes the below values down to the RightBar via updatedIntake.
    */ 
    const caloriesRemaining = calorieGoal - updatedIntake.calories
    const proteinRemaining = proteinGoal - updatedIntake.protein
    const carbsRemaining = carbGoal - updatedIntake.carbs
    const fatRemaining = fatGoal - updatedIntake.fat

    useEffect(() => {
        fetchDailyGoal()
    }, [])

    return (
        <aside className="rightbar-view">
            <div className="nutrition-card">
                <p className="rightbar-label">DAILY GOALS</p>
                <p className="rightbar-value">Calories: {calorieGoal}</p>
                <p className="rightbar-value">Protein: {proteinGoal}g</p>
                <p className="rightbar-value">Carbs: {carbGoal}g</p>
                <p className="rightbar-value">Fat: {fatGoal}g</p>
            </div>
            <div className="nutrition-card">
                <p className="rightbar-label">REMAINING</p>
                <p className={`rightbar-value ${caloriesRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Calories: {caloriesRemaining}</p>
                <p className={`rightbar-value ${proteinRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Protein: {proteinRemaining}g</p>
                <p className={`rightbar-value ${carbsRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Carbs: {carbsRemaining}g</p>
                <p className={`rightbar-value ${fatRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Fat: {fatRemaining}g</p>
            </div>
        </aside>
    )
    }

export default RightBar