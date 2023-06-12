import { Card, ProgressBar } from 'react-bootstrap'
import { currencyFormatter } from '../utils/Utils'



const BudgetCard = ({ name, amount, max }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title className='d-flex justify-content-between align-items-baseline fw-normal mb-3'>
                    <div className='me-2'>{name}</div>
                    <div className='d-flex align-items-baseline'>{currencyFormatter.format(amount)}
                        <span className='text-muted fs-6 ms-1'>/ {currencyFormatter.format(max)}</span>
                    </div>
                </Card.Title>
                <ProgressBar className='rounded-pill' variant={getProgressBarVariant(amount, max)}
                    min={0} max={max} now={amount}
                ></ProgressBar>
            </Card.Body>
        </Card>
    )
}

export default BudgetCard

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < .5) return 'primary'
    if (ratio < .75) return 'warning'
    if (ratio <= 1) return 'danger'
    return 'black'

}
// 12:57