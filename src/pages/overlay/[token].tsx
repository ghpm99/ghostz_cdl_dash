import DuplasLayout from "components/overlay/duplas";
import DefaultLayout from "components/overlay/normal";
import { GetServerSideProps } from "next";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { fetchActiveOverlayService } from "services/overlay";
import styles from "./overlay.module.scss";
import TriosLayout from "components/overlay/trios";
import { useRouter } from "next/router";

const Overlay = (props) => {
    const router = useRouter();
    const { token } = router.query;

    const [active, setActive] = useState({
        date: "",
        hour: "",
        modality: "",
        background: "",
        team: [],
    });

    console.log(token);

    const onChangeOverlay = (data) => {
        setActive(data.data);
    };

    useEffect(() => {
        fetchActiveOverlayService(token as string)
            .then((response) => {
                setActive(response.data.data);
            })
            .catch((error) => {
                console.log("error", error);
                if (error.response.status === 404) {
                    setActive((prev) => ({
                        ...prev,
                        background:
                            "https://static.vecteezy.com/ti/vetor-gratis/p3/6549647-pagina-de-destino-404-gratis-vetor.jpg",
                    }));
                }
            });

        const pusher = new Pusher(props.pusher_key, {
            cluster: props.pusher_cluster,
            authEndpoint: process.env.NEXT_PUBLIC_API_URL + "/pusher/auth",
            auth: {
                headers: {
                    Authorization: "Basic " + token,
                },
            },
        });

        const channel = pusher.subscribe("private-overlay");
        channel.bind("overlay", onChangeOverlay);
        return () => {
            pusher.unsubscribe("private-overlay");
        };
    }, []);

    if (active.modality === "DUPLAS") {
        return (
            <div className={styles["container"]}>
                <DuplasLayout active={active} />
            </div>
        );
    }

    if (active.modality === "TRIOS") {
        return (
            <div className={styles["container"]}>
                <TriosLayout active={active} />
            </div>
        );
    }

    return (
        <div className={styles["container"]}>
            <DefaultLayout active={active} />
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
