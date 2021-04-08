import React, {useState}  from 'react'
import {useHistory} from 'react-router-dom'; 
import InputForm from '../InputForm/InputForm';
import axios from 'axios';
import {LOGIN} from '../../redux/types/userType';
import {connect} from 'react-redux';
import validate from "../../tools/validate";
import {port,customer,login} from '../../tools/apiPaths';
import Button from '../Button/Button';


const Login = (props) => {

    let history = useHistory();

    // HOOKS

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })

    const [password, setPassword] = useState({
        hideShow: 'password',
        showHide: 'SHOW'
    })

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState([]);


    // HANDLERS

    const handleState = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value});
        if (Object.keys(errors).length > 0) 
        setErrors(validate({ ...credentials, [e.target.name]: e.target.value, [e.target.name]: e.target.value}, "register"));
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

        const errs = validate(credentials, "login");
        setErrors(errs);

        if (Object.keys(errs).length === 0) {
            try{
                let result = await axios.post(port+customer+login, credentials)
                if(result) {
                    props.dispatch({type: LOGIN, payload: result.data});
                    if(result.data.user.email === 'fakeflix@fakeflix.com'){
                        history.push('/admin')
                    }else{
                    history.push('/user')
                    }
                }else {
                    setMessage('Email or password not found')
                }
            }catch(err){
                setMessage('Email or password not found')
            }
        }
        
    }


    return (
        <div className="loginComponent">
            <div className="loginTitle">
                <h1><span>LOGIN</span></h1>
            </div>
            <div className="loginContainer">
                <div className="loginInput">
                    <InputForm
                        type="text"
                        name="email"
                        onChange={handleState}
                        title="Email"
                        error={errors.email?.help ? errors.email.help : message}
                        value={credentials.email}
                    />
                </div>
                <div className="loginInput">
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
                <div className="loginInput buttonLogin">
                    <Button onClick={()=>toggle()}>
                        Enjoy!
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default connect()(Login)
