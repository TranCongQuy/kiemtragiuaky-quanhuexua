import { useRef, useEffect, useState } from "react";

export default function FormDatMon({ onGui, choPhepGui }) {
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [ghiChu, setGhiChu] = useState("");

  const oHoTenRef = useRef(null);

  (useEffect(() => {
    oHoTenRef.current.focus();
  }),
    []);

  function xuLyGui(e) {
    e.preventDefault();
    if (!choPhepGui) return;
    onGui({
      hoTen: hoTen.trim(),
      soDienThoai: soDienThoai.trim(),
      ghiChu: ghiChu.trim(),
    });
    setHoTen("");
    setSoDienThoai("");
    setGhiChu("");
  }

  return (
    <form className="form-dat-mon" onSubmit={xuLyGui} noValidate>
      <label>
        Họ tên
        <input
          ref={oHoTenRef}
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
        />
      </label>
      <label>
        Số điện thoại
        <input
          type="tel"
          value={soDienThoai}
          onChange={(e) => setSoDienThoai(e.target.value)}
        />
      </label>
      <label>
        Ghi chú
        <textarea
          rows="2"
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
        />
      </label>
      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  );
}
