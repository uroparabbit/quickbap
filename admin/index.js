import { getCameras, updateCamera } from "../util.js";

const video = document.getElementById('camera');
const statusDiv = document.getElementById('status');

let detectionCount = 0; // "~번째 카운트" 표시할 때 사용, 얼굴인식때마다 ++
let cameraIndex = Number(prompt("몇 번째 카메라?")); // 카메라 인덱스
let currentDetectedFaces = 0;
let faceInARow = 0;


(async () => {
    // 서버에서 카메라 데이터 가져와서 갱신
    currentDetectedFaces = await getCameras()[cameraIndex]

    // 카메라 셋업
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise(resolve => (video.onloadedmetadata = resolve));

    // 모델 설정
    const model = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
        runtime: 'tfjs',
        maxFaces: 10,
    });

    // 일정한 간격마다 인식하도록.
    setInterval(async () => {
        // detectionCount 업데이트 및 "~번째 얼굴인식" 수정
        detectionCount++;
        statusDiv.textContent = `${cameraIndex}번째 카메라 - ${detectionCount}번째 얼굴인식`;

        // 실제로 얼굴인식 수행, 그 결과를 newlyDetectedFaces 저장
        const predictions = await model.estimateFaces(video);
        const newlyDetectedFaces = predictions.length;

        // newlyDetectedFaces 통해 사람이 감지된 것으로 확인되면, faceInARow++
        if (newlyDetectedFaces > 0) {
            faceInARow++
        } else {
            faceInARow = 0
        }

        // "~번째 얼굴인식 완료" 수정
        statusDiv.textContent = `${cameraIndex}번째 카메라 - ${detectionCount}번째 얼굴인식 성공 - ${newlyDetectedFaces}명 - ${faceInARow}번 연속 얼굴`
        
        // 업데이트
        if (currentDetectedFaces !== newlyDetectedFaces) {
            if ((newlyDetectedFaces === 0) || (!document.getElementById("inarow").checked || faceInARow >= 5)) {
                updateCamera(cameraIndex, newlyDetectedFaces)
                currentDetectedFaces = newlyDetectedFaces
            }
        }
    }, 1000);
})();