type Tcat = {
    id: string;
    name: string;
    groupId: String;
}

type Ttag = {
    id: string;
    name: string;
}

type Tgroup = {
    id: string;
    name: string;
}

type Tmemo = {
    desc: string;
    time: string;
    groupId: string;
    catId: string;
    tags: string[]; // tagId[]
    price: number;
}

type TgroupCat = {
    [groupId: string]: Tcat[]
}