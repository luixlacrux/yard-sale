import React,{useRef} from 'react';
import axios from 'axios';
import '@styles/CreateAccount.scss';

const CreateAccount = () => {
	const form = useRef(null);

    const register = (e) => {
     e.preventDefault();
	 const formData  = new FormData(form.current);

	 const data = {
		name: formData.get('name'),
        email: formData.get('email'),
		password: formData.get('password'),
		avatar: "https://api.lorem.space/image/face?w=640&h=480&r=867",
	 }

    const sendData = async () =>{
		try {
			const response = await axios.post('https://api.escuelajs.co/api/v1/users/', data);
			console.log('Respuesta de la API:', response.data);
            //repuesta exitosa enviame a login
			// window.location = "/login";
		  } catch (error) {
			console.error('Error al enviar los datos:', error.message);

		  }
	}
	sendData();
 	 console.log(data);
	}

	return (
		<div className="CreateAccount">
			<div className="CreateAccount-container">
				<h1 className="title">My account</h1>
				<form action="/" className="form" ref={form}>
					<div>
						<label htmlFor="name" className="label">Name</label>
						<input type="text" name="name" placeholder="Teff" className="input input-name" />
						<label htmlFor="email" className="label">Email</label>
						<input type="text" name="email" placeholder="platzi@example.com" className="input input-email" />
						<label htmlFor="password" className="label">Password</label>
						<input type="password" name="password" placeholder="*********" className="input input-password" />
					</div>
					<input type="submit" value="Create" className="primary-button login-button" 
					onClick={register}
					/>
				</form>
			</div>
		</div>
	);
}

export default CreateAccount;