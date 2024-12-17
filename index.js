import { setSnapshot } from "./util.js";


function updateStatus(cameras) {
    // 연속적으로 얼굴이 인식된 카메라의 개수 계산
    const count = cameras.findIndex(camera => camera <= 0) === -1 ? cameras.length : cameras.findIndex(camera => camera <= 0);

    const statusMap = [
        { img: "./img/leisure.jpg", text: "대기가 거의 없으니 지금 고!" },
        { img: "./img/moderate.jpg", text: "적당한 줄, 조금만 기다리면 식사 가능!" },
        { img: "./img/confusing.jpg", text: "약간 혼잡, 많이 기다려야 할지도..." },
        { img: "./img/worst.jpg", text: "지금은 급식 줄이 폭발 직전이니 가지 마세요!" }
    ];

    document.getElementById("img").src = statusMap[count].img
    document.getElementById("label").innerText = statusMap[count].text
}

setSnapshot(cameras => updateStatus(cameras))