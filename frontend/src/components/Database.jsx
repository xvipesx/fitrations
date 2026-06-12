import { useState } from "react"

// Local imports
import './DatabaseManagement.css'
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
        <div className="container-default">
            <div>
                <h3>Database Search</h3>
                <FoodSearch onFoodSelected={handleSelectedFood}/>
                <br/>
                {selectedFood && (
                    <p>Selected Food Item: {selectedFood}</p>
                )}
                <br/>
            </div>
            <hr></hr>
            <div>
                <form onSubmit={(event) => {
                    event.preventDefault()
                }}>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Food Name</span>
                        <input 
                            className="input"
                            type="text" 
                            name="name"
                            value={dbForm.name}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Calories (per serving)</span>
                        <input 
                            className="databaseManagement-input"
                            type="text" 
                            name="calories"
                            value={dbForm.calories}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Protein (grams)</span>
                        <input 
                            className="databaseManagement-input"
                            type="text" 
                            name="protein"
                            value={dbForm.protein}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Carbs (grams)</span>
                        <input 
                            className="databaseManagement-input"
                            type="text" 
                            name="carbs"
                            value={dbForm.carbs}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Fat (grams)</span>
                        <input 
                            className="databaseManagement-input"
                            type="text" 
                            name="fat"
                            value={dbForm.fat}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Serving Size</span>
                        <input 
                            className="databaseManagement-input"
                            type="text"
                            name="serving_size"
                            value={dbForm.serving_size}
                            onChange={updateDBForm}
                        />
                    </label>
                    <br/>
                    <button type='button' className="button-add" onClick={() => handleDBSubmission(dbForm)}>Add</button>
                    <button type='button' className="button-update" onClick={() => handleDBModify(dbForm.food_uuid, dbForm)}>Update</button>
                    <button type='button' className="button-delete" onClick={() => handleDBDelete(dbForm.food_uuid)}>Delete</button>
                    <button type='reset' className="button-reset" onClick={resetForm}>Reset</button>
                </form>
            <hr></hr>
                <form>
                    <br/>
                    <p><b>DANGEROUS!</b> This will reset the entire food database and clear it.</p>
                    <br/>
                    <button type='button' className="button-delete" onClick={() => handleDBClear()}>Clear Database</button>
                </form>
            </div>
        </div>
    )

}

export default DatabaseManagement