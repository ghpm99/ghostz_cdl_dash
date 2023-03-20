import styles from "./background.module.scss";

interface IBackgroundProps {
    firstTeam: {
        firstCharacter: string;
        firstCharacterName: string;
        secondCharacter: string;
        secondCharacterName: string;
        thirdCharacter: string;
        thirdCharacterName: string;
    };
    secondTeam: {
        firstCharacter: string;
        firstCharacterName: string;
        secondCharacter: string;
        secondCharacterName: string;
        thirdCharacter: string;
        thirdCharacterName: string;
    };
}

const Background = (props: IBackgroundProps) => {
    return (
        <div className={styles["background-container"]}>
            <div className={styles["first-team"]}>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`firstTeam-first-characterName-${props.firstTeam.firstCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.firstTeam.firstCharacter}
                        key={`firstTeam-first-characterName-${props.firstTeam.firstCharacterName}`}
                    />
                </video>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`firstTeam-second-characterName-${props.firstTeam.secondCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.firstTeam.secondCharacter}
                        key={`firstTeam-second-characterName-${props.firstTeam.secondCharacterName}`}
                    />
                </video>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`firstTeam-third-characterName-${props.firstTeam.thirdCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.firstTeam.thirdCharacter}
                        key={`firstTeam-third-characterName-${props.firstTeam.thirdCharacterName}`}
                    />
                </video>
            </div>
            <div className={styles["second-team"]}>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`secondTeam-first-characterName-${props.secondTeam.firstCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.secondTeam.firstCharacter}
                        key={`secondTeam-first-characterName-${props.secondTeam.firstCharacterName}`}
                    />
                </video>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`secondTeam-second-characterName-${props.secondTeam.secondCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.secondTeam.secondCharacter}
                        key={`secondTeam-second-characterName-${props.secondTeam.secondCharacterName}`}
                    />
                </video>
                <video
                    loop
                    muted
                    autoPlay
                    width={"732px"}
                    height={"1080px"}
                    className={styles["character"]}
                    key={`secondTeam-third-characterName-${props.secondTeam.thirdCharacterName}`}>
                    <source
                        type="video/mp4"
                        src={props.secondTeam.thirdCharacter}
                        key={`secondTeam-third-characterName-${props.secondTeam.thirdCharacterName}`}
                    />
                </video>
            </div>
        </div>
    );
};

export default Background;
