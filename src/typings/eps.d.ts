type tBlock = {
    words: {
        "base": string;
        "pos": string;
        "reading": string;
        "surface": string;
        "cls": string;
    }[];
};

type tSegment = {
    isOs?: boolean;
    isMemo?: boolean;
    isBg?: boolean;

    blocks: tBlock[];
}
type tSection = {
    speaker: string;
    segs: tSegment[]
}
type tCat = {
    name: string;
    sects: tSection[];
}

type tEp = {
    number: number;
    cat: Tcat[];
}