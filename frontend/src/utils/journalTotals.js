/* Utility functions to provide calculations to data already being handled at the frontend after API calls.
This decision was made to cut down on overall API calls to the backend database.
*/

function calcJournalTotals (entries) {
    // take an array and collapses it down to a single value by processing each element one at a time and accumulating a running result
    return entries.reduce((totals, entry) => {
        totals.calories += (entry.CALORIES * entry.PORTION)
        totals.protein += (entry.PROTEIN * entry.PORTION)
        totals.carbs += (entry.CARBS * entry.PORTION)
        totals.fat += (entry.FAT * entry.PORTION)
        return totals
    }, { calories: 0, protein: 0, carbs: 0, fat: 0 })
}

export default calcJournalTotals