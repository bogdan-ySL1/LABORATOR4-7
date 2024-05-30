import React, { useState } from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';

const LoginCustom: React.FC = () => {
    const [formDataList, setFormDataList] = useState<any[]>([]);
    const [form] = Form.useForm();
    const [loginMessage, setLoginMessage] = useState<string>('');
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    const onSubmit = () => {
        form.validateFields()
            .then(values => {
                const updatedFormDataList = [...formDataList, values];
                setFormDataList(updatedFormDataList);
                localStorage.setItem('formDataList', JSON.stringify(updatedFormDataList));
                localStorage.setItem('curentUser', JSON.stringify(values.username))
                message.success('Utilizatorul a fost înregistrat cu succes!');
            })
            .catch(() => {
                message.error('Toate câmpurile sunt obligatorii.');
            });
    }

    const handleLogin = () => {
        const storedFormDataList = JSON.parse(localStorage.getItem('formDataList') || '[]');

        const currentUser = storedFormDataList.find((userData: any) =>
            userData.username === form.getFieldValue('username') &&
            userData.email === form.getFieldValue('email') &&
            userData.password === form.getFieldValue('password')
        );
        localStorage.setItem('curentUser', JSON.stringify(currentUser.username))

        if (currentUser) {
            setIsLoggedIn(true);
            setLoginMessage('Datele introduse sunt corecte. Autentificare reușită!');
        } else {
            setLoginMessage('Datele introduse nu corespund. Autentificare eșuată.');
        }
    }

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('curentUser');
        message.success('Deconectare reușită!');
    }

    return (
        <div>
            {!isLoggedIn ? (
                <Form form={form} onFinish={onSubmit}
                      name="basic"
                      labelCol={{ span: 8 }}
                      wrapperCol={{ span: 16 }}
                      style={{ maxWidth: 600 }}
                      autoComplete="off"
                >
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email-ul este obligatoriu' }]}>
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Username-ul este obligatoriu' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Parola este obligatorie' }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox>Memorare</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">Register</Button>
                        <Button type="default" onClick={handleLogin} style={{ marginLeft: 8 }}>Login</Button>
                    </Form.Item>
                </Form>
            ) : (
                <div>
                    <p>Bun venit, {form.getFieldValue('username')}!</p>
                    <Button type="default" onClick={handleLogout}>Logout</Button>
                </div>
            )}
            {loginMessage && <div style={{ marginTop: 16 }}>{loginMessage}</div>}
        </div>
    );
}

export default LoginCustom;
