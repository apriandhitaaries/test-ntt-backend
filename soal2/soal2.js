function printSquare(n) {
  // Cek nilai n
  if (n <= 2) {
    console.log("square = Nilai terlalu kecil");
    return;
  } else if (n >= 10) {
    console.log("square = Nilai terlalu besar");
    return;
  } else {
    console.log("square =");
    let finalRow = ""; // Penampung untuk baris ekstra di paling bawah

    // Loop untuk mencetak setiap baris dari 1 hingga n
    for (let row = 1; row <= n; row++) {
      let currentRow = "";

      // Cek posisi baris untuk menentukan karakter yang digunakan
      if (row === 1 || row === n) {
        // Tepi Atas dan Tepi Bawah pakai '='
        for (let i = 0; i < n; i++) {
          currentRow += "=";
        }
      } else {
        // Tepi Tengah pakai '|' dan Spasi
        currentRow += "|";
        for (let i = 0; i < n - 2; i++) {
          currentRow += " ";
        }
        currentRow += "|";
      }

      // Cetak baris saat ini
      console.log(currentRow);

      // Simpan ke variabel gabungan
      finalRow += currentRow;
    }

    // Cetak baris ekstra gabungan di paling akhir
    console.log(finalRow);
  }
}

console.log("--- Test n = 5 ---");
printSquare(5);

console.log("\n--- Test n = 2 ---");
printSquare(2);

console.log("\n--- Test n = 10 ---");
printSquare(10);
