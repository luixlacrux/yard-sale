import React, { useContext, useEffect, useState } from 'react';
import '@styles/MyAccount.scss';
import AppContext from '@context/AppContext';
import axios from 'axios';


const MyAccount =  () => {
	const {state} = useContext(AppContext);
	const [userDataOriginal , setUserDataOriginal] = useState("");
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [isEditing, setIsEditing] = useState(false);

	useEffect(()=> {
		const  getData =  async  ()=> {
			const response = await axios(`https://api.escuelajs.co/api/v1/users/${state.user}`);
			const {email,name} = response.data;
			setName(name);
			setEmail(email);
			setUserDataOriginal({"name": name, "email": email});
		   } 
		   getData();
	}, [])
     

  

    const handleEdit = (event) => {
		event.preventDefault();
		setIsEditing(true);
	}

	const handleSave = async() => {
        event.preventDefault();
		setIsEditing(false);
        //userDataOriginal es un estado con Los datos originales si hay cambio hacemos la solicitud a la api
		//de lo contrario no
		if(userDataOriginal.name === name && userDataOriginal.email === email) {
			return
		}
		else{
        try{
			const response = await axios.put(`https://api.escuelajs.co/api/v1/users/${state.user}`,
			{
				"email": email,
				"name": name
			}
			)
			console.log(response);
		}
		catch(error){
         console.error(error);
		}
		}

	}
	const editInputs = (event) => {
		const newValue = event.target.value;
		const type = event.target.name;
		const emailRegex =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|es|edu|gov|mil|io|info|etc)$/;

		if(type === "name"){
			setName(newValue);
			if(newValue.length < 4){
			event.target.setCustomValidity('Debe ser mayor a 4 caracteres');
			} 
			else{
				event.target.setCustomValidity('');
			}
		} 
		else if(type === "email"){
			setEmail(newValue)
			if(!emailRegex.test(newValue)){
				event.target.setCustomValidity('introduce un correo valido');
			}
			else{
				event.target.setCustomValidity('');
			}
		}
       
	
	}

	return (
		<div className="MyAccount">
			<div className="MyAccount-container">
				<h1 className="title">My account</h1>
				<form action="/" className="form" onSubmit={handleSave}>
					<div>
						<label htmlFor="name" className="label">Name</label>
                         {!isEditing && <p className="value">{name}</p>}
						 {isEditing && <input type="text" name={"name"} className="value" value={name}
						 onChange= {editInputs}
						 />}
						<label htmlFor="email" className="label">Email</label>
						{!isEditing && <p className="value">{email}</p>}
						{isEditing && <input type="text" 
						 name='email' 
						 className="value"
						 value={email}
						 onChange={editInputs}
						 />}
						<label htmlFor="password" className="label">Password</label>
						<p className="value">*********</p>
					</div>
					{isEditing ? (
            <input
              type="submit"
              value="Guardar"
              className="secondary-button login-button"
            />
          ) : (
            <input
              type="submit"
              value="Editar"
              className="secondary-button login-button"
              onClick={handleEdit}
            />
          )}
				</form>
			</div>
		</div>
	);
}

export default MyAccount;