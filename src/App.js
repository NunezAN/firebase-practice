import React from "react";
import "./App.css";
import { auth, db } from "./firebase/init";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

function App() {
  const [user, setUser] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const [posts, setPosts] = React.useState([]);

  function createPost() {
    const post = {
      title: "Finish Interview Section",
      description: "Do Frontend Simplified",
      uid: user.uid,
    };
    addDoc(collection(db, "posts"), post);
  }

  function deletePost(){
    const hardId = "7wkqcOrnMsJCJFM9JT6O";
    const postRef = doc(db, "posts", hardId);
    deleteDoc(postRef);
  }

  async function updatePost() {
    const hardId = "7wkqcOrnMsJCJFM9JT6O";
    const postRef = doc(db, "posts", hardId);
    const post = await getPostById(hardId);
    console.log(post);
    const newPost = {
      ...post,
      title: "land a 800k job",
    };
    console.log(newPost);
    updateDoc(postRef, newPost);
  }

  async function getAllPosts() {
    const { docs } = await getDocs(collection(db, "posts"));
    setPosts(docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }
  async function getPostById(id) {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
  }
  async function getPostByUid() {
    const postCollectionRef = await query(
      collection(db, "posts"),
      where("uid", "==", user.uid)
    );
    const { docs } = await getDocs(postCollectionRef);
    console.log(docs.map((doc) => doc.data()));
  }
  console.log(posts);
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoading(false);
      console.log(user);
      if (user) {
        setUser(user);
      }
    });
  }, []);
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
      .then(({ user }) => {
        console.log(user);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    signOut(auth);
    setUser({});
  }
  return (
    <div className="App">
      <button onClick={register}>Register</button>
      <button onClick={login}>Login</button>
      <button onClick={logout}>Logout</button>
      {loading ? "loading..." : user.email}
      <br />
      <button onClick={createPost}>Create Post</button>
      <br />
      <button onClick={getAllPosts}>Get All Posts</button>
      <br />
      {posts.map((post) => post.title)}
      <button onClick={getPostById}>Get Post by Id</button>
      <br />
      <button onClick={getPostByUid}>Get Post by UID</button>
      <br />
      <button onClick={updatePost}>Update Post</button>
      <br />
      <button onClick={deletePost}>delete Post</button>
    </div>
  );
}

export default App;
