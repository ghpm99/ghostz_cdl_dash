import { useEffect, useState } from "react";
import { fetchActiveOverlayService } from "services/panel";
import Layout from "./layout";
import styles from "./overlay.module.scss";
import Background from "./background";

const Overlay = () => {
    const [active, setActive] = useState({
        date: "",
        hour: "",
        modality: "",
        background: "",
        team: [],
    });
    console.log(active);
    useEffect(() => {
        fetchActiveOverlayService().then((response) => {
            console.log(response);
            setActive(response.data.data);
        });
    }, []);

    const getBackgroundPlayer = (team) => {
        const character = team?.characteres[0];
        console.log("getBackgroundPlayer", team, character);
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
        <div className={styles["container"]}>
            <Layout
                date={active.date}
                hour={active.hour}
                modality={active.modality}
                team={active.team}
            />
            <Background
                backgroundImage={active.background}
                firstPlayerBackground={getBackgroundPlayer(active.team[0])}
                secondPlayerBackground={getBackgroundPlayer(active.team[1])}
            />
        </div>
    );
};

export default Overlay;
