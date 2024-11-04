import { useState } from "react";
import HeaderProfile from "../components/header";
import TemplateImagePicker from "./components/image-upload";
import ImageUpload from "./components/image-upload";
import SaveAndPreview from "./components/save-continue";
import ThemeColorPicker from "./components/theme-color-picker";

const SystemConfigPage = () => {
    const [image, setImage] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setImage(URL.createObjectURL(file));
      }
    };
    const upd = <>
        <label className="mb-2 text-sm text-gray-700">Upload</label>
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border border-gray-300 p-2 rounded-lg"
        />
    </>
    return (
        <div className="container mx-auto p-8 max-w-6xl bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-8 text-center">System Configuration</h1>

            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Theme Color</h2>
                <ThemeColorPicker />
            </section>

            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Template Banner</h2>
                <TemplateImagePicker />
            </section>

            <section className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Shop Banner</h2>
                <HeaderProfile showOther={upd} url={image}/>
            </section>

            <SaveAndPreview />
        </div>
    );
};

export default SystemConfigPage;
