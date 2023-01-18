export const calculateWinRate = (matches: number, victories: number) => {
    if (matches === 0) {
        return "0%";
    }
    const winRate = (victories / matches) * 100;

    return `${Math.ceil(winRate)}%`;
};
