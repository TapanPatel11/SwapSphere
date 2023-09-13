//Author: Sakib Sadman <sakib.sadman@dal.ca>

import React from "react";
import {
  FaFacebook,
  FaFacebookMessenger,
  FaTwitter,
  FaPinterestP,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
} from "react-icons/fa";

function Share({ showShareButtons }) {
  const url = window.location.href;
  const text = "Check out this amazing product!";
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return (
    <div
      className={`flex items-center transition-transform duration-500 ease-in-out transform ${showShareButtons ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      {/* Facebook Share Button */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaFacebook color="#1877F2" />
      </a>

      {/* Messenger Share Button */}
      <a
        href={`https://www.facebook.com/dialog/send?link=${encodedUrl}&app_id=1601543886921602&redirect_uri=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaFacebookMessenger color="#0084FF" />
      </a>

      {/* Twitter Share Button */}
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaTwitter color="#1DA1F2" />
      </a>

      {/* Pinterest Share Button */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${url}&description=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaPinterestP color="#BD081C" />
      </a>

      {/* WhatsApp Share Button */}
      <a
        href={`https://wa.me/?text=${encodedText} ${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaWhatsapp color="#25D366" />
      </a>

      {/* Instagram Share Button */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="mr-4 text-3xl"
      >
        <FaInstagram color="#C13584" />
      </a>

      {/* Email Share Button */}
      <a
        href={`mailto:?subject=${text}&body=${text} - ${url}`}
        className="mr-4 text-3xl"
      >
        <FaEnvelope color="#D44638" />{" "}
      </a>
    </div>
  );
}

export default Share;
