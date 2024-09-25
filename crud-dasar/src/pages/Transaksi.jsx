import React, { useState } from "react";
import axios from "axios";
import '../index.css';
import Swal from "sweetalert2";

const Transaksi = () => {

    const [formData, setFormData] = useState({
        nama: '',
        alamat: '',
        tanggalLahir: '',
        pekerjaan: '',
        status: '',
        gaji: '',
        ibuKandung: '',
        nominalPinjaman: '',
        jaminan: '',
        tenor: '',
    });

    const handleChangeData = (e) => {
        const { name, value } = e.target;
        setFormData((prevvValues) => ({
            ...prevvValues,
            [name]: value
        }));
    };

    const formatDateToInputValue = (dateString) => {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0]; // Mengambil hanya bagian tanggal (yyyy-mm-dd)
    };

    const handleSubmitData = async (e) => {
        e.preventDefault();

        const isEmpty = Object.values(formData).some(field => field.trim() === '');
        if (isEmpty) {
            Swal.fire({
                icon: 'warning',
                title: 'opss...',
                text: 'Semua Field harus diisi!',
            });
            return;
        }

        try {
            await axios.post('http://localhost:4000/api/data', formData);
            Swal.fire({
                icon: 'success',
                title: 'Done',
                text: 'Data berhasil tersimpan',
            })

            setFormData({
                nama: '',
                alamat: '',
                tanggalLahir: '',
                pekerjaan: '',
                status: '',
                gaji: '',
                ibuKandung: '',
                nominalPinjaman: '',
                jaminan: '',
                tenor: ''
            });
        } catch (error) {
            console.error('Ada kesalahan dalam inputan', error)
            Swal.fire({
                icon: 'error',
                title: 'Opss...',
                text: 'Data gagal tersimpan',
            })
        }
        console.log(formData);
        // console.log(formPeminjaman);
    }

    return (
        <div>
            <div className="flex gap-8 ">
                <form onSubmit={handleSubmitData}>
                    <div className="">
                        {/* <form onSubmit={handleSubmitData}> */}
                        <h1 className="text-center">Data</h1>
                        <div className="grid gap-2 mt-5">
                            <label>Nama :</label>
                            <input name="nama" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.nama} onChange={handleChangeData} />
                            <label>Alamat :</label>
                            <input name="alamat" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.alamat} onChange={handleChangeData} />
                            <label>Tanggal Lahir :</label>
                            <input type="date" name="tanggalLahir" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.tanggalLahir ? formatDateToInputValue(formData.tanggalLahir) : ''} onChange={handleChangeData} />
                            <label>Pekerjaan :</label>
                            <input name="pekerjaan" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.pekerjaan} onChange={handleChangeData} />
                            <label>Status :</label>
                            <input name="status" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.status} onChange={handleChangeData} />
                            <label>Gaji :</label>
                            <input name="gaji" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.gaji} onChange={handleChangeData} />
                            <label>Ibu Kandung :</label>
                            <input name="ibuKandung" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.ibuKandung} onChange={handleChangeData} />
                        </div>
                    </div>
                    <div className="grid gap-2 mt-5">
                        <label>Nominal Pinjaman :</label>
                        <input type="number" name="nominalPinjaman" className="w-96 py-1.5 p-1 border ring-1 ring-inset ring-gray-200 focus:ring-0 rounded-md focus:outline-none" value={formData.nominalPinjaman} onChange={handleChangeData} />
                        <label>Jaminan :</label>
                        <select name="jaminan" id="jaminan" className="border rounded-sm p-1 focus:outline-none" value={formData.jaminan} onChange={handleChangeData}>
                            <option value="">Choose</option>
                            <option value="sertifikatTanah">Sertifikat Tanah</option>
                            <option value="sertifikatRumah">Sertifikat Rumah</option>
                        </select>
                        <label>Tenor :</label>
                        <div name="tenor" className="flex items-center gap-2 justify-items-center" value={formData.tenor} onChange={handleChangeData}>
                            <input
                                type="radio"
                                name="tenor"
                                id="tiga"
                                value="3"
                                checked={formData.tenor === "3"}
                                onChange={handleChangeData}
                                className="form-radio"
                            />
                            <label htmlFor="tiga" className="text-gray-700">3</label>
                            <input
                                type="radio"
                                name="tenor"
                                id="enam"
                                value="6"
                                checked={formData.tenor === "6"}
                                onChange={handleChangeData}
                                className="form-radio"
                            />
                            <label htmlFor="enam" className="text-gray-700">6</label>
                            <input
                                type="radio"
                                name="tenor"
                                id="duabelas"
                                value="12"
                                checked={formData.tenor === "12"}
                                onChange={handleChangeData}
                                className="form-radio"
                            />
                            <label htmlFor="enam" className="text-gray-700">12</label>
                            <input
                                type="radio"
                                name="tenor"
                                id="duabelas"
                                value="36"
                                checked={formData.tenor === "36"}
                                onChange={handleChangeData}
                                className="form-radio"
                            />
                            <label htmlFor="enam" className="text-gray-700">36</label>
                        </div>
                    </div>
                    <div>
                        <button className="mt-4 border pt-2 pb-2 pl-4 pr-4 rounded-md bg-blue-100 hover:bg-blue-400 hover:scale-110 transition-all duration-300">Submit</button>
                    </div>
                </form>
            </div>
            <div className="flex justify-end">
                <button className=" pt-2 pb-2 pl-4 pr-4 bg-green-200 rounded-md mt-2  hover:scale-110 transition-all duration-300">Done</button>
            </div>
        </div>
    );
};

export default Transaksi;
