// src/components/DataTable.jsx
import Swal from "sweetalert2";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditDataForm from "../component/EditDataForm";
import { IoIosRefresh } from "react-icons/io";
import { FaFileExport } from "react-icons/fa";
import * as XLSX from 'xlsx'; 

const History = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  // State untuk pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Jumlah data per halaman

  // State untuk modal edit
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data');
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const lowercasedSearch = search.toLowerCase();
    const filtered = data.filter(item =>
      Object.values(item).some(
        value =>
          value
            .toString()
            .toLowerCase()
            .includes(lowercasedSearch)
      )
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset ke halaman pertama saat pencarian berubah
  }, [search, data]);

  const handleEditClick = (item) => {
    setDataToEdit(item);
    setIsEditModalOpen(true);
  };

  const closeModal = () => {
    setIsEditModalOpen(false);
    setDataToEdit(null);
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Peminjam');

    XLSX.writeFile(workbook, 'Data_Peminjam.xlsx')
  }

  const handleDataUpdated = () => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/data');
        setData(response.data);
        setFilteredData(response.data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  };

  const handleDeleteClick = async (noTransaksi) => {
    // Log noTransaksi untuk memeriksa nomor transaksi yang sedang dihapus
    console.log(`NoTransaksi yang akan dihapus: ${noTransaksi}`);

    // Tampilkan dialog konfirmasi dengan SweetAlert
    const result = await Swal.fire({
      title: 'Apakah Anda yakin?',
      text: 'Anda tidak bisa mengembalikan data ini setelah dihapus!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, hapus!',
      cancelButtonText: 'Batal'
    });

    // Jika pengguna mengklik 'Ya, hapus!', lanjutkan proses penghapusan
    if (result.isConfirmed) {
      try {
        // Hapus data
        await axios.delete(`http://localhost:4000/api/data/${noTransaksi}`);

        // Ambil data terbaru dari server
        const response = await axios.get('http://localhost:4000/api/data');
        console.log(response.data);
        setData(response.data);
        setFilteredData(response.data);

        // Tampilkan pesan sukses
        Swal.fire({
          title: 'Dihapus!',
          text: 'Data berhasil dihapus.',
          icon: 'success',
          confirmButtonColor: '#3085d6',
        });

      } catch (err) {
        console.error('Error menghapus data:', err);

        // Tampilkan pesan error jika gagal menghapus data
        Swal.fire({
          title: 'Error!',
          text: 'Terjadi kesalahan saat menghapus data.',
          icon: 'error',
          confirmButtonColor: '#3085d6',
        });
      }
    }
  };



  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">Error: {error}</div>;
  }

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  // Pagination Logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  return (
    <div>
      {/* Input Pencarian */}
      <div className="mb-4 flex justify-center items-center gap-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari...."
          className="border rounded-xl w-full p-2 focus:ring-transparent focus:outline-none"
        />
        <div className="flex gap-8">
          <div className="cursor-pointer" onClick={handleDataUpdated}>
            <IoIosRefresh size={24} className="hover:scale-105" />
          </div>
          <div className="cursor-pointer" onClick={exportToExcel}>
            <FaFileExport size={24} className="mr-2 hover:scale-105" />
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                >
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </th>
              ))}
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Edit
              </th>
              <th className="py-2 px-4 bg-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <tr key={item.noTransaksi} className="hover:bg-gray-100">
                  {headers.map((header) => (
                    <td key={header} className="py-2 px-4 border-b border-gray-200 text-sm">
                      {item[header]}
                    </td>
                  ))}
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleEditClick(item)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleDeleteClick(item.noTransaksi)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 2} className="text-center py-4">
                  Tidak ada data tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
        >
          Previous
        </button>
        <span>
          Halaman {currentPage} dari {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white py-1 px-3 rounded disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Komponen EditDataForm Modal */}
      {isEditModalOpen && dataToEdit && (
        <EditDataForm
          isOpen={isEditModalOpen}
          onRequestClose={closeModal}
          dataToEdit={dataToEdit}
          onDataUpdated={handleDataUpdated}
        />
      )}
    </div>
  );
};

export default History;
