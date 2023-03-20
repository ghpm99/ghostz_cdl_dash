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
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <video
                    key={"first-player-name"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"first-player-name"} src={props.firstTeam.firstCharacter} type="video/mp4" />
                </video>
                <video
                    key={"secondCharacter-player-name"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={"secondCharacter-player-name"}
                        src={props.firstTeam.secondCharacter}
                        type="video/mp4"
                    />
                </video>
            </div>
            <div className={styles["second-team"]}>
                <video
                    key={"second-first-player-name"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"second-first-player-name"} src={props.secondTeam.firstCharacter} type="video/mp4" />
                </video>
                <video
                    key={"second-secondCharacter-player-name"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={"second-secondCharacter-player-name"}
                        src={props.secondTeam.secondCharacter}
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
};

export default Background;
