const express = require('express')
const mysql = require('mysql')
const bodyParser = require("body-parser");
const cors = require('cors')
const app = express();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'transaksi'
});

app.use(cors());
app.use(bodyParser.json());

db.connect((err) => {
    if (err) {
        console.error('Database tidak terhubung:', err);
        throw err;  // Menghentikan eksekusi jika tidak bisa terhubung
    }
    console.log('Database berhasil terhubung');  // Informasi jika berhasil terhubung
});

// Fungsi untuk menghasilkan nomor transaksi acak
function generateTransactionNumber() {
    const part1 = Math.floor(1000 + Math.random() * 9000);  // 4 digit angka acak
    const part2 = Math.floor(10000 + Math.random() * 90000); // 5 digit angka acak
    return `TRX-${part1}-${part2}`;  // menghasilkan format TRX-xxxx-xxxxx
}

app.post('/api/data', (req, res) => {
    const { nama, alamat, tanggalLahir, pekerjaan, status, gaji, ibuKandung, nominalPinjaman, jaminan, tenor } = req.body;

    // Hasilkan nomor transaksi unik
    const transactionNumber = generateTransactionNumber();
    const formattedTanggalLahir = new Date(tanggalLahir).toISOString().split('T')[0]; // yyyy-mm-dd
    console.log(`Transaction Number Generated: ${transactionNumber}`);

    // Query untuk memasukkan data ke dalam database
    const query = 'insert into data_peminjam (noTransaksi, nama, alamat, tanggalLahir, pekerjaan, status, gaji, ibuKandung, nominalPinjaman, jaminan, tenor) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(query, [transactionNumber, nama, alamat, formattedTanggalLahir, pekerjaan, status, gaji, ibuKandung, nominalPinjaman, jaminan, tenor], (err, result) => {
        if (err) {
            console.error('Error menyimpan data ke database', err);
            return res.status(500).send('Error Menyimpan data ke database log');
        }
        res.status(201).send('Data berhasil disimpan dengan No Transaksi: ' + transactionNumber);
    });
});

app.get('/api/data/:noTransaksi?', (req, res) => {
    const { noTransaksi } = req.params;

    // Jika noTransaksi diberikan, cari data berdasarkan noTransaksi
    if (noTransaksi) {
        const query = 'SELECT * FROM data_peminjam WHERE noTransaksi = ?';

        db.query(query, [noTransaksi], (err, results) => {
            if (err) {
                console.error('Error mengambil data dari database:', err);
                return res.status(500).send('Error mengambil data dari database');
            }

            if (results.length === 0) {
                return res.status(404).send('Data tidak ditemukan');
            }

            return res.status(200).json(results[0]);
        });
    } else {
        // Jika noTransaksi tidak diberikan, tampilkan semua data
        const query = 'SELECT * FROM data_peminjam';

        db.query(query, (err, results) => {
            if (err) {
                console.error('Error mengambil data dari database:', err);
                return res.status(500).send('Error mengambil data dari database');
            }

            return res.status(200).json(results);
        });
    }
});

app.delete('/api/data/:noTransaksi', (req, res) => {
    const { noTransaksi } = req.params;

    const query = 'delete from data_peminjam where noTransaksi = ?';

    db.query(query, [noTransaksi], (err, result) => {
        if (err) {
            console.error('Error saat menghapus data', err);
            return res.status(500).send('Gagal menghapus data dari database');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('data tidak ditemukan');
        }
        res.status(200).status('Data berhasil di hapus')
    });
});

app.put('/api/data/:noTransaksi', (req, res) => {
    const { noTransaksi } = req.params;
    const { nama, alamat, tanggalLahir, pekerjaan, status, gaji, ibuKandung, nominalPinjaman, jaminan, tenor } = req.body;

    const query = `
        UPDATE data_peminjam 
        SET nama = ?, alamat = ?, tanggalLahir = ?, pekerjaan = ?, status = ?, gaji = ?, ibuKandung = ?, nominalPinjaman = ?, jaminan = ?, tenor = ?
        WHERE noTransaksi = ?
    `;

    db.query(query, [nama, alamat, tanggalLahir, pekerjaan, status, gaji, ibuKandung, nominalPinjaman, jaminan, tenor, noTransaksi], (err, result) => {
        if (err) {
            console.error('Error memperbarui data di database', err);
            return res.status(500).send('Error memperbarui data di database');
        }
        if (result.affectedRows === 0) {
            return res.status(404).send('Data tidak ditemukan');
        }
        res.status(200).send('Data berhasil diperbarui');
    });
});

// Jalankan server pada port 4000
app.listen(4000, () => {
    console.log('Server berjalan di port 4000');
});