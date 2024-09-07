import React from "react";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="section-container py-24 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* text */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Kamu Mau Upgrade Skill? hanya di{" "}
            <span className="text-purple">Eduspace</span>!
          </h2>
          <p className="text-xl text-[#3D3D3D]">
            Investasikan Waktu Kamu untuk Meningkatkan Skill yang Akan Membawa
            Karier Kamu ke Level Selanjutnya.
          </p>

          {/* button */}
          <button className="btn btn-primary px-8 py-3 font-semibold text-white rounded-full">
            Daftar Sekarang
          </button>
        </div>
        {/* image */}
        <div className="md:w-1/2">
          <img src="/woman.png" alt="woman" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
