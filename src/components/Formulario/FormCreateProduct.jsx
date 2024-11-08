import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import FormBs from 'react-bootstrap/Form';
import './formulario.css';
import { axiosInstance } from '../../services/axios.config';

const FormCreateProduct = () => {
    const [successMessage, setSuccessMessage] = useState('');

    const initialCredentials = {
        name: '',
        description: '',
        image: '',
        stock: '',
        price: ''
    };

    const formSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Nombre demasiado corto')
            .max(20, 'Nombre demasiado largo')
            .required('El campo es obligatorio'),
        description: Yup.string()
            .min(10, 'Descripción demasiado corta')
            .max(100, 'Descripción demasiado larga')
            .required('El campo es obligatorio'),
        image: Yup.string().required('El campo es obligatorio'),
        stock: Yup.number().required('El campo es obligatorio'),
        price: Yup.number().required('El campo es obligatorio')
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const response = await axiosInstance.post('/', values);
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
        }
    };

    return (
        <div className='container form-container'>
            {successMessage && <p className="alert alert-success">{successMessage}</p>}
            <Formik 
                initialValues={initialCredentials}
                validationSchema={formSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        {[
                            { name: 'name', label: 'Nombre del producto', type: 'text', placeholder: 'Coca-Cola' },
                            { name: 'description', label: 'Descripción', type: 'text', placeholder: 'Coca-Cola de 3 litros NO retornable' },
                            { name: 'image', label: 'Imagen', type: 'text', placeholder: 'URL de la imagen' },
                            { name: 'stock', label: 'Cantidad de stock', type: 'number', placeholder: '5' },
                            { name: 'price', label: 'Precio unitario', type: 'number', placeholder: '8000' },
                        ].map(({ name, label, type, placeholder }) => (
                            <FormBs.Group className='mb-3' key={name}>
                                <label htmlFor={name} className='form-label'>{label}</label>
                                <Field
                                    id={name}
                                    name={name}
                                    type={type}
                                    placeholder={placeholder}
                                    className='form-control field-input'
                                />
                                {errors[name] && touched[name] && (
                                    <ErrorMessage name={name} component='div' className="error-message" />
                                )}
                            </FormBs.Group>
                        ))}
                        <Button type="submit" className='btn btn-primary w-100' disabled={isSubmitting}>
                            {isSubmitting ? 'Enviando...' : 'Agregar producto'}
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormCreateProduct;
