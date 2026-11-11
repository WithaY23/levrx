import '../styles/PharmacyCompare.css'

type PharmacyComparisonProps = {
  pharmacy: {
    id: string
    name: string
    address: string
    price: number | null
  },
  currentPrice : number | null
}

export default function PharmacyComparison({ pharmacy, currentPrice }: PharmacyComparisonProps) {
  const differenceInCents =
    pharmacy.price === null || currentPrice === null
      ? null
      : Math.round((pharmacy.price - currentPrice) * 100)
  const priceComparison: -1 | 0 | 1 | null =
    differenceInCents === null
      ? null
      : differenceInCents === 0
        ? 0
        : differenceInCents < 0
          ? 1
          : -1

  return (
    <div className="pharmacy-compare-container">
        <div className='pharmacy-compare-details'>
            <h4 className='pharmacy-compare-header'>{pharmacy.name}</h4>
            <p>{pharmacy.address}</p>
        </div>
        <div className='pharmacy-compare-price'>
            <p className= {pharmacy.price === null ? 'pharmacy-compare-savings--expensive' : ''}>
            <strong>Price: </strong>
            {pharmacy.price === null ? 'Price unavailable' : `$${pharmacy.price.toFixed(2)}`}
            </p>
            {differenceInCents === null
              ? <p className="pharmacy-compare-savings pharmacy-compare-savings--expensive">Savings unavailable</p>
              : priceComparison === 1
                ? <p className="pharmacy-compare-savings pharmacy-compare-savings--cheaper">Save ${(-differenceInCents / 100).toFixed(2)} compared to current price</p>
                : priceComparison === 0
                  ? <p className="pharmacy-compare-savings pharmacy-compare-savings--same">Same price as current</p>
                  : <p className="pharmacy-compare-savings pharmacy-compare-savings--expensive">Costs ${(differenceInCents / 100).toFixed(2)} more than current price</p>}
        </div>
    </div>
  )
}
