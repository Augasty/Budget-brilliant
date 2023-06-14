import { Button, Container, Stack } from 'react-bootstrap'
import './App.css'
import BudgetCard from './components/BudgetCard'
import AddBudgetModal from './components/AddBudgetModal'
import { useState } from 'react'
import { useBudgets } from './context/BudgetContext'

function App() {
  const [showModal,setShowModal] = useState(false)
  const {budgets, getBudgetExpenses} = useBudgets()
  // budget array will contain objects. eg: { id: , name: , max: } 
  // expenses array will contain objects. eg: { id: , budgetId: ,amount:, description: } 

  return (
    <>
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='outline-success' onClick={()=>setShowModal(true)}>Add Budget</Button>
        <Button variant='outline-primary'>Add Expenses</Button>
      </Stack>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
         gap: '1rem', alignItems: 'flex-start'
      }}>{
        budgets.map((bud)=>{
          const expenses_objects_array = getBudgetExpenses(bud.id)
          const amount = expenses_objects_array.reduce((total,expFunction)=>total + expFunction.amount,0)
          return(<BudgetCard key={bud.id} name={bud.name} 
          amount = {amount} max={bud.max} grey={true}/>
        )})
      }
        <BudgetCard name='entertainment' amount = '200' max='1000' grey={true}></BudgetCard>
      </div>
    </Container>
    <AddBudgetModal show={showModal} handleClose={()=>setShowModal(false)}/>
    </>
  )
}

export default App
