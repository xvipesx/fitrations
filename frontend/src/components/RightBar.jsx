import { useState, useEffect } from "react"
import api from "../api.js"
import "../styles/rightbar.css"

function RightBar( {updatedCalorieGoal, updatedProteinGoal, updatedCarbGoal, updatedFatGoal, updatedIntake}) {
    /* 
    Updated values are obtained through journal and goal updates provided by the primary app and a utility calculator.
    This is to help keep the API calls to a minimum and for simplicity. The RightBar's primary function is purely to display 
    updated data to the user, and therefore receives variables from the app level only.
    */ 
    const caloriesRemaining = updatedCalorieGoal - updatedIntake.calories
    const proteinRemaining = updatedProteinGoal - updatedIntake.protein
    const carbsRemaining = updatedCarbGoal - updatedIntake.carbs
    const fatRemaining = updatedFatGoal - updatedIntake.fat

    return (
        <aside className="rightbar-view">
            <div className="nutrition-card">
                <p className="rightbar-label">DAILY GOALS</p>
                <p className="rightbar-value">Calories: {updatedCalorieGoal}</p>
                <p className="rightbar-value">Protein: {updatedProteinGoal}g</p>
                <p className="rightbar-value">Carbs: {updatedCarbGoal}g</p>
                <p className="rightbar-value">Fat: {updatedFatGoal}g</p>
            </div>
            <div className="nutrition-card">
                <p className="rightbar-label">REMAINING</p>
                <p className={`rightbar-value ${caloriesRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Calories: {caloriesRemaining}</p>
                <p className={`rightbar-value ${proteinRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Protein: {proteinRemaining}g</p>
                <p className={`rightbar-value ${carbsRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Carbs: {carbsRemaining}g</p>
                <p className={`rightbar-value ${fatRemaining < 0 ? 'rightbar-negative' : 'rightbar-positive'}`}>Fat: {fatRemaining}g</p>
            </div>
        </aside>
    )
    }

export default RightBar