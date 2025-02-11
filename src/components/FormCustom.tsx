import { Button, Form, Input, Select, Space } from 'antd';

const { Option } = Select;

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};


const FormCustom = () => {

    const [form] = Form.useForm();

    const onGenderChange = (value: string) => {
        switch (value) {
            case 'barbat':
                form.setFieldsValue({ note: 'Hi, man!' });
                break;
            case 'femeie':
                form.setFieldsValue({ note: 'Hi, lady!' });
                break;

            default:
        }
    };

    const onFinish = (values: any) => {
        console.log(values);
    };


    const onReset = () => {
        form.resetFields();
    };

    const onFill = () => {
        form.setFieldsValue({ note: 'Hello world!', gender: 'male' });
    };

    return (
        <>
            <Form
                {...layout}
                form={form}
                name="control-hooks"
                onFinish={onFinish}
                style={{ maxWidth: 600 }}
            >

                <Form.Item name="nume" label="Nume" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="prenume" label="Prenume" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Form.Item name="gender" label="Gen" rules={[{ required: true }]}>
                    <Select
                        placeholder="Select a option and change input text above"
                        onChange={onGenderChange}
                        allowClear
                    >
                        <Option value="barbat">male</Option>
                        <Option value="femeie">female</Option>

                    </Select>
                </Form.Item>
                <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, currentValues) => prevValues.gender !== currentValues.gender}
                >
                    {({ getFieldValue }) =>
                        getFieldValue('gender') === 'other' ? (
                            <Form.Item name="customizeGender" label="Customize Gender" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        ) : null
                    }
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Space>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                        <Button type="link" htmlType="button" onClick={onFill}>
                            Fill form
                        </Button>
                    </Space>
                </Form.Item>

            </Form>
        </>
    );
};

export default FormCustom;