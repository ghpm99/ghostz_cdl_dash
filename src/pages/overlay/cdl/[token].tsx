import DuplasLayout from "components/overlay/duplas";
import DefaultLayout from "components/overlay/normal";
import StreetFighterLayout from "components/overlay/streetFighter";
import TriosLayout from "components/overlay/trios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { fetchActiveOverlayService } from "services/overlay";

import styles from "./overlay.module.scss";

const Overlay = (props) => {
    const router = useRouter();
    const { token } = router.query;

    const [active, setActive] = useState({
        date: "",
        hour: "",
        modality: "",
        background: "",
        type: "",
        team: [],
    });

    const onChangeOverlay = (data) => {
        fetchActiveOverlay();
    };

    const onChangeOverlayType = (data) => {
        fetchActiveOverlayService(token as string)
            .then((response) => {
                setActive(response.data.data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setActive((prev) => ({
                        ...prev,
                        background:
                            "https://static.vecteezy.com/ti/vetor-gratis/p3/6549647-pagina-de-destino-404-gratis-vetor.jpg",
                    }));
                }
            });
    };

    const fetchActiveOverlay = () => {
        fetchActiveOverlayService(token as string)
            .then((response) => {
                setActive(response.data.data);
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setActive((prev) => ({
                        ...prev,
                        background:
                            "https://static.vecteezy.com/ti/vetor-gratis/p3/6549647-pagina-de-destino-404-gratis-vetor.jpg",
                    }));
                }
            });
    };

    useEffect(() => {
        fetchActiveOverlay();
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
        channel.bind("overlay_type", onChangeOverlayType);
        return () => {
            pusher.unsubscribe("private-overlay");
        };
    }, []);

    if (active.type === "x2_bdo") {
        return (
            <div className={styles["container"]}>
                <DuplasLayout active={active} />
            </div>
        );
    }

    if (active.type === "x3_bdo") {
        return (
            <div className={styles["container"]}>
                <TriosLayout active={active} />
            </div>
        );
    }

    if (active.type === "street_fighter") {
        return (
            <div className={styles["container"]}>
                <StreetFighterLayout active={active} />
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
