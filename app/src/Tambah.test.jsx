import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, expect, test, vi } from 'vitest'
import App from './App.jsx'

const DATA = [{ id: '1', judul: 'Monitor', kategori: 'Elektronik', kodeAlat: '123', jumlah: 5, kondisi: 'Baik' }]

beforeEach(() => {
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(DATA))))
})

function buka(path) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

test('menampilkan data hasil fetch di halaman koleksi', async () => {
  buka('/koleksi')
  expect(await screen.findByText('Monitor')).toBeInTheDocument()
})

test('form menolak Judul kosong', async () => {
  buka('/tambah')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Judul wajib diisi')
})

test('form menolak Kode Alat kosong', async () => {
  buka('/tambah') 
  await userEvent.type(screen.getByLabelText(/Nama Alat/i), 'test')
  await userEvent.clear(screen.getByLabelText(/kode alat/i))
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Kode Alat wajib diisi')
})

test('form menolak Jumlah kosong', async () => {
  buka('/tambah')
  await userEvent.type(screen.getByLabelText(/Nama Alat/i), 'test')
  await userEvent.type(screen.getByLabelText(/Kode Alat/i), '123')
  await userEvent.clear(screen.getByLabelText(/jumlah/i))
  await userEvent.type(screen.getByLabelText(/jumlah/i), '0')
  await userEvent.click(screen.getByRole('button', { name: 'Simpan' }))
  expect(screen.getByRole('alert')).toHaveTextContent('Jumlah wajib diisi')
})