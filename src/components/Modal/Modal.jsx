import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import ModalBs from 'react-bootstrap/Modal';
import FormBs from 'react-bootstrap/Form';
import './ModalStyles.css';

const Modal = ({ item, onSubmit, onHide, ...props }) => {
    /**
     * Valores iniciales para el formulario, prellenados con los datos del `item` si existen.
     * El campo `image` ha sido eliminado del formulario, pero el valor predeterminado
     * es un número aleatorio generado al enviarlo a la API.
     */
    const initialCredentials = {
        name: item.name || '',
        description: item.description || '',
        stock: item.stock || '',
        price: item.price || ''
    };

    /**
     * Esquema de validación usando Yup para el formulario.
     * Define las reglas para cada campo y muestra mensajes personalizados en caso de error.
     */
    const formSchema = Yup.object().shape({
        name: Yup.string().min(4, 'Nombre demasiado corto').max(100, 'Nombre demasiado largo').required('El campo es obligatorio'),
        description: Yup.string().min(10, 'Descripción demasiado corta').max(300, 'Descripción demasiado larga').required('El campo es obligatorio'),
        stock: Yup.number().required('El campo es obligatorio'),
        price: Yup.number().required('El campo es obligatorio')
    });

    return (
        <ModalBs {...props} size="lg" centered aria-labelledby="modal-title" className="custom-modal">
            <ModalBs.Header closeButton onClick={onHide}>
                <ModalBs.Title id="modal-title">Actualizar producto</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body>
                <Formik
                    initialValues={initialCredentials}
                    validationSchema={formSchema}
                    /**
                     * Envía los datos del formulario. Genera un valor aleatorio para `image`
                     * antes de enviarlo, para asegurar que la API no recibe un campo vacío.
                     */
                    onSubmit={async (values, { setSubmitting }) => {
                        // Agrega un valor aleatorio para `image` (ej. un número del 1 al 1000)
                        const valuesWithImage = { ...values, image: Math.floor(Math.random() * 1000) + 1 };
                        await onSubmit(item.id, valuesWithImage);
                        setSubmitting(false);
                        onHide();  // Cierra el modal después de enviar
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            {/* Renderiza los campos del formulario sin incluir `image` */}
                            {['name', 'description', 'stock', 'price'].map((field) => (
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
            <ModalBs.Footer>
                <Button onClick={onHide} className="btn-secondary">
                    Cancelar
                </Button>
            </ModalBs.Footer>
        </ModalBs>
    );
};

export default Modal;
