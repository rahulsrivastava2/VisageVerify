// // Start camera feed
// const video = document.getElementById('videoStream');

// navigator.mediaDevices.getUserMedia({ video: true })
//     .then((stream) => {
//         video.srcObject = stream;
//     })
//     .catch((error) => {
//         console.error('Error accessing the camera: ', error);
//     });

// Function to capture face and mark attendance (simulated)
function captureFace() {
    alert("Face recognized and attendance marked!");
    addAttendanceRow(new Date().toLocaleDateString(), "Present");
}

// Function to dynamically add a new attendance row
function addAttendanceRow(date, status) {
    const tbody = document.getElementById('attendanceData');
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${date}</td>
        <td>${status}</td>
    `;
    tbody.appendChild(newRow);
}

// Access the video element
const video = document.getElementById('video');

// Access the camera and stream it to the video element
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;  // Set the video element's source to the camera stream
    })
    .catch((error) => {
        console.error("Error accessing the camera: ", error);
    });

// Function to capture the frame from the video feed and process it
function captureFrame() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions equal to video dimensions
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw the current video frame onto the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Here you can process the captured frame (for example, send it for face recognition)
    console.log("Frame captured!");
    
    // Optionally, display the captured frame in a new section or element
    // const capturedImage = canvas.toDataURL('image/png');  // Get the image in base64 format
}

// Convert the captured frame to base64 or binary and send it to the backend
const capturedImage = canvas.toDataURL('image/png');

// Example of sending it to the backend
fetch('/process-face', {
    method: 'POST',
    body: JSON.stringify({ image: capturedImage }),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});
