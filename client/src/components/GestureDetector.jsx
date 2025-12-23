import { useEffect, useRef, useState } from "react"


const GestureDetector = ({onGesture}) => {

  const MODEL_URL = "https://teachablemachine.withgoogle.com/models/sG3DX3BM_/model.json";

  const videoRef = useRef();
  const [isVideoStarted, setIsVideoStarted] = useState(false);
  const [classifier, setClassifier] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedClassifier = await window.ml5.imageClassifier(MODEL_URL, () => {
          console.log("Gesture model loaded");
        });
        setClassifier(loadedClassifier);
      } catch (error) {
        console.error("Model loading failed: ", error);
      }
    }

    loadModel();
  }, []);

  const classifyGesture = () => {
    if (classifier && videoRef.current) {
      classifier.classify(videoRef.current, (results, error) => {
        if(error) {
          console.error("Classification error: ", error);
          return;
        }
        //console.log(results)
        if(results && results[0]) {
          onGesture(results[0].label, results[0].confidence);
        }

        setTimeout(() => classifyGesture(), 30)
      })
    } else {
      setTimeout(() => classifyGesture(), 30)
    }
  }

  const startVideo = () => {
    if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;

          videoRef.current.onloadedmetadata = () => {
            videoRef.current.play();
            setIsVideoStarted(true);
            classifyGesture();
          }
        }
      }).catch((error) => {
        console.error("Error accessing the camera: ", error);
      })
    }
  }

  useEffect(() => {
    if(classifier && !isVideoStarted) {
      startVideo();
    }
  }, [classifier]);

  return (
    <video
      ref={videoRef}
      width={640}
      height={480}
      style={{ display: 'none' }}
      autoPlay
      muted
    />
  )
}

export default GestureDetector