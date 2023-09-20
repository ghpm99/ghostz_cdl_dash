import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { fetchActiveYoutubePlaylistService } from "services/youtube";
import styles from "./youtube.module.scss";

const OverlayYoutube = () => {
    const router = useRouter();
    const { token } = router.query;

    const [video, setVideo] = useState<{ youtube_id: string; title: string; position: number }>({
        youtube_id: "",
        title: "",
        position: 0,
    });
    const [playlist, setPlaylist] = useState([]);

    useEffect(() => {
        if (token)
            fetchActiveYoutubePlaylistService(token as string).then((response) => {
                const playList = response.data.data;
                setPlaylist(playList);
                setVideo(playList[0]);
            });
    }, [token]);

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
