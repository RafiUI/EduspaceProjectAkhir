import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import { MdAccessTime } from "react-icons/md";

const KelasDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch kelas details from the API
  const fetchKelasDetail = async () => {
    try {
      const response = await axiosInstance.get(`/tutor/${id}`);
      if (response.status === 200) {
        setCard(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching kelas details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKelasDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!card) {
    return <div>Kelas tidak ditemukan!</div>;
  }

  const handleMulaiClick = () => {
    navigate("/payment", {
      state: {
        title: card.title,
        instructor: card.expert.name,
        schedule: card.jadwal,
        price: card.price,
        image: card.image,
        id: card._id,
      },
    });
  };

  return (
    <div className="section-container py-24 flex flex-col md:flex-row gap-8">
      {/* Bagian Kiri: Image dan Deskripsi */}
      <div className="flex-1">
        <div className="bg-gray-200 h-64 md:h-80 w-full overflow-hidden mb-4 rounded-lg">
          <img
            className="w-full h-full object-cover"
            src={`http://localhost:5000${card.image}`} // Update image URL
            alt={card.title}
          />
        </div>
        <div className="px-4">
          <h2 className="text-xl font-semibold mb-4">Tentang Kelas</h2>
          <p>{card.description}</p>
        </div>
      </div>

      {/* Bagian Kanan: Informasi Kelas dan Harga */}
      <div className="w-full md:w-80 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-2">{card.title}</h2>
        <p className="text-gray-600 mb-4">{card.expert.name}</p>

        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">Kelas Ini Termasuk:</h3>
          <ul className="list-none">
            {card.facilities.length > 0 ? (
              card.facilities.map((facility, index) => (
                <li key={index} className="flex items-center mb-1">
                  <MdAccessTime />
                  {facility}
                </li>
              ))
            ) : (
              <li>Tidak ada fasilitas tambahan.</li>
            )}
          </ul>
        </div>

        <div className="mb-4">
          <h3 className="text-md font-semibold">Jadwal:</h3>
          <p>{card.jadwal}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold">Total</h3>
          <p className="text-xl font-bold">Rp {card.price.toLocaleString()}</p>
        </div>

        <button onClick={handleMulaiClick} className="btn btn-primary w-full">
          Mulai
        </button>
      </div>
    </div>
  );
};

export default KelasDetail;
