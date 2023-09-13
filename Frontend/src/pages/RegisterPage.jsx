import React from 'react';
import { useEffect } from 'react';
import RegisterImage from '../../images/rakshit images/Handimation.gif'
import '../css/RegisterPage.css'
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationError, setRegistrationError] = useState('');   

    useEffect(() => {
        document.getElementById("firstnameAlert").style.display = 'none';
        document.getElementById("lastnameAlert").style.display = 'none';
        document.getElementById("emailAlert").style.display = 'none';
        document.getElementById("confirmPasswordAlert").style.display = 'none';
      }, []);

      const textRegex = /^[A-Za-z]+$/;
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName.match(textRegex)) {
          document.getElementById("firstnameAlert").style.display = 'block';
          return;
        }
        if (!lastName.match(textRegex)) {
          document.getElementById("lastnameAlert").style.display = 'block';
          return;
        }
        if (!email.match(emailRegex)) {
          document.getElementById("emailAlert").style.display = 'block';
          return;
        }
        if (password !== document.getElementById("confirmPassword").value) {
          document.getElementById("confirmPasswordAlert").style.display = 'block';
          return;
        }
        const formDataToSend = {
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:password,
        };
      
        try {
        
          const response = await axios.post('https://swapsphere-backend.onrender.com/user/register', formDataToSend);
          console.log('User registered:', response); 
          if(response.data.email){
            navigate('/user/login');
          }
        
        } catch (error) {
          console.error('Registration error:', error); 
           
          if (error.response && error.response.data && error.response.data.error === 'Email already exists') {
            setRegistrationError('Account already exist with this email Id');
          }
        }
      };
      
        const firstnameValidation=(e)=>{
            setFirstName(e.target.value);
            
            if(document.getElementById("firstnameinput").value===''){
                document.getElementById("firstnameAlert").style.display = 'none';
            }
            else
            if(document.getElementById("firstnameinput").value.match(textRegex)){
                document.getElementById("firstnameAlert").style.display = 'none';
            }
            else{
                document.getElementById("firstnameAlert").style.display = 'block';
            }
        }

        const lastnameValidation=(e)=>{
            setLastName(e.target.value);
          
            if(document.getElementById("lastnameinput").value===''){
                document.getElementById("lastnameAlert").style.display = 'none';
            }
            else
            if(document.getElementById("lastnameinput").value.match(textRegex)){
                document.getElementById("lastnameAlert").style.display = 'none';
            }
            else{
                document.getElementById("lastnameAlert").style.display = 'block';
            }
        }
           
        const emailValidation=(e)=>{
            setEmail(e.target.value);
            setRegistrationError();
            if(document.getElementById("email").value===''){
                document.getElementById("emailAlert").style.display = 'none';
            }
            else
            if(document.getElementById("email").value.match(emailRegex)){
                document.getElementById("emailAlert").style.display = 'none';
            }
            else{
                document.getElementById("emailAlert").style.display = 'block';
            }
        }

        const passwordMatchValidation=()=>{
            setPassword(document.getElementById("password").value)
            if(document.getElementById("password").value !== document.getElementById("confirmPassword").value){
                document.getElementById("confirmPasswordAlert").style.display = 'block';
            }
           else{
            document.getElementById("confirmPasswordAlert").style.display = 'none';
           } 
        }

    return (
        <div class='container-fluid registertheme-color box  p-0 m-0 '>
                <div class="row m-0">
                    <div class="col-lg-5 d-none d-lg-flex justify-content-center align-items-center p-0 register-page-image"><img src={RegisterImage} alt="" /></div>
                    <div class="col-lg-7 custom-color max-height p-0 d-flex align-items-center ">
                        <div class="container-fluid m-0 p-4 ">
                            <div className="m-3  flex-responsive d-flex flex-column align-items-center justify-content-center">        
                                <p class="fs-1 font">Register Page</p>
                            </div>
                            <form className=' d-flex flex-column align-items-center justify-content-center p-3' onSubmit={handleSubmit}>
                            <div class="form-group my-2 w-75 ">
                                <label for="text " class=" mb-1  font  ">First name:</label>
                                <input type="text" class="form-control " id="firstnameinput" placeholder="Enter your Firstname" onChange={firstnameValidation}/>
                                <div id="firstnameAlert" class='text-white bg-danger rounded-2 ps-2'>The First name should contain only Alphabets.</div>
                                </div>

                                <div class="form-group my-2 w-75 ">
                                <label for="text " class=" mb-1  font  ">Last name:</label>
                                <input type="text" class="form-control " id="lastnameinput" placeholder="Enter your Lastname" onChange={lastnameValidation}/>
                                <div id="lastnameAlert" class='text-white bg-danger rounded-2 ps-2'>The Last name should contain only alphabets.</div>
                                </div>

                                <div class="form-group my-2 w-75 ">
                                <label for="email " class=" mb-1  font  ">Email:</label>
                                <input type="email" class="form-control " id="email" placeholder="Enter your email" onChange={emailValidation}/>
                                <div id="emailAlert" class='text-white bg-danger rounded-2 ps-2'>The email is not correct</div>
                                <div id="emailAlert" class='text-white bg-danger rounded-2 ps-2'>{registrationError}</div>
                                </div>
                                
                                <div class="form-group my-2 w-75">
                                <label for="password" class=" mb-1  font">Password:</label>
                                <input type="password" class="form-control rounded" id="password" placeholder="Enter Password" onChange={passwordMatchValidation}/>
                                </div>

                                <div class="form-group my-2 w-75">
                                <label for="password" class=" mb-1  font">ConfirmPassword:</label>
                                <input type="password" class="form-control rounded" id="confirmPassword" placeholder="Enter Confirm Password" onChange={passwordMatchValidation}/>
                                <div id="confirmPasswordAlert" class='text-white bg-danger rounded-2 ps-2'>Password do not match. </div>
                                </div>
                                <button type="submit " class="btn btn-primary mt-3 mx-1">Submit</button>
                             
                                    <button className="link-btn font-weight-bolder mt-3 " onClick={() => navigate("/user/login")}>Already have an account? Login here.</button>
            
                            </form>
                        </div>
                    </div>  
                </div>
            </div>
    );
};
export default RegisterPage;
