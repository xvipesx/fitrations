import { useState, useEffect } from "react"
import { searchFoods } from "../routers/foods"

function FoodSearch({ onFoodSelected }) {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const delay = setTimeout(async () => {
            const foods = await searchFoods(query)
            setResults(foods)
        }, 300)

        return () => clearTimeout(delay)
    }, [query])

    function handleSelect(food) {
        setSelected(food)
        setResults([])
        setQuery(food.NAME)
    }

    function handleAdd() {
        if (selected) {
            onFoodSelected(selected)
            setSelected(null)
            setQuery("")
        }
    }

    return (
        <div style={styles.container}>
            <input
                style={styles.input}
                type="text"
                placeholder="Search foods..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <div style={styles.dropdown}>
                    {results.map((food) => (
                        <div
                            key={food.UUID}
                            style={styles.dropdownItem}
                            onClick={() => handleSelect(food)}
                        >
                            {food.NAME} — {food.CALORIES} kcal
                        </div>
                    ))}
                </div>
            )}
            {selected && (
                <div style={styles.selected}>
                    <span>{selected.NAME} selected</span>
                    <button style={styles.button} onClick={handleAdd}>
                        Add to Journal
                    </button>
                </div>
            )}
        </div>
    )
}

const styles = {
    container: { position: "relative", width: "100%" },
    input: {
        width: "100%",
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
    },
    selected: {
        marginTop: "12px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        color: "#e0e0e0",
    },
    button: {
        padding: "8px 16px",
        backgroundColor: "#4a9eff",
        color: "#1a1a1a",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
}

export default FoodSearch