import Background from "./background";
import Layout from "./layout";

interface IDefaultLayoutProps {
    active: any;
}

const DefaultLayout = (props: IDefaultLayoutProps) => {
    const getBackgroundPlayer = (team) => {
        if (!team) {
            return "";
        }
        const character = team?.characteres[0];

        if (!character) {
            return "";
        }

        if (character.combat_style === "Despertar") {
            return character.media.video_awakening;
        } else if (character.combat_style === "Sucessao") {
            return character.media.video_sucession;
        } else {
            return "";
        }
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
        <>
            <Layout
                date={props.active.date}
                hour={props.active.hour}
                modality={props.active.modality}
                league={props.active.league}
                team={props.active.team}
            />
            <Background
                backgroundImage={props.active.background}
                firstPlayerName={generateKey(props.active.team[0]?.characteres[0])}
                firstPlayerBackground={getBackgroundPlayer(props.active.team[0])}
                secondPlayerName={generateKey(props.active.team[1]?.characteres[0])}
                secondPlayerBackground={getBackgroundPlayer(props.active.team[1])}
            />
        </>
    );
};

export default DefaultLayout;
