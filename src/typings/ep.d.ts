

type eword = {
    id: string;
    type: 'word';
    surface: string;
    reading: string;
    base: string;
    pos: string; // 词性
    curPos: string;

    isPre: boolean;
    isAfter: boolean;
}

type epunk = {
    id: string;
    type: 'punk',
    surface: string;
}

type echunk = {
    id: string;
    type: 'chunk';
    surface: string;

    grammar: string;
    格: string;
    pos: string; // 成分性质   做动词 做句子

    children: epart[];

    punk?: false | string;
}

type epart = eword | echunk;
type eSeg = {
    id: string;
    type: 'seg';
    surface: string;
    children: epart[];
    grammar: string;

    isOs?: boolean;
    isBg?: boolean;
}

type partType = 'seg' | 'chunk' | 'word' | 'punk' | '/';
type catType = 'dialog' | 'section' | 'chapter';

type edialog = {
    id: string;
    speaker: string;
    type: 'dialog';
    children: eSeg[];
}

type esection = {
    id: string;
    name: string;
    type: 'section';
    children: edialog[];
}

type estage = {
    id: string;
    name: string;
    type: 'chapter';
    section: esection[];
}

type eep = {
    id: string;
    number: string;
    type: 'passage';
    stage: estage[];
}

type ecallback = (type: string, params?: any) => Promise<any> | any;
interface editorState {

    curEp: eep | {};

    curChapIdx: number;

    curSect: esection | {};

    curNode: estage | esection | edialog | eSeg | epart | {};

    sTreeExpandKeys: string[];
    sTreeAuto: boolean;

}