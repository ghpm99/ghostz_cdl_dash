import styles from "./background.module.scss";

interface IBackgroundProps {
    firstTeam: {
        firstCharacter: string;
        firstCharacterName: string;
        secondCharacter: string;
        secondCharacterName: string;
    };
    secondTeam: {
        firstCharacter: string;
        firstCharacterName: string;
        secondCharacter: string;
        secondCharacterName: string;
    };
}

const Background = (props: IBackgroundProps) => {
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <video
                    key={`first-player-name-${props.firstTeam.firstCharacterName}`}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={`first-player-name-${props.firstTeam.firstCharacterName}`}
                        src={props.firstTeam.firstCharacter}
                        type="video/mp4"
                    />
                </video>
                <video
                    key={`secondCharacter-player-name-${props.firstTeam.secondCharacterName}`}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={`secondCharacter-player-name-${props.firstTeam.secondCharacterName}`}
                        src={props.firstTeam.secondCharacter}
                        type="video/mp4"
                    />
                </video>
            </div>
            <div className={styles["second-team"]}>
                <video
                    key={`second-first-player-name-${props.secondTeam.firstCharacterName}`}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={`second-first-player-name-${props.secondTeam.firstCharacterName}`}
                        src={props.secondTeam.firstCharacter}
                        type="video/mp4"
                    />
                </video>
                <video
                    key={`second-secondCharacter-player-name-${props.secondTeam.secondCharacterName}`}
                    className={styles["character"]}
                    width={"732px"}
                    height={"1080px"}
                    autoPlay
                    loop
                    muted>
                    <source
                        key={`second-secondCharacter-player-name-${props.secondTeam.secondCharacterName}`}
                        src={props.secondTeam.secondCharacter}
                        type="video/mp4"
                    />
                </video>
            </div>
        </div>
    );
};

export default Background;
