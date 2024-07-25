import { config } from "@/config";
import { toast } from "react-toastify";

type TUploadImage = {
  setLoading: (loading: boolean) => void;
  e: any;
};

type UploadImageResult = {
  url: string | undefined;
};

export const uploadImage = async ({
  setLoading,
  e,
}: TUploadImage): Promise<UploadImageResult> => {
  const file = e.target.files && e.target.files[0];
  if (!file) {
    toast.error("Please select image and try again!", {
      toastId: 1,
    });
    return { url: undefined };
  }
  setLoading(true);
  const loadingToast = toast.loading("Uploading...🚀");
  const formData = new FormData();
  const maxSizeInBytes = 2 * 1024 * 1024;

  if (file?.size && file?.size > maxSizeInBytes) {
    setLoading(false);
    toast.dismiss(loadingToast);
    toast.error("Your image size was more than 2 Megabyte!", {
      toastId: 1,
    });
    return { url: undefined };
  }

  formData.append("image", file);
  if (formData && file) {
    const url = `https://api.imgbb.com/1/upload?key=${config?.imgToken}`;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const imgData = await response.json();
      if (imgData?.success) {
        setLoading(false);
        toast.dismiss(loadingToast);
        toast.success("Image upload Successful ✅");
        // console.log(imgData);
        return { url: imgData?.data?.url };
      }
      toast.dismiss(loadingToast);
      setLoading(false);
      return { url: undefined };
    } catch (err) {
      toast.error("Image upload Unsuccessful!");
      setLoading(false);
      toast.dismiss(loadingToast);
      //   console.log(err);
      return { url: undefined };
    }
  } else {
    setLoading(false);
    toast.dismiss(loadingToast);
    return { url: undefined };
  }
};
