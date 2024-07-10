import React from 'react'
import { Button, Input } from '@material-tailwind/react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from "yup"
import axios from 'axios'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
export default function Signin() {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const validationSchema = Yup.object({
        name: Yup.string().required(t("name is required")).min(3, t("name should be at leaset 3 char")).max(16,t("name should be at max 16 char")),
        email: Yup.string().required(t("email is required")).email(t("this must be an email")),
        password: Yup.string().required(t("password is requierd")).matches(/^[A-Z][0-9a-zA-Z]{5,25}$/, t("password should be start with a capital letter and follwed by a combinations od letters and numbers")),
        age: Yup.string().required(t("age is required")),
        phone: Yup.string().required(t("phone is required")).matches(PhoneRegex,t("phone number is not vaild")),
    })
    async function sendData(values) {
        try {
            const options = {
                url: `https://note-sigma-black.vercel.app/api/v1/users/signUp`,
                method: "POST",
                data: values,
            }
            const { data } = await axios.request(options);
            console.log(data);
            toast.success(data.msg)
            setTimeout(function () {
                navigate("/auth/login")
            }, 2000)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.msg)
        }
    }


    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            age: "",
            phone: ""
        },
        validationSchema,
        onSubmit: sendData
    })
    return (
        <>
            <section className='min-h-screen p-5 flex justify-center items-center bg-[#000000]'>
                <div className="container flex justify-center items-center ">
                    <div className='md:w-[70%] sm:w-[70%] lg:w-[50%] w-full  xl:w-[40%] shadow-2xl rounded-xl p-8  bg-white'>
                        <h1 className='text-3xl font-extrabold uppercase text-center mb-2'>{t("Sign in")} </h1>
                        <p className='mt-1 uppercase text-center my-2'>{t("Welcome")}</p>
                        <form className='p-2 ' onSubmit={formik.handleSubmit} >
                            <div className='mt-3'>
                                <Input label={t("name")} onBlur={formik.handleBlur} name='name' type='text' value={formik.values.name} onChange={formik.handleChange} />
                                {formik.errors.name && formik.touched.name ? <p className='text-[#5f5f5f] mt-1 '>* {formik.errors.name}</p> : ""}
                            </div>
                            <div className='mt-3'>
                                <Input label={t("Email addres")} onBlur={formik.handleBlur} name='email' type='email' value={formik.values.email} onChange={formik.handleChange} />
                                {formik.errors.email && formik.touched.email ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.email}</p> : ""}
                            </div>
                            <div className='mt-3'>
                                <Input label={t("Password")} onBlur={formik.handleBlur} name='password' type='password' value={formik.values.password} onChange={formik.handleChange} />
                                {formik.errors.password && formik.touched.password ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.password}</p> : ""}
                            </div>
                            <div className='mt-3'>
                                <Input label={t("Age")} onBlur={formik.handleBlur} type='number' name='age' value={formik.values.age} onChange={formik.handleChange} />
                                {formik.errors.age && formik.touched.age ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.age}</p> : ""}
                            </div>
                            <div className='mt-3'>
                                <Input label={t("phone")} onBlur={formik.handleBlur} type='number' name='phone' value={formik.values.phone} onChange={formik.handleChange} />
                                {formik.errors.phone && formik.touched.phone ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.phone}</p> : ""}
                            </div>
                            <div className='flex justify-center items-center my-3'>
                                <Button type='submit' className='bg-[#183D3D] '>{t("Sign in")} </Button>
                            </div>
                            <p className='text-center'>{t("Have already acount?")}<Link to="/"><span className='text-[#5C8374] cursor-pointer'>{t("Login now")}</span></Link> </p>
                        </form>

                    </div>
                </div>
            </section>
        </>
    )
}
