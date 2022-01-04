import { NLP } from '@/services/api';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
// import { prefixLine } from '../cherrymaho/Editor/components/utils';
import styles from './index.less';
const _ = require('lodash');
interface Props {
}

const lrc = `小さな駅のホーム 桜の見えるベンチ
小车站的月台上 能看见樱花的长椅
明るく振る舞う君 迫り来る発車時刻
故作开朗的你 就要到来的列车
えっと…えっと…伝えたいことは
「那个…那个…」想要告诉你的话
えっと…えっと…山ほどある
「那个…那个…」像山一样多
口から出るのはくだらない話題ばかりさ
但说出口的全是无聊的话题
君の笑顔も泣き顔も
你笑的样子哭的样子
知っていたつもりなのに
我明明都知道
今ここで「じゃあね」っていう顔を
但此刻说「再见」的样子
どうしても見れないままで…
为什么我怎么都看不见
憧れの都会の午後 一人で食べるランチ
憧憬的城市的下午 一个人吃着午餐
毎日が深夜残業 飛び乗る最終列車
每天加班到深夜 飞奔着追赶末班车
えっと…えっと…「心配しないで」
那个…那个…「别担心我」
えっと…えっと…「大丈夫さ」
那个…那个…「我没事的」
なぜだろう 君には聞こえていない気がした
为什么 总觉得这些你都听不到
会えない日々が来ることを
不能见面的日子到来了
こわがってばかりいたけど
虽然那么害怕
喜ぶべきか いつの間にか
应该高兴吗？什么时候开始
強い自分を手に入れていた
我变得坚强了起来
忘れたくても全てが君を連想
虽然想忘记但是一切都会联想到你
かき消す為流す二人のエンドロール
消失的流动的 我们结束了
君の経路 僕の回路 君へ帰ろうとしたこの感情
你的路我的路 想要在你身边的这份感情
いつも近くで支えてくれた
总是在身旁支持着我的你
離れて気付く君の心地よさ
分开了才知道你有多好
顔を上げて 見てたSame Day
抬起头 看见和那天一样的
列なるチェリーブラッサム
繁茂的樱花
春が来て 今 僕の住む
春天又来了 现在我住的
灰色のこの街にも
这条灰色的街道
目がくらむほど 桜、咲いたよ
令人目不暇接的樱花也绽放了
涙がこぼれてきた
眼泪滑落
君の笑顔も泣き顔も
你笑的样子哭的样子
誰よりも知っていたのに
我明明比谁都清楚
遠くの街で 君がどんな顔しているかなんて…
但遥远的你 现在是怎样的表情
僕はこれっぽっちも知らない
就连这个我都不知道`.split('\n').filter((seg: string, idx) => !(idx % 2))

const onNpl = async (str: string) => {
    const res = await NLP({ text: str, mode: 0 });
    return res;

}

//#region lrc
const data = [
    {
        "words": [
            {
                "base": "小さな",
                "pos": "連体詞,*,*,*",
                "pronunciation": "チーサナ",
                "reading": "ちいさな",
                "surface": "小さな",
                "curPos": "/",
                "id": "80501378-52B2-4CED-AC52-6FB80C68482F"
            },
            {
                "base": "駅",
                "pos": "名詞,一般,*,*",
                "pronunciation": "エキ",
                "reading": "えき",
                "surface": "駅",
                "curPos": "n",
                "id": "02B60AB6-89A7-4CAC-8A0C-0B2873D005CB"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "EE13534A-2DEC-46CF-BCBF-C4465FC9B3C9"
            },
            {
                "base": "ホーム",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ホーム",
                "reading": "",
                "surface": "ホーム",
                "curPos": "n",
                "id": "68B0F75B-241F-4B7B-A793-09E93DCBC90B"
            },
            {
                "base": "桜",
                "pos": "名詞,一般,*,*",
                "pronunciation": "サクラ",
                "reading": "さくら",
                "surface": "桜",
                "curPos": "n",
                "id": "4DB5DB8F-7387-403E-AFB9-ADA2C97B5BCD"
            },
            {
                "base": "の",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "EF7BB95E-8989-4B4E-B34E-7F4F10F72B1C"
            },
            {
                "base": "見える",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ミエル",
                "reading": "みえる",
                "surface": "見える",
                "curPos": "v",
                "id": "823FCF9F-A42D-4A68-992D-336A49BE83DE"
            },
            {
                "base": "ベンチ",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ベンチ",
                "reading": "",
                "surface": "ベンチ",
                "curPos": "n",
                "id": "5B04AD7B-E6D7-4EAB-9391-1BD714D6CC06"
            }
        ]
    },
    {
        "words": [
            {
                "base": "明るい",
                "pos": "形容詞,自立,*,*",
                "pronunciation": "アカルク",
                "reading": "あかるく",
                "surface": "明るく",
                "curPos": "a",
                "id": "A3674836-E412-45B9-A34F-190BF624A549"
            },
            {
                "base": "振る舞う",
                "pos": "動詞,自立,*,*",
                "pronunciation": "フルマウ",
                "reading": "ふるまう",
                "surface": "振る舞う",
                "curPos": "v",
                "id": "BD7BE06D-504A-4E20-B437-7EFF619E2DBE"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "261DF3F3-C38A-44F7-BE48-872AB1D913AE"
            },
            {
                "base": "迫る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "セマリ",
                "reading": "せまり",
                "surface": "迫り",
                "curPos": "v",
                "id": "53DDB55F-5A12-4D9A-A0FB-31B89BC0A7BC"
            },
            {
                "base": "来る",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "クル",
                "reading": "くる",
                "surface": "来る",
                "curPos": "v",
                "id": "8C529588-9986-4465-97CA-C719CA020E77"
            },
            {
                "base": "発車",
                "pos": "名詞,サ変接続,*,*",
                "pronunciation": "ハッシャ",
                "reading": "はっしゃ",
                "surface": "発車",
                "curPos": "n",
                "id": "C4F064B5-B77B-4D49-827C-762E0587D806"
            },
            {
                "base": "時刻",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ジコク",
                "reading": "じこく",
                "surface": "時刻",
                "curPos": "n",
                "id": "1960C855-70CD-434E-BC51-5209B78472E0"
            }
        ]
    },
    {
        "words": [
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "666F9F59-4363-48B7-94CA-EB7B412F7764"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "DF382DCC-BF53-4CC7-8F67-D47FE9B59294"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "16CCD62A-B473-48C8-9296-589A55A65E0F"
            },
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "84500D98-A63B-42D0-A9DA-07DCE6120B57"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "682AC3AC-92C5-405F-804D-DAEF55913796"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "43A4BEF3-546A-4A2E-B482-1A9BEEADBF81"
            },
            {
                "base": "伝える",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ツタエ",
                "reading": "つたえたい",
                "surface": "伝えたい",
                "curPos": "v",
                "id": "7FC5C497-20C0-474C-B710-70C37EFCBD3C"
            },
            {
                "base": "こと",
                "pos": "名詞,非自立,一般,*",
                "pronunciation": "コト",
                "reading": "",
                "surface": "こと",
                "curPos": "n",
                "id": "9D49B0D6-0926-46E2-A249-0C83722B9FE6"
            },
            {
                "base": "は",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "ワ",
                "reading": "",
                "surface": "は",
                "curPos": "av",
                "id": "D61E40D0-537F-43B7-9B1B-E2E19B413321"
            }
        ]
    },
    {
        "words": [
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "DB519E68-6377-4C88-8740-DA83D7DD0AD3"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "08832350-6A74-4BDD-8DA4-5EF4FDA1E0D5"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "AB82ED02-5B68-4849-A0F6-20761255176B"
            },
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "C25571F7-1D87-459C-8E64-449A5618FB2E"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "9B0E982D-7521-42F8-B20D-ED64A72919C1"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "ADC5F958-B20D-4A11-A1D9-FEF3706C5361"
            },
            {
                "base": "山",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ヤマ",
                "reading": "やま",
                "surface": "山",
                "curPos": "n",
                "id": "87B3B645-6A98-4C8E-AAA1-9D1F8B9A44C8"
            },
            {
                "base": "ほど",
                "pos": "助詞,副助詞,*,*",
                "pronunciation": "ホド",
                "reading": "",
                "surface": "ほど",
                "curPos": "av",
                "id": "B8F2D844-26FA-4803-ADA7-CD76D4499235"
            },
            {
                "base": "ある",
                "pos": "動詞,自立,*,*",
                "pronunciation": "アル",
                "reading": "",
                "surface": "ある",
                "curPos": "v",
                "id": "A634AE8B-DDEE-4871-964C-1BC1FD3B2EEE"
            }
        ]
    },
    {
        "words": [
            {
                "base": "口",
                "pos": "名詞,一般,*,*",
                "pronunciation": "クチ",
                "reading": "くち",
                "surface": "口",
                "curPos": "n",
                "id": "D961B8C1-E1CE-4790-A00D-8C4E903D1DD1"
            },
            {
                "base": "から",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "カラ",
                "reading": "",
                "surface": "から",
                "curPos": "av",
                "id": "D3E62517-4897-4668-8659-FE473D9C5133"
            },
            {
                "base": "出る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "デル",
                "reading": "でる",
                "surface": "出る",
                "curPos": "v",
                "id": "30A54AD9-FA7A-4A3E-A390-25DFFC07CA88"
            },
            {
                "base": "の",
                "pos": "名詞,非自立,一般,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "n",
                "id": "C2716086-ECC6-47D4-9D66-E846495BF5B0"
            },
            {
                "base": "は",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "ワ",
                "reading": "",
                "surface": "は",
                "curPos": "av",
                "id": "2DC39DC9-7248-4818-992F-E81B67A713CD"
            },
            {
                "base": "くだらない",
                "pos": "形容詞,自立,*,*",
                "pronunciation": "クダラナイ",
                "reading": "",
                "surface": "くだらない",
                "curPos": "a",
                "id": "13FEF909-3744-4994-A711-2B41564C6D6A"
            },
            {
                "base": "話題",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ワダイ",
                "reading": "わだい",
                "surface": "話題",
                "curPos": "n",
                "id": "C581E783-A97A-478B-9EE5-F09E96FDD3FB"
            },
            {
                "base": "ばかり",
                "pos": "助詞,副助詞,*,*",
                "pronunciation": "バカリ",
                "reading": "",
                "surface": "ばかり",
                "curPos": "av",
                "id": "FFBC03D0-72F9-4696-A03F-422652A595FB"
            },
            {
                "base": "さ",
                "pos": "助詞,終助詞,*,*",
                "pronunciation": "サ",
                "reading": "",
                "surface": "さ",
                "curPos": "av",
                "id": "85348026-2594-400B-B1E6-1B6AC78037B0"
            }
        ]
    },
    {
        "words": [
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "2FCD5111-5689-4BF2-915A-09BA661D34C6"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "BAD9F2F1-1CB0-43D1-8251-3932E3AEEE00"
            },
            {
                "base": "笑顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "エガオ",
                "reading": "えがお",
                "surface": "笑顔",
                "curPos": "n",
                "id": "17CEA496-EC0A-4C3A-82E6-A918B369E33C"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "478452B5-E676-4C94-A402-DC6A4C5837C1"
            },
            {
                "base": "泣き顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ナキガオ",
                "reading": "なきがお",
                "surface": "泣き顔",
                "curPos": "n",
                "id": "E0C54D13-CAC2-4FD0-9DA3-C3D76C4F69AC"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "CB1F2C46-555C-4BDE-8AD9-B89D3FC5921E"
            }
        ]
    },
    {
        "words": [
            {
                "base": "知る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シッ",
                "reading": "しって",
                "surface": "知って",
                "curPos": "v",
                "id": "173F2BF5-144D-4A25-A7C3-6D2CC222081A"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イ",
                "reading": "",
                "surface": "いた",
                "curPos": "v",
                "id": "A165134E-F106-439D-8C84-B41814B89886"
            },
            {
                "base": "つもり",
                "pos": "名詞,非自立,一般,*",
                "pronunciation": "ツモリ",
                "reading": "",
                "surface": "つもり",
                "curPos": "n",
                "id": "748CA4E6-2D44-40A2-8310-F706A3318EBC"
            },
            {
                "base": "だ",
                "pos": "助動詞,*,*,*",
                "pronunciation": "ナ",
                "reading": "",
                "surface": "な",
                "curPos": "mv",
                "id": "7B916656-7B0F-4C99-8C7E-22520F147B06"
            },
            {
                "base": "のに",
                "pos": "助詞,接続助詞,*,*",
                "pronunciation": "ノニ",
                "reading": "",
                "surface": "のに",
                "curPos": "av",
                "id": "9CF4F43E-3771-4F8D-92F8-D804FE80FBFE"
            }
        ]
    },
    {
        "words": [
            {
                "base": "今",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "イマ",
                "reading": "いま",
                "surface": "今",
                "curPos": "n",
                "id": "0510472C-8487-4ABF-9D02-B4EBB22ED4AC"
            },
            {
                "base": "ここ",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "ココ",
                "reading": "",
                "surface": "ここ",
                "curPos": "/",
                "id": "CA07E623-49FC-4EBF-B72D-4DE83907703D"
            },
            {
                "base": "で",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "7BCA51E9-71F8-474D-B8A1-2C7196EE4B10"
            },
            {
                "base": "「",
                "pos": "記号,括弧開,*,*",
                "pronunciation": "「",
                "reading": "",
                "surface": "「",
                "left": true,
                "curPos": "/",
                "id": "F5C2E7FF-2B75-43A5-BC91-317544C13EF2"
            },
            {
                "base": "じゃあ",
                "pos": "接続詞,*,*,*",
                "pronunciation": "ジャー",
                "reading": "",
                "surface": "じゃあ",
                "curPos": "/",
                "id": "CF92FD06-45A1-4539-9D01-78906154C788"
            },
            {
                "base": "ね",
                "pos": "助詞,終助詞,*,*",
                "pronunciation": "ネ",
                "reading": "",
                "surface": "ね",
                "curPos": "av",
                "id": "C4A1C264-4C3F-456B-895E-CDDEF96023C2"
            },
            {
                "base": "」",
                "pos": "記号,括弧閉,*,*",
                "pronunciation": "」",
                "reading": "",
                "surface": "」",
                "left": true,
                "curPos": "/",
                "id": "D7B400FC-1B33-4AEE-AFAF-10492D52E87F"
            },
            {
                "base": "っていう",
                "pos": "助詞,格助詞,連語,*",
                "pronunciation": "ッテユウ",
                "reading": "",
                "surface": "っていう",
                "curPos": "av",
                "id": "149CB846-6067-41BE-8B2D-EB266952DBE0"
            },
            {
                "base": "顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "カオ",
                "reading": "かお",
                "surface": "顔",
                "curPos": "n",
                "id": "4C967AD8-2FB3-430A-8779-4CF82EF4917F"
            },
            {
                "base": "を",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヲ",
                "reading": "",
                "surface": "を",
                "curPos": "av",
                "id": "4659B285-EDA6-4BE2-98C9-259D7A975EAA"
            }
        ]
    },
    {
        "words": [
            {
                "base": "どうしても",
                "pos": "副詞,一般,*,*",
                "pronunciation": "ドーシテモ",
                "reading": "",
                "surface": "どうしても",
                "curPos": "adv",
                "id": "327B04F1-F8F0-4E93-A85B-B6CDF92BDF2E"
            },
            {
                "base": "見れる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ミレ",
                "reading": "みれない",
                "surface": "見れない",
                "curPos": "v",
                "id": "F8FBBF26-7DE0-4FD9-9B0D-6A7883DF9D17"
            },
            {
                "base": "まま",
                "pos": "名詞,非自立,副詞可能,*",
                "pronunciation": "ママ",
                "reading": "",
                "surface": "まま",
                "curPos": "n",
                "id": "96F95C63-4058-4DF9-A434-33F94A451F33"
            },
            {
                "base": "で",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "2287AAFC-78E4-4ADF-8641-ED05F702EF4D"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "331FFFEE-B119-4E24-BCB9-9C9410BF6E80"
            }
        ]
    },
    {
        "words": [
            {
                "base": "憧れる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "アコガレ",
                "reading": "あこがれ",
                "surface": "憧れ",
                "curPos": "v",
                "id": "80C249CE-C870-4A8F-BCFC-959BD2A83634"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "0E78026D-9A7D-482A-B318-1BFDD010BE08"
            },
            {
                "base": "都会",
                "pos": "名詞,一般,*,*",
                "pronunciation": "トカイ",
                "reading": "とかい",
                "surface": "都会",
                "curPos": "n",
                "id": "A7FD106B-E75C-47D9-97A1-9F7E9B6F3A3F"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "C9718D9D-BB8C-41B1-897C-553E521B270A"
            },
            {
                "base": "午後",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "ゴゴ",
                "reading": "ごご",
                "surface": "午後",
                "curPos": "n",
                "id": "EC0D2301-682B-44A9-B1E8-D8340A06F027"
            },
            {
                "base": "一",
                "pos": "名詞,数,*,*",
                "pronunciation": "イチ",
                "reading": "いちにん",
                "surface": "一人",
                "curPos": "/",
                "id": "48DCAD84-A496-41CB-85A4-1B9F7043FE1D"
            },
            {
                "base": "で",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "599B359E-9198-4CE1-9479-6D2CFE3F80D1"
            },
            {
                "base": "食べる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "タベル",
                "reading": "たべる",
                "surface": "食べる",
                "curPos": "v",
                "id": "947D36D4-7C7C-4CBD-A2D5-3B0640D0F7E5"
            },
            {
                "base": "ランチ",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ランチ",
                "reading": "",
                "surface": "ランチ",
                "curPos": "n",
                "id": "C1847607-1EC4-41EE-96C7-A4FA8E9A03C3"
            }
        ]
    },
    {
        "words": [
            {
                "base": "毎日",
                "pos": "名詞,固有名詞,組織,*",
                "pronunciation": "マイニチ",
                "reading": "まいにち",
                "surface": "毎日",
                "curPos": "n",
                "id": "43B56B85-9D45-4964-A4DE-AC410ED1AB0C"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "8CF334A3-DB03-4EDE-84E7-412BBBB1AB0C"
            },
            {
                "base": "深夜",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "シンヤ",
                "reading": "しんや",
                "surface": "深夜",
                "curPos": "n",
                "id": "877DFC50-BB61-4E49-8B3C-29773BC70B70"
            },
            {
                "base": "残業",
                "pos": "名詞,サ変接続,*,*",
                "pronunciation": "ザンギョー",
                "reading": "ざんぎょう",
                "surface": "残業",
                "curPos": "n",
                "id": "EBE5446D-ADE3-41DE-B6F5-93F5F8338F9C"
            },
            {
                "base": "飛び乗る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "トビノル",
                "reading": "とびのる",
                "surface": "飛び乗る",
                "curPos": "v",
                "id": "EF004CA8-502A-4B46-B1F9-5E608C50FE83"
            },
            {
                "base": "最終",
                "pos": "名詞,一般,*,*",
                "pronunciation": "サイシュー",
                "reading": "さいしゅう",
                "surface": "最終",
                "curPos": "n",
                "id": "CD17B159-6FBC-42CF-918C-4ED7EEFD7F3C"
            },
            {
                "base": "列車",
                "pos": "名詞,一般,*,*",
                "pronunciation": "レッシャ",
                "reading": "れっしゃ",
                "surface": "列車",
                "curPos": "n",
                "id": "80AA3804-BA9F-4BD5-ACA0-402F708149DA"
            }
        ]
    },
    {
        "words": [
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "154DD936-5540-4927-9106-58E3DF66271A"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "1F2649B6-A7B4-40FF-A928-22BCB26F77D2"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "C579A9D5-E336-4E92-A806-861C915BB80A"
            },
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "F6AE1341-12F2-4C64-A434-2A7544D43DF7"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "A81067F9-0423-4269-A208-1654A15DA778"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "8785FF44-63CE-4C8C-BAE0-744E66019318"
            },
            {
                "base": "「",
                "pos": "記号,括弧開,*,*",
                "pronunciation": "「",
                "reading": "",
                "surface": "「",
                "left": true,
                "curPos": "/",
                "id": "3848292D-ADCE-4FE3-B828-486AA270F0C6"
            },
            {
                "base": "心配",
                "pos": "名詞,サ変接続,*,*",
                "pronunciation": "シンパイ",
                "reading": "しんぱい",
                "surface": "心配",
                "curPos": "n",
                "id": "55D61717-5DA0-4DCF-8599-320CC882277B"
            },
            {
                "base": "する",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シ",
                "reading": "",
                "surface": "しない",
                "curPos": "v",
                "id": "73703056-18C9-49EA-A178-C26FC288C149"
            },
            {
                "base": "で",
                "pos": "助詞,接続助詞,*,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "A4324BC2-A5E1-4091-B9CF-5137287DB8FE"
            },
            {
                "base": "」",
                "pos": "記号,括弧閉,*,*",
                "pronunciation": "」",
                "reading": "",
                "surface": "」",
                "left": true,
                "curPos": "/",
                "id": "D67075FC-D764-44B7-B3D0-816182CF9609"
            }
        ]
    },
    {
        "words": [
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "CB4A122F-2C25-4A17-8F0D-C04D72522ADE"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "D5D3D95E-96DF-4A77-9C78-6517D327CF59"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "424A3B90-C571-4BBF-A702-8411D3A6F714"
            },
            {
                "base": "えっ",
                "pos": "感動詞,*,*,*",
                "pronunciation": "エッ",
                "reading": "",
                "surface": "えっ",
                "curPos": "/",
                "id": "9B5A8ECF-4E71-476F-9FC8-4C8FE72E4DF1"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "0CDE6ACF-4AC7-4811-B6FF-23E3A84709CA"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "ED74F833-2F1D-4AF9-AB12-E856BFF21CD8"
            },
            {
                "base": "「",
                "pos": "記号,括弧開,*,*",
                "pronunciation": "「",
                "reading": "",
                "surface": "「",
                "left": true,
                "curPos": "/",
                "id": "CB358B09-1049-46B0-A519-98C9BC3CF7A6"
            },
            {
                "base": "大丈夫",
                "pos": "名詞,形容動詞語幹,*,*",
                "pronunciation": "ダイジョーブ",
                "reading": "だいじょうぶ",
                "surface": "大丈夫",
                "curPos": "n",
                "id": "8F1601B0-ACF6-4509-92BF-7D01233B52C9"
            },
            {
                "base": "さ",
                "pos": "名詞,接尾,特殊,*",
                "pronunciation": "サ",
                "reading": "",
                "surface": "さ",
                "left": true,
                "curPos": "n",
                "id": "4808450D-F5D1-415F-94EF-210338EA7FAE"
            },
            {
                "base": "」",
                "pos": "記号,括弧閉,*,*",
                "pronunciation": "」",
                "reading": "",
                "surface": "」",
                "left": true,
                "curPos": "/",
                "id": "EE29BD4B-203B-4B7E-9555-18B973428916"
            }
        ]
    },
    {
        "words": [
            {
                "base": "なぜ",
                "pos": "副詞,助詞類接続,*,*",
                "pronunciation": "ナゼ",
                "reading": "",
                "surface": "なぜ",
                "curPos": "adv",
                "id": "3835CD24-96C2-4306-9271-23A1F2C0445A"
            },
            {
                "base": "だ",
                "pos": "助動詞,*,*,*",
                "pronunciation": "ダロ",
                "reading": "",
                "surface": "だろ",
                "curPos": "mv",
                "id": "6CE52726-B515-48EF-8C2D-44A2EEA1BADC"
            },
            {
                "base": "う",
                "pos": "助動詞,*,*,*",
                "pronunciation": "ウ",
                "reading": "",
                "surface": "う",
                "curPos": "mv",
                "id": "0CF0E981-AE04-449C-ABA9-ED0617104E14"
            },
            {
                "base": "君",
                "pos": "名詞,接尾,人名,*",
                "pronunciation": "クン",
                "reading": "くん",
                "surface": "君",
                "left": true,
                "curPos": "/",
                "id": "C3BA3445-D7E2-42D9-A16B-0C8DBC2947EA"
            },
            {
                "base": "に",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ニ",
                "reading": "",
                "surface": "に",
                "curPos": "av",
                "id": "2884F459-D504-4F09-9EAD-410DC83BE9D3"
            },
            {
                "base": "は",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "ワ",
                "reading": "",
                "surface": "は",
                "curPos": "av",
                "id": "A78BD314-9154-4072-A92F-4E9C52D84490"
            },
            {
                "base": "聞こえる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "キコエ",
                "reading": "きこえて",
                "surface": "聞こえて",
                "curPos": "v",
                "id": "23E31187-0DE6-4B52-BBE8-53B2ACD8F1CB"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イ",
                "reading": "",
                "surface": "いない",
                "curPos": "v",
                "id": "2BE8BAB2-0280-4EB4-AE88-08F7279EA58B"
            },
            {
                "base": "気",
                "pos": "名詞,非自立,一般,*",
                "pronunciation": "キ",
                "reading": "き",
                "surface": "気",
                "curPos": "n",
                "id": "8DEFF6BB-5399-4AE5-AADF-6351A72F4F4C"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "6EEBE8BF-F3D6-47C4-94BC-8FED7D536853"
            },
            {
                "base": "する",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シ",
                "reading": "",
                "surface": "した",
                "curPos": "v",
                "id": "4EE6A991-86DD-46B1-BF42-E1A9790E7BCC"
            }
        ]
    },
    {
        "words": [
            {
                "base": "会える",
                "pos": "動詞,自立,*,*",
                "pronunciation": "アエ",
                "reading": "あえない",
                "surface": "会えない",
                "curPos": "v",
                "id": "5EB345EA-E2C4-4A1F-B165-3DA6EB71C14C"
            },
            {
                "base": "日々",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "ヒビ",
                "reading": "ひび",
                "surface": "日々",
                "curPos": "n",
                "id": "2D7D09D6-6475-4489-8F5E-FF596F969826"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "8A1C56FB-8090-43BA-BD71-EE0AD84C4378"
            },
            {
                "base": "来る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "クル",
                "reading": "くる",
                "surface": "来る",
                "curPos": "v",
                "id": "CBEEA022-A62C-44C5-82DF-E6659813DFA6"
            },
            {
                "base": "こと",
                "pos": "名詞,非自立,一般,*",
                "pronunciation": "コト",
                "reading": "",
                "surface": "こと",
                "curPos": "n",
                "id": "42416E51-CBDD-497D-B66E-6FB17D3B5A64"
            },
            {
                "base": "を",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヲ",
                "reading": "",
                "surface": "を",
                "curPos": "av",
                "id": "C8A12728-17E2-47FE-AAC8-0005605A3D83"
            }
        ]
    },
    {
        "words": [
            {
                "base": "こわがる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "コワガッ",
                "reading": "",
                "surface": "こわがって",
                "curPos": "v",
                "id": "232B62A5-DDED-4336-8DF5-E2424FFAE24B"
            },
            {
                "base": "ばかり",
                "pos": "助詞,副助詞,*,*",
                "pronunciation": "バカリ",
                "reading": "",
                "surface": "ばかり",
                "curPos": "av",
                "id": "124BCEC3-5ECA-45D8-A041-3B5ED29E0F98"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イ",
                "reading": "",
                "surface": "いた",
                "curPos": "v",
                "id": "8787D04E-3D31-4AE3-A458-DF6548F39AD6"
            },
            {
                "base": "けど",
                "pos": "助詞,接続助詞,*,*",
                "pronunciation": "ケド",
                "reading": "",
                "surface": "けど",
                "curPos": "av",
                "id": "579EFDD1-D745-433C-8470-255066EB66D6"
            }
        ]
    },
    {
        "words": [
            {
                "base": "喜ぶ",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ヨロコブ",
                "reading": "よろこぶべき",
                "surface": "喜ぶべき",
                "curPos": "v",
                "id": "A38A9FAC-A8FF-4E95-B0A7-78B54632FEC8"
            },
            {
                "base": "か",
                "pos": "助詞,副助詞／並立助詞／終助詞,*,*",
                "pronunciation": "カ",
                "reading": "",
                "surface": "か",
                "curPos": "av",
                "id": "A5E15640-9B62-4DD6-8959-B0FEBB7738E6"
            },
            {
                "base": "いつの間にか",
                "pos": "副詞,一般,*,*",
                "pronunciation": "イツノマニカ",
                "reading": "いつのまにか",
                "surface": "いつの間にか",
                "curPos": "adv",
                "id": "E0ED4A72-C200-4002-BBC3-82D86D1CEBBE"
            }
        ]
    },
    {
        "words": [
            {
                "base": "強い",
                "pos": "形容詞,自立,*,*",
                "pronunciation": "ツヨイ",
                "reading": "つよい",
                "surface": "強い",
                "curPos": "a",
                "id": "3FC60E28-0DC1-4FA4-A5CB-E8D297408B3A"
            },
            {
                "base": "自分",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ジブン",
                "reading": "じぶん",
                "surface": "自分",
                "curPos": "n",
                "id": "F4817AD6-9138-47AE-B219-105DE3E35105"
            },
            {
                "base": "を",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヲ",
                "reading": "",
                "surface": "を",
                "curPos": "av",
                "id": "F7C434F3-2428-4A56-8468-93336EC0CB4E"
            },
            {
                "base": "手",
                "pos": "名詞,一般,*,*",
                "pronunciation": "テ",
                "reading": "て",
                "surface": "手",
                "curPos": "n",
                "id": "055DBC61-9858-4C68-95D0-0C078FAD41F2"
            },
            {
                "base": "に",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ニ",
                "reading": "",
                "surface": "に",
                "curPos": "av",
                "id": "551D158B-4FC1-4A29-AB3B-1404F717A29C"
            },
            {
                "base": "入れる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "イレ",
                "reading": "いれて",
                "surface": "入れて",
                "curPos": "v",
                "id": "AF782864-4E45-4CB3-AEC0-15D54BEEA40D"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イ",
                "reading": "",
                "surface": "いた",
                "curPos": "v",
                "id": "6E0E1F4B-E461-44F4-8A70-FF7DB9A505D0"
            }
        ]
    },
    {
        "words": [
            {
                "base": "忘れる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ワスレ",
                "reading": "わすれたくて",
                "surface": "忘れたくて",
                "curPos": "v",
                "id": "B3E0A4AB-85CE-469F-8075-9887A338BC81"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "ACA5ED76-4A08-40F3-AFDB-99F206E21F20"
            },
            {
                "base": "全て",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "スベテ",
                "reading": "すべて",
                "surface": "全て",
                "curPos": "n",
                "id": "E9D8A430-CFF6-40E3-B95B-DC350C259996"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "93333A03-9D18-4740-96F4-321C6CEB7DCC"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "A8428F11-15FA-4D50-86C7-2D1BB061A730"
            },
            {
                "base": "を",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヲ",
                "reading": "",
                "surface": "を",
                "curPos": "av",
                "id": "B5B55BBA-B9A8-41C4-A7CC-F9DCEEA8731D"
            },
            {
                "base": "連想",
                "pos": "名詞,サ変接続,*,*",
                "pronunciation": "レンソー",
                "reading": "れんそう",
                "surface": "連想",
                "curPos": "n",
                "id": "2774FF2C-A393-4FD8-82A5-9EE1833BF475"
            }
        ]
    },
    {
        "words": [
            {
                "base": "かき消す",
                "pos": "動詞,自立,*,*",
                "pronunciation": "カキケス",
                "reading": "かきけす",
                "surface": "かき消す",
                "curPos": "v",
                "id": "CE166143-9329-4BA0-A311-AE07EC3CAB9E"
            },
            {
                "base": "為",
                "pos": "名詞,非自立,副詞可能,*",
                "pronunciation": "タメ",
                "reading": "ため",
                "surface": "為",
                "curPos": "n",
                "id": "DDA07C2C-9B93-4DF4-A826-5C885D50093D"
            },
            {
                "base": "流す",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ナガス",
                "reading": "ながす",
                "surface": "流す",
                "curPos": "v",
                "id": "E6D8DA06-A0CB-4EFF-81A8-F4A7E3C978A4"
            },
            {
                "base": "二",
                "pos": "名詞,数,*,*",
                "pronunciation": "ニ",
                "reading": "ににん",
                "surface": "二人",
                "curPos": "/",
                "id": "151CC987-2E05-4858-AA94-68A68B78AD16"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "C151E1FE-938A-4C14-BFB3-76F6C4B094BB"
            },
            {
                "base": "エン",
                "pos": "名詞,固有名詞,一般,*",
                "pronunciation": "エン",
                "reading": "",
                "surface": "エン",
                "curPos": "n",
                "id": "932FE104-19F8-47C6-8333-3CE4D2068FA8"
            },
            {
                "base": "ドロール",
                "pos": "名詞,固有名詞,人名,姓",
                "pronunciation": "ドロール",
                "reading": "",
                "surface": "ドロール",
                "curPos": "/",
                "id": "89656981-D99F-4632-A4D1-9F6E7208AFAD"
            }
        ]
    },
    {
        "words": [
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "A6EEEFB5-BA1E-4D59-9DF9-C15B50351158"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "FBDC6A4E-C663-4C29-81CE-677D705D5BFB"
            },
            {
                "base": "経路",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ケイロ",
                "reading": "けいろ",
                "surface": "経路",
                "curPos": "n",
                "id": "172F6899-6371-4F2F-81FA-9FA128451185"
            },
            {
                "base": "僕",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "ボク",
                "reading": "ぼく",
                "surface": "僕",
                "curPos": "/",
                "id": "F800237E-19C4-4EEF-9AB5-309C03508FD2"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "9C9493EA-1129-4E3B-B483-5AE3463D7FD1"
            },
            {
                "base": "回路",
                "pos": "名詞,一般,*,*",
                "pronunciation": "カイロ",
                "reading": "かいろ",
                "surface": "回路",
                "curPos": "n",
                "id": "C70FC375-037F-4CF6-9E5E-3D0773B0807A"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "3216F8BA-28F1-4971-B768-F82E0FBC5E96"
            },
            {
                "base": "へ",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "エ",
                "reading": "",
                "surface": "へ",
                "curPos": "av",
                "id": "0CEC14FB-AACD-417B-BA42-0671D40303B6"
            },
            {
                "base": "帰る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "カエロ",
                "reading": "かえろう",
                "surface": "帰ろう",
                "curPos": "v",
                "id": "5F389616-7730-49DC-A255-3F43058CB13B"
            },
            {
                "base": "と",
                "pos": "助詞,格助詞,引用,*",
                "pronunciation": "ト",
                "reading": "",
                "surface": "と",
                "curPos": "av",
                "id": "B7AF3843-4D75-4F3A-AF6D-E2E816B27AB6"
            },
            {
                "base": "する",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シ",
                "reading": "",
                "surface": "した",
                "curPos": "v",
                "id": "0D1D0C04-0E3E-4758-AFE8-BFCAD329BFBA"
            },
            {
                "base": "この",
                "pos": "連体詞,*,*,*",
                "pronunciation": "コノ",
                "reading": "",
                "surface": "この",
                "curPos": "/",
                "id": "B7373B9B-2661-4D0E-9D4E-57AB1A298803"
            },
            {
                "base": "感情",
                "pos": "名詞,一般,*,*",
                "pronunciation": "カンジョー",
                "reading": "かんじょう",
                "surface": "感情",
                "curPos": "n",
                "id": "670D4EF6-B00F-413B-91B1-275A4073A5B3"
            }
        ]
    },
    {
        "words": [
            {
                "base": "いつも",
                "pos": "副詞,一般,*,*",
                "pronunciation": "イツモ",
                "reading": "",
                "surface": "いつも",
                "curPos": "adv",
                "id": "B5E96800-640C-492A-A988-C18969E16B68"
            },
            {
                "base": "近く",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "チカク",
                "reading": "ちかく",
                "surface": "近く",
                "curPos": "n",
                "id": "59F991A0-2B24-4636-A8C1-CF8C3640BF1E"
            },
            {
                "base": "で",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "3C20D7F7-8716-4E48-9E26-649F449F1E78"
            },
            {
                "base": "支える",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ササエ",
                "reading": "ささえて",
                "surface": "支えて",
                "curPos": "v",
                "id": "3F3CB35C-D628-436A-82CE-C74E9C94C7A1"
            },
            {
                "base": "くれる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "クレ",
                "reading": "",
                "surface": "くれた",
                "curPos": "v",
                "id": "C4C08437-4D14-4638-92E5-93794296603F"
            }
        ]
    },
    {
        "words": [
            {
                "base": "離れる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ハナレ",
                "reading": "はなれて",
                "surface": "離れて",
                "curPos": "v",
                "id": "E58A89F7-FD9C-482A-937E-6014CAD7AC1D"
            },
            {
                "base": "気付く",
                "pos": "動詞,自立,*,*",
                "pronunciation": "キズク",
                "reading": "きづく",
                "surface": "気付く",
                "curPos": "v",
                "id": "D294BA20-7ECB-4586-99CD-4F2C76531821"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "476A14B5-607D-483C-9A2B-89D5A7C334E3"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "F5F9ACD5-FCEF-4630-BC7A-868A71788501"
            },
            {
                "base": "心地よい",
                "pos": "形容詞,自立,*,*",
                "pronunciation": "ココチヨ",
                "reading": "ここちよ",
                "surface": "心地よ",
                "curPos": "a",
                "id": "E20C772E-D4B2-4427-BFCB-9C8F85C25AA0"
            },
            {
                "base": "さ",
                "pos": "名詞,接尾,特殊,*",
                "pronunciation": "サ",
                "reading": "",
                "surface": "さ",
                "left": true,
                "curPos": "n",
                "id": "47978D93-068E-40D3-8461-F4E3684B8398"
            }
        ]
    },
    {
        "words": [
            {
                "base": "顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "カオ",
                "reading": "かお",
                "surface": "顔",
                "curPos": "n",
                "id": "31D982C0-A182-4989-B5C0-768E3B620A8B"
            },
            {
                "base": "を",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヲ",
                "reading": "",
                "surface": "を",
                "curPos": "av",
                "id": "35E4BD26-D091-4539-A1A6-924D2D2D2D0F"
            },
            {
                "base": "上げる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "アゲ",
                "reading": "あげて",
                "surface": "上げて",
                "curPos": "v",
                "id": "EFEF3A22-D483-4303-940B-78F204A27EEC"
            },
            {
                "base": "見る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ミ",
                "reading": "みてた",
                "surface": "見てた",
                "curPos": "v",
                "id": "A90230FC-4DD8-4CD0-A08A-3B649F3313A8"
            },
            {
                "base": "*",
                "pos": "名詞,一般,*,*",
                "pronunciation": "?",
                "reading": "",
                "surface": "Same",
                "curPos": "n",
                "id": "247C81A7-F0A9-47C8-9BAD-8FA09DB9519A"
            },
            {
                "base": "*",
                "pos": "名詞,固有名詞,組織,*",
                "pronunciation": "?",
                "reading": "",
                "surface": "Day",
                "curPos": "n",
                "id": "C0BF2A8A-E75D-4DE7-BFE2-3E9CE888D073"
            }
        ]
    },
    {
        "words": [
            {
                "base": "列なる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "ツラナル",
                "reading": "つらなる",
                "surface": "列なる",
                "curPos": "v",
                "id": "08ECB3E5-A9CE-4FE3-ACB9-ADBA44195A7E"
            },
            {
                "base": "*",
                "pos": "名詞,一般,*,*",
                "pronunciation": "?",
                "reading": "",
                "surface": "チェリーブラッサム",
                "curPos": "n",
                "id": "92CCD26F-3B10-464C-A811-D1AC97CD14A5"
            }
        ]
    },
    {
        "words": [
            {
                "base": "春",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ハル",
                "reading": "はる",
                "surface": "春",
                "curPos": "n",
                "id": "61B81B33-AC69-4A89-9F93-032051D5A731"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "30C396C9-4E73-4C5C-80E1-5E0428479B58"
            },
            {
                "base": "来る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "キ",
                "reading": "きて",
                "surface": "来て",
                "curPos": "v",
                "id": "814F664A-09B2-40FF-A47F-94D0DE04D979"
            },
            {
                "base": "今",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "イマ",
                "reading": "いま",
                "surface": "今",
                "curPos": "n",
                "id": "6BDB2651-68FA-47C0-A8C0-059A8296DBC1"
            },
            {
                "base": "僕",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "ボク",
                "reading": "ぼく",
                "surface": "僕",
                "curPos": "/",
                "id": "F5584814-960B-47B6-ADDD-2EBFABD91440"
            },
            {
                "base": "の",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "5797D90D-3030-4FE9-BE2F-26F3241C0976"
            },
            {
                "base": "住む",
                "pos": "動詞,自立,*,*",
                "pronunciation": "スム",
                "reading": "すむ",
                "surface": "住む",
                "curPos": "v",
                "id": "0876E8CD-42E0-4296-8D0F-CB61638F5754"
            }
        ]
    },
    {
        "words": [
            {
                "base": "灰色",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ハイイロ",
                "reading": "はいいろ",
                "surface": "灰色",
                "curPos": "n",
                "id": "634EB7A9-64D2-4834-BE71-166B9AFDC8EB"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "06AB441B-61FD-4A48-9DF4-D34B46B26012"
            },
            {
                "base": "この",
                "pos": "連体詞,*,*,*",
                "pronunciation": "コノ",
                "reading": "",
                "surface": "この",
                "curPos": "/",
                "id": "47706609-F41F-4057-8E72-A2853CD16E4D"
            },
            {
                "base": "街",
                "pos": "名詞,一般,*,*",
                "pronunciation": "マチ",
                "reading": "まち",
                "surface": "街",
                "curPos": "n",
                "id": "BC23FE8D-A138-47CC-B14B-B22F05400990"
            },
            {
                "base": "に",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ニ",
                "reading": "",
                "surface": "に",
                "curPos": "av",
                "id": "4E56848F-D14B-4987-8A97-B38CED394F66"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "66126806-3C28-47FA-95BC-6531B813193D"
            }
        ]
    },
    {
        "words": [
            {
                "base": "目",
                "pos": "名詞,一般,*,*",
                "pronunciation": "メ",
                "reading": "め",
                "surface": "目",
                "curPos": "n",
                "id": "5A0147D0-6497-4F77-8ACA-5C19F98433FC"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "2C70D8F3-7653-47FE-93D9-2C094BB7867B"
            },
            {
                "base": "くらむ",
                "pos": "動詞,自立,*,*",
                "pronunciation": "クラム",
                "reading": "",
                "surface": "くらむ",
                "curPos": "v",
                "id": "3DADDFDA-D7B1-436E-851A-BE2CC21CC3DE"
            },
            {
                "base": "ほど",
                "pos": "助詞,副助詞,*,*",
                "pronunciation": "ホド",
                "reading": "",
                "surface": "ほど",
                "curPos": "av",
                "id": "6C0A478D-74D4-46C9-A695-DBC185BE146A"
            },
            {
                "base": "桜",
                "pos": "名詞,一般,*,*",
                "pronunciation": "サクラ",
                "reading": "さくら",
                "surface": "桜",
                "curPos": "n",
                "id": "E1DE534A-AB9B-41D2-B597-5EEA7AD663FF"
            },
            {
                "base": "、",
                "pos": "記号,読点,*,*",
                "pronunciation": "、",
                "reading": "",
                "surface": "、",
                "left": true,
                "curPos": "/",
                "id": "512B7BAC-2D5C-43A4-875D-ADA0BCCCA01E"
            },
            {
                "base": "咲く",
                "pos": "動詞,自立,*,*",
                "pronunciation": "サイ",
                "reading": "さいた",
                "surface": "咲いた",
                "curPos": "v",
                "id": "D10A1D19-2CF4-46E5-980E-9EDD3EBBACA0"
            },
            {
                "base": "よ",
                "pos": "助詞,終助詞,*,*",
                "pronunciation": "ヨ",
                "reading": "",
                "surface": "よ",
                "curPos": "av",
                "id": "C70214DC-2D10-4FDA-8EFE-6F9908CDACC6"
            }
        ]
    },
    {
        "words": [
            {
                "base": "涙",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ナミダ",
                "reading": "なみだ",
                "surface": "涙",
                "curPos": "n",
                "id": "EE695822-60BE-46BE-8EF2-A7CE9E68C077"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "A529BF3D-B314-46D7-9B71-E42B2ACE8900"
            },
            {
                "base": "こぼれる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "コボレ",
                "reading": "",
                "surface": "こぼれて",
                "curPos": "v",
                "id": "C849186A-D7B5-435B-83D2-29605A035962"
            },
            {
                "base": "くる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "キ",
                "reading": "",
                "surface": "きた",
                "curPos": "v",
                "id": "E5269D97-CB52-40B2-A135-060FEA86F8C9"
            }
        ]
    },
    {
        "words": [
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "40E9F058-2A63-4041-B77D-5380ED2CFBE1"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "EE1A59D7-8083-49B5-98BD-0D2216597DCD"
            },
            {
                "base": "笑顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "エガオ",
                "reading": "えがお",
                "surface": "笑顔",
                "curPos": "n",
                "id": "81B4E591-FC70-452C-81AF-D6378FCC3021"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "7AF4EB60-E4CA-41FE-BE0F-C573A072352D"
            },
            {
                "base": "泣き顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "ナキガオ",
                "reading": "なきがお",
                "surface": "泣き顔",
                "curPos": "n",
                "id": "B23503A8-7BD7-4D42-AF0D-65AE9C1B000E"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "2C084618-5566-47A9-9164-A2EFDAA3D30F"
            }
        ]
    },
    {
        "words": [
            {
                "base": "誰",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "ダレ",
                "reading": "だれ",
                "surface": "誰",
                "curPos": "/",
                "id": "B64AB359-5684-436A-893C-388C8D65DD0B"
            },
            {
                "base": "より",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ヨリ",
                "reading": "",
                "surface": "より",
                "curPos": "av",
                "id": "1147B1E3-BC8D-4FC7-9EE3-6FD50A0D0825"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "276B802D-C9D8-463A-A1C2-9CB1B42A2849"
            },
            {
                "base": "知る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シッ",
                "reading": "しって",
                "surface": "知って",
                "curPos": "v",
                "id": "99236943-42B2-4384-9F9F-151E5838AEAE"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イ",
                "reading": "",
                "surface": "いた",
                "curPos": "v",
                "id": "05A5C0E0-6D92-442C-88E7-A694E2C9D09C"
            },
            {
                "base": "のに",
                "pos": "助詞,接続助詞,*,*",
                "pronunciation": "ノニ",
                "reading": "",
                "surface": "のに",
                "curPos": "av",
                "id": "C4D13193-6CED-4FA1-B356-C55560E11999"
            }
        ]
    },
    {
        "words": [
            {
                "base": "遠く",
                "pos": "名詞,副詞可能,*,*",
                "pronunciation": "トーク",
                "reading": "とおく",
                "surface": "遠く",
                "curPos": "n",
                "id": "D5E560E7-5F44-43A6-AF89-814E5859AD0C"
            },
            {
                "base": "の",
                "pos": "助詞,連体化,*,*",
                "pronunciation": "ノ",
                "reading": "",
                "surface": "の",
                "curPos": "av",
                "id": "13DC203B-8324-490A-8470-CE2D0EAD7316"
            },
            {
                "base": "街",
                "pos": "名詞,一般,*,*",
                "pronunciation": "マチ",
                "reading": "まち",
                "surface": "街",
                "curPos": "n",
                "id": "FA4D3BD9-281D-4647-918F-8AEF08257680"
            },
            {
                "base": "で",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "デ",
                "reading": "",
                "surface": "で",
                "curPos": "av",
                "id": "B329FE18-C913-49FB-B40B-AB73136E966B"
            },
            {
                "base": "君",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "キミ",
                "reading": "きみ",
                "surface": "君",
                "curPos": "/",
                "id": "D72DD7D0-DBF0-42DE-9F3D-25286B9376BA"
            },
            {
                "base": "が",
                "pos": "助詞,格助詞,一般,*",
                "pronunciation": "ガ",
                "reading": "",
                "surface": "が",
                "curPos": "av",
                "id": "CE1475EE-CAAB-41F7-A009-38860549F835"
            },
            {
                "base": "どんな",
                "pos": "連体詞,*,*,*",
                "pronunciation": "ドンナ",
                "reading": "",
                "surface": "どんな",
                "curPos": "/",
                "id": "612C1DC1-93A5-4C1A-9C8D-DC337759B48B"
            },
            {
                "base": "顔",
                "pos": "名詞,一般,*,*",
                "pronunciation": "カオ",
                "reading": "かお",
                "surface": "顔",
                "curPos": "n",
                "id": "8463F1F2-636F-4B9E-AA53-70C1C5B456C4"
            },
            {
                "base": "する",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シ",
                "reading": "",
                "surface": "して",
                "curPos": "v",
                "id": "DA347185-9E4B-4260-992D-CF8E16B5BBE0"
            },
            {
                "base": "いる",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "イル",
                "reading": "",
                "surface": "いる",
                "curPos": "v",
                "id": "3F397ED8-A724-4AC4-9E71-1392A7A7DB4F"
            },
            {
                "base": "か",
                "pos": "助詞,副助詞／並立助詞／終助詞,*,*",
                "pronunciation": "カ",
                "reading": "",
                "surface": "か",
                "curPos": "av",
                "id": "83EADDCF-05AE-4440-90B1-7CD4402739DE"
            },
            {
                "base": "なんて",
                "pos": "助詞,副助詞,*,*",
                "pronunciation": "ナンテ",
                "reading": "",
                "surface": "なんて",
                "curPos": "av",
                "id": "6B702D59-7393-4BA9-A546-A44E65C11180"
            },
            {
                "base": "…",
                "pos": "記号,一般,*,*",
                "pronunciation": "…",
                "reading": "",
                "surface": "…",
                "left": true,
                "curPos": "/",
                "id": "FBA663C8-D193-441B-8288-67510D1782DD"
            }
        ]
    },
    {
        "words": [
            {
                "base": "僕",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "ボク",
                "reading": "ぼく",
                "surface": "僕",
                "curPos": "/",
                "id": "13C14CFF-2920-4240-B82A-6209CA5FC6E5"
            },
            {
                "base": "は",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "ワ",
                "reading": "",
                "surface": "は",
                "curPos": "av",
                "id": "8CD1B253-0D8A-4D01-9A97-B6C1D4A78A5D"
            },
            {
                "base": "これ",
                "pos": "名詞,代名詞,一般,*",
                "pronunciation": "コレ",
                "reading": "",
                "surface": "これ",
                "curPos": "/",
                "id": "28B2136C-ED07-416E-AAD0-2984F66BCE8E"
            },
            {
                "base": "っぽい",
                "pos": "形容詞,接尾,*,*",
                "pronunciation": "ッポ",
                "reading": "",
                "surface": "っぽ",
                "curPos": "a",
                "id": "B227C113-A6FD-40AC-9482-5CAE05DC9D0F"
            },
            {
                "base": "く",
                "pos": "動詞,非自立,*,*",
                "pronunciation": "ッ",
                "reading": "",
                "surface": "っ",
                "curPos": "v",
                "id": "6FE72081-98EA-47A2-B5EB-7D46933B99A5"
            },
            {
                "base": "ちる",
                "pos": "動詞,自立,*,*",
                "pronunciation": "チ",
                "reading": "",
                "surface": "ち",
                "curPos": "v",
                "id": "73F33DF2-C4C1-45D2-BF46-7E9356D02A84"
            },
            {
                "base": "も",
                "pos": "助詞,係助詞,*,*",
                "pronunciation": "モ",
                "reading": "",
                "surface": "も",
                "curPos": "av",
                "id": "BA8B10B7-97FC-42A7-A1E2-CDD6C4C6A0FE"
            },
            {
                "base": "知る",
                "pos": "動詞,自立,*,*",
                "pronunciation": "シラ",
                "reading": "しらない",
                "surface": "知らない",
                "curPos": "v",
                "id": "DAC14560-3A42-43C7-B476-CD125FEA1C72"
            }
        ]
    }
];
//#endregion
const Songs: React.FC<Props> = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // const ans: any[] = [];
        // setLoading(true);
        // const arrs = (lrc).map((str, idx) => {
        //     return onNpl(str)
        // })

        // Promise.allSettled(arrs).then((res: any[]) =>
        //     res?.map((a) => a.value),
        // ).then(arr => {
        //     arr.map(res => {
        //         let words = prefixLine(res.tokens);
        //         ans.push({ words });
        //     })

        //     console.log(ans);
        //     setLoading(false);

        // })
    }, [])
    return (
        <div >
            {loading ? 'load' : 'false'}
            {
                data.map((conf, idx: number) => <div key={idx}>
                    {
                        _.map(conf.words, (w: any, p: number) => {
                            return <div key={p} className={classNames(styles['ep-word-box'], w.left && styles['word-mark'])}>
                                <div className={classNames(styles['ep-reading'], { [styles['word-center']]: w.reading.length === 1 })}>{w.reading || <>&nbsp;</>}</div>
                                <div className={classNames(styles['ep-word'], styles['word-' + w.curPos], { [styles['word-center']]: w.surface.length === 1, })}>
                                    <span>{w.surface}</span>
                                </div>
                            </div>
                        })
                    }
                    <div>words</div>
                    <div>
                        yufabalalla
                    </div>
                </div>)
            }
        </div>
    )
}
export default Songs;
