import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Modal } from 'react-bootstrap';
import FormBs from 'react-bootstrap/Form';
import './ModalCreateProduct.css';
import { axiosInstance } from '../../services/axios.config';

const ModalCreateProduct = ({ show, onHide }) => {
    const [successMessage, setSuccessMessage] = useState('');

    /**
     * initialCredentials - Valores iniciales del formulario.
     * @type {Object}
     */
    const initialCredentials = {
        name: '',
        description: '',
        stock: '',
        price: ''
    };

    /**
     * formSchema - Esquema de validación para el formulario usando Yup.
     * Define restricciones para los campos de nombre, descripción, stock y precio.
     * @type {Object}
     */
    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(100, 'Nombre demasiado largo')
            .required('El campo es obligatorio'),
        description: Yup.string()
            .min(10, 'Descripción demasiado corta')
            .max(300, 'Descripción demasiado larga')
            .required('El campo es obligatorio'),
        stock: Yup.number().required('El campo es obligatorio'),
        price: Yup.number().required('El campo es obligatorio')
    });

    /**
     * handleSubmit - Maneja el envío del formulario y envía los datos a la API.
     * Genera un valor de imagen aleatorio y lo agrega a los datos antes de enviar.
     * 
     * @param {Object} values - Valores del formulario.
     * @param {Object} formikBag - Herramientas adicionales de Formik para manipular el formulario.
     * @returns {void}
     */
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            // Genera un número aleatorio para la imagen y lo añade a los datos enviados
            const dataToSend = {
                ...values,
                image: Math.floor(Math.random() * 10000) // Número aleatorio como valor de imagen
            };

            const response = await axiosInstance.post('/', dataToSend);
            if (response.status === 201) {
                setSuccessMessage('Producto agregado');
                resetForm();
                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                throw new Error(`[${response.status}] Error en la solicitud`);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
            onHide(); // Cierra el modal al enviar
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Agregar nuevo producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {successMessage && <p className="alert alert-success">{successMessage}</p>}
                <Formik 
                    initialValues={initialCredentials}
                    validationSchema={formSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched, isSubmitting }) => (
                        <Form>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='name' className='form-label'>Nombre del producto</label>
                                <Field
                                    id='name'
                                    name='name'
                                    type='text'
                                    placeholder='Coca-Cola'
                                    className='form-control field-input'
                                />
                                {errors.name && touched.name && (
                                    <ErrorMessage name='name' component='div' className="error-message" />
                                )}
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='description' className='form-label'>Descripción</label>
                                <Field
                                    id='description'
                                    name='description'
                                    type='text'
                                    placeholder='Coca-Cola de 3 litros NO retornable'
                                    className='form-control field-input'
                                />
                                {errors.description && touched.description && (
                                    <ErrorMessage name='description' component='div' className="error-message" />
                                )}
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='stock' className='form-label'>Cantidad de stock</label>
                                <Field
                                    id='stock'
                                    name='stock'
                                    type='number'
                                    placeholder='5'
                                    className='form-control field-input'
                                />
                                {errors.stock && touched.stock && (
                                    <ErrorMessage name='stock' component='div' className="error-message" />
                                )}
                            </FormBs.Group>
                            <FormBs.Group className='mb-3'>
                                <label htmlFor='price' className='form-label'>Precio unitario</label>
                                <Field
                                    id='price'
                                    name='price'
                                    type='number'
                                    placeholder='$50'
                                    className='form-control field-input'
                                />
                                {errors.price && touched.price && (
                                    <ErrorMessage name='price' component='div' className="error-message" />
                                )}
                            </FormBs.Group>
                            <Button type="submit" className='btn btn-primary w-100' disabled={isSubmitting}>
                                {isSubmitting ? 'Enviando...' : 'Agregar producto'}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalCreateProduct;
