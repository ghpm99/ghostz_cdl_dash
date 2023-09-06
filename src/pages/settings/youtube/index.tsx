import { DesktopOutlined, PieChartOutlined, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Layout, Menu, MenuProps, Select, theme } from "antd";
import cdlLogo from "assets/Logo_Clube_Small.png";
import Image from "next/image";
import { useState } from "react";

import Link from "next/link";
import styles from "./youtube.module.scss";
import { fetchUrlOAuthYoutube } from "services/youtube";

const { Header, Content, Footer, Sider } = Layout;
const { Option } = Select;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem(<Link href={"/panel"}>Painel</Link>, "1", <PieChartOutlined />),
    getItem("Overlay", "2", <DesktopOutlined />),
    getItem("Configurações", "sub1", <UserOutlined />, [getItem(<Link href={"/settings/youtube"}>Youtube</Link>, "3")]),
];

const keyMessage = "YOUTUBE_KEY_MESSAGE";

const YoutubeSettings = () => {
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const loginYoutube = () => {
        fetchUrlOAuthYoutube().then((response) => window.location.assign(response.url));
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                className={styles["menu-sider"]}
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                {!collapsed && (
                    <div
                        style={{
                            height: 68,
                            margin: 16,
                            display: "flex",
                            justifyContent: "center",
                        }}>
                        <Image src={cdlLogo} alt="Logo" />
                    </div>
                )}
                <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: "0 16px" }}>
                    <Breadcrumb style={{ margin: "16px 0" }}>
                        <Breadcrumb.Item>CDL</Breadcrumb.Item>
                        <Breadcrumb.Item>Configurações</Breadcrumb.Item>
                        <Breadcrumb.Item>Youtube</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                        }}>
                        <Button onClick={loginYoutube} type="primary">
                            Logar youtube
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default YoutubeSettings;
