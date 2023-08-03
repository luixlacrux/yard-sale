import React from 'react';
import '@styles/SendEmail.scss';
import emailLogo from '@icons/email.svg';

const SendEmail = () => {
	return (
		<div className="SendEmail">
			<div className="form-container">
				<h1 className="title">Email has been sent!</h1>
				<p className="subtitle">Please check your inbox for instructions on how to reset the password</p>
				<div className="email-image">
					<img src={emailLogo} alt="email" />
				</div>
				<button className="primary-button login-button" onClick={() => window.location = "/login"}>Login</button>
				<p className="resend">
					<span>Didn't receive the email?</span>
					<a>Resend</a>
				</p>
			</div>
		</div>
	);
}

export default SendEmail;
