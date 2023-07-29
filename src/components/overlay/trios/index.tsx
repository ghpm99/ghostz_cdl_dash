import Background from "./background";
import Layout from "./layout";
import styles from "./trios.module.scss";

interface ITriosLayoutProps {
    active: any;
}

const TriosLayout = (props: ITriosLayoutProps) => {
    const firstTeam = props.active.team[0];
    const secondTeam = props.active.team[1];

    const randomClassBackground = (character) => {
        const images = character?.media?.images;
        if (!images || images.length === 0) {
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
                    secondCharacterName: firstTeam.characteres[1]?.family ?? "",
                    thirdCharacter: randomClassBackground(firstTeam.characteres[2]).url,
                    thirdCharacterName: firstTeam.characteres[2]?.family ?? "",
                }}
                secondTeam={{
                    firstCharacter: randomClassBackground(secondTeam.characteres[0]).url,
                    firstCharacterName: secondTeam.characteres[0].family,
                    secondCharacter: randomClassBackground(secondTeam.characteres[1]).url,
                    secondCharacterName: secondTeam.characteres[1]?.family ?? "",
                    thirdCharacter: randomClassBackground(secondTeam.characteres[2]).url,
                    thirdCharacterName: secondTeam.characteres[2]?.family ?? "",
                }}
            />
        </div>
    );
};

export default TriosLayout;
