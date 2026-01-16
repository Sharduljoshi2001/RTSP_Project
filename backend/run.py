from app import create_app
import os
#ceating the application instance using our factory function
app = create_app()
if __name__ == "__main__":
    #getting the PORT from .env or using 5000 as default
    port = int(os.getenv("PORT", 5000))
    #starting the server
    app.run(debug=True, port=port,host='0.0.0.0')