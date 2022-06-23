import axios from "axios"
import * as React from "react"
import AddTransaction from "../AddTransaction/AddTransaction"
import BankActivity from "../BankActivity/BankActivity"
import "./Home.css"
import { useEffect } from "react";
import { useState } from "react"

export default function Home(props) {
  const [fieldError, setFieldError] = useState("")
  /*let filteredTransactions = () =>{
    return props.transactions.filter((trans)=>
      trans.description.toLowerCase().includes(props.filterInputValue.toLowerCase())
    );
};*/
const filteredTransactions = props.filterInputValue ? props?.transactions.filter((transaction)=> transaction.description.toLowerCase().indexOf(props.filterInputValue.toLowerCase())!== -1): props?.transactions

function handleOnSubmitNewTransaction() {
  console.log("On submit transaction function")
}
async function handleOnCreateTransaction() {
  props.setIsCreating(true)
  await axios.post("http://localhost:3001/bank/transactions", {transaction: props.newTransactionForm})
  .catch((err) => {
    props.setError(err)
    props.setIsCreating(false)
  })
  .then(res => {
    props.setTransactions((prevTransactions) => [...prevTransactions, res?.data?.transaction])
    console.log(res.data.transaction)
  })
  .finally(() => {
    props.setNewTransactionForm({
      category: "",
      description: "",
      amount: 0
    })
    props.setIsCreating(false)
    console.log(props.transactions)
  })
}
const handleOnCreateTransfer = async() => {
  if (props.newTransferForm.recipientEmail === "") {
    setFieldError("email error")
    return;
  }
  props.setIsCreating(true)
  await axios.post("http://localhost:3001/bank/transfers", {transfer: props.newTransferForm})
  .catch((err) => {
    props.setError(err)
    props.setIsCreating(false)
  })
  .then(res => {
    console.log(res)
    props.setTransfers((prevTransfers) => [...prevTransfers, res?.data?.transfer])
  })
  .finally(() => {
    props.setNewTransferForm({
      memo: "",
      recipientEmail: "",
      amount: 0
    })
    props.setIsCreating(false)
  })
}


useEffect(() =>{
  async function getData(){
  props.setIsLoading(true)
  try{
    const transactionData = await axios.get('http://localhost:3001/bank/transactions')
    if (transactionData?.data?.transactions) {
      props.setTransactions(transactionData.data.transactions)
    }
    const transfersResult = await axios.get("http://localhost:3001/bank/transfers")
      if (transfersResult?.data?.transfers) {
        props.setTransfers(transfersResult.data.transfers)
        console.log(transfersResult.data)
      }

  }
  catch (err) {
    console.log(err)
    props.setError(err)
  }finally{
    props.setIsLoading(false)
  }
   
  }
  getData()
  
}, [])
  

  return (
    <div className="home">
      <AddTransaction
      isCreating ={props.isCreating}
      setIsCreating={props.setIsCreating}
    form={props.newTransactionForm}
      setForm={props.setNewTransactionForm}
      handleOnSubmit={handleOnCreateTransaction}
      />
      {props.isLoading ? (<h1>Loading...</h1>) : (<BankActivity transactions={filteredTransactions} transfers={props.transfers}/>)}
      {props.error ? <h2 className="error">Error message</h2> : null}
    </div>
  )
}

