// src/components/EditDataForm.jsx

import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

// Inisialisasi Modal
Modal.setAppElement('#root');

const EditDataForm = ({ isOpen, onRequestClose, dataToEdit, onDataUpdated }) => {
  const [formData, setFormData] = useState({
    nama: dataToEdit.nama,
    alamat: dataToEdit.alamat,
    tanggalLahir: dataToEdit.tanggalLahir,
    pekerjaan: dataToEdit.pekerjaan,
    status: dataToEdit.status,
    gaji: dataToEdit.gaji,
    ibuKandung: dataToEdit.ibuKandung,
    nominalPinjaman: dataToEdit.nominalPinjaman,
    jaminan: dataToEdit.jaminan,
    tenor: dataToEdit.tenor
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.put(`http://localhost:4000/api/data/${dataToEdit.noTransaksi}`, formData);
      setSuccess(response.data);
      onDataUpdated(); // Memperbarui data di tabel
      onRequestClose(); // Menutup modal
    } catch (err) {
      setError(err.response?.data || 'Terjadi kesalahan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Edit Data Peminjam"
      className="max-w-lg mx-auto mt-20 bg-white p-6 rounded shadow-lg"
      overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-start"
    >
      <h2 className="text-xl font-bold mb-4">Edit Data Peminjam</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}
      <form onSubmit={handleSubmit}>
        {/* Nama */}
        <div className="mb-4">
          <label className="block text-gray-700">Nama:</label>
          <input
            type="text"
            name="nama"
            value={formData.nama}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Alamat */}
        <div className="mb-4">
          <label className="block text-gray-700">Alamat:</label>
          <input
            type="text"
            name="alamat"
            value={formData.alamat}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Tanggal Lahir */}
        <div className="mb-4">
          <label className="block text-gray-700">Tanggal Lahir:</label>
          <input
            type="date"
            name="tanggalLahir"
            value={formData.tanggalLahir}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Pekerjaan */}
        <div className="mb-4">
          <label className="block text-gray-700">Pekerjaan:</label>
          <input
            type="text"
            name="pekerjaan"
            value={formData.pekerjaan}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Status */}
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Gaji */}
        <div className="mb-4">
          <label className="block text-gray-700">Gaji:</label>
          <input
            type="number"
            name="gaji"
            value={formData.gaji}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Ibu Kandung */}
        <div className="mb-4">
          <label className="block text-gray-700">Ibu Kandung:</label>
          <input
            type="text"
            name="ibuKandung"
            value={formData.ibuKandung}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Nominal Pinjaman */}
        <div className="mb-4">
          <label className="block text-gray-700">Nominal Pinjaman:</label>
          <input
            type="number"
            name="nominalPinjaman"
            value={formData.nominalPinjaman}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        {/* Jaminan */}
        <div className="mb-4">
          <label className="block text-gray-700">Jaminan:</label>
          <select name="jaminan" id="jaminan" className="border rounded-sm p-1 focus:outline-none" value={formData.jaminan} onChange={handleChange}>
            <option value="">Choose</option>
            <option value="sertifikatTanah">Sertifikat Tanah</option>
            <option value="sertifikatRumah">Sertifikat Rumah</option>
          </select>
        </div>
        {/* Tenor */}
        <div className="mb-4">
          <label className="block text-gray-700">Tenor (bulan):</label>
          <div name="tenor" className="flex items-center gap-2 justify-items-center" value={formData.tenor} onChange={handleChange}>
            <input
              type="radio"
              name="tenor"
              id="tiga"
              value="3"
              checked={formData.tenor === "3"}
              onChange={handleChange}
              className="form-radio"
            />
            <label htmlFor="tiga" className="text-gray-700">3</label>

            <input
              type="radio"
              name="tenor"
              id="enam"
              value="6"
              checked={formData.tenor === "6"}
              onChange={handleChange}
              className="form-radio"
            />
            <label htmlFor="enam" className="text-gray-700">6</label>

            <input
              type="radio"
              name="tenor"
              id="duabelas"
              value="12"
              checked={formData.tenor === "12"}
              onChange={handleChange}
              className="form-radio"
            />
            <label htmlFor="enam" className="text-gray-700">12</label>
            <input
              type="radio"
              name="tenor"
              id="duabelas"
              value="36"
              checked={formData.tenor === "36"}
              onChange={handleChange}
              className="form-radio"
            />
            <label htmlFor="enam" className="text-gray-700">36</label>
          </div>
        </div>
        {/* Tombol Submit */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </form>
      {/* Tombol Tutup Modal */}
      <button
        onClick={onRequestClose}
        className="mt-4 w-full bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
      >
        Tutup
      </button>
    </Modal>
  );
};

export default EditDataForm;
