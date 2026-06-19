import { useState, useEffect } from "react"
import api from "../api.js"
import "../styles/foodsearch.css"

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
        setQuery("") // Ensure Search bar is reset to blank
        setResults([]) // Clear on food select
        onFoodSelected(food)
    }

    return (
        <div className="foodsearch-container">
            <input
                className="foodsearch-input"
                type="text"
                placeholder="Search food database..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <div className="foodsearch-dropdown">
                    {results.map((food) => (
                        <div
                            key={food.FOOD_UUID}
                            className="foodsearch-dropdownitem"
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

export default FoodSearch