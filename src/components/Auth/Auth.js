import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import { authenticate } from '../../store/actions/auth';


const VALIDATIONS = {
    name: {
        regex: /(.*[a-z]){3}/i,
        message: 'Name should be more than 3 letters.'
    },
    email: {
        regex: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
        message: "Enter a valid email",
    },
    password: {
        regex: /(.*[a-z]){6}/i,
        message: 'Password should be minumum 6 charecters.'
    }
}
export default function Auth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [user, setUser] = React.useState({ name: '', email: '', password: '' });
    const [action, setAction] = React.useState('signin');
    const [errors, setErrors] = React.useState({ name: '', email: '', password: '' })
    const [notification, setNotification] = React.useState({ open: false, message: '' });

    const onFieldChange = (event) => {
        let userDetails = { ...user }
        userDetails[event.target.name] = event.target.value;
        let errorDetails = { ...errors };
        const isValid = VALIDATIONS[event.target.name].regex.test(event.target.value);
        errorDetails[event.target.name] = !isValid ? VALIDATIONS[event.target.name].message : ''

        setErrors(errorDetails)
        setUser(userDetails)
    }
    const onAction = async () => {
        if (isValid()) {
            if (action === 'signin') {
                delete user.name;
            }
            console.log(user)
            dispatch(authenticate(`user/${action}`, user, navigate))
            // try {
            //     console.log(user, action)
            //     let response = await post(`user/${action}`, user)
            //     console.log(response)
            //     setNotification({open:true, message:response.message})
            // } catch (e) {
            //     console.log(e)
            //     setNotification({open:true, message:e.response.message})
            // }
        }
    }
    const isValid = () => {
        const errorsLength = Object.values(errors).filter(v => v !== '').length;
        let userDetailsLength = Object.values(user).filter(v => v === '').length;
        userDetailsLength = action === 'signin' ? userDetailsLength - 1 : userDetailsLength;
        return errorsLength <= 0 && userDetailsLength <= 0
    }
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Card sx={{ minWidth: 450 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                    {action === 'signup' && <TextField id="outlined-basic" type="text" error={errors['name']} helperText={errors['name']} label="Name" sx={{ mb: 1.5 }} name="name" variant="outlined" onChange={onFieldChange} />}
                    <TextField id="outlined-basic" type="email" label="Email" name="email" error={errors['email']} helperText={errors['email']} variant="outlined" sx={{ mb: 1.5 }} onChange={onFieldChange} />
                    <TextField id="outlined-basic" type="password" label="Password" error={errors['password']} helperText={errors['password']} name="password" variant="outlined" onChange={onFieldChange} />
                </CardContent>
                <CardActions sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
                    <Button size="small" variant="contained" onClick={onAction}>{action?.toUpperCase()}</Button>
                    <Button size="small" onClick={() => setAction(action === 'signin' ? 'signup' : 'signin')}>{`${action === 'signin' ? 'signup' : 'signin'} Instead`}</Button>
                </CardActions>
            </Card>
            <Snackbar
                open={notification.open}
                autoHideDuration={1000}
                // onClose={handleClose}
                message={notification.message || ''}
            // action={action}
            />
        </Box>
    );
}
