import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdVerified } from "react-icons/md";
import axios from "axios";

const PaymentDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, instructor, schedule, price, image, id, tutorId } =
    location.state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofOfTransfer, setProofOfTransfer] = useState(null);

  const foto = [
    {
      category: "UI&UX",
      image: "/kelasuiux.png",
    },
    {
      category: "Product Management",
      image: "/kelasproduct.png",
    },
    {
      category: "Front End",
      image: "/kelasfront.png",
    },
    {
      category: "Back End",
      image: "/kelasback.png",
    },
    {
      category: "Mobile Development",
      image: "/kelasmobile.png",
    },
    {
      category: "Digital Marketing",
      image: "/kelasdigital.png",
    },
  ];

  const selectedImage = foto.find((item) => item.category === title)?.image;

  const handleWhatsAppClick = () => {
    const message = `Halo, saya ingin melakukan pembayaran untuk kelas ${title} dengan instruktur ${instructor}. Jadwal: ${schedule}, Harga: ${price}.`;
    const whatsappUrl = `https://wa.me/6285717438637?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleFileChange = (e) => {
    setProofOfTransfer(e.target.files[0]);
  };

  const handlePurchase = () => {
    if (proofOfTransfer) {
      const formData = new FormData();
      formData.append("tutorId", id);
      formData.append("image", proofOfTransfer);
      const token = localStorage.getItem("token");

      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "http://localhost:5000/v1/api/transaction/purchase",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "multipart/formdata",
        },
        data: formData,
      };

      axios
        .request(config)
        .then((response) => {
          console.log(response.data);
          setIsModalOpen(true);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Silakan upload bukti transfer terlebih dahulu.");
    }
  };

  const handleInvoice = () => {
    setIsModalOpen(false);
    navigate("/Invoice", {
      state: {
        title,
        instructor,
        schedule,
        price,
        proofOfTransfer,
      },
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-6 mt-3">
          Detail Pembayaran
        </h2>

        <div className="mb-6 flex justify-center">
          <img
            src={"http://localhost:5000" + image}
            alt={title}
            className="w-full h-48 rounded-md"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">{instructor}</p>
          <p className="text-gray-600">{schedule}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold">Metode Pembayaran</h3>
          <button
            className="btn btn-primary w-full py-3 font-semibold text-white rounded-lg mt-2"
            onClick={handleWhatsAppClick}
          >
            Hubungi via WhatsApp
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold">Upload Bukti Transfer</h3>
          <input
            type="file"
            className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            onChange={handleFileChange}
          />
        </div>

        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-xl font-bold">{price}</p>
        </div>

        <button
          className={`btn btn-primary w-full py-3 font-semibold text-white rounded-lg ${
            !proofOfTransfer ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={!proofOfTransfer}
          onClick={handlePurchase}
        >
          Beli
        </button>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
              <MdVerified className="text-purple-600 mx-auto mb-4" size={64} />
              <h2 className="text-xl font-semibold mb-2">Pemesanan Berhasil</h2>
              <p className="text-gray-600 mb-6">
                Invoice berhasil dibuat. Lihat halaman invoice untuk mengetahui
                detail pesanan anda.
              </p>
              <button
                className="btn btn-primary w-full py-2 font-semibold text-white rounded-lg"
                onClick={handleInvoice}
              >
                Lihat Invoice
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetail;
