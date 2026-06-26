import { useState, use } from "react"
import api from "../api.js"
import FoodSearch from "./FoodSearch.jsx"


function DisplayJournal ({ journalParentData, onJournalUpdated, onJournalDelete, onJournalClear }) {
    // Prepare blank form and food selection variable for journal submissions
    const[formData, setFormData] = useState({
        food_uuid: "",
        meal_type: "",
        portion: "",
    })
    // Food selection variable from FoodSearch
    const[selectedFood, setSelectedFood] = useState("")
    // Selected JOURNAL_UUID from the Journal table used for deletion within the daily rows only
    const[selectedRow, setSelectedRow] = useState(null)

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

    // Submit JOURNAL_UUID for removal from the day's journal
    const handleDelete = async (id) => {
        try {
            const response = await api.delete('/delete_journal_entry', { params: { journal_id : id }})
            onJournalDelete()
            return(response)
        }
        catch (error) {
            console.error("Failed to delete journal entry:", error)
        }
    }

    const handleClick = (uuid) => {
        setSelectedRow(uuid)
        console.log(selectedRow)
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
            <h2>Daily Journal</h2>
            <div>
                <FoodSearch onFoodSelected={handleSelectedFood} />
                <br/>
                {selectedFood && (
                    <p>Selected Item: {selectedFood}</p>
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
                            className="input"
                            name="portion" 
                            value={formData.portion}
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Meal:</span>
                        <select className="select" name="meal_type" value={formData.meal_type} onChange={updateFormData} required>
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
            </div>
            <br/>
            <hr/>
            <br/>
            <div className="container-section">
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
                            <tr onClick={() => handleClick(entry.JOURNAL_UUID)} key={entry.JOURNAL_UUID}>
                                <td>{entry.MEAL_TYPE}</td>
                                <td>{entry.NAME}</td>
                                <td>{entry.PORTION}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            <br/>
            <button type="button" className="button-reset" disabled={!selectedRow} onClick={() => handleDelete(selectedRow)}>Delete Entry</button>
            </div>
        </div>
    )
}

export default DisplayJournal