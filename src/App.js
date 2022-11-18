import React, { useEffect, useReducer, useRef } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home';
import Edit from './Pages/Edit';
import New from './Pages/New';
import Item from './Pages/Item';

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case 'INIT': {
      return action.data;
    }

    case 'CREATE': {
      newState = [action.data, ...state];
      break;
    }
    case 'REMOVE': {
      newState = state.filter((it) => it.id !== action.targetId)
      break;
    }
    case 'EDIT': {
      newState = state.map((it) => it.id === action.data.id ? { ...action.data } : it)
      break;
    }
    default:
      return state;
  }
  localStorage.setItem('food', JSON.stringify(newState))
  return newState
}

export const TripStateContext = React.createContext();
export const TripDispatchContext = React.createContext();

function App() {

  const [data, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    const localData = localStorage.getItem('food')
    if (localData) {
      const foodList = JSON.parse(localData).sort((a, b) => parseInt(b.id) - parseInt(a.id))
      if (foodList >= 1) {
        dataId.current = parseInt(foodList[0].id) + 1
      }
      dispatch({ type: 'INIT', data: foodList })

    }
  }, [])
  console.log(data)
  const dataId = useRef(1)
  //CREATE
  const onCreate = (food, title, content, area) => {
    dispatch({
      type: "CREATE", data: {
        id: dataId.current,
        // img: process.env.PUBLIC_URL + `/assets/` + img[0].name,
        food,
        title,
        content,
        area,
      }
    })
    dataId.current += 1;
  }
  //REMOVE
  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE", targetId
    })
  }
  //EDIT
  const onEdit = (targetId, food, area, content, title) => {
    dispatch({
      type: 'EDIT', data: {
        id: targetId,
        food,
        area,
        content,
        title
      }
    })
  }

  return (
    <TripStateContext.Provider value={data}>
      <TripDispatchContext.Provider value={{ onCreate, onRemove, onEdit }}>
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/Edit/:id' element={<Edit />} />
              <Route path='/New' element={<New />} />
              <Route path='/Item/:id' element={<Item />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TripDispatchContext.Provider>
    </TripStateContext.Provider>
  );
}

export default App;
