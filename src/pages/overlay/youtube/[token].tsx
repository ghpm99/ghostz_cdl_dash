import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { fetchActiveYoutubePlaylistService, updateStateChangeService } from "services/youtube";
import styles from "./youtube.module.scss";
import YouTube from "react-youtube";
import { GetServerSideProps } from "next";
import Pusher from "pusher-js";

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

    const onCommandHandler = (data) => {
        setVideo(data[0]);
        setNextVideo(data[1]);
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
        const player = event.target;
        player.playVideo();
    };

    const onError = (error) => {
        setVideo(nextVideo);
        error.target.playVideo();
        updateNextVideo();
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const props = {
        pusher_key: process.env.PUSHER_KEY,
        pusher_cluster: process.env.PUSHER_CLUSTER,
    };
    return { props };
};
