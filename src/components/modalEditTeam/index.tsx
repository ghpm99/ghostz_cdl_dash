import { Button, Form, Input, Modal, Select, Tabs } from "antd";
import { useState } from "react";

import styles from "./modalEdit.module.scss";

const { TextArea } = Input;

interface IModalEditTeamProps {
    open: boolean;
    toggle: () => void;
    data: any;
    setData: (data: any) => void;
    classOptions: any[];
    onOk: (data: any) => void;
}

const ModalEditTeam = (props: IModalEditTeamProps) => {
    const onFinish = (values) => {
        console.log(values);
    };

    const tabCharacterChildren = (character, index) => {
        return (
            <Form
                name="character"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={character}
                onFinish={onFinish}>
                <Form.Item hidden name="id">
                    <Input />
                </Form.Item>
                <div className={styles["input-container"]}>
                    <Form.Item label="Familia" name="family">
                        <Input className={styles["input"]} placeholder="Familia" />
                    </Form.Item>
                </div>
                <div className={styles["input-container"]}>
                    <Form.Item label="Nome" name="name">
                        <Input className={styles["input"]} placeholder="Nome" />
                    </Form.Item>
                </div>
                <div className={styles["input-container"]}>
                    <Form.Item label="Classe" name="bdo_class">
                        <Select className={styles["input"]} options={props.classOptions} />
                    </Form.Item>
                </div>
                <div className={styles["input-container"]}>
                    <Form.Item label="Combate" name="combat_style">
                        <Input className={styles["input"]} placeholder="Combate" />
                    </Form.Item>
                </div>
                <div className={`${styles["input-container"]} ${styles["save-container"]}`}>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button
                            onClick={props.toggle}
                            style={{
                                marginRight: "6px",
                            }}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Salvar
                        </Button>
                    </Form.Item>
                </div>
            </Form>
        );
    };

    const tabsItens = props.data?.characteres?.map((character, index) => ({
        key: index,
        label: character.family,
        children: tabCharacterChildren(character, index),
    }));

    return (
        <Modal title="Editar Time" open={props.open} onCancel={props.toggle} footer={null}>
            <Tabs defaultActiveKey="1" items={tabsItens} />
        </Modal>
    );
};

export default ModalEditTeam;
