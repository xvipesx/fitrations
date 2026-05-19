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
        catch {
            console.error("Failed to obtain daily goal information", error);
        }
    }

    const remaining = calorieGoal - 100

    useEffect(() => {
        fetchDailyGoal()
    }, [])

    return (
        <aside style={styles.sidebar}>
            <div style={styles.item}>
                <p style={styles.label}>Daily Goal</p>
                <p style={styles.value}>{calorieGoal} kcal</p>
            </div>
            <div style={styles.item}>
                <p style={styles.label}>Calories Remaining</p>
                <p style={styles.value} style={{
                    ...styles.value,
                    color: remaining < 0 ? "#ff4a4a" : "#4aff72"
                }}>
                    {remaining} kcal
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
        fontSize: "0.8rem",
        margin: "0 0 4px 0",
    },
    value: {
        color: "#e0e0e0",
        fontSize: "1.2rem",
        fontWeight: "bold",
        margin: 0,
    },
    }

export default RightBar