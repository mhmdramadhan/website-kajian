'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

export default function FormUstadzEdit({ ustadz, token }) {
    const router = useRouter();
    const [previewFoto, setPreviewFoto] = useState(null);
    const [form, setForm] = useState({
        nama: ustadz.nama || '',
        bio: ustadz.bio || '',
        kontak: ustadz.kontak || '',
        foto: null,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (files) {
            const file = files[0];
            setForm((prev) => ({ ...prev, [name]: file }));
            setPreviewFoto(URL.createObjectURL(file));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.nama || !form.bio || !form.kontak) {
            toast.error('Semua input wajib diisi');
            return;
        }

        const formData = new FormData();
        formData.append('nama', form.nama);
        formData.append('bio', form.bio);
        formData.append('kontak', form.kontak);
        if (form.foto) {
            if (!form.foto.type.startsWith('image/')) {
                toast.error('File harus berupa gambar');
                return;
            }
            if (form.foto.size > 2 * 1024 * 1024) {
                toast.error('Ukuran file maksimal 2MB');
                return;
            }
            formData.append('foto', form.foto);
        }

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz/${ustadz.id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                toast.success('Data ustadz berhasil diperbarui!');
                router.push('/admin/ustadz');
            } else {
                toast.error(data.message || 'Gagal memperbarui data');
            }
        } catch (err) {
            toast.error(err.message || 'Terjadi kesalahan');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-semibold">Nama</label>
                <input
                    type="text"
                    name="nama"
                    className="w-full border rounded px-3 py-2"
                    value={form.nama}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block font-semibold">Bio</label>
                <textarea
                    name="bio"
                    className="w-full border rounded px-3 py-2"
                    value={form.bio}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block font-semibold">Kontak</label>
                <input
                    type="text"
                    name="kontak"
                    className="w-full border rounded px-3 py-2"
                    value={form.kontak}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label className="block font-semibold">Foto (opsional)</label>
                {ustadz.foto && (
                    <div className="mb-2">
                        <p className="text-sm text-gray-600 mb-1">Foto saat ini:</p>
                        <Image
                            src={`${process.env.NEXT_PUBLIC_API_BASE}/${ustadz.foto}`}
                            alt={ustadz.nama}
                            width={228}
                            height={128}
                            className="object-cover rounded border"
                        />
                    </div>
                )}
                {previewFoto && (
                    <div className="mb-2">
                        <p className="text-sm text-gray-600 mb-1">Preview Foto:</p>
                        <Image
                            src={previewFoto}
                            alt="Preview"
                            width={228}
                            height={128}
                            className="object-cover rounded border"
                        />
                    </div>
                )}
                <input
                    type="file"
                    name="foto"
                    accept="image/*"
                    className="w-full"
                    onChange={handleChange}
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
                {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
        </form>
    );
}
