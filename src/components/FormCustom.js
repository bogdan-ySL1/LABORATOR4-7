import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
const FormCustom = () => {
    const [form] = Form.useForm();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedFormData, setEditedFormData] = useState(null);
    const onSubmit = async () => {
        try {
            const values = await form.validateFields();
            const formDataKeys = Object.keys(localStorage);
            const isDuplicate = formDataKeys.some(key => {
                const storedFormData = JSON.parse(localStorage.getItem(key) || '{}');
                return (storedFormData.username === values.username &&
                    storedFormData.email === values.email &&
                    storedFormData.password === values.password);
            });
            if (isDuplicate) {
                message.error('Datele introduse sunt duplicate.');
            }
            else {
                const newId = formDataKeys.length + 1;
                const newFormData = { id: `formData${newId}`, ...values };
                localStorage.setItem(newFormData.id, JSON.stringify(newFormData));
                message.success('Înregistrare reușită!');
                form.resetFields();
            }
        }
        catch (error) {
            message.error('Toate câmpurile sunt obligatorii.');
        }
    };
    const handleLogin = async () => {
        try {
            const formDataKeys = Object.keys(localStorage);
            const username = form.getFieldValue('username');
            const password = form.getFieldValue('password');
            const isAuthenticated = formDataKeys.some(key => {
                const storedFormDataString = localStorage.getItem(key);
                if (storedFormDataString) {
                    const storedFormData = JSON.parse(storedFormDataString);
                    return storedFormData.username === username && storedFormData.password === password;
                }
                return false;
            });
            if (isAuthenticated) {
                message.success('Autentificare reușită!');
                setIsAuthenticated(true);
                localStorage.setItem('auth', username);
            }
            else {
                message.error('Autentificare nereușită!');
            }
        }
        catch (error) {
            message.error('A apărut o eroare la autentificare.');
        }
    };
    const handleLogout = () => {
        localStorage.removeItem('auth');
        setIsAuthenticated(false);
    };
    const handleEdit = async () => {
        try {
            const formDataKeys = Object.keys(localStorage);
            const username = form.getFieldValue('username');
            const storedFormData = formDataKeys
                .map(key => JSON.parse(localStorage.getItem(key) || '{}'))
                .find(data => data.username === username);
            if (storedFormData) {
                setEditedFormData(storedFormData);
                setIsEditing(true);
            }
            else {
                await message.warning('Nu există date anterioare disponibile pentru editare.');
            }
        }
        catch (error) {
            await message.error('A apărut o eroare la editare.');
        }
    };
    const handleUpdate = async (values) => {
        try {
            const formDataKeys = Object.keys(localStorage);
            formDataKeys.forEach(key => {
                const storedFormData = JSON.parse(localStorage.getItem(key) || '{}');
                if (storedFormData.username === values.username) {
                    localStorage.setItem(key, JSON.stringify(values));
                    if (localStorage.getItem('auth') === values.username) {
                        localStorage.setItem('auth', values.username);
                    }
                    message.success('Actualizare reușită!');
                    setIsEditing(false);
                }
            });
        }
        catch (error) {
            message.error('A apărut o eroare la actualizare.');
        }
    };
    return (_jsxs("div", { children: [!isAuthenticated && (_jsxs(Form, { form: form, onFinish: onSubmit, name: "basic", labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 }, autoComplete: "off", children: [_jsx(Form.Item, { label: "Username", name: "username", rules: [{ required: true, message: 'Username-ul este obligatoriu' }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: 'Email-ul este obligatoriu' }], children: _jsx(Input, { type: "email" }) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: 'Parola este obligatorie' }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { name: "remember", valuePropName: "checked", wrapperCol: { offset: 8, span: 16 }, children: _jsx(Checkbox, { children: "Remember me" }) }), _jsxs(Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: [_jsx(Button, { type: "primary", htmlType: "submit", children: "Register" }), _jsx(Button, { type: "default", onClick: handleLogin, style: { marginLeft: 8 }, children: "Login" })] })] }, "register")), isAuthenticated && (_jsxs("div", { children: [_jsxs("p", { children: ["Bine ai venit, ", localStorage.getItem('auth'), "!"] }), _jsx(Button, { type: "default", onClick: handleLogout, children: "Logout" }), _jsx(Button, { type: "default", onClick: handleEdit, style: { marginLeft: 8 }, children: "Edit" })] })), isEditing && (_jsxs(Form, { form: form, onFinish: handleUpdate, initialValues: editedFormData ? { ...editedFormData, remember: false } : undefined, labelCol: { span: 8 }, wrapperCol: { span: 16 }, style: { maxWidth: 600 }, autoComplete: "off", children: [_jsx(Form.Item, { label: "Username", name: "username", children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", children: _jsx(Input, { type: "email" }) }), _jsx(Form.Item, { label: "Password", name: "password", children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { name: "remember", valuePropName: "checked", wrapperCol: { offset: 8, span: 16 }, children: _jsx(Checkbox, { children: "Remember me" }) }), _jsxs(Form.Item, { wrapperCol: { offset: 8, span: 16 }, children: [_jsx(Button, { type: "primary", htmlType: "submit", children: "Update" }), _jsx(Button, { type: "default", onClick: () => setIsEditing(false), style: { marginLeft: 8 }, children: "Cancel" })] })] }, "edit"))] }));
};
export default FormCustom;
