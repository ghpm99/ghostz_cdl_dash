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
        team: [],
    });
    console.log(active);
    useEffect(() => {
        fetchActiveOverlayService().then((response) => {
            console.log(response);
            setActive(response.data.data);
        });
    }, []);


    return (
        <div className={styles["container"]}>
            <Layout
                date={active.date}
                hour={active.hour}
                modality={active.modality}
                team={active.team}
            />
            <Background
                backgroundImage=''
                firstPlayerBackground=''
                secondPlayerBackground=''
            />
        </div>
    );
};

export default Overlay;
