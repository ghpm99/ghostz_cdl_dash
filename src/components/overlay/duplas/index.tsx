import Background from "./background";
import Layout from "./layout";
import styles from './duplas.module.scss'

interface IDuplasLayoutProps {
    active: any;
}

const DuplasLayout = (props: IDuplasLayoutProps) => {
    console.log("props", props);

    const firstTeam = props.active.team[0];
    const secondTeam = props.active.team[1];

    const randomClassBackground = (character) => {
        const images = character.media.images.filter(
            (image) =>
                image.awakening === (character.combat_style === "Despertar")
        );
        if (images.length === 0) {
            return "";
        }
        console.log(images.length);

        const randomIndex = Math.floor(Math.random() * images.length);
        console.log(Math.ceil(randomIndex));

        return images[randomIndex];
    };

    return (
        <div className={styles['container']}>
            <Layout firstTeam={firstTeam} secondTeam={secondTeam} />
            <Background
                firstTeam={{
                    firstCharacter: randomClassBackground(
                        firstTeam.characteres[0]
                    ).url,
                    secondCharacter: randomClassBackground(
                        firstTeam.characteres[1]
                    ).url,
                }}
                secondTeam={{
                    firstCharacter: randomClassBackground(
                        secondTeam.characteres[0]
                    ).url,
                    secondCharacter: randomClassBackground(
                        secondTeam.characteres[1]
                    ).url,
                }}
            />
        </div>
    );
};

export default DuplasLayout;
