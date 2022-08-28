import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useContext, useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Login = () => {
  const { dispatch } = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [inputUser, setInputUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setInputUser({
      ...inputUser,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputUser.email, inputUser.password);
    signInWithEmailAndPassword(auth, inputUser.email, inputUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(true);
      });
  };

  return (
    <div>
      <form className="login" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="email"
          type="email"
          placeholder="Eamil"
        />
        <input
          onChange={handleChange}
          name="password"
          type="password"
          placeholder="Password"
        />

        <button type="submit"> Sing in</button>
        {error && <span>wrong email or password</span>}
      </form>
    </div>
  );
};

export default Login;
