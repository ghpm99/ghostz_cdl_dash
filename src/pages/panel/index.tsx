import { DesktopOutlined, PieChartOutlined, UserOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Avatar, Breadcrumb, Button, Layout, Menu, MenuProps, message, Select, Table, Tag, theme } from "antd";
import cdlLogo from "assets/Logo_Clube_Small.png";
import ModalImportJSON from "components/modal";
import ModalEditTeam from "components/modalEditTeam";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import TokenService from "services/auth/authToken";
import {
    fetchChangeOverlayActiveService,
    fetchClassService,
    fetchImportJsonService,
    fetchOverlayService,
    fetchOverlayTypesService,
    reloadOverlayService,
    updateOverlayTypeService,
    updateTeamService,
} from "services/panel";

import styles from "./panel.module.scss";
import Link from "next/link";
import UserAvatar from "components/userAvatar";

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
    getItem("Paineis", "panels", <UserOutlined />, [
        getItem(<Link href={"/panel"}>Clube da Luta</Link>, "panel", <PieChartOutlined />),
        getItem(<Link href={"/youtube"}>Youtube</Link>, "youtube", <YoutubeOutlined />),
    ]),
    getItem("Overlays", "overlay", <UserOutlined />, [
        getItem(<Link href={"/overlay/cdl"}>Clube da Luta</Link>, "overlay-cdl", <DesktopOutlined />),
        getItem(<Link href={"/overlay/youtube"}>Youtube</Link>, "overlay-youtube", <DesktopOutlined />),
    ]),
];

const keyMessage = "PANEL_KEY_MESSAGE";

const Panel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEditTeam, setOpenModalEditTeam] = useState(false);
    const [modalEditTeamData, setModalEditTeamData] = useState<ITeamOverlayPanel>();
    const [dataSource, setDataSource] = useState<IOverlayPanel[]>([]);
    const [overlayTypeData, setOverlayTypeData] = useState([]);
    const [bdoClassOptions, setBdoClassOptions] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalEditLoading, setModalEditLoading] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const toggleModal = () => {
        setOpenModal((prev) => !prev);
    };

    const importJSONEvent = (jsonCombat: string, resetOverlay: boolean) => {
        fetchImportJsonService({
            data: jsonCombat,
            reset: resetOverlay,
        })
            .then((response) => {
                message.success({
                    key: keyMessage,
                    content: response.data.status,
                });
                toggleModal();
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content: reason.response?.data?.status ?? "Falhou ao importar JSON!",
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
                    content: reason.response.data.status ?? "Falhou a buscar dados!",
                });
            });
    };

    const updateClassData = () => {
        fetchClassService().then((response) => {
            const options = response.data.data.map((option) => ({
                value: option.id,
                label: option.name,
            }));
            setBdoClassOptions(options);
        });
    };

    const updateOverlayTypeData = () => {
        fetchOverlayTypesService().then((response) => {
            const options = response.data.map((option) => ({
                value: option.id,
                label: option.name,
            }));
            setOverlayTypeData(options);
        });
    };

    useEffect(() => {
        if (!TokenService.getToken()) {
            Router.push("/signin");
        }
        updateDataSource();
        updateClassData();
        updateOverlayTypeData();
    }, []);

    const teamRenderName = (team) => {
        const teamName = team.name;
        const characterName = team.characteres
            .map((character) => `${character.family}/${character.name}`)
            .filter((item) => item.length > 1)
            .join(",");
        return `Time: ${teamName} Jogadores: ${characterName}`;
    };

    const updateActiveProperty = (id) => {
        const target = dataSource.find((item) => item.id === id);
        target.active = true;
        const newDataSource = dataSource
            .filter((item) => item.id !== id)
            .map((item) => ({
                ...item,
                active: false,
            }));
        newDataSource.push(target);
        newDataSource.sort((a, b) => a.id - b.id);
        setDataSource(newDataSource);
    };

    const changeOverlayActive = (id) => {
        setButtonLoading(true);
        message.loading({
            key: keyMessage,
            content: "Ativando overlay...",
        });
        fetchChangeOverlayActiveService(id)
            .then((response) => {
                message.success({
                    key: keyMessage,
                    content: response.data.status,
                });
                updateActiveProperty(id);
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content: reason.response.data.status ?? "Falhou em ativar overlay!",
                });
            })
            .finally(() => {
                setButtonLoading(false);
            });
    };

    const reloadOverlay = () => {
        reloadOverlayService()
            .then((response) => {
                message.success({
                    key: keyMessage,
                    content: response.data.status,
                });
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content: reason.response?.data?.status ?? "Falhou ao recarregar overlay!",
                });
            });
    };

    const dateSourceDate = dataSource.map((item) => item.date);

    const dateFilter = dateSourceDate
        .filter((element, index) => {
            return dateSourceDate.indexOf(element) === index;
        })
        .map((item) => ({
            text: item,
            value: item,
        }));

    const dateSourceHour = dataSource.map((item) => item.hour);

    const hourFilter = dateSourceHour
        .filter((element, index) => {
            return dateSourceHour.indexOf(element) === index;
        })
        .map((item) => ({
            text: item,
            value: item,
        }));

    const openModalEditTeamEvent = (record) => {
        setModalEditTeamData(record);
        toggleModalEditTeam();
    };

    const toggleModalEditTeam = () => {
        setOpenModalEditTeam((prev) => !prev);
    };

    const saveModalEditTeam = (data: ITeamOverlayPanel) => {
        setModalEditLoading(true);
        updateTeamService(data)
            .then((response) => {
                setOpenModalEditTeam(false);
                message.success({
                    key: keyMessage,
                    content: response.data.status,
                });
                reloadOverlay();
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content: reason.response?.data?.status ?? "Falhou ao atualizar time!",
                });
            })
            .finally(() => {
                setModalEditLoading(false);
            });
    };

    const changeOverlayType = (value) => {
        updateOverlayTypeService(value)
            .then((response) => {
                message.success({
                    key: keyMessage,
                    content: response.status,
                });
            })
            .catch((reason) => {
                message.error({
                    key: keyMessage,
                    content: reason.response?.data?.status ?? "Falhou ao atualizar overlay!",
                });
            });
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
                <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
            </Sider>
            <Layout className="site-layout">
                <Header className={styles["header"]} style={{ background: colorBgContainer }}>
                    <UserAvatar />
                </Header>
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
                        <div className={styles["controllers"]}>
                            <Button type="primary" onClick={toggleModal}>
                                Carregar JSON
                            </Button>
                            <Select onChange={changeOverlayType} style={{ width: 220 }} options={overlayTypeData} />
                            <Button type="default" onClick={reloadOverlay}>
                                Recarregar overlay
                            </Button>
                        </div>
                        <Table
                            style={{
                                overflow: "auto",
                            }}
                            columns={[
                                {
                                    title: "Ativo",
                                    dataIndex: "active",
                                    key: "active",
                                    render: (value) => {
                                        let color = value ? "geekblue" : "volcano";
                                        return <Tag color={color}>{value ? "Ativo" : "Inativo"}</Tag>;
                                    },
                                },
                                {
                                    title: "Ações",
                                    dataIndex: "id",
                                    key: "id",
                                    render: (value) => (
                                        <Button
                                            type="primary"
                                            loading={buttonLoading}
                                            onClick={() => changeOverlayActive(value)}>
                                            Ativar
                                        </Button>
                                    ),
                                },
                                {
                                    title: "Jogador/Time 1",
                                    dataIndex: "player1",
                                    key: "player1",
                                    render: (value, record, index) => (
                                        <div
                                            className={styles["action"]}
                                            onClick={() => openModalEditTeamEvent(record.team[0])}>
                                            {teamRenderName(record.team[0])}
                                        </div>
                                    ),
                                },
                                {
                                    title: "Jogador/Time 2",
                                    dataIndex: "player2",
                                    key: "player2",
                                    render: (value, record, index) => (
                                        <div
                                            className={styles["action"]}
                                            onClick={() => openModalEditTeamEvent(record.team[1])}>
                                            {teamRenderName(record.team[1])}
                                        </div>
                                    ),
                                },
                                {
                                    title: "Data",
                                    dataIndex: "date",
                                    key: "date",
                                    filters: dateFilter,
                                    onFilter: (value: string, record) => record.date === value,
                                },
                                {
                                    title: "Hora",
                                    dataIndex: "hour",
                                    key: "hour",
                                    filters: hourFilter,
                                    onFilter: (value: string, record) => record.hour === value,
                                },
                                {
                                    title: "Tipo",
                                    dataIndex: "modality",
                                    key: "modality",
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
                <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
            <ModalImportJSON open={openModal} toggle={toggleModal} onOk={importJSONEvent} />
            <ModalEditTeam
                open={openModalEditTeam}
                data={modalEditTeamData}
                onOk={saveModalEditTeam}
                classOptions={bdoClassOptions}
                toggle={toggleModalEditTeam}
                loading={modalEditLoading}
            />
        </Layout>
    );
};

export default Panel;
