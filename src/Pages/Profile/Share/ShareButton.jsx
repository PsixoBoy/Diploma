import React, { useState } from "react";
import QRCode from "react-qr-code";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import { FacebookIcon, TwitterIcon } from "react-share";
import "./style.css";

const ShareButton = ({ userId, userName, userProfileUrl }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleShare = () => {
    setShowOverlay(true);
  };

  const handleOverlayClose = () => {
    setShowOverlay(false);
  };

  return (
    <div>
      <button className="share" onClick={handleShare}>
        Share Profile
      </button>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>Share {userName}'s Profile</h2>
            <QRCode value={`${userProfileUrl}/${userId}`} size={200} />

            <div>
              <button onClick={handleOverlayClose}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;
