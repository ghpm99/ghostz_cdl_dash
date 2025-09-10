"use client";

import { message } from "antd";
import Router from "next/router";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
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

interface IPanelContext {
    collapsed: boolean;
    setCollapsed: (arg0: boolean) => void;
    toggleModal: () => void;
    changeOverlayType: (value: any) => void;
    overlayTypeData: any[];
    reloadOverlay: () => void;
    buttonLoading: boolean;
    changeOverlayActive: (id: any) => void;
    openModalEditTeamEvent: (record: any) => void;
    teamRenderName: (team: any) => string;
    dateFilter: {
        text: string;
        value: string;
    }[];
    hourFilter: {
        text: string;
        value: string;
    }[];
    dataSource: IOverlayPanel[];
    openModal: boolean;
    importJSONEvent: (jsonCombat: string, resetOverlay: boolean) => void;
    openModalEditTeam: boolean;
    modalEditTeamData: ITeamOverlayPanel;
    saveModalEditTeam: (data: ITeamOverlayPanel) => void;
    bdoClassOptions: any[];
    toggleModalEditTeam: () => void;
    modalEditLoading: boolean;
}

const PanelContext = createContext<IPanelContext | undefined>(undefined);

const keyMessage = "PANEL_KEY_MESSAGE";

export const PanelProvider = ({ children }: { children: ReactNode }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openModalEditTeam, setOpenModalEditTeam] = useState(false);
    const [modalEditTeamData, setModalEditTeamData] = useState<ITeamOverlayPanel>();
    const [dataSource, setDataSource] = useState<IOverlayPanel[]>([]);
    const [overlayTypeData, setOverlayTypeData] = useState([]);
    const [bdoClassOptions, setBdoClassOptions] = useState([]);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [modalEditLoading, setModalEditLoading] = useState(false);

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

    const value: IPanelContext = {
        collapsed,
        setCollapsed,
        toggleModal,
        changeOverlayType,
        overlayTypeData,
        reloadOverlay,
        buttonLoading,
        changeOverlayActive,
        openModalEditTeamEvent,
        teamRenderName,
        dateFilter,
        hourFilter,
        dataSource,
        openModal,
        importJSONEvent,
        openModalEditTeam,
        modalEditTeamData,
        saveModalEditTeam,
        bdoClassOptions,
        toggleModalEditTeam,
        modalEditLoading,
    };
    return <PanelContext.Provider value={value}>{children}</PanelContext.Provider>;
};

export const usePanel = () => {
    const context = useContext(PanelContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de AuthProvider");
    }
    return context;
};
