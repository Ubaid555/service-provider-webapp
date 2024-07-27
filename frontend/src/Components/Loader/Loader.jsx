import React from "react";
import LoadingOverlay from "react-loading-overlay";

const Loader = () => {
  return (
    <LoadingOverlay
      active={true}
      spinner
      text="Loading..."
      className="loader"
      styles={{
        overlay: (base) => ({
          ...base,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          filter: "blur(1px)",
          zIndex: 1,
        }),
        spinner: (base) => ({
          ...base,
          width: "100px",
          height: "100px",
          borderRadius: "50%",
          backgroundColor: "#d01c28",
          borderColor: "#d01c28",
        }),
      }}
    />
  );
};

export default Loader;
