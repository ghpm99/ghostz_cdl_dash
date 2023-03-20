import styles from "./background.module.scss";

interface IBackgroundProps {
    firstTeam: {
        firstCharacter: string;
        secondCharacter: string;
        thirdCharacter: string;
    };
    secondTeam: {
        firstCharacter: string;
        secondCharacter: string;
        thirdCharacter: string;
    };
}

const Background = (props: IBackgroundProps) => {
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <video
                    key={"firstTeam-firstCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"firstTeam-firstCharacter"} src={props.firstTeam.firstCharacter} type="video/mp4" />
                </video>
                <video
                    key={"firstTeam-secondCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"firstTeam-secondCharacter"} src={props.firstTeam.secondCharacter} type="video/mp4" />
                </video>
                <video
                    key={"firstTeam-thirdCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"firstTeam-thirdCharacter"} src={props.firstTeam.thirdCharacter} type="video/mp4" />
                </video>
            </div>
            <div className={styles["second-team"]}>
                <video
                    key={"secondTeam-firstCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"secondTeam-firstCharacter"} src={props.secondTeam.firstCharacter} type="video/mp4" />
                </video>
                <video
                    key={"secondTeam-secondCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={"secondTeam-secondCharacter"}
                        src={props.secondTeam.secondCharacter}
                        type="video/mp4"
                    />
                </video>
                <video
                    key={"secondTeam-thirdCharacter"}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source key={"secondTeam-thirdCharacter"} src={props.secondTeam.thirdCharacter} type="video/mp4" />
                </video>
            </div>
        </div>
    );
};

export default Background;
