import React, { useState } from "react";
import { Search, Users } from "lucide-react";
import { Card, Input, TextArea, Loading, Button } from "@ui";
import { AlertStyles, LoadingAlert } from "@alert";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [description, setDescription] = useState("");

  const handleLoadData = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Data berhasil dimuat!");
    }, 2000);
  };

  return (
    <>
      <AlertStyles />
      <div>
        {loading && <Loading message="Sedang memuat data..." />}

        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* Card dengan Input */}
        <Card className="mb-6">
          <Card.Header>Statistik Reservasi</Card.Header>
          <Card.Body>
            <p>Jumlah Reservasi Aktif: 12</p>
            <p>Ruangan Tersedia: 5</p>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" onClick={handleLoadData}>
              Muat Ulang Data
            </Button>
          </Card.Footer>
        </Card>

        <Card className="mb-6">
          <Card.Header>
            <div className="flex justify-between items-center">
              <span>Statistik Reservasi</span>
              <Input
                label=""
                placeholder="Cari reservasi..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                icon={Search}
                className="w-64"
              />
            </div>
          </Card.Header>
          <Card.Body>
            <p>Jumlah Reservasi Aktif: 12</p>
            <p>Ruangan Tersedia: 5</p>
          </Card.Body>
        </Card>

        <Card className="mb-6">
          <Card.Header>Tambah Catatan</Card.Header>
          <Card.Body>
            <TextArea
              label="Deskripsi"
              placeholder="Tuliskan catatan atau keterangan di sini..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              helperText="Catatan ini hanya bisa dilihat oleh admin."
            />
          </Card.Body>
        </Card>

        <Card className="mb-6">
          <Card.Header>Isi Terakhir</Card.Header>
          <Card.Body>
            <p>
              {description
                ? description
                : "Belum ada catatan yang ditambahkan."}
            </p>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>Informasi Terbaru</Card.Header>
          <Card.Body>
            <ul className="list-disc pl-5 space-y-1">
              <li>Meeting Room A akan direnovasi minggu depan.</li>
              <li>Fitur notifikasi otomatis telah diaktifkan.</li>
            </ul>
          </Card.Body>
          <Card.Footer>
            <button className="text-primary-600 hover:underline font-medium">
              Lihat Semua Pengumuman
            </button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default Home;
