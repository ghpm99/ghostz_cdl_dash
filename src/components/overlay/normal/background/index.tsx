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
                width={"732px"}
                height={"1080px"}
                className={styles["first-player"]}
                key={`firstPlayerBackground-${props.firstPlayerName}`}>
                <source
                    type="video/mp4"
                    src={props.firstPlayerBackground}
                    key={`firstPlayerBackground-${props.firstPlayerName}`}
                />
            </video>
            <video
                loop
                muted
                autoPlay
                width={"732px"}
                height={"1080px"}
                className={styles["second-player"]}
                key={`secondPlayerBackground-${props.secondPlayerName}`}>
                <source
                    type="video/mp4"
                    src={props.secondPlayerBackground}
                    key={`secondPlayerBackground-${props.secondPlayerName}`}
                />
            </video>
        </div>
    );
};

export default Background;
