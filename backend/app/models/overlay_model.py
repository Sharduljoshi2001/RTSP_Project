class OverlayModel:
    """
    This class defines how an 'Overlay' looks in our database.
    It helps us keep the data structured.
    """
    @staticmethod
    def structure(content, type, x, y, width, height):
        #returning a dictionary because MongoDB stores data in JSON-like format
        return {
            "content": content,   #the text or the image url
            "type": type,         #is it 'txt' or 'img'
            "position": {         #where is it placed on the video
                "x": x,
                "y": y
            },
            "size": {             #how big is the overlay
                "width": width,
                "height": height
            }
        }