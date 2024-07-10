import { Button, Input } from '@material-tailwind/react'
import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useFormik } from 'formik'
import { jwtDecode } from 'jwt-decode'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import * as Yup from "yup"
import { actions } from '../../app/GoogleToken.slice'
import { useTranslation } from 'react-i18next'
import { UserTokenActions } from '../../app/UserToken.slice'

export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {t,i18n} = useTranslation()

    const {SetUserToken} = UserTokenActions;
    const { SetResponse } = actions;
    const validationSchema = Yup.object({
        email: Yup.string().required(t("email is required")).email(t("this must be an email")),
        password: Yup.string().required(t("password is requierd")).matches(/^[A-Z][A-Za-z0-9]{5,25}$/, t("password is invalid"))
    })

    async function sendData(values) {
        try {
            const options = {
                url: `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
                method: "POST",
                data: values,
            }
            const { data } = await axios.request(options);
            console.log(data);
            toast.success(data.msg);
            dispatch(SetUserToken(data.token));
            navigate("/")
        } catch (error) {
            console.log(error);
            toast.error(error.request.data.msg)
        }
    }
    async function CreateDataViaGoogle(){
        const {email,name} = JSON.parse(localStorage.getItem("GoogleToken"));
        const obj2 = {
            password:"Hady123",
            age:"28",
            phone:"01119551085"
        }
        const FinalValus = {
            name,
            email,
            ...obj2
        };
        const options = {
            url:`https://note-sigma-black.vercel.app/api/v1/users/signUp`,
            method : "POST",
            data : FinalValus,
        }
        const {data} = await axios.request(options);
        console.log(data);
    }

    async function sendDataViaGoogle() {
        try {
            const {email} = JSON.parse(localStorage.getItem("GoogleToken"));
            const FinalValues = {email,password:"Hady123"}
            const options = {
                url: `https://note-sigma-black.vercel.app/api/v1/users/signIn`,
                method: "POST",
                data: FinalValues,
            }
            const { data } = await axios.request(options);
            console.log(data);
            toast.success(data.msg);
            dispatch(SetUserToken(data.token));
            navigate("/")

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg);

        }
    }
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema,

        onSubmit: sendData,
    })


    return (
        <>
            <section className='min-h-screen p-5 flex justify-center items-center bg-[#000000]'>
                <div className="container flex justify-center items-center ">
                    <div className='md:w-[70%] sm:w-[70%] lg:w-[50%] w-full  xl:w-[40%] shadow-2xl rounded-xl p-8  bg-white'>
                        <h1 className='text-3xl font-extrabold uppercase text-center'> {t("Login")} </h1>
                        <p className='mt-2 uppercase text-center'> {t("Welcome")}</p>
                        <div className=' flex items-center justify-center my-3 '>
                            <GoogleLogin
                                onSuccess={credentialResponse => {
                                    dispatch(SetResponse(jwtDecode(credentialResponse.credential)))
                                    localStorage.setItem("GoogleToken",JSON.stringify(jwtDecode(credentialResponse.credential)))
                                    // navigate("/auth/completesignin")
                                    CreateDataViaGoogle();
                                    sendDataViaGoogle();

                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                            />
                        </div>

                        <div className='flex gap-3 relative before:absolute  before:w-[38%] before:h-[1px] before:bg-black before:bg-opacity-35 before:left-0 items-center justify-center after:absolute after:w-[38%] after:h-[1px]  after:right-0 after:bg-black after:bg-opacity-35  p-2 '>
                            <p className=''> {t("Or")} </p>
                        </div>
                        <form className='p-3 ' onSubmit={formik.handleSubmit}>
                            <div className='mt-3'>
                                <Input label={t("Email addres")} onBlur={formik.handleBlur} type='email' value={formik.values.email} onChange={formik.handleChange} name='email' />
                                {formik.errors.email && formik.touched.email ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.email}</p> : ""}
                            </div>
                            <div className='mt-3'>
                                <Input label={t("Password")} onBlur={formik.handleBlur} type='password' value={formik.values.password} onChange={formik.handleChange} name='password' />
                                {formik.errors.password && formik.touched.password ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.password}</p> : ""}
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                <Button className='bg-[#183D3D] ' type='submit'>{t("Sign in")} </Button>
                            </div>
                            <p className='text-center'>{t("No account ?")} <Link to="/auth/signin"><span className='text-[#5C8374] cursor-pointer'>{t("signup now")}</span></Link> </p>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}
