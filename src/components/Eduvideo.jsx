import React from "react";

const Eduvideo = () => {
  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC]">
      <div className="section-container py-24 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* text */}
        <div className="md:w-1/2 space-y-7 px-4">
          <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Kenapa sih harus <span className="text-purple">Eduspace</span>?
          </h2>
          <p className="text-xl text-[#3D3D3D]">
            Eduspace menawarkan platform belajar yang komprehensif dengan kursus
            berkualitas tinggi, instruktur berpengalaman, dan komunitas diskusi
            yang aktif. Tingkatkan keterampilan Anda dan bangun jaringan
            profesional Anda dengan materi yang up-to-date dan akses mudah ke
            berbagai kursus.
          </p>
          <button className="btn btn-primary px-8 py-3 font-semibold text-white rounded-full">
            Selengkapnya
          </button>
        </div>
        {/* Video */}
        <div className="md:w-1/2">
          <video
            src="/eduvid.mp4"
            className="w-full"
            alt="Video description"
            controls
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
    </div>
  );
}

export default Eduvideo;
