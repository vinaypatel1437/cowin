import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import { useEffect, createContext, useReducer, useContext} from 'react'
// import {reducer,initialState} from './Components/userReducer';
import Signup from './Components/sign';
import Login from './Components/login';
import Dashboard from './Components/dashboard';
import Dash from './Components/dash';
import LoginIn from './Components/loginIn';
import {BrowserRouter as Router,Switch, Route, BrowserRouter} from 'react-router-dom'

export const UserContext = createContext()
function App(){
  
  return (
    <BrowserRouter>
    <Switch>
    <Route path='/' exact render={(props)=>(
      <Login/>
    )}
      />
    <Route path='/sign' component={Signup}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/loginin' component={LoginIn}/>
    <Route path='/dash' component={Dash}/>
    </Switch>
    </BrowserRouter>
      );
}

export default App;
