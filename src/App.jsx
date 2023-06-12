import { Button, Container, Stack } from 'react-bootstrap'
import './App.css'
import BudgetCard from './components/BudgetCard'

function App() {

  return (

    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'>Budgets</h1>
        <Button variant='outline-success'>Add Budget</Button>
        <Button variant='outline-primary'>Add Expenses</Button>
      </Stack>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px,1fr))',
         gap: '1rem', alignItems: 'flex-start'
      }}>
        <BudgetCard name='entertainment' amount = '200' max='1000'></BudgetCard>
      </div>
    </Container>
  )
}

export default App
