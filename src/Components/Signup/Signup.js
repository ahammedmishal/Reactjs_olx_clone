//css and logo
import validator from 'validator'
import './Signup.css';
import Logo from '../../olx-logo.png';

// react state,context,firebase,history
import React,{useState,useContext} from 'react';
import { useHistory } from 'react-router';
import { FirebaseContext } from '../../store/Context';

//imports link,bootstraps,validator(password)
import {Link} from 'react-router-dom';
import * as ReactBootstrap from 'react-bootstrap' //for spinner



export default function Signup() {
  const [errorMessage,setErrorMessage] = useState('');
  const [emailError,setEmailerror] = useState('')
  const [loading,setLoading] = useState(true)
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [password,setPassword] =useState('');
  const {firebase} = useContext(FirebaseContext)
  const history = useHistory()

  const validate = (value) => {
  
    if (validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })) {
      setErrorMessage('Is Strong Password')
    } else {
      setErrorMessage('Is Not Strong Password')
    }
  }


  const handleSubmit =(e)=>{

    e.preventDefault()
    setLoading(false)
    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      result.user.updateProfile({
        displayName:username
      }).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{
            setLoading(true)
            history.push("/login")
        }).catch((error)=>{
          setLoading(true)
          alert(error.message)
        })

      })
    })
  }
  
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            value={password}
            //;validate(e.target.value)"
            onChange={(e)=>setPassword(e.target.value)}
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br/>
          <label>{errorMessage}</label>
          <br />
          <br />
          <button>Signup</button>
          
        </form>
        <a><Link className="hover-line" style={{textDecorationStyle:'none' ,fontWeight:'bold', color:'black'}} to="/login">Login</Link></a>
        {loading ? '' : (<ReactBootstrap.Spinner style={{marginBottom:'10%',marginTop:'10%',marginLeft:'40%'}} animation="border" />)}
      </div>
    </div>
  );
}
