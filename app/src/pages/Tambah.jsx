import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useKoleksi from '../hooks/useKoleksi.js'
import './Tambah.css'

const AWAL = { judul: '', kategori: 'Elektronik' , kodeAlat: String(Date.now()).slice(-6)  , jumlah: 1, kondisi: 'Baik'}

export default function Tambah() {
  const { tambah } = useKoleksi()
  const navigate = useNavigate()
  const [form, setForm] = useState(AWAL)
  const [galat, setGalat] = useState('')
  const [galatkode, setGalatkode] = useState('')
  const [galatjumlah, setGalatjumlah] = useState('')

  const ubah = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const simpan = (e) => {
    e.preventDefault()
    setGalat('')
    setGalatkode('')
    setGalatjumlah('')
    if (form.judul.trim().length < 3) {
      setGalat('Judul wajib diisi, minimal 3 karakter.')
      return
    }
    if (!form.kodeAlat.trim().match (/^\d+$/)){
      setGalatkode('Kode Alat wajib diisi Angka.')
      return
    }
    if (Number (form.jumlah) <= 0) {
      setGalatjumlah('Jumlah wajib diisi dan harus lebih dari 0.')
      return
    }
    tambah({ ...form, judul: form.judul.trim(), kodeAlat: form.kodeAlat.trim(), jumlah: Number(form.jumlah) })
    navigate('/koleksi')
  }

  return (
    <form className="formulir" onSubmit={simpan} noValidate>
      <h1>Tambah Inventaris</h1>

      <label htmlFor="judul">Judul (Nama Alat)</label>
      <input id="judul" name="judul" value={form.judul} onChange={ubah} />
      {galat && <p role="alert">{galat}</p>}

      <label htmlFor="kategori">Kategori</label>
      <select id="kategori" name="kategori" value={form.kategori} onChange={ubah}>
        <option>Elektronik</option>
        <option>Alat Ukur</option>
        <option>Alat Perbaikan</option>
      </select>

      <label htmlFor="kodeAlat">Kode Alat</label>
      <input id="kodeAlat" name="kodeAlat" value={form.kodeAlat} onChange={ubah} />
      {galatkode && <p role="alert">{galatkode}</p>}

      <label htmlFor="jumlah">Jumlah</label>
      <input id="jumlah" name="jumlah" type="number" min="0" step="1" value={form.jumlah} onChange={ubah} onKeyDown ={(e) => {
        if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault()
      } } />
      
      {galatjumlah && <p role="alert">{galatjumlah}</p>}

      <label htmlFor="kondisi">Kondisi</label>
      <select id="kondisi" name="kondisi" value={form.kondisi} onChange={ubah}>
        <option>Baik</option>
        <option>Rusak Ringan</option>
        <option>Rusak Berat</option>
      </select>

      <button type="submit">Simpan</button>
    </form>
  )
}