import { Plus, Upload } from 'lucide-react'
import { FormEvent, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import toast from 'react-hot-toast';

interface Promo {
    name: string;
    desctiption: string;
    background: string;
}

export const AddPromoForm = ({ isOpen, fetchPromos }) => {
    const [newPromo, setNewPromo] = useState<Promo>({
        name: "",
        desctiption: "",
        background: ""
    })
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>("");

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `menu-items/${fileName}`;

        try {
            const { error: uploadError } = await supabase.storage
                .from("menu-images")
                .upload(filePath, file);

            if (uploadError) {
                console.log(uploadError);
                throw uploadError;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from("menu-images").getPublicUrl(filePath);

            return publicUrl;
        } catch (error: any) {
            if (error.error == "Bucket not found") {
                // await createBucket();
            }
            console.error("Error uploading image:", error);
            throw error;
        } finally {
            console.error("Error uploading finally");
        }
    };

    const handleAddCategory = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        try {
            let imageUrl = "";
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
            }

            const { error } = await supabase.from("menu_items").insert([
                {
                    ...newPromo,
                    background: imageUrl,
                },
            ]);

            if (error) {
                throw error;
            }

            toast.success("Menu item added successfully");
            setNewPromo({
                name: "",
                desctiption: "",
                background: "",
            });
            setImageFile(null);
            setImagePreview("");
            fetchPromos();
        } catch (error) {
            toast.error("Error adding menu item");
            console.error("Error:", error);
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        isOpen && <form
            onSubmit={handleAddCategory}
            className="mb-6 bg-gray-800 p-4 rounded-lg flex flex-col gap-2 justify-between h-full"
        >
            <div className="flex flex-col gap-4 mb-1 flex-1">
                <input
                    type="text"
                    placeholder="Promo Name"
                    value={newPromo.name}
                    onChange={(e) =>
                        setNewPromo({ ...newPromo, name: e.target.value })
                    }
                    className="flex-1 bg-gray-700 rounded px-3 py-2"
                    required
                />
                <textarea
                    placeholder="Description"
                    value={newPromo.desctiption}
                    onChange={(e) =>
                        setNewPromo({ ...newPromo, desctiption: e.target.value })
                    }
                    className="flex-1 bg-gray-700 rounded px-3 py-2"
                    required
                />
            </div>
            <div className="relative">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                    required
                />
                <label
                    htmlFor="image-upload"
                    className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
                >
                    <Upload className="w-4 h-4" />
                    {imageFile ? 'Change Image' : 'Upload Image'}
                </label>
                {imagePreview && (
                    <div className="mt-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="w-20 h-20 object-cover rounded"
                        />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 mx-auto mt-4 sm:mt-0 sm:ml-auto sm:mr-0"
            >
                <Plus className="w-4 h-4" /> Add
            </button>
        </form>
    )
}
