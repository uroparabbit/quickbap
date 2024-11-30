const dataDiv = document.getElementById("data");
const socket = io();

// 기본 카메라 setup
let camera = [0, 0, 0]
fetch("/get", {
    method: "GET"
})
.then(res => res.json())
.then(result => console.log(result))

socket.on("update_data", (data) => {
    console.log(data)
});
