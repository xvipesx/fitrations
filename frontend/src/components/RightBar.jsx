import { useState, useEffect } from "react"
import api from "../api.js"

function RightBar() {
    const [calorieGoal, setCalorieGoal] = useState(0)
    const [proteinGoal, setProteinGoal] = useState(0)
    const [carbGoal, setCarbsGoal] = useState(0)
    const [fatGoal, setFatGoal] = useState(0)

    const fetchDailyGoal = async () => {
        try {
            const response = await api.get('/retrieve_goal');
            setCalorieGoal(response.data.CALORIES);
            setProteinGoal(response.data.PROTEIN);
            setCarbsGoal(response.data.CARBS);
            setFatGoal(response.data.FAT);
        }
        catch (error) {
            console.error("Failed to obtain daily goal information", error);
        }
    }

    const caloriesRemaining = calorieGoal - 100
    const proteinRemaining = proteinGoal - 0
    const carbsRemaining = carbGoal - 0
    const fatRemaining = fatGoal - 0

    useEffect(() => {
        fetchDailyGoal()
    }, [])

    return (
        <aside style={styles.sidebar}>
            <div style={styles.item}>
                <p style={styles.label}>Daily Goals</p>
                <p style={styles.value}>Calories: {calorieGoal}</p>
                <p style={styles.value}>Protein: {proteinGoal}g</p>
                <p style={styles.value}>Carbs: {carbGoal}g</p>
                <p style={styles.value}>Fat: {fatGoal}g</p>
            </div>
            <div style={styles.item}>
                <p style={styles.label}>Daily Remaining</p>
                <p style={styles.value} style={{
                    ...styles.value,
                    color: caloriesRemaining < 0 ? "#ff4a4a" : "#4aff72"
                }}>
                    Calories: {caloriesRemaining}
                </p>
                <p style={styles.value} style={{
                    ...styles.value,
                    color: proteinRemaining < 0 ? "#ff4a4a" : "#4aff72"
                }}>
                    Protein: {proteinRemaining}g
                </p>
                <p style={styles.value} style={{
                    ...styles.value,
                    color: carbsRemaining < 0 ? "#ff4a4a" : "#4aff72"
                }}>
                    Carbs: {carbsRemaining}g
                </p>
                <p style={styles.value} style={{
                    ...styles.value,
                    color: fatRemaining < 0 ? "#ff4a4a" : "#4aff72"
                }}>
                    Fat: {fatRemaining}g
                </p>
            </div>
        </aside>
    )
    }


const styles = {
    sidebar: {
        width: "220px",
        height: "100vh",
        backgroundColor: "#1a1a1a",
        borderLeft: "1px solid #3d3d3d",
        padding: "24px 0",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
    },
    item: {
        padding: "12px 24px",
        borderBottom: "1px solid #3d3d3d",
    },
    label: {
        color: "#9e9e9e",
        fontSize: "1.0rem",
        fontWeight: "bold",
        margin: "0 0 4px 0",
    },
    value: {
        color: "#e0e0e0",
        fontSize: "0.8rem",
        fontWeight: "bold",
        margin: 0,
    },
    }

export default RightBar