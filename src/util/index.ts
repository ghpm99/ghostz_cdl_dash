export const calculateWinRate = (matches: number, victories: number) => {
    if (matches === 0) {
        return "0%";
    }
    const winRate = (victories / matches) * 100;

    return `${Math.ceil(winRate)}%`;
};

export interface ILeagueData {
    range: string;
    name: string;
}

export const calculateLeague = (mmr1: number, mmr2: number): ILeagueData => {
    const sum = Number(mmr1) + Number(mmr2);
    const avg = sum / 2 || 0;

    if (avg <= 59) {
        return {
            name: "INICIANTES",
            range: "0 a 59 de MMR",
        };
    } else if (avg >= 60 && avg <= 120) {
        return {
            name: "AVANÇADO",
            range: "60 A 120 de MMR",
        };
    } else if (avg >= 121) {
        return {
            name: "VETERANOS",
            range: "121+ de MMR",
        };
    } else {
        return {
            name: "PERSONALIZADA",
            range: "-",
        };
    }
};
