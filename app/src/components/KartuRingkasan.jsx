import './KartuRingkasan.css'

export default function KartuRingkasan({ judul, nilai }) {
  return (
    <div className="ringkasan">
      <span className="ringkasan-nilai">{nilai}</span>
      <span className="ringkasan-judul">{judul}</span>
    </div>
  )
}