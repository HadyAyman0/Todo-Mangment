import React, { useEffect, useState } from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button, Input } from '@material-tailwind/react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { addTask, getTask, usertaskactions } from '../../app/UserTasks.slice';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup"
export default function AddTaskModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {UserToken , usertask} = useSelector(function(store){
    return store
})

  const handleAddTask = (values) => {
    dispatch(addTask({ values, usertoken : UserToken.usertoken })).then(() => {
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
    <div className='font-Arsenal'>
      <Button className='bg-[#735F32] font-Arsenal' onClick={handleOpen}  boolean="light">
        {t("+ Add Task")}
      </Button>
      <Dialog open={open} handler={handleClose} size="sm">
        <DialogHeader className='font-Arsenal'>{t("Add Task Now")}</DialogHeader>
        <DialogBody>
        <form className='font-Arsenal' onSubmit={formik.handleSubmit} >
            <div className='my-3'>
                <Input label={t("Title")} name='title' onBlur={formik.handleBlur} type='text' value={formik.values.title} onChange={formik.handleChange} />
                {formik.errors.title && formik.touched.title ? <p className='text-[#5f5f5f] mt-1'>* {formik.errors.title}</p> : ""}
            </div>
            <div>
                <Input label={t("Content")} name='content' onBlur={formik.handleBlur} type='text' value={formik.values.content} onChange={formik.handleChange} />
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
