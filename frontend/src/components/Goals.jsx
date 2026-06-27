import { useState } from "react"

// Local imports
import api from "../api"

function SetGoals () {
    // Set initial goal form state using strings for easier input by user. Will valid before sending to API.
    const[goalForm, setGoalForm] = useState({
        calorie_goal: "",
        protein_goal: "",
        carbs_goal: "",
        fat_goal: "",
    })
    const resetForm = () => {
        setGoalForm({
            calorie_goal: "",
            protein_goal: "",
            carbs_goal: "",
            fat_goal: "",
        })
    }
    // Convert and valid types before sending to API
    const convertFormTypes = (form) => ({
        calorie_goal: parseInt(form.calorie_goal),
        protein_goal: parseFloat(form.protein_goal),
        carbs_goal: parseFloat(form.carbs_goal),
        fat_goal: parseFloat(form.fat_goal),       
    })

    // Form data updates as the state changes for the provided form fields
    const updateGoalForm = (data) => {
        setGoalForm({...goalForm, [data.target.name]: data.target.value})
    }

    const handleGoalModify = async (form) => {
        try {
            const convertedForm = convertFormTypes(form)
            const response = await api.put('/modify_goal', convertedForm)
            resetForm()
            return response
        }
        catch (error) {
            console.error('Unable to proceed:', error)
        }
    }

    return (
        <div className="container-default">
            <h2>Goal Setting</h2>
                <form onSubmit={(event) => {
                    event.preventDefault()
                }}>
                <label className="if-liquid">
                    <span className="if-liquid-label">Calorie Goal</span>
                    <input
                        className="input" 
                        type="text"
                        name="calorie_goal"
                        value={goalForm.calorie_goal}
                        onChange={updateGoalForm}
                        required
                    />
                </label>
                <label className="if-liquid">
                    <span className="if-liquid-label">Protein Goal</span>
                    <input
                        className="input"
                        type="text"
                        name="protein_goal"
                        value={goalForm.protein_goal}
                        onChange={updateGoalForm}
                        required
                    />
                </label>
                <label className="if-liquid">
                    <span className="if-liquid-label">Carb Goal</span>
                    <input
                        className="input"
                        type="text"
                        name="carbs_goal"
                        value={goalForm.carbs_goal}
                        onChange={updateGoalForm}
                        required
                    />
                </label>
                <label className="if-liquid">
                    <span className="if-liquid-label">Fat Goal</span>
                    <input 
                        className="input"
                        type="text"
                        name="fat_goal"
                        value={goalForm.fat_goal}
                        onChange={updateGoalForm}
                        required
                    />
                </label>
                <br/>
                <button type='button' className="button-add" onClick={() => handleGoalModify(goalForm)}>Set</button>
                <button type='reset' className="button-reset" onClick={resetForm}>Reset</button>
            </form>


        </div>
    )



}


const styles = {
    input: {
        width: "75%",
        boxSizing: "border-box",
        padding: "10px",
        backgroundColor: "#2c2c2c",
        border: "2px solid #3e4041",
        color: "#e0e0e0",
        borderRadius: "4px",
        display: "inline-block",
    },
    container: { 
        alignItems: "center",
        position: "relative", 
        width: "100%" },
    card: {
        backgroundColor: "#2c2c2c",
        border: "1px solid #3d3d3d",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
        alignItems: "left",
    },
}

export default SetGoals