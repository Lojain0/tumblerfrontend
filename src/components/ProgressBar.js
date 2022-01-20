import React, { useEffect } from "react";
import UseStorage from "../hooks/UseStorage";
const ProgressBar = ({ file, setFile, token, img, setImg }) => {
  const { progress, url } = UseStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setImg(url);
      console.log(url);
      setFile(null);
    }
  }, [url, setFile]);
  return (
    <>
      <div
        className="progress-bar"
        initial={{ width: 0 }}
        animate={{ width: progress + "%" }}
      >
        progress
      </div>
      {url}
    </>
  );
};
export default ProgressBar;
