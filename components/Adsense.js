import React, { useEffect } from "react";
import { ADSENSE_ID } from "../lib/constants";

export default function Adsense({ slot, height = "h-[100px]", wFull }) {
  const loadAds = () => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log("adsense error", error.message);
    }
  };

  useEffect(() => {
    loadAds();
  }, []);

  return (
    <div>
      <ins
        className={`adsbygoogle relative overflow-hidden ${height} bg-loading transform bg-yellow-900/10 bg-center bg-no-repeat duration-500 ease-out after:absolute after:top-0 after:left-1/2 after:-translate-x-1/2 after:text-xs after:text-black/20 after:content-['ADVERTISEMENT']`}
        style={{ display: "inline-block", width: "100%" }}
        data-ad-client={ADSENSE_ID}
        data-ad-slot={slot}
        // data-ad-format="auto"
        data-full-width-responsive="true"
      >
        {/* <ins className="placeholder relative z-30 mx-auto my-2 hidden w-full overflow-hidden">
        <div className="bg-black/10 text-center text-xs uppercase text-black/30 no-underline">
          Advertisement
        </div>
      </ins> */}
      </ins>
    </div>
  );
}
