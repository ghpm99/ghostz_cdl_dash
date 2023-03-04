import { Button, Card, Checkbox, Form, Input, Layout } from 'antd'
import Router from 'next/router'
import { useState } from 'react'
import { signinService } from 'services/auth'
import TokenService from 'services/auth/authToken'

import styles from './signin.module.scss'

const { Content } = Layout;

const Signin = () => {
    const [error, setError] = useState(false);

    const onFinish = (values: any) => {
        setError(false);
        signinService(values.username, values.password)
            .then((response) => {
                TokenService.setUser({
                    remember: values.remember,
                    token: response.data.token,
                });
                Router.push("/panel");
            })
            .catch((error) => {
                console.log(error);
                setError(true);
            });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <Layout
            style={{
                minHeight: "100vh",
                backgroundImage: "linear-gradient(to bottom, #fff, #d1d1d1)",
            }}>
            <Content>
                <Layout
                    style={{
                        width: "100vw",
                        height: "90vh",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "rgb(0, 0, 27, 0)",
                    }}>
                    <div style={{ maxWidth: "50%" }}>
                        <Card title="Login">
                            <Form
                                name="basic"
                                labelCol={{ span: 8 }}
                                wrapperCol={{ span: 16 }}
                                initialValues={{ remember: true }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                autoComplete="off">
                                {error && <div className={styles["error"]}>Usuario ou senha incorretos</div>}

                                <Form.Item
                                    label="Usuario"
                                    name="username"
                                    rules={[{ required: true, message: "Por favor insira seu usuario!" }]}>
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Senha"
                                    name="password"
                                    rules={[{ required: true, message: "Por favor insira sua senha!" }]}>
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                                    <Checkbox>Lembrar-se de mim</Checkbox>
                                </Form.Item>

                                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                                    <Button type="primary" htmlType="submit">
                                        Logar
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
                </Layout>
            </Content>
        </Layout>
    );
};

export default Signin;
