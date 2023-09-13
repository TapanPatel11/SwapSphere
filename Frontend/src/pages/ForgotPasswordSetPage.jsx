import React from 'react';
import { useEffect } from 'react';
import ForgotPassword from '../../images/rakshit images/forgotpasword.gif'
import '../css/ForgotPasswordPage.css';
import axios from 'axios';
import { useState } from 'react';



const ForgotPasswordSetPage = () => {
    const[error,setError] = useState('');
    const [otp, setOtp] = useState('');
    const[boolean,setBoolean] = useState('');
    const[password,setPassword]= useState('');
    const[confirmPassword,setConfirmPassword]= useState('');
    const [message,setMessage] = useState("")


    const handleOtpChange = (e) => {
        setOtp(e.target.value);
      };
    useEffect(() => {
        document.getElementById("confirmPasswordAlert").style.display = 'none';
      }, []);


      const passwordMatchValidation=()=>{
        setPassword(document.getElementById("password").value);
        setConfirmPassword(document.getElementById("confirmPassword").value);

        if(document.getElementById("password").value !== document.getElementById("confirmPassword").value){
            document.getElementById("confirmPasswordAlert").style.display = 'block';
            setBoolean("true");
        }
       else{
        document.getElementById("confirmPasswordAlert").style.display = 'none';
            setBoolean("false");
       } 
    }
    

    const handleForgotPassword = async (e) => {

        e.preventDefault();
        
        const passwordDataset = {
          otp: otp,
          bool : boolean,
          password: password
        };
        try {
          const response = await axios.post('https://swapsphere-backend.onrender.com/user/forgotpasswordset', passwordDataset );
        if(response.data.status =="true"){
            window.location.href = "/user/login";
        }
        else{
            alert("Something went wrong");
        }
        } catch (error) {
          setMessage(error.response.data.error);
        }
      };
    

    return (
        <div class='container-fluid box p-0 m-0 max-height'>
            <div class="row m-0 theme-color">
                <div class="col-lg-5 d-none d-lg-flex justify-content-center align-items-center max-height p-0"><img src={ForgotPassword}  alt="" /></div>
                <div class="col-lg-7  max-height p-0 d-flex align-items-center ">
                    <div class="container-fluid m-0 p-4 ">
                        <div className="text-white flex-responsive d-flex flex-column align-items-center justify-content-center">        
                            <p class="fs-1 font">Forgot Password Page</p>
                        </div>
                        <form className='d-flex flex-column align-items-center justify-content-center mb-0'>
                        <div class="form-group my-2 w-75 ">
                                <label for="text " class=" mb-1  font  ">OTP:</label>
                                <input type="text" class="form-control " id="otp" placeholder="Enter your otp"  onChange={handleOtpChange}/>
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
                        <button type="submit " class="btn btn-light mt-3 mx-1" onClick={handleForgotPassword}>Submit</button>
                        </form>
                        </div>
                    </div>  
                </div>
            </div>
    );
}

export default ForgotPasswordSetPage;
