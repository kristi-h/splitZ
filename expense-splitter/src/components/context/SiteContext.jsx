import React, {useState} from 'react'
import { nanoid } from 'nanoid'
import { createContext, useContext } from 'react'

const SiteContext = createContext(null)

export const UseDataContext = () => useContext(SiteContext)

export const DataProvider = ({children}) => {
    const [expense, setExpense] = useState([])

    const handleSetExpense = (values) => {
        setExpense(prev => [...prev, { ...values, id: nanoid(), date: new Date() }])
    }
    console.log(expense)


    return (
        <SiteContext.Provider value={{ expense, setExpense, handleSetExpense }}>
            {children}
        </SiteContext.Provider>
    )
}