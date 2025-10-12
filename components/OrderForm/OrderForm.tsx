import React from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import css from "./OrderForm.module.css";
import clsx from 'clsx';

const BookingSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short!') 
        .max(50, 'Too long!') 
        .required('Name is a required field'), 
    email: Yup.string()
        .email('Invalid email format') 
        .required('Email is a required field'), 
    bookingDate: Yup.date()
        .required('Booking date is a required field'),
    comment: Yup.string().max(500, 'Comment is too long'),
});

export const OrderForm = ({ id }: { id: string }) => {

    return <div className={css.formWrap}>
        <h3 className={css.formTitle}>Book your campervan now</h3>
        <p className={css.formText}>Stay connected! We are always ready to help you.</p>

        <Formik
            initialValues={{
                camperId: id,
                name: '',
                email: '',
                bookingDate: '',
                comment: '',
            }}
            validationSchema={BookingSchema}
            onSubmit={(values, actions) => {
                console.log('Дані форми:', values);
                alert(`Бронювання на ім'я ${values.name} відправлено!`);
                actions.setSubmitting(false);
                actions.resetForm();
            }}
        >
            <Form className={css.form}>

                <div className={css.fieldContainer}>
                    <Field
                        name="name"
                        type="text"
                        placeholder="Name*"
                        className={css.input}
                    />
                    <ErrorMessage name="name" component="div" className={css.errorText} />
                </div>

                <div className={css.fieldContainer}>
                    <Field
                        name="email"
                        type="email"
                        placeholder="Email*"
                        className={css.input}
                    />
                    <ErrorMessage name="email" component="div" className={css.errorText} />
                </div>

                <div className={css.fieldContainer}>
                    <Field
                        name="bookingDate"
                        type="date"
                        placeholder="Booking date*"
                        className={clsx(css.input, css.dateInput)}
                    />
                    <ErrorMessage name="bookingDate" component="div" className={css.errorText} />
                </div>

                <div className={css.fieldContainer}>
                    <Field
                        name="comment"
                        as="textarea" 
                        placeholder="Comment"
                        className={css.textarea}
                    />
                    <ErrorMessage name="comment" component="div" className={css.errorText} />
                </div>

                <button type="submit" className={css.button}>Send</button>
            </Form>
        </Formik>
    </div>;
}