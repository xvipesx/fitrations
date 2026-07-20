import { useState } from "react"
import api from "../api.js"
import "../styles/calculator.css"


function DisplayCalculator ({}) {

    // Set all initial values to defaults
    const[userBMR, setUserBMR] = useState('0');
    const[userTDEE, setUserTDEE] = useState('0');
    const[formData, setFormData] = useState({
        weight: "",
        height: "",
        age: "",
        sex: "",
        activity: "",
        measurement: "",
    });

    // As the form is updated with user provided inputs, continuously update formData with the values
    const updateFormData = (data) => {
        setFormData ({...formData, [data.target.name]: data.target.value})
    }

    // API submission uses Axios which submits in JSON by default
    const handleSubmit = async (formData) => {
        const convertedForm = convertFormTypes(formData) // Ensure correct types before submission
        try {
            const response = await api.post('/calc', convertedForm);
            setUserBMR(response.data.bmr_value)
            setUserTDEE(response.data.tdee_value)
        }
        catch (error) {
            console.error("Failed to post user data:", error);
        }
    }

    // Allow user to clear values and start over
    const resetFields = () => {
        setFormData({
            weight: "",
            height: "",
            age: "",
            sex: "",
            activity: "",
        });
    }

    // Sets data types to required backend pydantic model
    const convertFormTypes = (formData) => {
        return {
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            age: parseInt(formData.age),
            sex: formData.sex,
            activity: formData.activity,
            measurement: formData.measurement,
        }
    }

    return (
        <div className="container-shell">
            <h2>TDEE Calculator</h2>
            <hr/>
            <div className="container-section">
                {userBMR && (
                    <p className="calculator-bmr">Your baseline BMR is: {userBMR}</p>
                )}
                <br/>
                {userTDEE && (
                    <p className="calculator-tdee">Your daily TDEE is: {userTDEE}</p>
                )}
                <br/>
                <p className="hint">
                    <b>Basal Metabolic Rate (BMR)</b> is the baseline calories your body burns in a day.
                    <br/>
                    <b>Total Daily Energy Expenditure (TDEE)</b> is the total number of calories your body burns in a day, including all activities and bodily functions.
                    TDEE is a combination of your BMR plus activity requirements.
                </p>
                <br/>
            </div>
            <hr/>
            <div className="container-section">
                <form onSubmit={(event) => {
                    event.preventDefault() 
                    handleSubmit(formData)
                }}>
                <div className="container-section-columns">
                    <label className="if-liquid">
                        <span className="if-liquid-label">Measurement System</span>
                        <select name="measurement" value={formData.measurement} onChange={updateFormData}>
                            <option value='' disabled={true}>Select...</option>
                            <option value="imperial">Imperial</option>
                            <option value="metric">Metric</option>
                        </select>
                    </label>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Sex</span>
                        <select name="sex" value={formData.sex} onChange={updateFormData}>
                            <option value='' disabled={true}>Select sex...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </label>
                </div>
                <div className="container-section-rows">
                    <label className="if-liquid">
                        <span className="if-liquid-label">Weight</span>
                        <input
                            type="text" 
                            name="weight"
                            className="input"
                            value={formData.weight} 
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    <p>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Height</span>
                        <input 
                            type="text"
                            name="height"
                            className="input"
                            value={formData.height}
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    </p>
                    <p>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Age</span>
                        <input 
                            type="text"
                            name="age"
                            className="input"
                            value={formData.age}
                            onChange={updateFormData}
                            required
                        />
                    </label>
                    </p>
                    <label className="if-liquid">
                        <span className="if-liquid-label">Activity Level</span>
                        <select name="activity" value={formData.activity} onChange={updateFormData}>
                            <option value='' disabled={true}>Select level...</option>
                            <option value="sedentary">Sedentary (Desk Job or Light Exercise 0-1 days/week)</option>
                            <option value="lightly_active">Lightly Active (Light Exercise 1-3 days/week)</option>
                            <option value="moderately_active">Moderately Active (Moderate Exercise 3-5 days/week)</option>
                            <option value="very_active">Very Active (Hard Training 6-7 days/week)</option>
                            <option value="super_active">Super Active (Professional Athlete)</option>
                        </select>
                    </label>
                    <br/>
                    <button type="submit" className="button-add">Calculate</button>
                    <button type="reset" className="button-reset" onClick={resetFields}>Reset</button>   
                    </div>
                </form>
            </div>
        </div>
    );
}

export default DisplayCalculator