import styles from "./background.module.scss";

interface IBackgroundProps {
    firstPlayerName: string;
    firstPlayerBackground: string;
    secondPlayerName: string;
    secondPlayerBackground: string;
    backgroundImage: string;
}

const Background = (props: IBackgroundProps) => {
    return (
        <div className={styles["background-container"]}>
            <img className={styles["background"]} src={props.backgroundImage} alt="background" />
            <video
                loop
                muted
                autoPlay
                key={`firstPlayerBackground-${props.firstPlayerName}`}
                className={styles["first-player"]}
                width={"732px"}
                height={"1080px"}>
                <source
                    key={`firstPlayerBackground-${props.firstPlayerName}`}
                    src={props.firstPlayerBackground}
                    type="video/mp4"
                />
            </video>
            <video
                loop
                muted
                autoPlay
                key={`secondPlayerBackground-${props.secondPlayerName}`}
                className={styles["second-player"]}
                width={"732px"}
                height={"1080px"}>
                <source
                    key={`secondPlayerBackground-${props.secondPlayerName}`}
                    src={props.secondPlayerBackground}
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default Background;
