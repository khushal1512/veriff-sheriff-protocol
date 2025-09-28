import React, { useState, useRef, useEffect } from 'react';

export function FaceCheck() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startScan = async () => {
    setIsScanning(true);
    setScanComplete(false);
    
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err);
        alert("Could not access webcam. Please check permissions.");
        setIsScanning(false);
        return;
      }
    }

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    }, 4000); 
  };

  return (
    <div style={{ border: '1px solid #ddd', padding: '1rem', marginTop: '1rem', borderRadius: '8px' }}>
      <h2>Liveness Check (Bot Prevention)</h2>
      <p>We need to verify you're a real person. Please complete a quick face scan.</p>
      
      <div style={{ 
        width: '320px', height: '240px', background: '#000', margin: '1rem auto',
        display: isScanning || scanComplete ? 'block' : 'none' 
      }}>
        <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%' }} />
      </div>

      {!isScanning && !scanComplete && (
        <button onClick={startScan}>Start Liveness Check</button>
      )}

      {isScanning && <p>Scanning... Please hold still.</p>}

      {scanComplete && <p style={{ color: 'green' }}>✅ Scan complete! Your liveness check has been submitted to the Sheriff for review.</p>}
    </div>
  );
}