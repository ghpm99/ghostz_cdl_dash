interface IOverlayPanel {
    id: number;
    date: string;
    hour: string;
    modality: string;
    active: boolean;
    team: ITeamOverlayPanel[];
}

interface ITeamOverlayPanel {
    id: number;
    name: string;
    twitch: string;
    mmr: string;
    mmr_as: string;
    characteres: ICharacterOverlayPanel[];
}

interface ICharacterOverlayPanel {
    id: number;
    family: string;
    name: string;
    bdo_class: string;
    combat_style: string;
    matches: string;
    defeats: string;
    victories: string;
    champion: string;
    dr: string;
    by: string;
    walkover: string;
}
