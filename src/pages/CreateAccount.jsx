import React, { useRef, useState } from "react";
import axios from "axios";
import "@styles/CreateAccount.scss";
import ErrorMessage from "@components/ErrorMessage";

const CreateAccount = () => {
  const form = useRef(null);
  const [showMessage, setShowMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const register = (e) => {
    setIsClicked(true); //desactivamos el onclick para evitar repetir ordenes
    e.preventDefault();

    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
    };

    //si algun campo esta vacio mostramos ese error en ErrorMessage
    if (!data.name || !data.email || !data.password) {
      setShowMessage("Todos los campos deben ser completados");
      setIsClicked(false);
    } else {
      //si Todo esta en orden chequeamos si el correo ya esta en uso
      checkAvailableEmail(data);
    }
  };

  const checkAvailableEmail = async (data) => {
    const response = await axios("https://api.escuelajs.co/api/v1/users");
    const emailUse = response.data.some((item) => item.email === data.email);
    //si el correo no esta hacemos el registo
    if (!emailUse) {
      sendData(data);
    } else {
      setShowMessage("Este Correo ya esta en uso");
      setIsClicked(false);
    }
  };

  const sendData = async (data) => {
    try {
      const response = await axios.post(
        "https://api.escuelajs.co/api/v1/users/",
        data
      );
    } catch (error) {
      console.error("Error al enviar los datos:", error.message);
    } finally {
      //repuesta exitosa enviame a login
      window.location = "/send-email";
    }
  };

  const handleInputEmail = (event) => {
    const { name, value } = event.target;
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|es|edu|gov|mil|io|info|etc)$/;
    if (!emailRegex.test(value)) {
      event.target.setCustomValidity("Ingresa un correo electrónico válido.");
    } else {
      event.target.setCustomValidity("");
    }
  };

  const handleInput = (event) => {
    const { value } = event.target;
    if (value.length < 4) {
      event.target.setCustomValidity("deber ser mayor a 4 caracteres");
    } else {
      event.target.setCustomValidity("");
    }
  };

  return (
    <div className="CreateAccount">
      <div className="CreateAccount-container">
        <h1 className="title">My account</h1>
        <form action="/" className="form" ref={form} onSubmit={register}>
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Teff"
              className="input input-name"
              onChange={handleInput}
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="platzi@example.com"
              className="input input-email"
              onChange={handleInputEmail}
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="*********"
              className="input input-password"
              onChange={handleInput}
            />
          </div>
          <input
            type="submit"
            value="Create"
            className="primary-button login-button"
            disabled={isClicked}
          />
        </form>
   
      {showMessage && <ErrorMessage message={showMessage} />}
      
      </div>
    </div>
  );
};

export default CreateAccount;
