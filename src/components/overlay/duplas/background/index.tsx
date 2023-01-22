import styles from "./background.module.scss";
interface IBackgroundProps {
    firstTeam: {
        firstCharacter: string;
        secondCharacter: string;
    };
    secondTeam: {
        firstCharacter: string;
        secondCharacter: string;
    };
}

const Background = (props: IBackgroundProps) => {
    console.log("background", props);
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <img
                    className={styles["first-character"]}
                    src={props.firstTeam.firstCharacter}
                />
                <img
                    className={styles["second-character"]}
                    src={props.firstTeam.secondCharacter}
                />
            </div>
            <div className={styles["second-team"]}>
                <img
                    className={styles["third-character"]}
                    src={props.secondTeam.firstCharacter}
                />
                <img
                    className={styles["fourth-character"]}
                    src={props.secondTeam.secondCharacter}
                />
            </div>
        </div>
    );
};

export default Background;
