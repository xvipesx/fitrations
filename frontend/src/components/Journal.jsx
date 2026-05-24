import { useState, useEffect, use } from "react"
import api from "../api.js"
import FoodSearch from "./FoodSearch.jsx"


function DisplayJournal ({}) {
    const[formData, setFormData] = useState({
        food_uuid: "",
        meal_type: "",
        portion: "",
    })
    const[selectedFood, setSelectedFood] = useState("")

    // Passed from child search component
    const handleSelectedFood = (food) => {
        setSelectedFood(food.NAME)
        setFormData({...formData, "food_uuid": food.FOOD_UUID})
    }
    const updateFormData = (data) => {
        setFormData({...formData, [data.target.name]: data.target.value})
    }
    const convertedTypes = (data) => {
        return {
        food_uuid: data.food_uuid,
        meal_type: data.meal_type,
        portion: parseFloat(data.portion),
        }
    }
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
            <FoodSearch onFoodSelected={handleSelectedFood} />
            {selectedFood && (
                <p>Selected: {selectedFood}</p>
            )}
            <p></p>
            <form onSubmit={(event) => {
                event.preventDefault()
                handleSubmit(formData)
                }}>
                <p></p>
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
                <p></p>
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
        fontSize: "1.0rem",
        border: "2px",
    },
    container: { 
        alignItems: "center",
        position: "relative", 
        width: "100%" },
}

export default DisplayJournal