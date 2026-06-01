import { useState, use } from "react"
import api from "../api.js"
import FoodSearch from "./FoodSearch.jsx"


function DisplayJournal ({ onJournalData }) {
    // Prepare blank form and food selection variable for journal submissions
    const[formData, setFormData] = useState({
        food_uuid: "",
        meal_type: "",
        portion: "",
    })
    const[selectedFood, setSelectedFood] = useState("")

    // Passed from child FoodSearch component to update food name and form UUID
    const handleSelectedFood = (food) => {
        setSelectedFood(food.NAME)
        setFormData({...formData, "food_uuid": food.FOOD_UUID})
    }

    // Form data updates for portions and meal type before submission to journal
    const updateFormData = (data) => {
        setFormData({...formData, [data.target.name]: data.target.value})
    }

    // Ensure types are correct before submission to update journal
    const convertedTypes = (data) => {
        return {
        food_uuid: data.food_uuid,
        meal_type: data.meal_type,
        portion: parseFloat(data.portion),
        }
    }

    // Submit food UUID, meal type and portions to journal for tracking
    const handleSubmit = async (data) => {
        const convertedForm = convertedTypes(data)
            try {
                const response = await api.post('/add_journal_entry', convertedForm)
                return(response.data.food_uuid)
            }
            catch (error) {
                console.error("Failed to post journal entry:", error)
            }
        }

    // Journal submission reset    
    const resetFields = () => {
        setFormData({
            food_uuid: "",
            meal_type: "",
            portion: "",
        });
    }

    // FoodSearch needs to obtain a food from the database, and store it in a variable here with the UUID so I can pair it with the portions and meal type
    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <FoodSearch onFoodSelected={handleSelectedFood} />
                {selectedFood && (
                    <p>Selected: {selectedFood}</p>
                )}
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(formData)
                    }}>
                    <label>
                        How many portions?
                        <input
                            type="text"
                            name="portion" 
                            value={formData.portion}
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    <label>
                        Meal:
                        <select name="meal_type" value={formData.meal_type} onChange={updateFormData}>
                            <option value='' disabled={true}>Select meal...</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                            <option value="snack">Snack</option>
                        </select>
                    </label>
                    <button type="reset" onClick={resetFields}>Reset</button>
                    <button type="submit">Add</button>
                </form>
            </div>
            <hr></hr>
            <div style={styles.card}>
            <label>Today's Journal Entries</label>
            <table style={styles.table}>
                <thead style={styles.th}>
                    <tr>
                        <th>Date</th>
                        <th>Meal</th>
                        <th>Name</th>
                        <th>Calories</th>
                        <th>Protein</th>
                        <th>Carbs</th>
                        <th>Fat</th>
                        <th>Portion</th>
                    </tr>
                </thead>
                <tbody>
                    {onJournalData.map((entry) => (
                        <tr key={entry.JOURNAL_UUID}>
                            <td>{entry.DATE}</td>
                            <td>{entry.MEAL_TYPE}</td>
                            <td>{entry.NAME}</td>
                            <td>{entry.CALORIES}</td>
                            <td>{entry.PROTEIN}</td>
                            <td>{entry.CARBS}</td>
                            <td>{entry.FAT}</td>
                            <td>{entry.PORTION}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}




const styles = {

    section: {
        padding: "12px 24px",
        borderBottom: "1px solid #3d3d3d",
    },
    title: {
        color: "#9e9e9e",
        fontSize: "1.0rem",
        fontWeight: "bold",
        margin: "0 0 4px 0",
    },
    table: {
        color: "9e09e9e",
        fontSize: "0.8rem",
        border: "2px solid",
        padding: "30px",
        width: "100%",
    },
    th: {
        color: "#097b72",
        fontSize: "0.9rem",
        border: "2px solid",
        padding: "30px",
        width: "100%",
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
    }
}

export default DisplayJournal