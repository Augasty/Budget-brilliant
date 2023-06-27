import { UNCATEGORISED_BUDGET_ID, useBudgets } from '../context/BudgetContext'
import BudgetCard from './BudgetCard'

export default function TotalBudgetCard() {

  const { budgets, expenses } = useBudgets()
  const amount = expenses.reduce((total, exp) => total + exp.amount, 0)
  const max = budgets.reduce((total, bud) => total + bud.max, 0)

  if (max == 0) return null
  return (
    <BudgetCard amount={amount} name='Total' gray max={max} hideButtons />
  )
}
