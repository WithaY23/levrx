import { Link } from 'react-router-dom'
import '../styles/MedicationItem.css'
import { formatDateAfterDays } from '../../util'
type MedicationItemProps = {
    id: string,
    name: string,
    strength: string,
    daysSupply: number,
    currentPrice: number
}



export default function MedicationItem({id, name, strength, daysSupply, currentPrice}: MedicationItemProps)
{
    const dateTillEnd:string = daysSupply ? formatDateAfterDays(daysSupply) : "N/A"
    return (
        
        <div className="medication-item-container">
            <h2>{name}</h2>
            <div className='medication-item-footer'>
                <div className="medication-item-details">
                    <div><strong>Strength:</strong> {strength}</div>
                    <div><strong>Days Supply:</strong> {daysSupply} (Ends {dateTillEnd})</div>
                    <div><strong>Current Price:</strong> ${currentPrice.toFixed(2)}</div>
                </div>
                <Link to={`/compare/${encodeURIComponent(id)}`}
                    className='medication-item-compare-button'
                    state={{ name:name,  strength :strength, daysSupply: daysSupply, currentPrice: currentPrice }}>
                    Compare Price
                </Link>
            </div> 
        </div>
    )
}