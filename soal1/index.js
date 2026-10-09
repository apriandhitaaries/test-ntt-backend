const express = require("express");
const axios = require("axios");
const https = require("https");

const app = express();
const port = 3000;

app.use(express.json());

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

app.post("/cekAlamat", async (request, response) => {
  try {
    const { provinsi, kabkota } = request.body;
    console.log(`\n--- Request Baru Masuk ---`);
    console.log(`Mencari: Provinsi ${provinsi}, ${kabkota}`);

    // Ambil data Provinsi
    const urlProvinsi = "https://alamat.thecloudalert.com/api/provinsi/get/";
    const responseProvinsi = await axios.get(urlProvinsi, { httpsAgent });
    const daftarProvinsi = responseProvinsi.data.result;

    // Cari Provinsi
    const targetProvinsi = daftarProvinsi.find((p) => p.text.toLowerCase() === provinsi.toLowerCase());

    if (!targetProvinsi) {
      console.log(`Provinsi ${provinsi} tidak ditemukan di API.`);
      return response.json({ code: "0", message: "Tidak Sesuai" });
    }

    const idProvinsi = targetProvinsi.id;
    console.log(`Ketemu! ID Provinsi ${provinsi} adalah ${idProvinsi}`);

    // Cari data Kota/Kabupaten berdasrkan ID Provinsi
    const urlKota = `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${idProvinsi}`;
    const responseKota = await axios.get(urlKota, { httpsAgent });
    const daftarKota = responseKota.data.result;

    // Cari Kota/Kabupaten
    const targetKota = daftarKota.find((k) => k.text.toLowerCase() === kabkota.toLowerCase());

    if (!targetKota) {
      console.log(`${kabkota} tidak ditemukan di Provinsi ${provinsi}.`);
      return response.json({ code: "0", message: "Tidak Sesuai" });
    }

    console.log(`Ketemu! ${kabkota} ada di Provinsi ${provinsi}`);
    return response.json({ code: "1", message: "Sesuai" });
  } catch (error) {
    console.error("Gagal nge-hit API:", error.message);
    return response.status(500).json({
      code: 0,
      message: "Tidak Sesuai",
    });
  }
});

app.listen(port, () => {
  console.log(`Server berhasil jalan di http://localhost:${port}`);
});
