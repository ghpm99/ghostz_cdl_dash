import { Input, Modal } from "antd"
import { useState } from "react"

const { TextArea } = Input;

interface IModalImportJSONProps {
    open: boolean;
    toggle: () => void;
    onOk: (jsonCombat: string) => void;
}

const ModalImportJSON = (props: IModalImportJSONProps) => {
    const [textCombat, setTextCombat] = useState("");

    return (
        <Modal
            open={props.open}
            onCancel={props.toggle}
            onOk={() => {
                props.onOk(textCombat);
            }}>
            <TextArea
                rows={4}
                placeholder="JSON Lutas"
                onChange={(event) => {
                    setTextCombat(event.target.value);
                }}
            />
        </Modal>
    );
};

export default ModalImportJSON;
