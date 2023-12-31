import { Button, Container, Stack } from 'react-bootstrap'
import './App.css'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import { useState } from 'react'
import { UNCATEGORISED_BUDGET_ID, useBudgets } from './context/BudgetContext'
import AddExpenseModal from './components/AddExpenseModal'
import UncategorisedBudgetCard from './components/UncategorisedBudgetCard'
import TotalBudgetCard from './components/TotalBudgetCard'
import ViewExpensesModal from './components/ViewExpensesModal'

function App() {
  const [showBudgetModal, setShowBudgetModal] = useState(false)

  // viewExpenseModal, todo
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState()
  const [showExpenseModal, setShowExpenseModal] = useState(false)
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()
  // budget array will contain objects. eg: { id: , name: , max: } 
  // expenses array will contain objects. eg: { id: , budgetId: ,amount:, description: } 
  function openAddExpenseModal(budgetId) {
    setShowExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'>Budget Brilliant</h1>
          <Button variant='outline-success' onClick={() => setShowBudgetModal(true)}>Add Budget</Button>
          <Button variant='outline-primary' onClick={openAddExpenseModal}>Add Expenses</Button>
        </Stack>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
          gap: '1rem', alignItems: 'flex-start'
        }}>{
            budgets.map((bud) => {
              const expenses_objects_array = getBudgetExpenses(bud.id)
              const amount = expenses_objects_array.reduce((total, expFunction) => total + expFunction.amount, 0)
              return (<BudgetCard key={bud.id} name={bud.name}
                amount={amount} max={bud.max} grey={true} onAddExpenseClick={() => openAddExpenseModal(bud.id)} 
                  onViewExpenseClick={()=>setViewExpenseModalBudgetId(bud.id)}
                />
              )
            })
          }
          <UncategorisedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={()=>setViewExpenseModalBudgetId(UNCATEGORISED_BUDGET_ID)}/>
          <TotalBudgetCard />
        </div>
      </Container>

      <AddBudgetModal show={showBudgetModal} handleClose={() => setShowBudgetModal(false)} />
      <AddExpenseModal show={showExpenseModal} defaultBudgetId={addExpenseModalBudgetId} handleClose={() => setShowExpenseModal(false)} />

      <ViewExpensesModal budgetId={viewExpenseModalBudgetId} handleClose={() => setViewExpenseModalBudgetId()}/>
    </>
  )
}

export default App

// 45:24