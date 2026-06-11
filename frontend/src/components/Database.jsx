import { useState } from "react"

// Local imports
import api from "../api.js"
import FoodSearch from "./FoodSearch.jsx"

function DatabaseManagement() {
    /* Used to submit new food items, modify items or delete items
    dbForm contains the food_uuid but that is not displayed to the user directly.
    It is used solely for modifying or deleting entries that already exist.
    food_uuid is kept lower case within front end context but database maintain all caps.
    */
    const[dbForm, setDBForm] = useState({
        name: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        serving_size: "",
        food_uuid: "",
    })
    // Clear form after handles
    const resetForm = () => {
        setDBForm ({
            name: "",
            calories: "",
            protein: "",
            carbs: "",
            fat: "",
            serving_size: "",
            food_uuid: "",
        })
    }
    // Set form types before submissions to backend. Backend models will check types again before passing on to database.
    const convertFormTypes = (dbFormData) => {
        return {
            name: dbFormData.name,
            calories: parseInt(dbFormData.calories),
            protein: parseFloat(dbFormData.protein),
            carbs: parseFloat(dbFormData.carbs),
            fat: parseFloat(dbFormData.fat),
            serving_size: dbFormData.serving_size,
            food_uuid: dbFormData.food_uuid,
        }
    }
    // Form data updates as the state changes for the provided form fields
    const updateDBForm = (data) => {
        setDBForm({...dbForm, [data.target.name]: data.target.value})
    }

    const [selectedFood, setSelectedFood] = useState("")

    /* DB Handles for submission of new items, modifying current, or 
    deleting items that currently reside within. Need to add additional mechanisms
    to clear and export DB. */

    const handleDBSubmission = async (entry) => {
        try {
            // Ensure form types are correct for API call
            const convertedForm = convertFormTypes(entry)
            const response = await api.post('/foods', convertedForm)
            resetForm()
    }
        catch (error) {
            console.error('Failed to submit entry to database:', error)
        }
    }
    const handleDBModify = async (id, entry) => {
        try {
            // Ensure form types are correct for API call
            const convertedForm = convertFormTypes(entry)
            // Template literal to pass food_uuid to API along with type corrected form
            const response = await api.put(`/foods/${id}`, convertedForm)
            resetForm()
            console.log(response.data)
    }
        catch (error) {
            console.error('Failed to submit entry to database:', error)
        }
    }
    // Delete items from the database by providing the food_uuid obtained by FoodSearch 
    const handleDBDelete = async (id) => {
        try {
            // Template literal to pass food_uuid to API
            const response = await api.delete(`/foods/${id}`, id)
            resetForm()
    }
        catch (error) {
            console.error('Failed to submit entry to database:', error)
        }
    }

    /* When selecting foods already in the database, populate dbForm with all the data required and pass 
    the new state to the form for modification. UUID is included to modify specific entries. */
    const handleSelectedFood = (data) => {
        setSelectedFood(data.NAME)
        setDBForm({...dbForm, 
            name: data.NAME,
            calories: data.CALORIES,
            protein: data.PROTEIN,
            carbs: data.CARBS,
            fat: data.FAT,
            serving_size: data.SERVING_SIZE,
            food_uuid: data.FOOD_UUID
        })
    }

    return (
        <div style={styles.container}>
            <p>Select a food to modify and click 'Update Item' or type in details below and select 'Add Item' for a new entry.</p>
            <p></p>
            <div style={styles.card}>
            <FoodSearch onFoodSelected={handleSelectedFood}/>
            {selectedFood && (
                <p>Selected Food Item: {selectedFood}</p>
            )}
            </div>
            <hr></hr>
            <div style={styles.card}>
                <form onSubmit={(event) => {
                    event.preventDefault()
                }}>
                    <label>Name:
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="name"
                        placeholder="Name..."
                        value={dbForm.name}
                        onChange={updateDBForm}
                    /></label>
                    <br/>
                    <label>Calories:
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="calories"
                        placeholder="Calories..."
                        value={dbForm.calories}
                        onChange={updateDBForm}
                    /></label>
                    <br/>
                    <label>Protein:
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="protein"
                        placeholder="Protein (in grams)..."
                        value={dbForm.protein}
                        onChange={updateDBForm}
                    /></label>
                    <br/>
                    <label>Carbs:
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="carbs"
                        placeholder="Carbs (in grams)..."
                        value={dbForm.carbs}
                        onChange={updateDBForm}
                    /></label>
                    <br/>
                    <label>Fat:
                    <input 
                        style={styles.input} 
                        type="text" 
                        name="fat"
                        placeholder="Fat (in grams)..."
                        value={dbForm.fat}
                        onChange={updateDBForm}
                    /></label>
                    <br/>
                    <label>Serving Size:</label>
                    <input 
                        style={styles.input} 
                        type="text"
                        name="serving_size"
                        placeholder="Serving size..."
                        value={dbForm.serving_size}
                        onChange={updateDBForm}
                    />
                    <br/>
                    <button type='button' onClick={() => handleDBSubmission(dbForm)}>Add Item</button>
                    <button type='button' onClick={() => handleDBModify(dbForm.food_uuid, dbForm)}>Update Item</button>
                    <button type='button' onClick={() => handleDBDelete(dbForm.food_uuid)}>Delete Item</button>
                    <button type='reset' onClick={resetForm}>Reset</button>
                </form>
            <hr></hr>
                <form>
                    <p>DANGEROUS! This will reset the entire food database and clear it.</p>
                    <p></p>
                    <button type='button' onClick={() => handleDBClear()}>Clear Database</button>
                </form>
            </div>
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
    }
}

export default DatabaseManagement