import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAxYIXL_LvS8hMSWnG5nA5Saz6zis9Rg90",
  authDomain: "login-1a552.firebaseapp.com",
  projectId: "login-1a552",
  storageBucket: "login-1a552.appspot.com",
  messagingSenderId: "420126657642",
  appId: "1:420126657642:web:d6d4e3825ed3a7cfd5ce13"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

const googlelogin = document.getElementById("google");
googlelogin.addEventListener("click", function(event) {
  event.preventDefault(); // Prevent form submission
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const user = result.user;
      console.log(user);
      window.location.href = "Dashboard.html"; // Redirect to your desired page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Error [${errorCode}]: ${errorMessage}`);
    });
});