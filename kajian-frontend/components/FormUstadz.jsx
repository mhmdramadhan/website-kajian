'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

export default function FormTambahUstadz({ token }) {
    const router = useRouter();
    const [previewFoto, setPreviewFoto] = useState(null);
    const [form, setForm] = useState({
        nama: '',
        bio: '',
        kontak: '',
        foto: null,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!form.nama) return 'Nama tidak boleh kosong';
        if (!form.bio) return 'Bio tidak boleh kosong';
        if (!form.kontak) return 'Kontak tidak boleh kosong';
        if (form.kontak && !/^\d+$/.test(form.kontak)) return 'Kontak hanya boleh angka';
        if (form.foto && !form.foto.type.startsWith('image/')) return 'File harus berupa gambar';
        if (form.foto && form.foto.size > 2 * 1024 * 1024) return 'Ukuran file terlalu besar, maksimal 2MB';
        return null;
    };

    const handleError = (error) => {
        const message = error?.message || 'Terjadi kesalahan';
        setError(message);
        setLoading(false);
        toast.error(message, {
            style: { background: '#ed5249' },
            cancel: { label: 'Tutup' },
        });
    };

    const handleSuccess = (message) => {
        setLoading(false);
        setError(null);
        toast.success(message);
    };

    const handleLoading = (loading) => {
        setLoading(loading);
        setError(null);
    };

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

        // validasi
        const validationError = validateForm();
        if (validationError) {
            handleError(new Error(validationError));
            return;
        }

        const formData = new FormData();

        formData.append('nama', form.nama);
        formData.append('bio', form.bio);
        formData.append('kontak', form.kontak);
        if (form.foto) {
            formData.append('foto', form.foto);
        }

        try {
            handleLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/ustadz`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                handleSuccess('Ustadz berhasil ditambahkan!');
                handleLoading(false);
                setForm({
                    nama: '',
                    bio: '',
                    kontak: '',
                    foto: null,
                });
                router.push('/admin/ustadz');
            } else {
                handleError(new Error(data.message || 'Gagal menambahkan ustadz'));
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
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
                    <label className="block font-semibold">Foto</label>
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
                    className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
            </form>
        </>
    );
}
