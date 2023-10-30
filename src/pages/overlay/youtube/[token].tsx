import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import cdlLogo from "assets/Clube-da-Luta-2.0.png";
import {
    fetchActiveYoutubePlaylistService,
    fetchNextVideoYoutubePlaylistService,
    updateStateChangeService,
} from "services/youtube";
import styles from "./youtube.module.scss";
import YouTube from "react-youtube";
import { GetServerSideProps } from "next";
import Pusher from "pusher-js";
import Image from "next/image";

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

const OverlayYoutube = (props) => {
    const router = useRouter();
    const { token } = router.query;

    const [video, setVideo] = useState<IYoutubeVideo>(emptyVideoObj);
    const [nextVideo, setNextVideo] = useState<IYoutubeVideo>(emptyVideoObj);
    const [loadingNextVideo, setLoadingNextVideo] = useState<Boolean>(false);
    const [titleCssName, setTitleCssName] = useState<"visible" | "hidden">("visible");

    useEffect(() => {
        const pusher = new Pusher(props.pusher_key, {
            cluster: props.pusher_cluster,
            authEndpoint: process.env.NEXT_PUBLIC_API_URL + "/pusher/auth",
            auth: {
                headers: {
                    Authorization: "Basic " + token,
                },
            },
        });

        const channel = pusher.subscribe("private-youtube");
        channel.bind("commands", onCommandHandler);
        return () => {
            pusher.unsubscribe("private-youtube");
        };
    }, []);

    const fetchActiveYoutubePlaylist = () => {
        fetchActiveYoutubePlaylistService(token as string).then((response) => {
            const playlist = response.data.data;
            setVideo(playlist[0]);
            setNextVideo(playlist[1]);
        });
    };

    useEffect(() => {
        if (token) fetchActiveYoutubePlaylist();
    }, [token]);

    const updateNextVideo = () => {
        if (loadingNextVideo) return;
        setLoadingNextVideo(true);
        fetchNextVideoYoutubePlaylistService(token as string)
            .then((response) => {
                const video = response.data.data;
                setNextVideo(video);
            })
            .finally(() => setLoadingNextVideo(false));
    };

    const onCommandHandler = (data) => {
        fetchActiveYoutubePlaylist();
    };

    const opts = {
        width: "1920",
        height: "1080",
        playerVars: {
            autoplay: 1,
            origin: "https://ghostz-cdl-dash.vercel.app",
            showinfo: 0,
            controls: 0,
            rel: 0,
        },
    };

    const onReady = (event) => {
        const player = event.target;
        player.playVideo();
    };

    const onError = (error) => {
        setVideo(nextVideo);
        error.target.playVideo();
        updateNextVideo();
    };

    const onStateChange = (event) => {
        updateStateChangeService(token as string, video.id, event.data).then(() => {
            if (event.data === 1) {
                if (!nextVideo || nextVideo.youtube_id === video.youtube_id) {
                    updateNextVideo();
                }
            }
        });
        if (event.data === -1) {
            event.target.playVideo();
        } else if (event.data === 0) {
            setTitleCssName("hidden");
            setVideo(nextVideo);
            event.target.playVideo();
        } else if (event.data === 1) {
            setTitleCssName("visible");
        }
    };

    return (
        <div className={styles["container"]}>
            <div className={`${styles["video-loading"]} ${styles[titleCssName]}`}>
                <Image src={cdlLogo} alt="Logo" />
            </div>
            {video.youtube_id && (
                <div className={styles["video-container"]}>
                    <div className={styles["video-foreground"]}>
                        <YouTube
                            opts={opts}
                            videoId={video.youtube_id}
                            onStateChange={onStateChange}
                            onReady={onReady}
                            onError={onError}
                        />
                    </div>
                </div>
            )}
            <div className={`${styles["title-video"]} ${styles[titleCssName]}`}>{video.title}</div>
        </div>
    );
};

export default OverlayYoutube;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const props = {
        pusher_key: process.env.PUSHER_KEY,
        pusher_cluster: process.env.PUSHER_CLUSTER,
    };
    return { props };
};
