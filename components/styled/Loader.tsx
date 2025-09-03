import React from "react";

const AppLoader = ({ text }: { text: string }) => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      <p className="mt-4 text-gray-400">{text}...</p>
    </div>
  );
};

export default AppLoader;
