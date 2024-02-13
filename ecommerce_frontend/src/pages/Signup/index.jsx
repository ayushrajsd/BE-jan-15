import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import urlConfig from "../../urlConfig";
import "./signup.css";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    // const [phone, setPhoneNumber] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try{
            setLoading(true)
            const userDetails = {name, email, password, confirmPassword}
            const res = await axios.post(urlConfig.SIGNUP_URL, userDetails)
            setLoading(false)
            setName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
            navigate("/login")

        }catch(err){
            setErrMsg(err.message)
            console.log(err)
            setLoading(false)
            setTimeout(()=>{
                setErrMsg("")
            },2000)
        }
    }
    if(loading){
        return <div>Loading...</div>
    }

  return (
    <div className="signupscreen">
      <div className="container">
        <div className="innerContainer">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <div>
              <i class="fas fa-arrow-circle-left fa-5x"></i>
            </div>
            <p>Signup</p>
          </div>

          <label for="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your name.."
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your Password.."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label for="password">Confirm Password</label>
          <input
            type="password"
            id="password"
            name="confirmPassword"
            placeholder="Your ConfirmPassword.."
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {/* <label for="phone">Contact Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Your Contact Number.."
            value={phone}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> */}

          <Link to="/signin" className="link">
            <span>Already have an account ?</span>
          </Link>

          <br />
          <input type="submit" value="Sign up" onClick={handleSubmit} />
          <div className={errMsg ? "errContainer" : ""}>{errMsg}</div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
