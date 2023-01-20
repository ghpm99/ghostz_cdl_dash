import styles from "./background.module.scss";

interface IBackgroundProps {
    firstPlayerBackground: string;
    secondPlayerBackground: string;
    backgroundImage: string;
}

const Background = (props: IBackgroundProps) => {

    return (
        <div className={styles["background-container"]}>
            <img
                className={styles["background"]}
                src={props.backgroundImage}
                alt="background"
            />
            <video
                key={props.firstPlayerBackground}
                className={styles["first-player"]}
                width={"732px"}
                height={"1080px"}
                autoPlay
                loop
                muted>
                <source
                    key={props.firstPlayerBackground}
                    src={props.firstPlayerBackground}
                    type="video/mp4"
                />
            </video>
            <video
                key={props.secondPlayerBackground}
                className={styles["second-player"]}
                width={"732px"}
                height={"1080px"}
                autoPlay
                loop
                muted>
                <source
                    key={props.secondPlayerBackground}
                    src={props.secondPlayerBackground}
                    type="video/mp4"
                />
            </video>
        </div>
    );
};

export default Background;
