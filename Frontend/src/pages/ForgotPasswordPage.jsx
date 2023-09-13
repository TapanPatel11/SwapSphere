import React from 'react';
import { useEffect } from 'react';
import ForgotPassword from '../../images/rakshit images/forgotpasword.gif'
import '../css/ForgotPasswordPage.css';
import axios from 'axios'; 
import { useState } from 'react';

const ForgotPasswordPage = () => {
    const[error,setError] = useState('');
    const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

    useEffect(() => {
        document.getElementById("emailAlert").style.display = 'none';
      }, []);

      function generateSixDigitNumber() {
        const min = 100000;
        const max = 999999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    const emailValidation=(e)=>{
      setEmail(e.target.value)
        const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
        if(document.getElementById("email").value===''){
            document.getElementById("emailAlert").style.display = 'none';
        }
        else
        if(document.getElementById("email").value.match(email_regex)){
            document.getElementById("emailAlert").style.display = 'none';
        }
        else{
            document.getElementById("emailAlert").style.display = 'block';
        }
    }

  const handleForgotPassword = async (e) => {

    e.preventDefault();
    const randomNumber = generateSixDigitNumber();
    const passwordData = {
      email : email,
      number: randomNumber
    };
    try {
      const response = await axios.post('https://swapsphere-backend.onrender.com/user/forgotpassword', passwordData );
      console.log(response)
      if(response.data.status == "true"){
        window.location.href = "/user/forgotsetpassword"
      }
    } catch (error) {
      setMessage(error.response.data.error);
      alert(error)
    }
  };

    return (
        <div class='container-fluid box p-0 m-0 max-height'>
            <div class="row m-0 theme-color">
                <div class="col-lg-5 d-none d-lg-flex justify-content-center align-items-center max-height p-0"><img src={ForgotPassword}  alt="" /></div>
                <div class="col-lg-7  max-height p-0 d-flex align-items-center ">
                    <div class="container-fluid m-0 p-4 ">
                        <div className=" text-white flex-responsive d-flex flex-column align-items-center justify-content-center">        
                            <p class="fs-1 font">Forgot Password Page</p>
                        </div>
                        <form className=' d-flex flex-column align-items-center justify-content-center mb-0'>

                            <div class="form-group  w-75 ">
                            <label for="email " class=" mb-1 text-white   ">Enter the registered Email:</label>
                            <input type="email" class="form-control" id="email" placeholder="Enter your email" onChange={emailValidation}/>
                            <div id="emailAlert" class='text-white bg-danger rounded-2'>The email is not correct</div>
                            </div>

                            <button type="submit " class="btn btn-light ms-3 mt-3 mx-1" onClick = {handleForgotPassword} >Submit</button>
                        </form>
                    </div>
                </div>  
            </div>
        </div>
    
);
};
export default ForgotPasswordPage;
