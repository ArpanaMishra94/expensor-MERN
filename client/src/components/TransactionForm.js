import { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button';

const InitialForm = {
    amount: 0,
    description: '',
    date: new Date(),
  }


export default function TransactionForm({fetchTransactions, editTransaction}) {

    const [form, setForm] = useState(InitialForm);

    useEffect(() => {
      if (editTransaction.amount !== undefined) {
        setForm(editTransaction);
      }
    }, [editTransaction]);

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    function handleDate(newValue) {
      setForm({...form, date: newValue});
    }

    async function handleSubmit(e) {
        e.preventDefault(); 
        editTransaction.amount === undefined ? create():update();
      }

    function reload(res) {
      if (res.ok) {
        setForm(InitialForm);
        fetchTransactions();
      }
    }

    async function create() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'content-type': 'application/json',
          }
        });
        reload(res);  
    }

    async function update() {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${editTransaction._id}`, 
        {
            method: 'PATCH',
            body: JSON.stringify(form),
            headers: {
              'content-type': 'application/json',
            }
        }
      );
      reload(res);
    }

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add new Transaction</Typography>
        <form onSubmit={handleSubmit}>
        <TextField 
            sx={{marginRight: 5}} 
            size='small' 
            name='amount'
            type="number"
            id="outlined-basic" 
            label="Amount" 
            variant="outlined"
            value={form.amount}
            onChange={handleChange}

         />
        <TextField 
            sx={{marginRight: 5}} 
            size='small' 
            name='description'
            id="outlined-basic" 
            label="Description" 
            variant="outlined" 
            value={form.description}
            onChange={handleChange}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
            label="Transaction Date"
            inputFormat="MM/DD/YYYY"
            value={form.date}
            onChange={handleDate}
            renderInput={(params) => (
                <TextField 
                    size='small' 
                    sx={{marginRight: 5}} 
                    
                    {...params}
                />
          )}
        />
        </LocalizationProvider>
        {
          editTransaction.amount !== undefined && 
          (
          <Button type="submit" variant="secondary">Update</Button>
          )
        }
        {
          editTransaction.amount === undefined &&
            (
              <Button type="submit" variant="contained">Submit</Button>
            )        
        }
        </form>
      </CardContent>
    </Card>
  );
}