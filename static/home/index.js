const dataDiv = document.getElementById("data");
const socket = io();

function updateStatus(camera) {
    // 연속적으로 얼굴이 인식된 카메라의 개수 계산
    let count = 0;
    for (let i in camera) {
        if (camera[i] > 0) {
            count++;
        } else {
            break;
        }
    }

    // 이미지 선택
    let imgSrc;
    let label;
    if (count === 0) {
        imgSrc = "leisure.jpg";
        label = "대기가 거의 없으니 지금 고!"
    } else if (count === 1) {
        imgSrc = "moderate.jpg";
        label = "적당한 줄, 조금만 기다리면 식사 가능!"
    } else if (count === 2) {
        imgSrc = "confusing.jpg";
        label = "약간 혼잡, 많이 기다려야 할지도..."
    } else if (count === 3) {
        imgSrc = "confusing.jpg";
        label = "지금은 급식 줄이 폭발 직전이니 가지 마세요!"
    }

    // 데이터 업데이트
    document.getElementById("img").src = `/static/home/${imgSrc}`;
    document.getElementById("label").innerText = label
}

// 기본 카메라 setup
fetch("/get", {method: "GET"})
.then(res => res.json())
.then(result => updateStatus(result))




socket.on("update_data", (data) => {
    console.log(data);
    updateStatus(data)
});

