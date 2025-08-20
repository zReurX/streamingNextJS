import allowedIds from "./allowedIds"
import { BaseCall } from "./BaseCall"


export default async function searchAll(query) {
    const uri = `search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=it-IT`
    const data = await BaseCall(`${uri}&page=1`)
    const totalPages = data.total_pages
    
    
    const allResults = []
    allResults.push(...data.results)
    
    for (let i = 2; i <= totalPages; i++) {
        const data = await BaseCall(`${uri}&page=${i}`)
        allResults.push(...data.results)
    }

    return allowedIds(allResults)
}