import { useRouter } from "next/router";
import { ReactEventHandler, useState } from "react";
import YouTube from "react-youtube";
import styles from "./youtube.module.scss";

const OverlayYoutube = () => {
    const router = useRouter();
    const { token } = router.query;

    const [videoId, setVideoId] = useState("mIu2gW0SuqE");

    const opts = {
        width: "1920",
        height: "1080",
        playerVars: {
            autoplay: 1,
            origin: "http://localhost:3300",
        },
    };

    const onReady = (event) => {
        console.log(event);

        const player = event.target;
        player.playVideo();
    };

    const onError = (error) => {
        console.error("YouTube Player Error:", error);
    };

    const onStateChange = (event) => {
        console.log(event);
        if (event.data === -1) {
            event.target.playVideo();
        }
    };

    const changeVideoHandler = () => {
        setVideoId("ngyMzCe6nVs");
    };

    return (
        <div className={styles["container"]}>
            <YouTube opts={opts} videoId={videoId} onStateChange={onStateChange} onReady={onReady} onError={onError} />
            <div className={styles["title-video"]}>BLACK DESERT PVP - lucifans (Sage) vs. Ferrettx (Sorceress)</div>
            <button onClick={changeVideoHandler}>Alterar Video</button>
            <button>Play</button>
        </div>
    );
};

export default OverlayYoutube;
