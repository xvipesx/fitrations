import { useState, use } from "react"
import api from "../api.js"
import FoodSearch from "./FoodSearch.jsx"


function DisplayJournal ({ journalParentData, onJournalUpdated }) {
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
                onJournalUpdated()
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
        <div className="container-default">
            <div>
                <h3>Database Search</h3>
                <FoodSearch onFoodSelected={handleSelectedFood} />
                <br/>
                {selectedFood && (
                    <p>Selected: {selectedFood}</p>
                )}
                <form onSubmit={(event) => {
                    event.preventDefault()
                    handleSubmit(formData)
                    }}>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Number of Portions</span>
                        <input
                            type="text"
                            name="portion" 
                            value={formData.portion}
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    <br/>
                    <label>
                        Meal:
                        <select name="meal_type" value={formData.meal_type} onChange={updateFormData} required>
                            <option value='' disabled={true}>Select meal...</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>
                    </label>
                    <br/>
                    <br/>
                    <button type="submit" className="button-add">Add</button>
                    <button type="reset" className="button-reset" onClick={resetFields}>Reset</button>
                </form>
                <br/>
            </div>
            <hr></hr>
            <div className="container-default">
                <label>Today's Journal Entries</label>
                <table className="table">
                    <thead className="tr">
                        <tr>
                            <th>Meal</th>
                            <th>Name</th>
                            <th>Portion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {journalParentData.map((entry) => (
                            <tr key={entry.JOURNAL_UUID}>
                                <td>{entry.MEAL_TYPE}</td>
                                <td>{entry.NAME}</td>
                                <td>{entry.PORTION}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DisplayJournal