
import { calculateWinRate } from 'util/index'
import styles from "./normal.module.scss";

interface INormalLayoutProps {
    team: any[];
}

const NormalLayout = (props: INormalLayoutProps) => {
    if(!props.team || props.team.length === 0){
        return (<div></div>)
    }
    const firstTeam = props.team[0];
    const firstCharacter = firstTeam.characteres[0];
    const secondTeam = props.team[1];
    const secondCharacter = secondTeam.characteres[0];

    return (
        <div className={styles["container"]}>
            <div className={styles["display-subtitle"]}>
                <div>MMR</div>
                <div>partidas</div>
                <div>vitorias</div>
                <div>derrotas</div>
                <div>campeao</div>
                <div>win rate</div>
                <div>twitch</div>
            </div>
            <div className={styles["first-player"]}>
                <div className={styles["first-personal-data"]}>
                    <div>{firstCharacter.family}</div>
                    <div>{firstCharacter.name}</div>
                    <div>{firstCharacter.bdo_class}</div>
                    <div>{firstCharacter.combat_style}</div>
                </div>
                <div className={styles["first-battle-data"]}>
                    <div>{firstTeam.mmr}</div>
                    <div>{firstCharacter.matches}</div>
                    <div>{firstCharacter.victories}</div>
                    <div>{firstCharacter.defeats}</div>
                    <div>{firstCharacter.champion}</div>
                    <div>{calculateWinRate(parseInt(firstCharacter.matches), parseInt(firstCharacter.victories))}</div>
                    <div>{firstTeam.twitch}</div>
                </div>
            </div>
            <div className={styles["second-player"]}>
                <div className={styles["second-personal-data"]}>
                    <div>{secondCharacter.family}</div>
                    <div>{secondCharacter.name}</div>
                    <div>{secondCharacter.bdo_class}</div>
                    <div>{secondCharacter.combat_style}</div>
                </div>
                <div className={styles["second-battle-data"]}>
                    <div>{secondTeam.mmr}</div>
                    <div>{secondCharacter.matches}</div>
                    <div>{secondCharacter.victories}</div>
                    <div>{secondCharacter.defeats}</div>
                    <div>{secondCharacter.champion}</div>
                    <div>{calculateWinRate(parseInt(secondCharacter.matches), parseInt(secondCharacter.victories))}</div>
                    <div>{secondTeam.twitch}</div>
                </div>
            </div>
        </div>
    );
};

export default NormalLayout;
