import React, { useState } from 'react'
import InputForm from '../InputForm/InputForm'
import {useHistory} from 'react-router-dom';
import validate from "../../tools/validate";
import {connect} from 'react-redux';
import {LOGIN} from '../../redux/types/userType'
import axios from 'axios'
import {port,customer,login} from '../../tools/apiPaths';
import Button from '../Button/Button';



const Register = (props) => {

    let history = useHistory();

    // HOOKS
    const [user, setUser] = useState({
        full_name: '',
        user_name: '',
        email: '',
        password: '',
        birth_date: '',
        hobbies: []
    })

    const [password, setPassword] = useState({
        hideShow: 'password',
        showHide: 'SHOW'
    })

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState([]);

    // HANDLERS

    const handleState = (e) => {
        setUser({...user, [e.target.name]: e.target.value, [e.target.name]: e.target.value});
        if (Object.keys(errors).length > 0) 
        setErrors(validate({ ...user, [e.target.name]: e.target.value, [e.target.name]: e.target.value}, "register"));
    }
    // FUNCTIONS

    const showPassord = () => {

        if(password.hideShow === "password"){
            return setPassword({...password, hideShow: 'text', showHide: 'HIDE'});
        }else{
            return setPassword({...password, hideShow: 'password', showHide: 'SHOW'});
        }
    }

        const toggle = async () => {

            const errs = validate(user, "register");
            setErrors(errs);
        
            if (Object.keys(errs).length > 0) return;
            
            let body = {
            email: user.email,
            password: user.password
            }
            
            try {
            let result = await axios.post(port+customer, body)
            
            if (result.data?.email) {
                let dataLogin = {
                email : result.data.email,
                password : user.password
                }
        
                let resultLogin = await axios.post(port+customer+login, dataLogin)
                
                if (resultLogin) {          
                    props.dispatch({type: LOGIN, payload: resultLogin.data});
                    if(resultLogin.data.user.email === 'fakeflix@fakeflix.com'){
                    history.push('/admin')
                    }else{
                    history.push('/user')
                    }
                }
            } 
            } catch (error) {
            setMessage('User already exist!')
            }
        };

    return (
        <div className='registerComponent'>
            <div className="registerTitle">
                <h2><span>REGISTER!</span></h2>
            </div>
            <div className="registerContainer">
                <div className="registerInput">
                    <InputForm
                        type="text"
                        name="full_name"
                        onChange={handleState}
                        title="Full Name"
                        error={errors.full_name?.help ? errors.full_name.help : message}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type="text"
                        name="user_name"
                        onChange={handleState}
                        title="User Name"
                        error={errors.user_name?.help ? errors.user_name.help : message}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type="text"
                        name="name"
                        onChange={handleState}
                        title="Email"
                        error={errors.email?.help ? errors.email.help : message}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type={password.hideShow}
                        name="password"
                        onChange={handleState}
                        title="Password"
                        error={errors.password?.help ? errors.password.help : message}
                        showHide={password.showHide} 
                        onClick={() => showPassord()}
                    />
                </div>
                <div className="registerInput buttonLogin">
                    <Button onClick={()=>toggle()}>
                       <p>Continue</p> 
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default connect()(Register)
