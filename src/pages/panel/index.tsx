import { useEffect, useState } from "react";
import styles from "./panel.module.scss";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Button, MenuProps, Table, Tag, message } from "antd";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import cdlLogo from "assets/Logo_Clube_Small.png";
import Image from "next/image";
import ModalImportJSON from "components/modal";
import {
    fetchChangeOverlayActiveService,
    fetchImportJsonService,
    fetchOverlayService,
} from "services/panel";

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

const keyMessage = "PANEL_KEY_MESSAGE";

const Panel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const importJSONEvent = (event) => {
        fetchImportJsonService(event)
            .then((response) => {
                message.success({
                    key: keyMessage,
                    content: response.data.status,
                });
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content:
                        reason.response?.data?.status ??
                        "Falhou ao importar JSON!",
                });
            })
            .finally(() => {
                updateDataSource();
            });
    };

    const updateDataSource = () => {
        fetchOverlayService()
            .then((response) => {
                setDataSource(response.data.data);
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content:
                        reason.response.data.status ?? "Falhou a buscar dados!",
                });
            });
    };

    useEffect(() => {
        updateDataSource();
    }, []);

    const teamRenderName = (team) => {
        const teamName = team.name;
        const characterName = team.characteres
            .map((character) => `${character.family}/${character.name}`)
            .filter((item) => item.length > 1)
            .join(",");
        return `Time: ${teamName} Jogadores: ${characterName}`;
    };

    const changeOverlayActive = (id) => {
        fetchChangeOverlayActiveService(id).then((response) => {
            updateDataSource();
        });
    };

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
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
                        <Button type="primary" onClick={toggleModal}>
                            Carregar JSON
                        </Button>
                        <Table
                            columns={[
                                {
                                    title: "Ativo",
                                    dataIndex: "active",
                                    key: "active",
                                    render: (value) => {
                                        let color = value
                                            ? "geekblue"
                                            : "volcano";

                                        return (
                                            <Tag color={color}>
                                                {value ? "Ativo" : "Inativo"}
                                            </Tag>
                                        );
                                    },
                                },
                                {
                                    title: "Jogador/Time 1",
                                    dataIndex: "player1",
                                    key: "player1",
                                    render(value, record, index) {
                                        return teamRenderName(record.team[0]);
                                    },
                                },
                                {
                                    title: "Jogador/Time 2",
                                    dataIndex: "player2",
                                    key: "player2",
                                    render(value, record, index) {
                                        return teamRenderName(record.team[1]);
                                    },
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
                                    dataIndex: "modality",
                                    key: "modality",
                                },
                                {
                                    title: "Ações",
                                    dataIndex: "id",
                                    key: "id",
                                    render: (value) => (
                                        <div
                                            className={styles['action']}
                                            onClick={() =>
                                                changeOverlayActive(value)
                                            }>
                                            Ativar overlay
                                        </div>
                                    ),
                                },
                            ]}
                            dataSource={dataSource}
                            pagination={{
                                showSizeChanger: true,
                                showQuickJumper: true,
                                showTotal: (total) => `Total ${total} items`,
                            }}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2023 Created by Ant UED
                </Footer>
            </Layout>
            <ModalImportJSON
                open={openModal}
                toggle={toggleModal}
                onOk={importJSONEvent}
            />
        </Layout>
    );
};

export default Panel;
