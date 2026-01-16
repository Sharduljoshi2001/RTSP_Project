import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Container } from 'react-bootstrap';
import VideoPlayer from './components/VideoPlayer';
function App() {
  return (
      <Container className="text-center mt-5">
        <h2 className="text-center mb-4">📹 RTSP Livestream Dashboard</h2>
        <VideoPlayer />
      </Container>
  );
}
export default App;
