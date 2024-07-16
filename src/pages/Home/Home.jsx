import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

import AddTaskModal from '../../components/Modal/AddTaskModal'
import UpdateTaskModal from '../../components/Modal/UpdateTaskModal'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, getTask } from '../../app/UserTasks.slice'
import { jwtDecode } from 'jwt-decode'



export default function Home() {

    const { t } = useTranslation();
    const dispatch = useDispatch()
    const { UserToken, usertask, googleToken } = useSelector(function (store) {
        return store;
    })
    const { response } = googleToken;
    const { getTaskData, isLoading } = usertask;
    const { email } = jwtDecode(UserToken.usertoken);
    useEffect(() => {
        dispatch(getTask({ usertoken: UserToken.usertoken }));
    }, [])

    if (isLoading) {
        return <section className='min-h-screen'>
        <div className="container flex justify-center items-center">
            <span className="loader"></span>
        </div>
    </section>
    }
    return (
        <>
            <section className='min-h-screen bg-[#000000]'>
                <div className="conatiner p-5 flex flex-col gap-8 justify-center items-center  my-5 ">
                    <div className='p-10 border-[#93B1A6] rounded-2xl border-[1px] flex justify-center items-center gap-8'>
                        <div>
                            <h1 className='text-[#EEEDEB] font-bold text-4xl'>{t("Your Total Todo")}</h1>
                            <p className='text-[#E6B9A6] text-2xl md:ml-4'>{t("keep it up")}</p>
                        </div>
                        <div className='rounded-full flex justify-center text-black font-extrabold text-3xl items-center bg-[#735F32] p-14 w-[20px] h-[20px]'>
                            {getTaskData ? getTaskData.notes.length : "0"}
                        </div>
                    </div>
                    <AddTaskModal />
                    {getTaskData === undefined ? <> <h1 className='text-white font-extrabold text-4xl'>{t("There No Tasks yet please add some Tasks")}</h1></> :
                        <div className="container mx-auto p-4">
                            <div className="overflow-x-auto">
                                <table className="min-w-full text-white">
                                    <thead>
                                        <tr>
                                            <th className="py-2 px-4 border-b ">{t("Info")}</th>
                                            <th className="py-2 px-4 border-b ">{t("Title")}</th>
                                            <th className="py-2 px-4 border-b ">{t("Content")}</th>
                                            <th className="py-2 px-4 border-b ">{t("created at")}</th>
                                            <th className="py-2 px-4 border-b ">{t("Actions")}</th>
                                        </tr>
                                    </thead>
                                    {getTaskData ? getTaskData.notes.map((task) => {
                                        return <tbody>
                                            <tr key={task._id} className=" text-center">
                                                <td className="py-2 px-4 gap-3 flex items-center justify-center">
                                                    <picture>
                                                        <img
                                                            src={response === null ? "https://cdn-icons-png.flaticon.com/512/149/149071.png" : response.picture}
                                                            className='  sm:w-[30px] sm:h-[30px] sm:rounded-full' alt="" />
                                                    </picture>
                                                    <div className='font-semibold'>
                                                    {email}
                                                    </div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="font-semibold">{task.title}</div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="font-semibold">{task.content}</div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className="font-semibold">{task.createdAt.slice(0, 10)}</div>
                                                </td>
                                                <td className="py-2 px-4">
                                                    <div className='flex gap-3 justify-center items-center'>
                                                        <UpdateTaskModal id={task._id} />
                                                        <i className="fa-solid fa-trash cursor-pointer " onClick={() => {
                                                            dispatch(deleteTask({ usertoken: UserToken.usertoken, id: task._id })).then(() => {
                                                                dispatch(getTask({ usertoken: UserToken.usertoken }))
                                                            })
                                                        }} ></i>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    }) : <> <h1 className='text-white'>Loading</h1> </>}
                                </table>
                            </div>
                        </div>
                    }

                </div>
            </section>
        </>
    )
}

