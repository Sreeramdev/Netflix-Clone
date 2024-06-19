
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword,
     getAuth,
     signInWithEmailAndPassword, 
     signOut} from "firebase/auth";
import { addDoc,
     collection, 
     getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";


const firebaseConfig = {
  apiKey: "AIzaSyCtEtUlYIbH-T3CqopbxR8vwIcNbPigglo",
  authDomain: "netflix-clone-92236.firebaseapp.com",
  projectId: "netflix-clone-92236",
  storageBucket: "netflix-clone-92236.appspot.com",
  messagingSenderId: "418498166452",
  appId: "1:418498166452:web:1e6a3f6cea7ecba0f661e1",
  measurementId: "G-LRX399SL19"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
const db = getFirestore(app)

const signUp = async (name,email,password)=>{
   try{
     const res = await createUserWithEmailAndPassword(auth,email,password)
     const user = res.user;
     await addDoc(collection(db,"user"),{
        uid: user.uid,
        name,
        authProvider: "local",
        email,
     })

   }catch(error){
   console.log(error)
   toast.error(error.code.split('/')[1].split('-').join(" "));
}
}

const login = async(email,password)=>{
  try{
        await signInWithEmailAndPassword(auth,email,password)
  }catch (error){
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const logOut =async()=>{
    signOut(auth);

}
export {auth,db,login,signUp,logOut};