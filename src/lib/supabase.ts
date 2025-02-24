import { createClient } from '@supabase/supabase-js';

interface SupabaseUploadAndDelete {
    bucketName: string;
}

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const useSupabaseStorage = ({ bucketName }: SupabaseUploadAndDelete) => {

    const uploadFile = async (file: File, setIsUploading: any): Promise<string> => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `menu-items/${fileName}`; // Allows specifying a subfolder

        setIsUploading(true)
        try {
            const { error: uploadError } = await supabase.storage
                .from(bucketName)
                .upload(filePath, file);

            if (uploadError) {
                console.error("Error uploading image:", uploadError);
                throw uploadError;
            }

            const {
                data: { publicUrl },
            } = supabase.storage.from(bucketName).getPublicUrl(filePath);

            return publicUrl;
        } catch (error: any) {
            console.error("Error uploading file:", error);
            throw error;
        }
        finally {
            setIsUploading(false)
        }
    };

    const deleteFile = async (fileUrl: string): Promise<void> => {
        try {
            // Extract the file path from the URL.  This is a bit fragile, but works with standard Supabase URLs.
            // A more robust approach might involve storing the path separately.
            const filePathStartIndex = fileUrl.indexOf(`${bucketName}/`) + `${bucketName}/`.length;
            const filePath = fileUrl.substring(filePathStartIndex);

            const { error: deleteError } = await supabase.storage
                .from(bucketName)
                .remove([filePath]); // Supabase expects an array of paths

            if (deleteError) {
                console.error("Error deleting file:", deleteError);
                throw deleteError;
            }
        } catch (error: any) {
            console.error("Error deleting file:", error);
            throw error;
        }
    };

    return { uploadFile, deleteFile };
};

export { supabase, useSupabaseStorage };