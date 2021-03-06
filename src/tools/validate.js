

export default function validate(fields, context = 'register') {
    let errors = {};
    if (context==='login')
        for (let key in fields) {
            switch (key) {
                case 'email':
                    if(! /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(fields[key]) )
                    errors[key] = {status: 'error', help: 'Please introduce a valid email.'};
                break;
                case 'password':
                    if(fields[key] === '')
                    errors[key] = {status: 'error', help: 'Please, introduce your password.'};
                break;

                default:
            }
        }
    else
        for (let key in fields) {
            switch (key) {
                case 'email':
                    if(! /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/.test(fields[key]) )
                        errors[key] = {status: 'error', help: 'Please introduce a valid email.'};
                break;
                case 'full_name' :
                    if(! /^[a-zA-Z\u00C0-\u00FF]+(([',. -][a-zA-Z\u00C0-\u00FF ])?[a-zA-Z\u00C0-\u00FF]*)*$/.test(fields[key]))
                        errors[key] = {status: 'error', help: 'Only letters are allowed in the Name field.'};
                break;
                case 'user_name' :
                    if(! /^(?=.{6,16}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(fields[key]))
                        errors[key] = {status: 'error', help: 'The user name must contain between 6 to 16 characters and special characters like "_" or ".".'};
                break;
                case 'phone_number' :
                    if(! /^(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/.test(fields[key])
                        && ! /^(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}/.test(fields[key]))
                        errors[key] = {status: 'error', help: 'Please provide a valid landline or mobile phone.'};
                break;
                case 'password' :
                    // eslint-disable-next-line
                    if(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\_.*])(?=.{8,})/.test(fields[key]))
                        errors[key] = {status: 'error', help: 'The password must contain at least 8 characters, uppercase, lowercase, a number and some special character.'};
                break;
                case 'repeatPassword' :
                    if(fields['repeatPassword'] !== fields['password'])
                        errors[key] = {status: 'error', help: 'The password must be the same in both fields'};
                break;

                default:
            }
        }
    return errors;
}