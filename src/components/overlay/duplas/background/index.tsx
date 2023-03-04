import styles from './background.module.scss'

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
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <img className={styles["character"]} src={props.firstTeam.firstCharacter} />
                <img className={styles["character"]} src={props.firstTeam.secondCharacter} />
            </div>
            <div className={styles["second-team"]}>
                <img className={styles["character"]} src={props.secondTeam.firstCharacter} />
                <img className={styles["character"]} src={props.secondTeam.secondCharacter} />
            </div>
        </div>
    );
};

export default Background;
