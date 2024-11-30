const video = document.getElementById('camera');
const statusDiv = document.getElementById('status');
const socket = io();

let detectionCount = 0;
let cameraMode = Number(prompt("몇 번째 카메라?"));
let cameraStatus = 0;


async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await new Promise(resolve => (video.onloadedmetadata = resolve));
    } catch (error) {
        console.error('Error accessing the camera:', error);
    }
}


async function detectFaces() {
    const model = await faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
        runtime: 'tfjs',
        maxFaces: 10,
    });

    setInterval(async () => {
        detectionCount++;
        statusDiv.textContent = `${cameraMode}번째 카메라 - ${detectionCount}번째 얼굴인식`;

        const predictions = await model.estimateFaces(video);
        const detectedFaces = predictions.length;

        statusDiv.textContent = `${cameraMode}번째 카메라 - ${detectionCount}번째 얼굴인식 성공 - ${detectedFaces}명`
        
        if (cameraStatus !== detectedFaces) { // 갱신된 경우에만,
            socket.emit("camera_changed", { cameraMode, detectedFaces });
            cameraStatus = detectedFaces
        }
    }, 3000);
}


(async () => {
    // 서버에서 카메라 데이터 가져와서 갱신
    const response = await fetch("/get")
    const result = await response.json()
    cameraStatus = result[cameraMode]

    await setupCamera();
    await detectFaces();
})();