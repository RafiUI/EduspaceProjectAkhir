import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="section-container py-16 text-center">
      <h1 className="text-4xl font-bold">404 - Not Found</h1>
      <p className="mt-4">Halaman yang Anda cari tidak ditemukan.</p>
      <Link to="/" className="btn btn-primary mt-8">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

export default NotFound;
