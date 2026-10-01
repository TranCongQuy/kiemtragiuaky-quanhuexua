export function dinhDangGia(soTien) {
  if (typeof soTien !== "number" || Number.isNaN(soTien)) return "0 đ";
  return soTien.toLocaleString("vi-VN") + " đ";
}
