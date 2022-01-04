const _ = require('lodash');
const _Tagtable = [{
    id: '67FD2E3B-EE3E-45F2-969D-7FF30D07A557',
    name: '浪'
}, {
    id: '24786137-2C29-4DF5-979D-7FEAF54969B6',
    name: '简餐'
}, {
    id: '26339FD7-3CE2-418B-95B0-2D032F1531BD',
    name: '享受'
}, {
    id: 'C0E12EE4-16FA-45B3-B3D3-52BA4742AB7E',
    name: '非常服'
}, {
    id: 'CB868CB8-59EE-4CF5-BA61-6A6159B45804',
    name: '通勤'
}, {
    id: '20BA9DB8-5DA2-4D58-AE8A-4C2C3719ABA3',
    name: '回家'
}, {
    id: '6CCF5E96-B22B-489F-A4F6-C1EEA6F23CD4',
    name: '绘画'
}, {
    id: 'DBB21AE5-5572-4289-946A-EFACE0C623DC',
    name: '日语'
}, {
    id: '32488AA3-3367-42C1-90B9-2CD18C605037',
    name: '我凉'
}];
const _Grouptable = [{
    id: '722DAD4D-46E6-4160-9DA0-1762179E71D8',
    name: '饮食',
}, {
    id: 'ED40C148-498F-4CCB-9213-C018C04D635F',
    name: '服饰',
}, {
    id: 'B53CB634-E854-4543-9A7A-E1755F18A35C',
    name: '护肤',
}, {
    id: '09EF3DE6-D67B-4427-9EE5-8975BEE9776B',
    name: '居住',
}, {
    id: '9156D3C5-A54D-4BCE-AA96-559D08D03AFF',
    name: '交通',
}, {
    id: 'BE546CF7-4650-42B2-B7EF-D4EAD9458CC1',
    name: '充实',
}, {
    id: 'B8C3E8A0-368A-4E42-A176-0DC41E505964',
    name: '购物欲',
},];
const _Cattabble = [
    {
        id: '6807B936-37E2-409F-B0E6-35B54D5C59D8',
        name: '其他',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: '5377DFA5-EE8D-4086-89E7-D1222CF6EDDE',
        name: '饮料 零食',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: 'AFC48CF5-D4F7-4D4F-B3A5-2CF1CEDC231F',
        name: '水果',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: 'E1E757E4-FF36-4B7E-BA2C-0A042A955ABD',
        name: '早',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: '02F49B70-C04E-4C24-8264-572E54766DF8',
        name: '中',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: 'F42180E8-785A-44E6-9D14-6F2E57FF2333',
        name: '晚',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8'
    }, {
        id: 'DEE30E0F-D936-42E3-9015-9CD145C37FCB',
        name: '服装',
        groupId: 'ED40C148-498F-4CCB-9213-C018C04D635F'
    }, {
        id: '0912284E-55D8-47B7-9D7A-142963A1A02A',
        name: '居家服',
        groupId: 'ED40C148-498F-4CCB-9213-C018C04D635F'
    }, {
        id: 'B8ABEBED-2C0E-4965-994B-89FB9341DEAC',
        name: '鞋子',
        groupId: 'ED40C148-498F-4CCB-9213-C018C04D635F'
    }, {
        id: '7FF56EDB-54FC-4178-B736-7E23E597C19F',
        name: '饰品',
        groupId: 'ED40C148-498F-4CCB-9213-C018C04D635F'
    }, {
        id: 'D937BD17-80E0-4ADA-B692-524780B41BAF',
        name: '基础清洁',
        groupId: 'B53CB634-E854-4543-9A7A-E1755F18A35C'
    }, {
        id: '38C151EF-E5C8-48DB-9BC0-A8877260D566',
        name: '进阶养护',
        groupId: 'B53CB634-E854-4543-9A7A-E1755F18A35C'
    }, {
        id: 'A576C1DD-8A5A-42E1-8C25-C3636EDD1155',
        name: '美妆化妆',
        groupId: 'B53CB634-E854-4543-9A7A-E1755F18A35C'
    }, {
        id: '8BBB91B0-A1AA-4443-8CE6-B23B382E7EA9',
        name: '日化',
        groupId: '09EF3DE6-D67B-4427-9EE5-8975BEE9776B'
    }, {
        id: '3328FFB9-48A6-42DA-B407-C0AB0229A032',
        name: '自用',
        groupId: '09EF3DE6-D67B-4427-9EE5-8975BEE9776B'
    }, {
        id: '070B0AE6-5A70-405F-B6AF-321A7D0D2CAD',
        name: '话费',
        groupId: '09EF3DE6-D67B-4427-9EE5-8975BEE9776B'
    }, {
        id: 'F1377280-003E-42FA-93E5-D2D85C7C4358',
        name: '房租 网费 水电 物业',
        groupId: '09EF3DE6-D67B-4427-9EE5-8975BEE9776B'
    }, {
        id: '1168AEC4-BAF2-44B4-93DD-204332CE3E8A',
        name: '公交',
        groupId: '9156D3C5-A54D-4BCE-AA96-559D08D03AFF'
    }, {
        id: '3A9C600E-8B72-4FD0-8F46-167F11F75187',
        name: '打车',
        groupId: '9156D3C5-A54D-4BCE-AA96-559D08D03AFF'
    }, {
        id: 'E7D75C22-04EB-493A-85C4-E0582ACF86FC',
        name: '高铁',
        groupId: '9156D3C5-A54D-4BCE-AA96-559D08D03AFF'
    }, {
        id: 'B7F3E30F-15B8-435D-8051-CAD197A2FEC9',
        name: '课程',
        groupId: 'BE546CF7-4650-42B2-B7EF-D4EAD9458CC1'
    }, {
        id: 'EDA02485-D178-4AC1-B2C3-96BD9559527D',
        name: '教程',
        groupId: 'BE546CF7-4650-42B2-B7EF-D4EAD9458CC1'
    }, {
        id: '8B2C866C-2784-4DFC-A380-D34F2014EEC4',
        name: '书籍',
        groupId: 'BE546CF7-4650-42B2-B7EF-D4EAD9458CC1'
    }, {
        id: '8605920E-C5BF-4304-8D3B-6D7256C5C042',
        name: '爱豆',
        groupId: 'B8C3E8A0-368A-4E42-A176-0DC41E505964'
    }, {
        id: 'FDACEC29-7910-417C-B2A0-29DEA0966B1F',
        name: '手账',
        groupId: 'B8C3E8A0-368A-4E42-A176-0DC41E505964'
    }, {
        id: '1EAE82F0-AB52-41B8-B95E-9DBF3EC9D7B6',
        name: '电子及配件',
        groupId: 'B8C3E8A0-368A-4E42-A176-0DC41E505964'
    }, {
        id: 'B064ACEA-6DE3-4F6A-941A-6ACD7051C7D9',
        name: 'KTV',
        groupId: 'B8C3E8A0-368A-4E42-A176-0DC41E505964'
    }, {
        id: 'F1A9B172-8CFC-4FA5-AB5D-C9591B829692',
        name: '娱乐',
        groupId: 'B8C3E8A0-368A-4E42-A176-0DC41E505964'
    }
];


const _TagMap = _.keyBy(_Tagtable, 'id');
const _groupMap = _.keyBy(_Grouptable, 'id');
const _groupCat = _.groupBy(_Cattabble, 'groupId');
const _catMap = _.keyBy(_Cattabble, 'id');

const dataMock = [
    {
        createTime: '2020-11-13',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8',
        catId: 'E1E757E4-FF36-4B7E-BA2C-0A042A955ABD',
        price: 30,
        desc: '包子',
        tags: ['24786137-2C29-4DF5-979D-7FEAF54969B6']
    }, {
        createTime: '2020-11-13',
        groupId: '722DAD4D-46E6-4160-9DA0-1762179E71D8',
        catId: 'E1E757E4-FF36-4B7E-BA2C-0A042A955ABD',
        price: 30,
        desc: '包子',
        tags: ['24786137-2C29-4DF5-979D-7FEAF54969B6']
    },
]

const _defalutCatId = '02F49B70-C04E-4C24-8264-572E54766DF8';
export {
    _TagMap,
    _groupMap,
    _catMap,
    _groupCat,
    _defalutCatId,
    dataMock
}