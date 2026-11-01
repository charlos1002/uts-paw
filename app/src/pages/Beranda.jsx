import { Link } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import KartuRingkasan from '../components/KartuRingkasan.jsx'
import mahasiswa from '../../mahasiswa.json'

export default function Beranda() {
  const { items, loading } = useKoleksi()
  const jumlahKategori = new Set(items.map((item) => item.kategori)).size
  const totalStok = items.reduce((total, item) => total + Number(item.jumlah), 0)
  const jumlahRusak = items.filter((item) => item.kondisi !== 'Baik').length


  return (
    <section>
      <h1>Beranda</h1>
      <p style={{ fontSize: '1.1rem' }}>Tema: {mahasiswa.tema}</p>
      {loading ? (
        <p>Memuat ringkasan...</p>
      ) : (
        <div className="ringkasan-grid">
          <KartuRingkasan judul="Jenis alat" nilai={items.length} />
          <KartuRingkasan judul="Kategori" nilai={jumlahKategori} />
          <KartuRingkasan judul="Total stok" nilai={totalStok} />
          <KartuRingkasan judul="Alat rusak" nilai={jumlahRusak} />
        </div>
      )}
      <Link to="/koleksi">Lihat semua inventaris</Link>
    </section>
  )
}