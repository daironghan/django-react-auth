import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthContext'
import './HomePage.css'

const HomePage = () => {
    let [notes, setNotes] = useState([])
    let {authTokens, logoutUser} = useContext(AuthContext)



    const [balance, setBalance] = useState(null)
    const [transferRecipient, setTransferRecipient] = useState(null)
    const [transferAmount, setTransferAmount] = useState(null)

    const fetchBalance = async () => {
        try {
            const response = await fetch('http://35.229.250.40:8000/api/query/?cmd=clientAccountBalance')
            const data = await response.json()
            console.log("data item: ", data)
            setBalance(data.stdout)
            console.log("balance: ", balance)
        } 
        catch (error) {
            console.log("error", error)
        }
    };

    useEffect(() => {

        const interval = setInterval(() => {
            fetchBalance();
        }, 10000000); /* 10000 ten sec*/
        return () => clearInterval(interval);

    }, [])



    const transferRecipientHandler = (e) => {
        setTransferRecipient(e.target.value);
        console.log('transfer reciever changed')
    }
    const transferAmountHandler = (e) => {
        setTransferAmount(e.target.value);
        console.log('transfer amount changed')
    }

    const transferHandler = async () => {
        try {
            console.log('transfer button clicked')
        } catch (error) {
            console.log(error);
        }
    }


    return (
      <div className='homeContainer'>
        <div className='tokenContainer'>
            <p id='tokenNumber'>200</p>
            <p id='tokenUnit'>carbon tokens</p>
        </div>
        <div className='functionsContainer'>
            <div className='funcItemContainer'>
                <button id='transferFunc' onClick={ transferHandler } >Transfer</button>
                <input onChange={ transferRecipientHandler } placeholder='Recipient Address'></input>
                <input onChange={ transferAmountHandler } placeholder='Transfer Amount'></input>
            </div>
        </div>

      </div>
    )
  }
  
  export default HomePage

  /*

      useEffect(()=> {
        getNotes()
    }, [])

    let getNotes = async() =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/', {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()

        if(response.status === 200){
            setNotes(data)
        }else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
        
    }



        <ul>
        {notes.map(note => (
            <li key={note.id} >{note.body}</li>
        ))}
        </ul>
  
   */