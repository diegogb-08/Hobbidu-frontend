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
        password: ''
    })

    const [password, setPassword] = useState({
        hideShow: 'password',
        showHide: 'SHOW'
    })

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState([]);

    // Style variable error

    const styles = {
        error: {
            borderColor: '#c92432',
            color: '#c92432',
            background: '#fffafa',
        },
        correct: {}
    }

    // HANDLERS

    const handleState = (e) => {
        setUser({...user, [e.target.name]: e.target.value, [e.target.name]: e.target.value});
        setMessage('')
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
            name: user.full_name,
            user_name: user.user_name,
            email: user.email,
            password: user.password
        }
            
        try {
            let result = await axios.post(port+customer, body)
            if (result) {
                let dataLogin = {
                    email : result.data.email,
                    password : user.password,
                }

        
                let resultLogin = await axios.post(port+customer+login, dataLogin)
                console.log(resultLogin)
                if (resultLogin) {          
                    props.dispatch({type: LOGIN, payload: resultLogin.data});
                    setTimeout(()=>{history.push('/home')},500)
                    // if (typeof resultLogin.data.user.hobby !== 'undefined' && resultLogin.data.user.hobby.length > 0) {
                        
                    // }
                    
                }
            } 
        } catch (error) {
            setMessage('User already exist! Try with different email or User name')
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
                        error={errors.full_name?.help}
                        style={errors.full_name?.status ?  styles.error : styles.correct}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type="text"
                        name="user_name"
                        onChange={handleState}
                        title="User Name"
                        error={errors.user_name?.help}
                        style={errors.user_name?.status ?  styles.error : styles.correct}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type="text"
                        name="email"
                        onChange={handleState}
                        title="Email"
                        error={errors.email?.help}
                        style={errors.email?.status ?  styles.error : styles.correct}
                    />
                </div>
                <div className="registerInput">
                    <InputForm
                        type={password.hideShow}
                        name="password"
                        onChange={handleState}
                        title="Password"
                        error={errors.password?.help}
                        style={errors.password?.status ?  styles.error : styles.correct}
                        showHide={password.showHide} 
                        onClick={() => showPassord()}
                    />
                </div>
                <div className="errorMessage">
                    <p>{message}</p>
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
