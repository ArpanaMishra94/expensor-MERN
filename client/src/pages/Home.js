import React from 'react'
import { useState, useEffect } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionList";
import Container from '@mui/material/Container';
import Cookies from 'js-cookie';

const Home = () => {

    const [transactions, setTransactions] = useState([]);
    const [editTransaction, setEditTransaction] = useState({});

    useEffect(() => {
        fetchTransactions()
      }, [])
    
    async function fetchTransactions() {
      const token = Cookies.get('token');
      const res = await fetch('http://localhost:4000/transaction', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
    });  
    
    const {data} = await res.json();
    setTransactions(data);
    }

  return (
    <Container>
      <TransactionForm 
        fetchTransactions={fetchTransactions}
        editTransaction={editTransaction}
        />
      <TransactionsList 
        transactions={transactions} 
        fetchTransactions={fetchTransactions}
        setEditTransaction={setEditTransaction}
        />
      <br/>
    </Container>
  )
}

export default Home