import React, { useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { getTask, updateTask } from '../../app/UserTasks.slice';
import * as Yup from "yup";

export default function UpdateTaskModal({id}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const{t} = useTranslation();
  const dispatch = useDispatch()
  const {UserToken , usertask} = useSelector(function(store){
    return store
})
  const handleAddTask = (values) => {
    dispatch(updateTask({ values, usertoken : UserToken.usertoken , id })).then(() => {
      dispatch(getTask({ usertoken : UserToken.usertoken }));
    });
  };
  const validationSchema = Yup.object({
    title: Yup.string().required(t("title is required")),
    content: Yup.string().required(t("content is requierd"))
})
  const formik = useFormik({
    initialValues : {
      title: "",
      content: "",
  },
  validationSchema,
  onSubmit : handleAddTask

  })


  return (
    <div className=''>
      <i className='' onClick={handleOpen}  ripple="light">
      <i className="fa-solid fa-pen-to-square cursor-pointer"></i>
      </i>
      <Dialog open={open} handler={handleClose} size="sm">
        <DialogHeader className='font-Arsenal'>{t("Update Your Task Now")}</DialogHeader>
        <DialogBody>
        <form className='' onSubmit={formik.handleSubmit} >
            <div className='my-3 font-Arsenal'>
                <Input label={t("Title")} name='title' onBlur={formik.handleBlur} value={formik.values.title} onChange={formik.handleChange}   />
                {formik.errors.title && formik.touched.title ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.title}</p> : ""}
            </div>
            <div>
                <Input label={t("Content")} onBlur={formik.handleBlur} name='content' value={formik.values.content} onChange={formik.handleChange} />
                {formik.errors.content && formik.touched.content ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.content}</p> : ""}
            </div>
            <div className='flex gap-3 justify-end'>
              <Button className='my-3  font-Arsenal'  type='submit'>Save</Button>
              <Button className='my-3  font-Arsenal' type='submit' onClick={handleClose}>Close</Button>
            </div>
        </form>
        </DialogBody>

      </Dialog>
    </div>
  );
}
