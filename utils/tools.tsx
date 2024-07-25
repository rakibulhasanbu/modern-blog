import Header from "@editorjs/header";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import InlineCode from "@editorjs/inline-code";
import Underline from "@editorjs/underline";
import Quote from "@editorjs/quote";
import Embed from "@editorjs/embed";
import Marker from "@editorjs/marker";

// const uploadImageByURL = async (e: any) => {
//   const link = new Promise((resolve, reject) => {
//     try {
//       resolve(e);
//     } catch (error) {
//       reject(error);
//     }
//   });

//   return link.then((url) => {
//     return {
//       success: 1,
//       file: { url },
//     };
//   });
// };

// const uploadImageByFile = async (e: any) => {
//   const link = new Promise((resolve, reject) => {
//     try {
//       resolve(e);
//     } catch (error) {
//       reject(error);
//     }
//   });

//   return link.then((url) => {
//     return {
//       success: 1,
//       file: { url },
//     };
//   });
// };

const uploadImageByURL = async (url: string) => {
  return new Promise<{ success: number; file: { url: string } }>(
    (resolve, reject) => {
      if (url) {
        resolve({
          success: 1,
          file: { url },
        });
      } else {
        reject(new Error("URL not provided"));
      }
    }
  );
};

const uploadImageByFile = async (file: File) => {
  return new Promise<{ success: number; file: { url: string } }>(
    (resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          resolve({
            success: 1,
            file: { url: reader.result as string },
          });
        } else {
          reject(new Error("File reading failed"));
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    }
  );
};

export const tools = {
  embed: {
    class: Embed,
    config: {
      services: {
        youtube: true,
        codepen: true,
      },
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByURL,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultLevel: 3,
    },
  },
  Marker: {
    class: Marker,
  },
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  underline: {
    class: Underline,
  },
  inlineCode: {
    class: InlineCode,
  },
};
