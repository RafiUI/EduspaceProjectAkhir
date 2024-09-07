import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Invoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate("/PaymentDetail"); // Ganti dengan rute yang sesuai
    }
  }, [location.state, navigate]);

  if (!location.state) {
    return null;
  }

  const { title, instructor, schedule, price, paymentMethod, paymentOption } = location.state;

  const handleViewClass = () => {
    const partsData = {
        title: title,
        parts: [],
    };

    if (title === "UI/UX Design & Research") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan UI & UX', description: 'Pada materi ini, kamu akan mengenal seputar UX writing, bagaimana skenario kepenulisan UX, perbedaan dengan jenis copy yang lain, dan dasar-dasar menulis UX.' },
            { title: 'Part 2: UI & UX Masa Kini', description: 'Di bagian ini, kita akan membahas tentang perkembangan terbaru dalam bidang UI/UX dan bagaimana tren ini mempengaruhi desain produk digital.' },
            { title: 'Part 3: Metode UI & UX', description: 'Materi ini mencakup berbagai metode yang digunakan dalam proses desain UI/UX, mulai dari penelitian pengguna hingga pembuatan prototipe.' },
            { title: 'Part 4: Desain Responsif', description: 'Fokus pada bagaimana merancang antarmuka yang responsif dan kompatibel dengan berbagai perangkat dan resolusi layar.' },
            { title: 'Part 5: Pengujian Pengguna', description: 'Bagian ini membahas tentang pentingnya pengujian pengguna dalam desain UX dan bagaimana melaksanakan pengujian secara efektif.' },
            { title: 'Part 6: Pembuatan Wireframe', description: 'Pelajari cara membuat wireframe yang efektif sebagai langkah awal dalam pengembangan antarmuka pengguna.' },
            { title: 'Part 7: UI Design dan Implementasinya', description: 'Materi ini membahas tentang implementasi desain UI ke dalam sebuah produk digital, dari sketsa awal hingga kode yang berjalan.' },
            { title: 'Part 8: Integrasi UI/UX dengan Teknologi', description: 'Bagian akhir ini menjelaskan bagaimana mengintegrasikan UI/UX dengan teknologi yang sedang berkembang untuk menciptakan pengalaman pengguna yang optimal.' },
        ];
    } else if (title === "Product Management") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan Product Management', description: 'Di bagian ini, kamu akan mempelajari dasar-dasar manajemen produk, peran seorang product manager, dan pentingnya dalam pengembangan produk.' },
            { title: 'Part 2: Siklus Hidup Produk', description: 'Materi ini membahas tentang siklus hidup produk mulai dari ide awal, pengembangan, hingga peluncuran dan evaluasi.' },
            { title: 'Part 3: Penelitian Pasar', description: 'Pelajari cara melakukan penelitian pasar untuk memahami kebutuhan pengguna dan mengidentifikasi peluang bisnis.' },
            { title: 'Part 4: Roadmap Produk', description: 'Materi ini mengajarkan cara membuat roadmap produk yang jelas dan terstruktur untuk mencapai tujuan bisnis.' },
            { title: 'Part 5: Pengelolaan Tim', description: 'Fokus pada bagaimana mengelola tim lintas fungsi dan memastikan kolaborasi yang efektif dalam pengembangan produk.' },
            { title: 'Part 6: Peluncuran Produk', description: 'Bagian ini membahas strategi peluncuran produk yang sukses, termasuk pemasaran dan komunikasi produk kepada audiens.' },
            { title: 'Part 7: Pengukuran Kinerja Produk', description: 'Pelajari berbagai metrik yang digunakan untuk mengukur kinerja produk dan keberhasilan pasar.' },
            { title: 'Part 8: Iterasi dan Perbaikan Produk', description: 'Bagian akhir ini menjelaskan pentingnya iterasi dalam produk dan bagaimana terus memperbaiki produk berdasarkan umpan balik pengguna.' },
        ];
    } else if (title === "Front End") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan Front End Development', description: 'Pada materi ini, kamu akan diperkenalkan dengan dasar-dasar pengembangan Front End, termasuk HTML, CSS, dan JavaScript.' },
            { title: 'Part 2: Responsive Web Design', description: 'Di bagian ini, kamu akan belajar tentang desain responsif dan bagaimana menerapkannya untuk membuat situs web yang kompatibel dengan berbagai perangkat.' },
            { title: 'Part 3: Frameworks Front End', description: 'Pelajari berbagai framework Front End populer seperti React, Angular, dan Vue.js serta cara menggunakannya dalam proyek nyata.' },
            { title: 'Part 4: CSS Preprocessors', description: 'Materi ini mencakup penggunaan preprocessors seperti Sass dan Less untuk menulis CSS yang lebih efisien.' },
            { title: 'Part 5: Pengoptimalan Kinerja Web', description: 'Fokus pada teknik-teknik untuk mengoptimalkan kinerja situs web, termasuk pengurangan waktu pemuatan dan optimasi gambar.' },
            { title: 'Part 6: Interaksi Pengguna', description: 'Bagian ini membahas bagaimana menambahkan interaksi pengguna yang dinamis menggunakan JavaScript dan AJAX.' },
            { title: 'Part 7: Testing dan Debugging', description: 'Pelajari cara melakukan testing dan debugging pada kode Front End untuk memastikan kualitas dan stabilitas aplikasi.' },
            { title: 'Part 8: Deployment dan Continuous Integration', description: 'Materi ini membahas proses deployment aplikasi Front End dan penerapan continuous integration untuk pengembangan berkelanjutan.' },
        ];
    } else if (title === "Back End") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan Back End Development', description: 'Pada materi ini, kamu akan diperkenalkan dengan konsep dasar Back End, termasuk server, database, dan API.' },
            { title: 'Part 2: Pengembangan API', description: 'Di bagian ini, kamu akan belajar cara mengembangkan API menggunakan RESTful dan GraphQL untuk menghubungkan Front End dengan Back End.' },
            { title: 'Part 3: Database Management', description: 'Pelajari cara mengelola database, termasuk penggunaan SQL dan NoSQL, serta optimasi query untuk performa yang lebih baik.' },
            { title: 'Part 4: Keamanan Aplikasi', description: 'Bagian ini membahas tentang pentingnya keamanan dalam pengembangan Back End dan teknik-teknik untuk melindungi data pengguna.' },
            { title: 'Part 5: Autentikasi dan Otorisasi', description: 'Materi ini mencakup implementasi autentikasi dan otorisasi untuk mengamankan akses ke aplikasi.' },
            { title: 'Part 6: Pengembangan Microservices', description: 'Pelajari bagaimana membangun aplikasi dengan arsitektur microservices untuk skalabilitas yang lebih baik.' },
            { title: 'Part 7: Testing Back End', description: 'Fokus pada testing unit dan integrasi pada Back End untuk memastikan semua layanan berjalan dengan benar.' },
            { title: 'Part 8: Deployment dan Scaling', description: 'Materi ini membahas bagaimana melakukan deployment aplikasi Back End dan teknik scaling untuk menangani peningkatan beban kerja.' },
        ];
    } else if (title === "Mobile Development") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan Mobile Development', description: 'Di bagian ini, kamu akan mempelajari dasar-dasar pengembangan aplikasi mobile, termasuk platform Android dan iOS.' },
            { title: 'Part 2: Desain UI/UX Mobile', description: 'Pelajari tentang desain UI/UX yang optimal untuk aplikasi mobile agar dapat memberikan pengalaman pengguna yang menyenangkan.' },
            { title: 'Part 3: Native vs. Cross-Platform Development', description: 'Materi ini membahas perbedaan antara pengembangan aplikasi native dan cross-platform serta kelebihan dan kekurangannya.' },
            { title: 'Part 4: Integrasi API di Mobile', description: 'Bagian ini mencakup cara mengintegrasikan API dalam aplikasi mobile untuk mengambil dan mengirim data ke server.' },
            { title: 'Part 5: Penyimpanan Data di Mobile', description: 'Pelajari berbagai opsi penyimpanan data di aplikasi mobile, termasuk local storage dan database.' },
            { title: 'Part 6: Testing Aplikasi Mobile', description: 'Materi ini membahas teknik-teknik untuk melakukan testing pada aplikasi mobile agar bebas dari bug dan performa optimal.' },
            { title: 'Part 7: Deployment ke App Store dan Google Play', description: 'Fokus pada proses deployment aplikasi ke App Store dan Google Play serta tips untuk memenuhi persyaratan kedua platform.' },
            { title: 'Part 8: Optimasi dan Maintenance', description: 'Bagian akhir ini menjelaskan tentang optimasi aplikasi mobile untuk performa yang lebih baik serta maintenance setelah aplikasi diluncurkan.' },
        ];
    } else if (title === "Digital Marketing") {
        partsData.parts = [
            { title: 'Part 1: Pengenalan Digital Marketing', description: 'Pada materi ini, kamu akan mempelajari dasar-dasar pemasaran digital, termasuk SEO, SEM, dan sosial media marketing.' },
            { title: 'Part 2: Strategi Konten', description: 'Bagian ini membahas tentang pentingnya strategi konten dalam pemasaran digital dan cara membuat konten yang menarik.' },
            { title: 'Part 3: SEO dan SEM', description: 'Pelajari teknik-teknik SEO dan SEM untuk meningkatkan visibilitas situs web di mesin pencari dan memaksimalkan traffic.' },
            { title: 'Part 4: Social Media Marketing', description: 'Materi ini mencakup cara menggunakan platform media sosial untuk memasarkan produk dan membangun komunitas.' },
            { title: 'Part 5: Email Marketing', description: 'Fokus pada bagaimana mengembangkan kampanye email marketing yang efektif dan cara mengelola daftar email.' },
            { title: 'Part 6: Analisis Data dan ROI', description: 'Bagian ini membahas tentang pentingnya analisis data dalam pemasaran digital dan cara menghitung ROI dari kampanye pemasaran.' },
            { title: 'Part 7: Iklan Digital', description: 'Pelajari cara membuat dan mengelola iklan digital, termasuk Google Ads dan Facebook Ads untuk meningkatkan konversi.' },
            { title: 'Part 8: Pemasaran Influencer', description: 'Bagian akhir ini menjelaskan tentang strategi menggunakan influencer untuk mempromosikan produk dan memperluas jangkauan brand.' },
        ];
    } else {
        partsData.parts = [];
    }

    //setSelectedClass(partsData);

    navigate("/MyClass", { state: partsData }); // Mengirim data ke halaman MyClass
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-center text-2xl font-semibold mb-6">
          Invoice Pembelian
        </h2>

        <div className="mb-6">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">Pengajar: {instructor}</p>
          <p className="text-gray-600">Jadwal: {schedule}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-md font-semibold">Metode Pembayaran</h3>
          <p className="text-gray-600">{paymentMethod}</p>
          <p className="text-gray-600">{paymentOption}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Total Pembayaran</h3>
          <p className="text-xl font-bold">{price}</p>
        </div>

        <button
          className="btn btn-primary w-full py-3 font-semibold text-white rounded-lg"
          onClick={handleViewClass}
        >
          Lihat Kelas
        </button>
      </div>
    </div>
  );
};

export default Invoice;
