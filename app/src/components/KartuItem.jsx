import { Link } from 'react-router-dom'
import LencanaKondisi from './LencanaKondisi.jsx'

export default function KartuItem({ item }) {
  const { id, judul, kategori, kondisi, jumlah } = item
  return (
    <article className="kartu">
      <h3>
        <Link to={`/koleksi/${id}`}>{judul}</Link>
      </h3>
      <p>
        {kategori} · Stok:{jumlah}
      </p>
      <LencanaKondisi kondisi={kondisi} />
    </article>
  )
}