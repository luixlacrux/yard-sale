import React, { useRef, useState } from 'react';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import ErrorMessage from "@components/ErrorMessage";
import logos from '@logos/logo_yard_sale.svg';
import '@styles/PasswordRecovery.scss';




const PasswordRecovery = () => {
	const form = useRef(null);
	const [isClicked, setIsClicked] = useState(false);
	const [errorMessage, seterrorMessage] = useState("");
    
	//funcion que obtiene el usuario tipeado y verifica si cumple los requisitos
	//para ejecutar sendPassword

	const handleSubmit = async(event) => {
		setIsClicked(true); //desactivamos el evento hasta no realizar la logica
		event.preventDefault();
		const formData = new FormData(form.current);
		const userEmail = formData.get("email"); // email tipiado por usuario

		if(userEmail) {
			const response = await axios("https://api.escuelajs.co/api/v1/users");
			const allUsers = response.data; //traemos todos los usuarios

			//el usuario tipiado existe en allUser? 
			const math = allUsers.find((allEmails) => allEmails.email === userEmail);
			math ? (sendPassword({email:math.email,password:math.password, name:math.name})) // encontrado enviamos correo
			  : setIsClicked(false); seterrorMessage("Usuario no encontrado") ;  //email no exist activamos el boton y mostramos el error
		}
	//si el email no fue tipiado deberiamos activar el boton
       else{
		setIsClicked(false);
	   }

	} 

	//funcion que envia el correo
	const sendPassword = async({email,password,name}) => {

		const serviceId = 'service_yyo1u9p'; // Reemplaza con tu Service ID
		const templateId = 'template_s20ckty'; // Reemplaza con tu Template ID
		const userId = 'hBB9e3CMM9PkElJMs'; // Reemplaza con tu User ID 


		const templateParams = {
			from_name: 'Yard Sale',
			to_name: name,
			to_email: email, // Destinatario DINÁMICO 
			message: password,
		  };
		  try {
			// Envía el correo electrónico utilizando EmailJS
			const response = await emailjs.send(serviceId, templateId, templateParams, userId);
			console.log('Correo electrónico enviado correctamente:', response);
			window.location.href = '/send-email';
		  } catch (error) { 
			//servicio caido 
            seterrorMessage("en estos momentos tenemos problemas para enviar su correo intente mas tarde")
			console.error('Error al enviar el correo electrónico:', error);
		  }
		  finally{
			setIsClicked(false); //activamos el boton
		  }

	
	}
	return (
		<div className="PasswordRecovery">
			<div className="PasswordRecovery-container">
				<img src={logos} alt="logo" className='logo-yard'/>
				<h1 className="title">Password recovery</h1>
				<p className="subtitle">Inform the email address used to create your account</p>
				<form action="/" className="form" ref={form} onSubmit={handleSubmit}>
					<label htmlFor="email" className="label">Email address</label>
					<input type="text" id="email" className="input input-email" name='email' disabled={isClicked}/>
					<input type="submit" value="Confirm" className="primary-button login-button" />
				</form>
				<div className="showerror">
				{!isClicked && <ErrorMessage message={errorMessage} />}
               </div>
			
			
			</div>
		</div>
	);
}

export default PasswordRecovery;
