import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fetchActiveYoutubePlaylistService, updateStateChangeService } from "services/youtube";
import styles from "./youtube.module.scss";
import YouTube from "react-youtube";

interface IYoutubeVideo {
    id: number;
    youtube_id: string;
    title: string;
    position: number;
}

const emptyVideoObj: IYoutubeVideo = {
    id: 0,
    youtube_id: "",
    title: "",
    position: 0,
};

const OverlayYoutube = () => {
    const router = useRouter();
    const { token } = router.query;

    const [video, setVideo] = useState<IYoutubeVideo>(emptyVideoObj);
    const [nextVideo, setNextVideo] = useState<IYoutubeVideo>(emptyVideoObj);

    console.log(video);
    console.log(nextVideo);

    useEffect(() => {
        if (token)
            fetchActiveYoutubePlaylistService(token as string).then((response) => {
                const playlist = response.data.data;
                setVideo(playlist[0]);
                setNextVideo(playlist[1]);
            });
    }, [token]);

    const updateNextVideo = () => {
        fetchActiveYoutubePlaylistService(token as string, nextVideo.position).then((response) => {
            const playlist = response.data.data;
            setNextVideo(playlist[0]);
        });
    };

    const opts = {
        width: "1920",
        height: "1080",
        showinfo: 0,
        playerVars: {
            autoplay: 1,
            origin: "http://localhost:3300",
            showinfo: 0,
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
        updateStateChangeService(token as string, video.id, event.data);
        if (event.data === -1) {
            event.target.playVideo();
        }
        if (event.data === 0) {
            setVideo(nextVideo);
            event.target.playVideo();
            updateNextVideo();
        }
    };

    return (
        <div className={styles["container"]}>
            {video.youtube_id && (
                <YouTube
                    opts={opts}
                    videoId={video.youtube_id}
                    onStateChange={onStateChange}
                    onReady={onReady}
                    onError={onError}
                />
            )}
            <div className={styles["title-video"]}>{video.title}</div>
        </div>
    );
};

export default OverlayYoutube;
