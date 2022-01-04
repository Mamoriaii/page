type tNote = {
    lines: any[]
}


type MixNode = {
    type?: 'N' | 'A' | 'v' | '',
    isFix?: boolean;
    output: string;
    remark?: string;
}


type GrammarSysNode = {
    type?: 'N' | 'A' | 'v' | '',
    isFix?: boolean;
    output?: string;
    remark?: string;

    grammar?: string;

    _input?: string;
    strc?: GrammarNode;
}
type GrammarNode = {
    grammar: string;
    sys: GrammarSysNode[];
}

type SplitSeg = {
    _input: string;
    punc?: string;
    strc: GrammarNode;
}

type Segment = {
    _input: string;

    sys: SplitSeg[];
}

type Iblock = {
    grammar?: string;
    remark?: string;
    isFix?: boolean;

    punc?: string;

    pos?: 'N' | 'A' | 'V' | 'S' | '',

    depart?: Iblock[];

    output?: string;
}

type Iseg = {
    blocks: Iblock[];
}

// dva相关
type Dispatch = (action: {
    type: string;
    payload?: any;
    callback?: (res: any) => any;
    sort?: string;
}) => any;
interface ConnectProps {
    dispatch?: Dispatch;
    location?: Location;
}
