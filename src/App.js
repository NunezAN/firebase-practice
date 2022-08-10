import React from 'react';
import "./App.css";
import { auth, db } from "./firebase/init";
import{collection, addDoc} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword, signOut
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  function createPost(){
    const post = {
      title: "land a $100k job",
      description: "finish frontend simplified",
    };
    addDoc(collection(db,"posts"), post);
  }

  React.useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      setLoading(false);
      console.log(user)
      if(user){
        setUser(user);
      }
    })
  },[])  
  function register() {
    console.log("register!!!!");
    createUserWithEmailAndPassword(auth, "email@email123.com", "pword123")
      .then((data) => {
        console.log(data.user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email123.com", "pword123")
    .then(({user}) => {
      console.log(user);
      setUser(user);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout(){
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading...": user.email}
      <button onClick={createPost}>Create Post</button>
    </div>
  );
}

export default App;
