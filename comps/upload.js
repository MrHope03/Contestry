import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";

export default function Upload({ user, setIsUpload, uploadRef, url }) {
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState([]);
    const [imageUrl, setImageUrl] = useState();
    const router = useRouter();
    useEffect(() => {
        if (image.length == 0) return;
        console.log("Hello");
        setImageUrl(URL.createObjectURL(image[0]));
        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [image]);

    const uploadPost = async (formData) => {
        const config = {
            headers: { "content-type": "multipart/form-data" },
            onUploadProgress: (event) => {
                console.log(
                    `Current progress:`,
                    Math.round((event.loaded * 100) / event.total)
                );
            },
        };

        const response = await axios.post(
            "/api/posts/upload",
            formData,
            config
        );
        console.log("response", response.data);
        router.push(url);
        setIsUpload(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("username", user);
        formData.append("caption", caption);
        formData.append("imageFile", image[0]);
        formData.append("image", "/media/uploads/" + image[0].name);
        const img = document.querySelector("#img");
        console.log(img.naturalHeight, img.naturalWidth);
        if (img.naturalHeight == img.naturalWidth) {
            formData.append("aspect", "square");
        } else if (img.naturalWidth < img.naturalHeight) {
            formData.append("aspect", "potrait");
        } else {
            formData.append("aspect", "landscape");
        }
        formData.append("uploadDate", Date.now());
        uploadPost(formData);
    };

    return (
        <div
            className="container max-w-[50vw] rounded-md shadow-[0_0_10px_10px_rgba(0,0,0,0.5)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-slate-50 backdrop-blur-2xl backdrop-grayscale backdrop-invert"
            ref={uploadRef}
        >
            <h1 className="pt-5 text-4xl font-semibold text-center text-gray-800">
                Upload Your pic
            </h1>
            <div className="relative w-full p-2 mx-auto">
                {image.length > 0 && imageUrl && (
                    <Image
                        id="img"
                        src={imageUrl}
                        layout="responsive"
                        width={16}
                        height={9}
                        objectFit="contain"
                    />
                )}
            </div>
            <form className="flex flex-col items-center p-2 justify-evenly">
                <input
                    className="w-1/2 p-2 my-3 text-center text-gray-500 rounded-lg ring-1 ring-black"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files)}
                ></input>
                <textarea
                    className="w-1/2 py-1 my-3 text-center rounded-lg ring-2 focus:outline-none placeholder:text-gray-700 ring-blue-400 focus:ring-blue-700"
                    type="text"
                    placeholder="caption"
                    onChange={(e) => setCaption(e.target.value)}
                ></textarea>
                <button
                    className="p-2 px-10 mt-3 text-gray-100 bg-blue-400 rounded-3xl hover:bg-blue-500 hover:text-white"
                    onClick={handleSubmit}
                >
                    Enter
                </button>
            </form>
        </div>
    );
}
