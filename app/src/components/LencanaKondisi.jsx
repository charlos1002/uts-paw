import './LencanaKondisi.css'

const Lencana = {
    'Baik': 'lencana-baik',
    'Rusak Ringan': 'lencana-rusak-ringan',
    'Rusak Berat': 'lencana-rusak-berat',
}

export default function LencanaKondisi({ kondisi }) {
    return <span className={`lencana ${Lencana[kondisi] ?? ''}`}>{kondisi}</span>
}