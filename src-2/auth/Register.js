import React, { useContext, useState } from "react"; 
import { useNavigate, Link } from "react-router-dom"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 

const Register = ({ setIsAuth }) => {  
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => { 
    setLoading(true);
    e.preventDefault(); 
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // const file = e.target[3].files[0];  
    try { 
     
      // Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`); 
      console.log(res);
      } catch (err) {
      setErr(true);
      setLoading(false);
      } 
  }; // 2 : handleSubmit ends  
 
  return (
    <div className="login"> 
      <div className="wrapper">
        <div className="left"> 

         <div className="left w3-container">  

          <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
           
          <button disabled={loading}>Sign up</button>
          {loading && "Uploading and compressing the image please wait..."}
          {err && <span>Something went wrong</span>}
        </form> 

           </div>

        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right"> 

        </div>
      </div>
    </div>
  );

};

export default Register;
