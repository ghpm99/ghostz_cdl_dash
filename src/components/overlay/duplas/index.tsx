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
        const images = character.media.images.filter(
            (image) => image.awakening === (character.combat_style === "Despertar")
        );
        if (images.length === 0) {
            return "";
        }

        const randomIndex = Math.floor(Math.random() * images.length);

        return images[randomIndex];
    };

    return (
        <div className={styles["container"]}>
            <Layout firstTeam={firstTeam} secondTeam={secondTeam} />
            <Background
                firstTeam={{
                    firstCharacter: randomClassBackground(firstTeam.characteres[0]).url,
                    firstCharacterName: firstTeam.characteres[0].family,
                    secondCharacter: randomClassBackground(firstTeam.characteres[1]).url,
                    secondCharacterName: firstTeam.characteres[1].family,
                }}
                secondTeam={{
                    firstCharacter: randomClassBackground(secondTeam.characteres[0]).url,
                    firstCharacterName: secondTeam.characteres[0].family,
                    secondCharacter: randomClassBackground(secondTeam.characteres[1]).url,
                    secondCharacterName: secondTeam.characteres[1].family,
                }}
            />
        </div>
    );
};

export default DuplasLayout;
