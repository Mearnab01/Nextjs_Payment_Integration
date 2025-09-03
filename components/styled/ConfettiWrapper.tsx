"use client";
import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiWrapper = () => {
  const [show, setShow] = useState(true);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const timer = setTimeout(() => setShow(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <Confetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      colors={["#06b6d4", "#8b5cf6", "#ec4899", "#10b981", "#f59e0b"]}
    />
  );
};

export default ConfettiWrapper;
