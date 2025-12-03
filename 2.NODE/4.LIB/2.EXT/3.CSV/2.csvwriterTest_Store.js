const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { v4: uuidv4 } = require('uuid');


const brandName = ["가배두림","감성커피","곰브라더스","공차","구스토","그라찌에","그리다꿈","꿀스커피","까치화방","니어앤디어","날쌘카페","나인블럭","노스커피","뉴욕보틀","달리는커피","다빈치 커피","달콤커피","카페일리터","더벤티","더착한커피","더치앤빈","더카페","두낫디스터브","디초콜릿커피앤드","디저트39","떼루와","뜰커피","K-CLASS COFFEE","라떼킹","라떼떼커피","랑데자뷰","래드애플","런던베이글뮤지엄","로즈버드","마노핀","마시그레이","메가MGC커피","매머드커피","만랩커피","망티커피","베러먼데이커피","비트박스","바나프레소","바리스텔라","바빈스커피","백억커피","벌크커피","베니샤프","벤티프레소","복고다방","비엔나커피하우스","빈스빈스","빈스앤베리즈","발도스커피","반달커피","봉명동내커피","블루샥커피","빽다방","사과당","서울앵무새","세라젬웰카페","셀렉토커피","슈퍼커피","스퀘어가든","슬립리스 인 시애틀","쏘커피","쓰리엑스라지커피","시그니처1","아마스빈","아임일리터","아틀리에 빈","아티제","압구정 볶는 커피","에이바우트커피","엔제리너스 커피","오가다","오슬로우 커피","요거프레소","와이블랙","와드커피","와플반트","읍천리382","이디야","일리카페","인카페","어오케이커피","어벤더치커피","우지커피","원유로 스페셜티","우주라이크커피","아이캔커피","자스민커피","전광수 커피 하우스","주커피","잠바주스","쮸커커피","제로카페","청솔로9","칠리노","카페051","카페게이트","카페 네스카페","카페 드롭탑","카페 띠아모","카페 루앤비","카페미뇽","카페 아모제","카페 엘가","카페베네","카페봄봄","커피리브레","카페일분","카페천국","커맨드커피","커피와 사람들","카페 스토리웨이","커피온리","커피앤번","커피니","커피베이","커핀그루나루","커피빈 코리아","커피볶는시골커피","커피마마","커피명가","커피스트릿","커피에반하다","케냐 에스프레소","컴포즈커피","킹프레소","코페아커피","카페인중독","카페디아떼","커스텀커피","쿠카쿠","카페진리","카페자스","카페마마스","카페 에스파니","카페드로잉","카페코지","카페희다","캔다방","캔버스","콩꼬물","크레이저커피","크로플각","탐앤탐스","테라로사 커피","테라커피","토프레소","투썸플레이스","텐퍼센트커피","터치카페","타이거슈가","티타임","파란만잔","팬도로시","폴 바셋","포트캔커피","퐁치커피익스프레스","프렌치 커피","하바나익스프레스","하삼동커피","하이오커피","하이즈커피","헬로 키티 카페","할리스","해리스카페","핸즈업","핸즈커피","힘이나는 커피생활","1ll","CNN Cafe","COABOT","Mr.Breeze","해쉬커피","1000cc커피","79파운야드"];
const branch = ["1호점", "2호점", "3호점", "4호점", "5호점", "6호점", "7호점", "8호점", "9호점", "10호점"];



function randomBrandName() {
    let index = Math.floor(Math.random() * brandName.length);
    return brandName[index];
}


function generateBranch() {
    const index = Math.floor(Math.random() * branch.length);
    // console.log(index);
    //console.log(branch[index]);
    return branch[index];
}

const city = ["서울", "부산", "대구", "인천", "광주", "대전", "울산"];
const Seoul_gu = ["강남구","강동구","강북구","강서구","관악구","광진구","구로구","금천구","노원구","도봉구","동대문구","동작구","마포구","서대문구","서초구","성동구","성북구","송파구","양천구","영등포구","용산구","은평구","종로구","중구","중랑구"];
const Busan_Gu = ["중구","서구","동구","영도구","부산진구","동래구","금정구","남구","북구","사하구","해운대구","사상구","강서구","연제구","기장군"];
const Daegu_Gu = ["동구","서구","남구","북구","수성구","달서구","달성군","군위군","중구"];
const Incheon_Gu = ["검단구","남동구","미추홀구","부평구","서해구","연수구","영종구","재물포구","계양구"];
const Gwangju_Gu = ["광산구","동구","서구","북구","남구"];
const Daejeon_Gu = ["동구","중구","서구","유성구","대덕구"];
const Ulsan_Gu = ["중구","남구","동구","북구","울주군"];



function generateAddress(){
    let city_index = Math.floor(Math.random() * city.length);
    
    if(city[city_index] == '서울'){
        const Seoul_gu_index = Math.floor(Math.random() * Seoul_gu.length);
        console.log(city[city_index] + Seoul_gu[Seoul_gu_index]);
        return city[city_index] + Seoul_gu[Seoul_gu_index];
    }
    else if(city[city_index] == '부산'){
        const Busan_Gu_index = Math.floor(Math.random() * Busan_Gu.length); 
        return city[city_index] + Busan_Gu[Busan_Gu_index];
    }
    else if(city[city_index] == '대구'){
        const Daegu_Gu_index = Math.floor(Math.random() * Daegu_Gu.length);
        return city[city_index] + Daegu_Gu[Daegu_Gu_index];
    }
    else if(city[city_index] == '인천'){
        const Incheon_Gu_index = Math.floor(Math.random() * Incheon_Gu.length);
        return city[city_index] + Incheon_Gu[Incheon_Gu_index];
    }
    else if(city[city_index] == '광주'){
        const Gwangju_Gu_index = Math.floor(Math.random() * Gwangju_Gu.length);
        return city[city_index] + Gwangju_Gu[Gwangju_Gu_index];
    }
    else if(city[city_index] == '대전'){
        const Daejeon_Gu_index = Math.floor(Math.random() * Daejeon_Gu.length);
        return city[city_index] + Daejeon_Gu[Daejeon_Gu_index];
    }
    else if(city[city_index] == '울산'){
        const Ulsan_Gu_index = Math.floor(Math.random() * Ulsan_Gu.length);
        return city[city_index] + Ulsan_Gu[Ulsan_Gu_index];
    }
    
}


const csvWriter = createCsvWriter({
    path: 'store.csv',
    header: [
        { id: 'id', title: 'id' },
        { id: 'branch', title: '지점' },
        { id: 'brand', title: '상표' },
        { id: 'address', title: '주소' },
    ]
});

const uuid = uuidv4();
console.log('생성된 UUID: ', uuid);

//1.uuid 생성 함수
//2.이름 생성 함수
//3.

const records = [];
for (let i = 0; i < 1000; i++) {

    let dataArr = {
        id: undefined,
        branch: undefined,
        brand: undefined,
        address: undefined
    };

    dataArr.id = uuid;
    dataArr.branch = randomBrandName() + generateBranch();
    dataArr.brand = randomBrandName();
    dataArr.address = generateAddress();

    records.push(dataArr);
}

csvWriter.writeRecords(records)       // returns a promise
    .then(() => {
        console.log('...저장완료');
    });


