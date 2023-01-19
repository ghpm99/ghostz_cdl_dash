import { useEffect, useState } from "react";
import { fetchActiveOverlayService } from "services/panel";
import Layout from "./layout";
import styles from "./overlay.module.scss";
import Background from "./background";
import Pusher from "pusher-js";
import { GetServerSideProps } from "next";

const Overlay = (props) => {
    const [active, setActive] = useState({
        date: "",
        hour: "",
        modality: "",
        background: "",
        team: [],
    });

    const onChangeOverlay = (data) => {
        setActive(data.data);
    };

    useEffect(() => {
        fetchActiveOverlayService().then((response) => {
            setActive(response.data.data);
        });

        const pusher = new Pusher(props.pusher_key, {
            cluster: props.pusher_cluster,
            authEndpoint: process.env.NEXT_PUBLIC_API_URL + "/pusher/auth",
        });

        const channel = pusher.subscribe("private-overlay");
        channel.bind("overlay", onChangeOverlay);
        return () => {
            pusher.unsubscribe("private-overlay");
        };
    }, []);

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

    if (active.modality === "DUPLAS") {
        return <div className={styles["container"]}></div>;
    }

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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const props = {
        pusher_key: process.env.PUSHER_KEY,
        pusher_cluster: process.env.PUSHER_CLUSTER,
    };
    return { props };
};
