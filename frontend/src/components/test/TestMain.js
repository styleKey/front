import { useEffect, useState } from "react";

function TestMain() {


    const setVh = () => {
        const vh = window.innerHeight = 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }

    useEffect(() => {
        setVh()
        function onResize() {
            setVh()
        }

        window.addEventListener('resize', onResize)
    }, [])

    const [page, setPage] = useState(0)

    const questionList = [
        {
            q: ['가장 좋아하는 계절은 언제인가요?'],
            a: [{ type: 'L', text: '벚꽃 휘날리는 봄' },
            { type: 'A', text: '쨍쨍한 여름' },
            { type: 'R', text: '감성적인 가을' },
            { type: 'M', text: '하얀 눈이 오는 겨울' }]
        },
        {
            q: ['평소 여가 시간을 어떻게 보내시나요?'],
            a: [{ type: 'M', text: '깔끔한 감성 카페 투어하기' },
            { type: 'L', text: '뜨개질하거나 다이어리 꾸미기' },
            { type: 'A', text: '몸을 많이 움직이는운동하기' },
            { type: 'R', text: 'cd나 lp판으로 옛날 노래 감상하기' }]
        },
        {
            q: ['가장 가지고 싶은 것은 무엇인가요?'],
            a: [{ type: 'M', text: '현대적이고 세련된 장식의 목걸이' },
            { type: 'L', text: '레트로한 느낌의 베레모' },
            { type: 'A', text: '프릴 장식의 사랑스러운 스커트' },
            { type: 'R', text: '활동하기 편한 운동복' }]
        },
        {
            q: ['옷을 선택할 때 어떤 요소에 가장 중점을 두시나요?'],
            a: [{ type: 'M', text: '깔끔하고 단순한 패턴' },
            { type: 'L', text: '플라워 패턴, 풍성한 모양' },
            { type: 'A', text: '땀이 잘 흡수되는 편안한 소재' },
            { type: 'R', text: '레트로하고 힙한 디자인' }]
        },
        {
            q: ['요즘 인기 연예인들 중 가장 워너비에 가까운 사람은?'],
            a: [{ type: 'M', text: '크리스탈' },
            { type: 'L', text: '츄' },
            { type: 'A', text: '미노이' },
            { type: 'R', text: '김보라' }]
        },
        {
            q: ['평소 어떤 헤어스타일을 선호 하시나요?'],
            a: [{ type: 'N', text: '미디움 기장의 자연스럽고 간편한 스타일' },
            { type: 'G', text: '세련된 느낌의 업스타일 혹은 긴머리 웨이브/ 생머리' },
            { type: 'S', text: '힙한 느낌의 탈색머리나 숏컷 스타일' },
            { type: 'U', text: '층이 엄청난 허쉬컷 혹은 개성 넘치는 브릿지' }]
        },
        {
            q: ['요즘 어떤 노래 듣고 계세요?'],
            a: [{ type: 'N', text: '마음이 편해지는 클래식' },
            { type: 'G', text: '나도 모르게 치명적인 척하게 되는 섹시한노래' },
            { type: 'S', text: '힙합이즈 마이라잎' },
            { type: 'U', text: '나만 알고있는 숨어서 듣게되는 독특한 노래' }]
        },
        {
            q: ['옷장에 가장 많이 있는 색은 무엇인가요?'],
            a: [{ type: 'N', text: '심플한 검정,흰색 회색의 무채색' },
            { type: 'G', text: '화려하지만 세련된 검정, 은색,보라' },
            { type: 'S', text: '느낌있는청색,레드,옐로,카키' },
            { type: 'U', text: '독특하고 눈에 띄는 레오파드, 네온색 혹은 패턴 컬러' }]
        },
        {
            q: ['어떤 신발을 많이 착용하시나요?'],
            a: [{ type: 'N', text: '깔끔한 컨버스나 로퍼' },
            { type: 'G', text: '섹시한 하이힐이나 롱부츠' },
            { type: 'S', text: '명 브랜드의 인기 많은 운동화' },
            { type: 'U', text: '처음보는 스타일의 눈에 띄는 신발' }]
        },
        {
            q: ['옷을 주로 사시는 곳이 어디인가요?'],
            a: [{ type: 'N', text: '무난한 유명 옷사이트 인기순위' },
            { type: 'G', text: '외국 핫걸들을 위한 사이트' },
            { type: 'S', text: '길거리에 꼭 있는 브랜드 편집샵' },
            { type: 'U', text: '다른 사람들은 모르는 나만의 단골 옷가게' }]
        },
        {
            q: ['당신의 sns피드 분위기는 오는 것에 제일 가깝나요?'],
            a: [{ type: 'M, N', text: '답변1ㄴ' },
            { type: 'L, G', text: '답변2' },
            { type: 'A, S', text: '답변3' },
            { type: 'R, U', text: '답변4' }]
        }
    ]

    return (
        <div className="testLayout">
            {page === 0 ?
                <div className="startPageLayout">
                    <div className="startLogo">
                        <div>스타일포인트</div>
                    </div>
                    <div onClick={() => setPage(1)} className='startButton'>테스트 시작하기</div>
                </div>
                :
                <div>
                    테스트페이지
                </div>
            }
        </div>

    );
}

export default TestMain;