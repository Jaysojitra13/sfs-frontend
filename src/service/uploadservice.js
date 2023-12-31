import http from "../service/http-common";

// const UploadFilesService = () => {
//   upload(file, onUploadProgress) {
//     let formData = new FormData();

//     formData.append("file", file);

//     return http.post("/upload", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//       onUploadProgress,
//     });
//   }

//   getFiles() {
//     return http.get("/files");
//   }
// }

function upload(file, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    return http.post("/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    });
}

function getFiles() {
    return http.get("/files");
}


export const uploadService = {
    upload,
    getFiles
};