import background from "assets/Summary.png";
import Image from "next/image";

interface IBackgroundProps {
    firstPlayerBackground: string
    secondPlayerBackground: string
    backgroundImage: string
}

const Background = (props: IBackgroundProps) => {
    return (
        <div>
            <Image src={background} alt="background" />
        </div>
    );
};

export default Background;
