import { useState } from "react";
import styles from "./panel.module.scss";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps, Table } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import cdlLogo from "assets/Logo_Clube_Small.png";
import Image from "next/image";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Painel", "1", <PieChartOutlined />),
    getItem("Overlay", "2", <DesktopOutlined />),
    getItem("Configurações", "sub1", <UserOutlined />, [getItem("Tom", "3")]),
];

const Panel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <div
                    style={{
                        height: 68,
                        margin: 16,
                        display: "flex",
                        justifyContent: "center",
                    }}>
                    <Image src={cdlLogo} alt="Logo" />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>CDL</Breadcrumb.Item>
                        <Breadcrumb.Item>Painel</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}>
                        <Button type='primary'>Carregar JSON</Button>
                        <Table
                            columns={[
                                {
                                    title: "Ativo",
                                    dataIndex: "active",
                                    key: "active",
                                },
                                {
                                    title: "Jogador/Time 1",
                                    dataIndex: "player1",
                                    key: "player1",
                                },
                                {
                                    title: "Jogador/Time 2",
                                    dataIndex: "player2",
                                    key: "player2",
                                },
                                {
                                    title: "Data",
                                    dataIndex: "date",
                                    key: "date",
                                },
                                {
                                    title: "Hora",
                                    dataIndex: "hour",
                                    key: "hour",
                                },
                                {
                                    title: "Tipo",
                                    dataIndex: "type",
                                    key: "type",
                                },
                            ]}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default Panel;
