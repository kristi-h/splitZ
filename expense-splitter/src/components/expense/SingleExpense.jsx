import { useState , useEffect } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { UseDataContext } from "../context/SiteContext";
import Button from '../ui/Button'

function SingleExpense() {

    const { expense } = UseDataContext();
    const { expenseId } = useParams();
    const navigate = useNavigate();

    const singleExpense = expense.find(expense => expense.id === expenseId)

    return (
        <div>
            <h1>{singleExpense.name}</h1>
            <p>{singleExpense.category}</p>
            <p>{singleExpense.description}</p>
            <p>{singleExpense.amount}</p>
            <Button
                variant={"small"} 
                onClick={() => navigate('/expenses')}
                className={'bg-accent'}>
                Back
            </Button>
        </div>
    )
}

export default SingleExpense;