import styles from './App.module.css'
import React, { useEffect, useReducer, useState } from 'react'
import { initialState, userReducer } from './useReducer/useReducer'
import UserData from './components/UserData';
import Form from './components/Form';
import { useAppContext } from './hooks/useAppContext';


function App() {

  // console.log('App');

  const [state, dispatchFn] = useReducer(userReducer, initialState);
  // console.log('state app', state);
  const { userId, setUserId } = useAppContext()
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    dispatchFn({ type: 'GET' })
  }, [])

  const handleChangeUser = (e) => {
    setUserId(e.target.value)
  }

  const setUserData = (id) => {
    dispatchFn({ type: 'GET_USER_ITEM', id: id })
  }

  const newNote = () => {
    dispatchFn({ type: 'RESET_FORM_STATE' })
  }

  return (
    <main className={styles.main}>
      <aside className={styles.aside}>
        <h1>My notes</h1>
        <button type='button' value='reset form' onClick={newNote}>Новая заметка</button>
        <select onChange={handleChangeUser} name="users" id="users" defaultValue={0}>
          {/* <option disabled value="default"></option> */}
          <option value={0} >All</option>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
        </select>

        <UserData
          userData={state.data}
          dispatchDelete={dispatchFn}
          userId={userId}
          counter={counter}
          setUserData={setUserData}
        />
      </aside>

      <Form state={state} userId={userId} dispatchFn={dispatchFn} />
      {/* <button onClick={() => setCounter(prevState => prevState + 1)}>click</button> */}
    </main>
  )
}

export default App
