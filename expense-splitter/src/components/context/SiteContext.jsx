import React, {useState} from 'react'
import { nanoid } from 'nanoid'
import { createContext, useContext } from 'react'

const SiteContext = createContext(null)

export const UseDataContext = () => useContext(SiteContext)

export const DataProvider = ({children}) => {
    const initalGroup = [
        {
          name: 'Beach Lunch',
          description: 'Saturday lunch by the beach',
          budget: '85',
          id: 't0unxnqoAwLdxsjOuxc5A',
        },
        {
          name: 'Bar Night',
          description: 'Night at the bar with co-workers',
          budget: '300',
          id: 'NoWgbblj8apsEHZ0IVMC4',
        },
        {
          name: 'Urth Cafe Brunch',
          description: 'Brunch with the baseball team',
          budget: '120',
          id: 'P_PNnrbjurvmasxRtXEov',
        },
      ]

    const [expense, setExpense] = useState([])
    const [groupData, setGroupData] = useState(initalGroup)
      console.log('groupData', groupData)
    const handleSetExpense = (values) => {
        setExpense(prev => [...prev, { ...values, id: nanoid(), date: new Date() }])
    }
    console.log(expense)


    return (
        <SiteContext.Provider value={{ groupData, setGroupData, expense, setExpense, handleSetExpense }}>
            {children}
        </SiteContext.Provider>
    )
}