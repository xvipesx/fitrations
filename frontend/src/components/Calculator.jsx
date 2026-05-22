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
        <form onSubmit={(event) => {
            event.preventDefault() 
            handleSubmit(formData)
            }}>
        <label>
            Weight in pounds: 
            <input
                type="text" 
                name="weight"
                value={formData.weight} 
                onChange={updateFormData}
                required
            />
        </label>
        <p>
        <label>
            Height in inches: 
            <input 
                type="text"
                name="height"
                value={formData.height}
                onChange={updateFormData}
                required
            />
        </label>
        </p>
        <p>
        <label>
            Age: 
            <input 
                type="text"
                name="age"
                value={formData.age}
                onChange={updateFormData}
                required
            />
        </label>
        </p>
        <label>
            What is your sex?
            <select name="sex" value={formData.sex} onChange={updateFormData}>
                <option value='' disabled={true}>Select sex...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
            </select>
        </label>
        <p>
        <button type="reset" onClick={resetFields}>Reset</button>   
        <button type="submit">Calculate</button>
        </p>
        <p>
            Your current BMR is: {userBMR}
        </p>
        </form>
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