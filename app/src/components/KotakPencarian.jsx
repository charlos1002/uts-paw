export default function KotakPencarian({ nilai, onUbah }) {
  return (
    <input
      type="search"
      placeholder="Cari alat..."
      aria-label="Cari alat"
      value={nilai}
      onChange={(e) => onUbah(e.target.value)}
    />
  )
}