import { Input, Modal, Select, Tabs } from "antd";
import { useEffect, useState } from "react";

import styles from "./modalEdit.module.scss";

const { TextArea } = Input;

interface IModalEditTeamProps {
    open: boolean;
    toggle: () => void;
    data: ITeamOverlayPanel;
    onOk: (data: ITeamOverlayPanel) => void;
    classOptions: any[];
    loading: boolean;
}

const ModalEditTeam = (props: IModalEditTeamProps) => {
    const [dataSource, setDataSource] = useState<ITeamOverlayPanel>();

    useEffect(() => {
        setDataSource(props.data);
    }, [props.data]);

    const editTeamEvent = (id: number, field: keyof ICharacterOverlayPanel, data: any) => {
        const newDataSource = { ...dataSource };
        const indexCharacter = newDataSource.characteres.findIndex((item) => item.id === id);
        newDataSource.characteres[indexCharacter] = {
            ...newDataSource.characteres[indexCharacter],
            [field]: data,
        };
        setDataSource(newDataSource);
    };

    const tabCharacterChildren = (character, index) => {
        return (
            <div>
                <div className={styles["input-container"]}>
                    <div className={styles["label"]}>Familia</div>
                    <Input
                        name="family"
                        className={styles["input"]}
                        placeholder="Familia"
                        value={character.family}
                        onChange={({ target }) => {
                            const value = target.value;
                            editTeamEvent(character.id, "family", value);
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <div className={styles["label"]}>Nome</div>
                    <Input
                        name="name"
                        className={styles["input"]}
                        placeholder="Nome"
                        value={character.name}
                        onChange={({ target }) => {
                            const value = target.value;
                            editTeamEvent(character.id, "name", value);
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <div className={styles["label"]}>Classe</div>
                    <Select
                        className={styles["input"]}
                        options={props.classOptions}
                        value={character.bdo_class}
                        onChange={(value, option) => {
                            console.log(value, option);
                            editTeamEvent(character.id, "bdo_class", option.label);
                        }}
                    />
                </div>
                <div className={styles["input-container"]}>
                    <div className={styles["label"]}>Combate</div>
                    <Input
                        name="combat_style"
                        className={styles["input"]}
                        placeholder="Combate"
                        value={character.combat_style}
                        onChange={({ target }) => {
                            const value = target.value;
                            editTeamEvent(character.id, "combat_style", value);
                        }}
                    />
                </div>
            </div>
        );
    };

    const tabsItens = dataSource?.characteres?.map((character, index) => ({
        key: `${character.id}`,
        label: character.family,
        children: tabCharacterChildren(character, index),
    }));

    return (
        <Modal
            title="Editar Time"
            open={props.open}
            onCancel={props.toggle}
            confirmLoading={props.loading}
            onOk={() => {
                props.onOk(dataSource);
            }}>
            <Tabs defaultActiveKey="1" items={tabsItens} />
        </Modal>
    );
};

export default ModalEditTeam;
