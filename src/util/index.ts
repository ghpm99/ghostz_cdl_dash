
export const calculateWinRate = (matches: number, victories: number) => {
    const winRate = (victories/ matches) * 100

    return `${Math.ceil(winRate)}%`
}