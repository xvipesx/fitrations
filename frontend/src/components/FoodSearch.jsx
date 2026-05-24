import { useState, useEffect } from "react"
import api from "../api.js"

function FoodSearch({ onFoodSelected }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])

    // Need to avoid returning too many results with 1 character or less in search
    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }
        // Wait 300ms for user to stop typing to avoid flooding the API
        const delay = setTimeout(async () => {
            const response = await api.get('/foods/search', { params: { query : query }});
            setResults(response.data)
        }, 300)

        return () => clearTimeout(delay)
    }, [query])

    const handleSelected = (food) => {
        setQuery("")
        setResults([])
        onFoodSelected(food)
    }

    return (
        <div style={styles.container}>
            <input
                style={styles.input}
                type="text"
                placeholder="Search food database..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <div style={styles.dropdown}>
                    {results.map((food) => (
                        <div
                            key={food.FOOD_UUID}
                            style={styles.dropdownItem}
                            onClick={() => handleSelected(food)}
                        >
                            {food.NAME} — {food.CALORIES} kcal | Protein: {food.PROTEIN}g | Carbs: {food.CARBS}g | Fat: {food.FAT}g | Serving: {food.SERVING_SIZE}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

const styles = {
    container: { position: "relative", width: "100%" },
    input: {
        width: "100%",
        boxSizing: "border-box",
        padding: "10px",
        backgroundColor: "#2c2c2c",
        border: "1px solid #3d3d3d",
        color: "#e0e0e0",
        borderRadius: "4px",
    },
    dropdown: {
        position: "absolute",
        top: "100%",
        left: 0,
        right: 0,
        backgroundColor: "#2c2c2c",
        border: "1px solid #3d3d3d",
        borderRadius: "4px",
        zIndex: 10,
    },
    dropdownItem: {
        padding: "10px",
        color: "#e0e0e0",
        cursor: "pointer",
        borderBottom: "1px solid #3d3d3d",
        fontSize: "0.8rem",
    },
    selected: {
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#e0e0e0",
    },
}

export default FoodSearch