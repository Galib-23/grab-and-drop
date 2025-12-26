import { ArrowDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


const DROP_COOLDOWN = 10000;
const RECEIVER_ID = 'id2';
const API_URL = 'https://grab-and-drop.onrender.com';
const CONFIDENCE_THRESHOLD = 0.7;

const DropPage = ({ currentGesture, gestureConfidence }) => {
  const [receivedImage, setReceivedImage] = useState(null);
  const [isDropping, setIsDropping] = useState(false);
  const [hasDropped, setHasDropped] = useState(false);

  const lastDropTime = useRef(0);

  const handleDrop = async () => {
    if (isDropping || hasDropped) return;

    lastDropTime.current = Date.now();
    setIsDropping(true);

    try {
      const response = await fetch(`${API_URL}/drop/${RECEIVER_ID}`);
      const data = await response.json();

      if (data.success && data.imagePath) {
        console.log(`${API_URL}${data.imagePath}`);
        setTimeout(() => {
          setReceivedImage(`${API_URL}${data.imagePath}`)
          setIsDropping(false);
          setHasDropped(true);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsDropping(false);
        }, 2000);
      }
    } catch (error) {
      console.error(error);
      setTimeout(() => {
        setIsDropping(false);
      }, 2000);
    }
  }

  useEffect(() => {
    const timeSinceLastDrop = Date.now() - lastDropTime.current;
    if (currentGesture === 'drop' &&
      gestureConfidence > CONFIDENCE_THRESHOLD &&
      !isDropping &&
      !hasDropped &&
      !receivedImage &&
      timeSinceLastDrop > DROP_COOLDOWN
    ) {
      handleDrop();
    }
  }, [currentGesture, gestureConfidence, isDropping, hasDropped, receivedImage]);

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 to bg-emerald-100 flex flex-col items-center justify-center p-4">
      {
        !receivedImage ? (
          <div className="rounded-2xl p-8 max-w-md w-full">
            {
              currentGesture === 'drop' ? (
                <div className="flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-cyan-200 animate-pulse shadow-2xl flex justify-center items-center">
                    <div className="w-32 h-32 rounded-full bg-emerald-100 animate-pulse"></div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
                  <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                    Drop Zone
                  </h1>
                  <p className="text-gray-600 mb-6 text-center">
                    Select an image, then make a <strong>"DROP"</strong> gesture
                  </p>
                  <div className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-green-300 rounded-xl bg-green-50 mb-6">
                    <ArrowDown className="h-16 w-16 text-green-400 mb-4" />
                    <span className="text-sm text-gray-600">Waiting for drop gesture....</span>
                  </div>
                  <Link to={'/'} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-2 text-gray-600 text-xs underline px-6 py-3 transition-colors">
                    Back to home
                  </Link>
                </div>
              )
            }
          </div>
        ) : (
          <div className="relative w-full h-screen">
            {
              isDropping && (
                <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                  <div className="animate-ping absolute w-32 h-32 rounded-full bg-white opacity-75"></div>
                  <div className="animate-pulse absolute w-64 h-64 rounded-full bg-white opacity-50"></div>
                  <div className="animate-bounce absolute w-96 h-96 rounded-full bg-white"></div>
                </div>
              )
            }

            <img src={receivedImage} alt="Received" className="w-full h-full object-contain" />
          </div>
        )
      }
    </div>
  )
}

export default DropPage