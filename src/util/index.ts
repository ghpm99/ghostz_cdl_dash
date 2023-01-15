
export const calculateWinRate = (victories: number, defeats: number) => {
    if(victories === 0 && defeats === 0){
        return '0%'
    }
    if(defeats === 0){
        return '100%'
    }
    return `${victories/defeats}%`
}