import styles from "./background.module.scss";
interface IBackgroundProps {
    firstTeam: {
        firstCharacter: string;
        secondCharacter: string;
        thirdCharacter: string
    };
    secondTeam: {
        firstCharacter: string;
        secondCharacter: string;
        thirdCharacter: string
    };
}

const Background = (props: IBackgroundProps) => {
    console.log("background", props);
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <img
                    className={styles["character"]}
                    src={props.firstTeam.firstCharacter}
                />
                <img
                    className={styles["character"]}
                    src={props.firstTeam.secondCharacter}
                />
                <img
                    className={styles["character"]}
                    src={props.firstTeam.thirdCharacter}
                />
            </div>
            <div className={styles["second-team"]}>
                <img
                    className={styles["character"]}
                    src={props.secondTeam.firstCharacter}
                />
                <img
                    className={styles["character"]}
                    src={props.secondTeam.secondCharacter}
                />
                <img
                    className={styles["character"]}
                    src={props.firstTeam.thirdCharacter}
                />
            </div>
        </div>
    );
};

export default Background;
