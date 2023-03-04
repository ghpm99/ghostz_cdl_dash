import styles from './background.module.scss'

interface IBackgroundProps {
    firstPlayerName: string;
    firstPlayerBackground: string;
    secondePlayerName: string;
    secondPlayerBackground: string;
    backgroundImage: string;
}

const Background = (props: IBackgroundProps) => {
    console.log("background", props);
    return (
        <div className={styles["background-container"]}>
            <img className={styles["background"]} src={props.backgroundImage} alt="background" />
            <video
                key={props.firstPlayerName}
                className={styles["first-player"]}
                width={"732px"}
                height={"1080px"}
                autoPlay
                loop
                muted>
                <source key={props.firstPlayerName} src={props.firstPlayerBackground} type="video/mp4" />
            </video>
            <video
                key={props.secondePlayerName}
                className={styles["second-player"]}
                width={"732px"}
                height={"1080px"}
                autoPlay
                loop
                muted>
                <source key={props.secondePlayerName} src={props.secondPlayerBackground} type="video/mp4" />
            </video>
        </div>
    );
};

export default Background;
