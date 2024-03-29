import { DesktopOutlined, PieChartOutlined, UserOutlined, YoutubeOutlined } from "@ant-design/icons";
import {
    Breadcrumb,
    Button,
    Checkbox,
    Input,
    Layout,
    Menu,
    MenuProps,
    Select,
    Switch,
    Table,
    Tag,
    message,
    theme,
} from "antd";
import cdlLogo from "assets/Logo_Clube_Small.png";
import Image from "next/image";
import { useEffect, useState } from "react";

import Link from "next/link";
import {
    fetchUrlOAuthYoutube,
    fetchYoutubePlaylist,
    loadPlaylist,
    requestSkipVideoPlaylistService,
    updateActiveYoutubePlaylistService,
    updateRandomYoutubePlaylistService,
} from "services/youtube";
import styles from "./youtube.module.scss";

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
        getItem(<Link href={"/overlay/cdl/"}>Clube da Luta</Link>, "overlay-cdl", <DesktopOutlined />),
        getItem(<Link href={"/overlay/youtube/"}>Youtube</Link>, "overlay-youtube", <DesktopOutlined />),
    ]),
];

const keyMessage = "YOUTUBE_KEY_MESSAGE";

const YoutubePanel = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [playlistId, setPlayListId] = useState("");
    const [youtubePlaylistData, setYoutubePlaylistData] = useState([]);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const loginYoutube = () => {
        fetchUrlOAuthYoutube().then((response) => window.location.assign(response.url));
    };

    const loadPlaylistHandler = () => {
        message.loading({
            content: "Importanto Playlist " + playlistId,
            key: keyMessage,
        });
        loadPlaylist(playlistId)
            .then((response) => {
                message.success({
                    content: response.msg,
                    key: keyMessage,
                });
                updateYoutubePlaylistData();
            })
            .catch((reason) =>
                message.error({
                    content: reason.response.msg ?? "Falhou em importar playlist",
                    key: keyMessage,
                })
            );
    };

    useEffect(() => {
        updateYoutubePlaylistData();
    }, []);

    const updateYoutubePlaylistData = () => {
        fetchYoutubePlaylist().then((response) => setYoutubePlaylistData(response.data));
    };

    const activeYoutubePlaylist = (id) => {
        updateActiveYoutubePlaylistService(id).then((response) => {
            updateYoutubePlaylistData();
        });
    };

    const skipVideoPlaylist = () => {
        requestSkipVideoPlaylistService().then((response) =>
            message.success({
                content: response.msg,
                key: keyMessage,
            })
        );
    };

    const changeRandomPlaylistHandler = (id, checked) => {
        message.loading({
            content: `Atualizando aleatorio playlist: ${id}`,
            key: keyMessage,
        });
        updateRandomYoutubePlaylistService(id, checked).then((response) => {
            message.success({
                content: response.msg,
                key: keyMessage,
            });
            updateYoutubePlaylistData();
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
                            Logar no Youtube
                        </Button>
                        <Button onClick={skipVideoPlaylist}>Pular video</Button>
                        <div>
                            PlayList ID:
                            <Input value={playlistId} onChange={(event) => setPlayListId(event.target.value)} />
                        </div>
                        <Button onClick={loadPlaylistHandler}>Carregar playlist</Button>
                        <Table
                            columns={[
                                {
                                    title: "ID",
                                    dataIndex: "youtube_id",
                                    key: "youtube_id",
                                },
                                {
                                    title: "Titulo",
                                    dataIndex: "title",
                                    key: "title",
                                },
                                {
                                    title: "Numero de videos",
                                    dataIndex: "count",
                                    key: "count",
                                },
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
                                    title: "Aleatorio",
                                    dataIndex: "random",
                                    key: "random",
                                    render: (value, record) => {
                                        return (
                                            <Switch
                                                checked={value}
                                                onChange={(checked) => changeRandomPlaylistHandler(record.id, checked)}
                                            />
                                        );
                                    },
                                },
                                {
                                    title: "Ações",
                                    dataIndex: "id",
                                    key: "id",
                                    render: (value) => (
                                        <Button type="primary" onClick={() => activeYoutubePlaylist(value)}>
                                            Ativar
                                        </Button>
                                    ),
                                },
                            ]}
                            dataSource={youtubePlaylistData}
                        />
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
};

export default YoutubePanel;
