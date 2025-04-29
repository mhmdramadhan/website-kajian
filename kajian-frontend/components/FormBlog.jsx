'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

export default function FormBlog({ token, ustadzList, session }) {
    const router = useRouter();
    const [previewFoto, setPreviewFoto] = useState(null);
    const [form, setForm] = useState({
        judul: '',
        isi: '',
        ustadzId: '',
        banner: null,
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        if (!form.judul) return 'Judul tidak boleh kosong';
        if (!form.ustadzId) return 'ustadz tidak boleh kosong';
        if (form.isi && !/^\d+$/.test(form.ustadzId)) return 'Materti hanya boleh angka';
        if (form.banner && !form.banner.type.startsWith('image/')) return 'File harus berupa gambar';
        if (form.banner && form.banner.size > 2 * 1024 * 1024) return 'Ukuran file terlalu besar, maksimal 2MB';
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

    const isValidURL = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
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

        formData.append('judul', form.judul);
        formData.append('isi', form.isi);
        formData.append('ustadzId', form.ustadzId);

        if (form.banner) {
            formData.append('banner', form.banner);
        }

        console.log('Form Data:', formData);

        try {
            handleLoading(true);
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/api/blog`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();

            if (res.ok) {
                handleSuccess('Blog berhasil ditambahkan!');
                handleLoading(false);
                router.push('/admin/blog');
            } else {
                handleError(new Error(data.message || 'Gagal menambahkan blog'));
            }
        } catch (error) {
            handleError(error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Judul</label>
                    <input
                        type="text"
                        name="judul"
                        className="w-full border rounded px-3 py-2"
                        value={form.judul}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-semibold">Ustadz</label>
                    <select
                        name="ustadzId"
                        className="w-full border rounded px-3 py-2"
                        value={form.ustadzId}
                        onChange={handleChange}
                    >
                        <option value="">Pilih Ustadz</option>
                        {/* Assuming you have a list of ustadz from props or state */}
                        {session.user.role === 'admin' && (
                            ustadzList.data.map((ustadz) => (
                                <option key={ustadz.id} value={ustadz.id}>
                                    {ustadz.nama}
                                </option>
                            )
                            ))}
                        {session.user.role === 'ustadz' && (
                            ustadzList.data.map((ustadz) => (
                                ustadz.id === session.user.ustadzId && (
                                    <option key={ustadz.id} value={ustadz.id}>
                                        {ustadz.nama}
                                    </option>
                                )
                            ))
                        )}

                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Isi</label>
                    <textarea
                        name="isi"
                        className="w-full border rounded px-3 py-2"
                        value={form.isi}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block font-semibold">Banner</label>
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
                        name="banner"
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
