'use client'

import AnimationWrapper from "@/components/ui/AnimationWrapper";
import { config } from "@/config";
import { useState } from "react";
import { toast } from "react-toastify";

const Page = () => {
    const [banner, setBanner] = useState("");
    const [loading, setLoading] = useState(false);
    console.log(loading);

    const handleBannerUpload = async (value: any) => {
        setLoading(true);
        const loadingToast = toast.loading("🚀Uploading...");
        const formData = new FormData();
        const maxSizeInBytes = 2 * 1024 * 1024;

        if (value?.size && value?.size > maxSizeInBytes) {
            setLoading(false);
            toast.dismiss(loadingToast)
            return toast.error("Your image size was more than 2 Megabyte!", { toastId: 1 });
        }

        formData.append("image", value);
        if (formData && value) {
            const url = `https://api.imgbb.com/1/upload?key=${config?.imgToken}`
            fetch(url, {
                method: "POST",
                body: formData,
            })
                .then((res) => res.json())
                .then(async (imgData: any) => {
                    if (imgData?.success) {
                        setLoading(false);
                        setBanner(imgData?.data?.url)
                        toast.dismiss(loadingToast)
                        toast.success("Banner image upload Successful ✅")
                        console.log(imgData);
                    }
                    toast.dismiss(loadingToast);
                    setLoading(false);
                }).catch((err) => {
                    toast.error("Photo upload Unsuccessful!");
                    setLoading(false);
                    toast.dismiss(loadingToast)
                    console.log(err);
                })
        } else {
            setLoading(false);
            toast.dismiss(loadingToast)
        }
    };

    const handleTitleKeyDown = (e: any) => {
        console.log(e);
        if (e.keyCode = 13) {
            e.preventDefault();
        }
    }
    console.log(banner);
    const handleTitleChange = (e: any) => {
        let input = e.target;
        input.style.height = 'auto';
        input.style.height = input.scrollHeight + "px";
    };

    return (
        <AnimationWrapper>
            <section>
                <div className="mx-auto max-w-[900px] w-full">
                    <div className="relative aspect-video cursor-pointer hover:opacity-80 bg-white border-4 border-grey">
                        <label htmlFor="uploadBanner" className="cursor-pointer">
                            <img
                                src={banner ? banner : "/blog banner.png"}
                                className="z-20"
                                alt="banner"
                            />
                            <input
                                id="uploadBanner"
                                type="file"
                                accept=".png, .jpg, .jpeg"
                                hidden
                                disabled={loading}
                                onChange={(e) => handleBannerUpload(e.target.files && e.target.files[0])}
                            />
                        </label>
                    </div>


                    <textarea
                        placeholder="Blog Title"
                        className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40"
                        // onKeyDown={handleTitleKeyDown}
                        onChange={handleTitleChange}
                    ></textarea>

                </div>
            </section>
        </AnimationWrapper>
    );
};

export default Page;