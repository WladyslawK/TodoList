import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import s from "./Login.module.css"
import {loginTC} from "./auth-reducer";
import {rootReducerType, useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {PATH} from "../../constants/constants";

type LoginValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha?: boolean
}


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: string
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useSelector<rootReducerType, boolean>(state => state.auth.isLoggedIn)
    const navigate = useNavigate()

    const validate = (values: LoginValuesType) => {
        let errors: FormikErrorType = {}
        if (!values.email) {
            errors.email = 'email required'
        }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

        if(!values.password){
            errors.password = "Password is requires"
        }

        return errors
    }


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            //alert(JSON.stringify(values, null, 2));
            dispatch(loginTC({...formik.values}))
        },
    })

    if (isLoggedIn) {
        navigate(PATH.TODOLISTS)
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email ? <div className={s.error}>{formik.errors.email}</div> : ''}

                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password ? <div className={s.error}>{formik.errors.password}</div> : ''}

                        <FormControlLabel label={'Remember me'} control={<Checkbox
                            name="rememberMe"
                            onChange={formik.handleChange}
                            checked={formik.values.rememberMe}
                        />}/>
                        {formik.errors.rememberMe ? <div className={s.error}>{formik.errors.email}</div> : ''}

                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}