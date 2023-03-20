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

        if (character.custom.video.length > 1) {
            return character.custom.video;
        }

        if (character.combat_style === "Despertar") {
            return character.media.video_awakening;
        } else if (character.combat_style === "Sucessao") {
            return character.media.video_sucession;
        } else {
            return "";
        }
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
                firstPlayerName={props.active.team[0]?.characteres[0]?.family}
                firstPlayerBackground={getBackgroundPlayer(props.active.team[0])}
                secondPlayerName={props.active.team[1]?.characteres[0]?.family}
                secondPlayerBackground={getBackgroundPlayer(props.active.team[1])}
            />
        </>
    );
};

export default DefaultLayout;
