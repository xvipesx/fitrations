import { useState } from "react"
import api from "../api.js"


function DisplayCalculator ({}) {
    // Set all initial values to defaults
    const[userBMR, setUserBMR] = useState('0');
    const[formData, setFormData] = useState({
        weight: "",
        height: "",
        age: "",
        sex: "",
    });

    const updateFormData = (data) => {
        console.log(data)
        setFormData ({...formData, [data.target.name]: data.target.value})
    }

    // API submission uses Axios which submits in JSON by default
    const handleSubmit = async (formData) => {
        const convertedForm = convertFormTypes(formData) // Ensure correct types before submission
        try {
            const response = await api.post('/calc', convertedForm);
            setUserBMR(response.data)
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
        });
    }
    // Sets matched types to required backend models
    const convertFormTypes = (formData) => {
        return {
            weight: parseFloat(formData.weight),
            height: parseFloat(formData.height),
            age: parseInt(formData.age),
            sex: formData.sex,
        }
    }

    return (
        <div className="container-default">
            <h2>BMR Calculator</h2>
            <div className="container-section">
                <form onSubmit={(event) => {
                    event.preventDefault() 
                    handleSubmit(formData)
                    }}>
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
                    <span className="if-liquid-label">What is your sex?</span>
                    <select name="sex" value={formData.sex} onChange={updateFormData}>
                        <option value='' disabled={true}>Select sex...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </label>
                <br/>
                <p>
                <button type="submit" className="button-add">Calculate</button>
                <button type="reset" className="button-reset" onClick={resetFields}>Reset</button>   
                </p>
                <br/>
                <p>
                {userBMR && (
                    <p>Your baseline BMR is: {userBMR}</p>
                )}
                </p>
                </form>
            </div>
        </div>
  );
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
    }
}

export default DisplayCalculator