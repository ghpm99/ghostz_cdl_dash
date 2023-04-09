import Background from "./background";
import styles from "./duplas.module.scss";
import Layout from "./layout";

interface IDuplasLayoutProps {
    active: any;
}

const DuplasLayout = (props: IDuplasLayoutProps) => {
    const firstTeam = props.active.team[0];
    const secondTeam = props.active.team[1];

    const randomClassBackground = (character) => {
        const images = character.media.images;
        if (images.length === 0) {
            return "";
        }

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];
    };

    const generateKey = (character) => {
        if (!character) {
            return "c32d8b45-92fe-44f6-8b61-42c2107dfe87";
        }

        const family = character.family ?? "c32d8b45";
        const name = character.name ?? "92fe";
        const combatStyle = character.combat_style ?? "44f6";
        const bdoClass = character.bdo_class ?? "8b61";

        return family + name + combatStyle + bdoClass;
    };

    return (
        <div className={styles["container"]}>
            <Layout firstTeam={firstTeam} secondTeam={secondTeam} />
            <Background
                firstTeam={{
                    firstCharacter: randomClassBackground(firstTeam.characteres[0]).url,
                    firstCharacterName: generateKey(firstTeam.characteres[0]),
                    secondCharacter: randomClassBackground(firstTeam.characteres[1]).url,
                    secondCharacterName: generateKey(firstTeam.characteres[1]),
                }}
                secondTeam={{
                    firstCharacter: randomClassBackground(secondTeam.characteres[0]).url,
                    firstCharacterName: generateKey(secondTeam.characteres[0]),
                    secondCharacter: randomClassBackground(secondTeam.characteres[1]).url,
                    secondCharacterName: generateKey(secondTeam.characteres[1]),
                }}
            />
        </div>
    );
};

export default DuplasLayout;
