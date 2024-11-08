import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import './ModalStyles.css';

const Modal = ({ item, onSubmit, onHide, ...props }) => {
    const initialCredentials = {
        name: item.name || '',
        description: item.description || '',
        image: item.image || '',
        stock: item.stock || '',
        price: item.price || ''
    };

    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'Nombre demasiado corto').max(20, 'Nombre demasiado largo').required('El campo es obligatorio'),
        description: Yup.string().min(10, 'Descripción demasiado corta').max(100, 'Descripción demasiado larga').required('El campo es obligatorio'),
        image: Yup.string().required('El campo es obligatorio'),
        stock: Yup.number().required('El campo es obligatorio'),
        price: Yup.number().required('El campo es obligatorio')
    });

    return (
        <ModalBs {...props} size="lg" centered aria-labelledby="modal-title" className="custom-modal">
            <ModalBs.Header closeButton className="" onClick={onHide}>
                <ModalBs.Title id="modal-title">Actualizar producto</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className="">
                <Formik
                    initialValues={initialCredentials}
                    validationSchema={formSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        await onSubmit(item.id, values);
                        setSubmitting(false);
                        onHide();
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {['name', 'description', 'image', 'stock', 'price'].map((field) => (
                                <FormBs.Group className="mb-3" key={field}>
                                    <label htmlFor={field} className="form-label">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </label>
                                    <Field
                                        id={field}
                                        name={field}
                                        type={field === 'stock' || field === 'price' ? 'number' : 'text'}
                                        placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                        className="form-control"
                                    />
                                    <ErrorMessage name={field} component="div" className="error-message" />
                                </FormBs.Group>
                            ))}
                            <Button type="submit" disabled={isSubmitting} className="btn btn-primary w-100">
                                {isSubmitting ? 'Actualizando producto...' : 'Actualizar producto'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </ModalBs.Body>
            <ModalBs.Footer className="">
                <Button onClick={onHide} className="btn-secondary">
                    Cancelar
                </Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default Modal;
