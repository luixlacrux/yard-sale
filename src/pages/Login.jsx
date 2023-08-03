import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import ErrorMessage from "@components/ErrorMessage";
import AppContext from "@context/AppContext";
import "@styles/Login.scss";
import logo from "@logos/logo_yard_sale.svg";

const Login = () => {
  const { state } = useContext(AppContext);
  console.log(state);
  const form = useRef(null);
  const [showErrorMessage, setShowErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(form.current);
    const userdata = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    if (!userdata.email || !userdata.password) {
      setShowErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    getUser(userdata);
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?!\d)/;
      if (!emailRegex.test(value)) {
        e.target.setCustomValidity("Ingresa un correo electrónico válido.");
      } else {
        e.target.setCustomValidity("");
      }
    }
  };

  const getUser = async (data) => {
    try {
      const response = await axios("https://api.escuelajs.co/api/v1/users");
      const user = response.data.find((user) => user.email === data.email);
      if (user) {
        // Si el correo electrónico existe, verificamos la contraseña
        if (user.password === data.password) {
          setShowErrorMessage("Acceso concedido");
          //gardamos nuesto id en localstorange para poder recordar la seccion
          localStorage.setItem(
            "cart",
            JSON.stringify({
              ...state,
              user: user.id,
            })
          );
          window.location = "/";
        } else {
          setShowErrorMessage("contraseña incorrecta");
        }
      } else {
        setShowErrorMessage("El correo electrónico no existe.");
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    }
  };

  return (
    <div className="Login">
      <div className="Login-container">
        <img src={logo} alt="logo" className="logo" />
        {showErrorMessage && <ErrorMessage message={showErrorMessage} />}
        <form action="/" className="form" ref={form} onSubmit={handleSubmit}>
          <label htmlFor="email" className="label">
            Email address
          </label>
          <input
            type="text"
            name="email"
            placeholder="platzi@example.cm"
            className="input input-email"
            onChange={handleInput}
          />
          <label htmlFor="password" className="label">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="*********"
            className="input input-password"
          />
          <button type="submit" className="primary-button login-button">
            Login
          </button>
          <a href="/password-recovery">Forgot my password</a>
        </form>
        <button
          className="secondary-button signup-button"
          onClick={() => (window.location = "/signup")}
        >
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Login;
