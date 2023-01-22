import styles from "./layout.module.scss";

interface ILayoutProps {
    firstTeam: any;
    secondTeam: any;
}

const Layout = (props: ILayoutProps) => {
    console.log("layout", props);

    return (
        <div className={styles["layout-container"]}>
            <div className={styles["first-team"]}>
                <div className={styles["team-name"]}>
                    {props.firstTeam.name}
                </div>
                <div className={styles["team-characteres"]}>
                    <div className={styles["first-character"]}>
                        <div className={styles["character-name"]}>
                            {props.firstTeam.characteres[0].family}
                        </div>
                    </div>
                    <div className={styles["second-character"]}>
                        <div className={styles["character-name"]}>
                            {props.firstTeam.characteres[1].family}
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles["second-team"]}>
                <div className={styles["team-name"]}>
                    {props.secondTeam.name}
                </div>
                <div className={styles["team-characteres"]}>
                    <div className={styles["third-character"]}>
                        <div className={styles["character-name"]}>
                            {props.secondTeam.characteres[0].family}
                        </div>
                    </div>
                    <div className={styles["fourth-character"]}>
                        <div className={styles["character-name"]}>
                            {props.secondTeam.characteres[1].family}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;
