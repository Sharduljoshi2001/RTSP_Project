from flask import Response
from app.services.video_service import generate_frames
def video_feed():
    """
    controller function to handle the video stream request.
    it basically sets up the correct HTTP response type for streaming.
    """
    #this is a test RTSP link(big buck bunny public stream).
    #in a real scenario, this would come from the frontend or database.
    rtsp_url = "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4"
    #returning a flask response object.
    #mimetype='multipart/x-mixed-replace' is imp heree
    #it tells the browser that this is not a single file, but a stream of replacing images.
    return Response(generate_frames(0), mimetype='multipart/x-mixed-replace; boundary=frame')