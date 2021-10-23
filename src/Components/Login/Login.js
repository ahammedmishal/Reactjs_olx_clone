import React ,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap' //for spinner
import { useHistory } from 'react-router';

import Logo from '../../olx-logo.png';
import { FirebaseContext } from '../../store/Context';
import './Login.css';

function Login() {


  const[loading,setLoading] = useState(true)
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const{firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const handleLogin = (e) =>{
    e.preventDefault()
              setLoading(false)
              firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
                setLoading(true)
                history.push('/');
              }).catch((error)=>{
                setLoading(true)
                alert(error.message)
              })
          }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>

        <form onSubmit={handleLogin}>

          <label htmlFor="fname">Email</label>
          <br />
          <input
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <a><Link className="hover-line" style={{textDecorationStyle:'none' ,fontWeight:'bold', color:'black'}} to="/signup" >Signup</Link></a>
          {loading ? '' : (<ReactBootstrap.Spinner style={{marginBottom:'10%',marginTop:'10%',marginLeft:'40%'}} animation="border" />)}
      </div>
    </div>
  );
}

export default Login;
