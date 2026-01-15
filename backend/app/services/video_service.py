import cv2
import time
def generate_frames(rtsp_url):
    """
    this function captures the video from the RTSP link frame by frame
    and converts it into a format that the browser can understand (jpg).
    """
    #opening the video stream using opencv
    #passing the RTSP URL hereso itt acts like opening a camera connection.
    camera = cv2.VideoCapture(rtsp_url) 
    #checking if the camer connection is established or not
    if not camera.isOpened():
        print("❌ Error: Could not open video source.")
        return
    print("✅ Connection established! Reading frames...")
    frame_count = 0
    while True:
        #reading the current frame from the video stream
        #'success' is a boolean (True/False) checking if frame is read correctly
        #'frame' is the actual image data
        success, frame = camera.read()
        if not success:
            print("Failed to read frame (Stream ended or Error)")
            #if we cannot read the frame (video ended or connection lost),we stop the loop
            break
        frame_count+=1
        if frame_count % 30 == 0:
            print(f"Reading frame {frame_count}...")
            #resizing the frame to 1280x720 to ensure it fits well on the screen and saves bandwidth(it is an optonal thing)
            frame = cv2.resize(frame, (1280, 720))
            #converting the frame(img)to jpeg format
            ret, buffer = cv2.imencode('.jpg', frame)
            #cnvertng the jpeg buffer into bytes
            frame = buffer.tobytes()
            #yielding the frame in a specific format(multipart response)
            #we are using 'yield' instead of 'return' because this is a continuous stream, not a one-time response.
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
            #thoda delay taaki CPU 100% na use ho
            time.sleep(0.01)