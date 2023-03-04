import { Checkbox, Input, Modal } from 'antd'
import { useState } from 'react'

const { TextArea } = Input;

interface IModalImportJSONProps {
    open: boolean;
    toggle: () => void;
    onOk: (jsonCombat: string, resetOverlay: boolean) => void;
}

const ModalImportJSON = (props: IModalImportJSONProps) => {
    const [textCombat, setTextCombat] = useState("");
    const [resetOverlay, setResetOverlay] = useState(true);

    return (
        <Modal
            title="Importar Json"
            open={props.open}
            onCancel={props.toggle}
            onOk={() => {
                props.onOk(textCombat, resetOverlay);
            }}>
            <TextArea
                rows={4}
                placeholder="JSON Lutas"
                onChange={(event) => {
                    setTextCombat(event.target.value);
                }}
            />
            <Checkbox checked={resetOverlay} onChange={(event) => setResetOverlay(event.target.checked)}>
                Excluir dados atuais
            </Checkbox>
        </Modal>
    );
};

export default ModalImportJSON;
