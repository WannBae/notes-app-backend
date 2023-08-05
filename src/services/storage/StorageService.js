const fs = require("fs");

class StorageService {
  constructor(folder) {
    this._folder = folder;
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }
  writeFile(file, meta) {
    //menerima nilai dari nama berkas yang dituliskan
    //nilai diambil dari meta.filename yang dikombinasikan
    //dengan timestamp. nilai tersebut memberikan nama yang
    //unik

    const filename = +new Date() + meta.filename;

    //path atau alamat lengkap dari berkas yang akan dituliskan. Nilainya diambil dari basis folder yang digunakan (this._folder) dan nama berkas (filename).
    const path = `${this._folder}/${filename}`;

    const fileStream = fs.createWriteStream(path);

    return new Promise((resolve, reject) => {
      fileStream.on("error", (error) => reject(error));
      file.pipe(fileStream);
      file.on("end", () => resolve(filename));
    });
  }
}

module.exports = StorageService;
