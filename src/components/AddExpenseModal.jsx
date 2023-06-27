import { useRef } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { useBudgets, UNCATEGORISED_BUDGET_ID } from '../context/BudgetContext'

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const nameRef = useRef()
  const amountRef = useRef()
  const budgetIdRef = useRef()
  const { addExpenses, budgets } = useBudgets()

  function handleSubmit(e) {
    e.preventDefault()

    addExpenses({
      description: nameRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value

    })
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose} >
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Form.Group className='mb-3' controlId='description'>
            <Form.Label>Description</Form.Label>
            <Form.Control ref={nameRef} type='text' required />
          </Form.Group>

          <Form.Group className='mb-3' controlId='amount'>
            <Form.Label>Amount</Form.Label>
            <Form.Control ref={amountRef} type='number' required min={0} step={1} />
          </Form.Group>

          <Form.Group className='mb-3' controlId='budgetId'>
            <Form.Label>Budget</Form.Label>
            <Form.Select defaultValue={defaultBudgetId}
              ref={budgetIdRef}>
              <option id={UNCATEGORISED_BUDGET_ID}>Uncategorised</option>
              {budgets.map(bud => {
                console.log(bud)
                return (<option key={bud.id} value={bud.id}>{bud.name}</option>)
              })}
            </Form.Select>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button variant='primary' type='submit'>Add</Button>
          </div>
        </Modal.Body>
      </Form>

    </Modal>
  )
}


export default AddExpenseModal