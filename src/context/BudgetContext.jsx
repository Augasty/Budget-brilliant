import  {createContext, useContext} from "react"
import { v4 as uniqueIdFunction } from "uuid"
import useLocal from "../hooks/useLocal"



const BudgetContext = createContext()
export const UNCATEGORISED_BUDGET_ID = 'Uncategorised'

const BudgetContextProvider = ({ children }) => {


  const [budgets, setBudgets] = useLocal('budget',[])
  // budget array will contain objects. eg: { id: , name: , max: } 

  const [expenses, setExpenses] =useLocal('expense',[])
  // expenses array will contain objects. eg: { id: , budgetId: ,amount:, description: } 

  function addBudget({ name, max }) {
    setBudgets(prevBudget => {
      if (prevBudget.find(budget => budget.name == name)) {
        return prevBudget
      }
      return [...prevBudget, { id: uniqueIdFunction(), name, max }]
    })

  }

  function getBudgetExpenses(budgetId) {
    return expenses.filter(exp => exp.budgetId === budgetId)
  }

  function addExpenses({ description, amount, budgetId }) {
    setExpenses(prevExp => {
      return [...prevExp, { id: uniqueIdFunction(), description, amount, budgetId }]
    })
  }

  function deleteBudget({ id }) {
    setExpenses(prevExp=>{
      return prevExp.map(exp => {
        if (exp.budgetId !== id) return exp
        return {...exp, budgetId:UNCATEGORISED_BUDGET_ID}
      })
    })
    setBudgets(prevBudget => prevBudget.filter(b => b.id !== id))

  }

  function deleteExpense({ id }) {
    setExpenses(prevExp => prevExp.filter(e => e.id !== id))
  }
  return (
    // context provider
    <BudgetContext.Provider value={{
      budgets, expenses, getBudgetExpenses,
      addExpenses, addBudget, deleteBudget,
      deleteExpense
    }}>
      {children}
    </BudgetContext.Provider>
  )

}
export default BudgetContextProvider

export const useBudgets = () => {
  return useContext(BudgetContext)
}
