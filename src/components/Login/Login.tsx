import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./Login.css";
import validateLoginInfo from "./validateLoginInfo";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface LoginValues {
  code: string;
}

function Login() {
  const navigate = useNavigate();

  const [loginValues, setLoginValues] = useState<LoginValues>({
    code: "",
  });
  axios.defaults.withCredentials = false;

  const [errors, setErrors] = useState<{ fields?: string }>({});
  const [loginStatus, setLoginStatus] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginValues({
      ...loginValues,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setErrors(validateLoginInfo(loginValues));


    axios
      .get(`https://localhost:7287/api/Resto/checkCode/${loginValues.code}`)
      .then((response) => {
        if (response.status != 401) {
          const user = response.data;
          localStorage.setItem("currentUser", JSON.stringify(user));

            window.location.href = "/dashboard";

        }
      })  .catch(error =>{
        console.log(error);
        alert(error.response.data);

      })
    if (localStorage.getItem("currentUser")) {
      navigate("/dashboard");
    }
  };

 
  useEffect(() => {
    if (localStorage.getItem("currentUser")) {
      navigate("/dashboard");
    }
  }, []);

  return (
    <form onSubmit={handleSubmit} className="main">
      <div className="sub-main">
        <div>
          <div>
            <h1 className="login-title">Login Page</h1>
            <div className="input-area">
              <input
                type="text"
                placeholder="Enter Booking ID (Insert default code if you don't have a booking)"
                value={loginValues.code}
                onChange={handleChange}
                name="code"
                className="name"
              />
            </div>

            <div className="button-area">
              <a href="/dashboard">
                <button type="submit" className="loginpage-button">
                  Log In
                </button>{" "}
              </a>
            </div>

           

            <div className="loginerror-msg">
              <p>{errors.fields}</p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
