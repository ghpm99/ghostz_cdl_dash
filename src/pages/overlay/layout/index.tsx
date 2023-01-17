import NormalLayout from "../normal";
import styles from "./layout.module.scss";

interface ILayoutProps {
    date: string;
    hour: string;
    modality: string;
    team: any[];
}

const Layout = (props: ILayoutProps) => {
    console.log(props.team);
    const getComponentByModality = (modality: string) => {
        if (modality === "PREMIUM") {
            return <NormalLayout team={props.team} />;
        }
    };
    return (
        <div className={styles['layout-container']}>
            <div className={styles["date"]}>{props.date}</div>
            <div className={styles["hour"]}>{props.hour}</div>
            <div className={styles["modality"]}>{props.modality}</div>
            <div className={styles["league"]}>liga</div>
            {getComponentByModality(props.modality)}
        </div>
    );
};

export default Layout;
