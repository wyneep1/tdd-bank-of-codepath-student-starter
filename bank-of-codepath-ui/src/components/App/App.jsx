import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Home from "../Home/Home"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import TransactionDetail from "../TransactionDetail/TransactionDetail"
import {useState} from "react"


export default function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [transactions, setTransactions] = useState([])
  const [transfers, setTransfers] = useState([])
  const [error, setError] = useState(null)
  const [filterInputValue, setFilterInputValue] = useState("")
  const [isCreating, setIsCreating]= useState(false)
  const [newTransferForm, setNewTransferForm] = useState({
    memo: "",
    recipientEmail: "",
    amount: 0
  })
  const [newTransactionForm, setNewTransactionForm] = useState({
    category: "",
    description: "",
    amount: 0
  })

  return (
    <div className="app">
      <BrowserRouter>
    <Navbar filterInputValue={filterInputValue} setFilterInputValue={setFilterInputValue}/>
      <main>
        <Routes>
          <Route path ="/" element={<Home isLoading ={isLoading}
          setIsLoading={setIsLoading} transactions={transactions} setTransactions={setTransactions} transfers={transfers} setTransfers={setTransfers} error={error} setError={setError} filterInputValue={filterInputValue}
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          newTransactionForm={newTransactionForm}
          setNewTransactionForm={setNewTransactionForm}
          newTransferForm={newTransferForm}
          setNewTransferForm={setNewTransferForm}/>}/>
          <Route path="/transactions/:transactionId" element={<TransactionDetail/>} />

        </Routes>
      </main>
      </BrowserRouter>
    </div>
  )
}
