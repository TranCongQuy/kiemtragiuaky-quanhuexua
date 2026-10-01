import { useRef, useEffect, useState } from "react";

// Hàm kiểm tra — đề cho sẵn
function kiemTra(hoTen, soDienThoai) {
  const loi = {};
  if (hoTen.trim().length < 2) {
    loi.hoTen = "Họ tên cần ít nhất 2 ký tự";
  }
  if (!/^0\d{9}$/.test(soDienThoai.trim())) {
    loi.soDienThoai = "Số điện thoại gồm 10 chữ số, bắt đầu bằng 0";
  }
  return loi;
}

export default function FormDatMon({ onGui, choPhepGui }) {
  const [hoTen, setHoTen] = useState("");
  const [soDienThoai, setSoDienThoai] = useState("");
  const [ghiChu, setGhiChu] = useState("");
  const [daCham, setDaCham] = useState({}); // C4.1: onBlur đánh dấu đã chạm

  const oHoTenRef = useRef(null);

  // C3.4: focus ô Họ tên khi form mount
  useEffect(() => {
    oHoTenRef.current?.focus();
  }, []);

  // C4.1: Lỗi là derived state
  const loi = kiemTra(hoTen, soDienThoai);

  function loiHienThi(truong) {
    return daCham[truong] ? loi[truong] : undefined;
  }

  function xuLyRoiO(e) {
    const { name } = e.target;
    setDaCham((truoc) => ({ ...truoc, [name]: true }));
  }

  function xuLyGui(e) {
    e.preventDefault();

    // C4.1: Đánh dấu tất cả đã chạm để hiện hết lỗi
    setDaCham({ hoTen: true, soDienThoai: true });

    // C4.1: Nếu còn lỗi → KHÔNG gọi onGui
    if (Object.keys(kiemTra(hoTen, soDienThoai)).length > 0) return;

    // C4.1: Gọi onGui với giá trị đã trim
    onGui({
      hoTen: hoTen.trim(),
      soDienThoai: soDienThoai.trim(),
      ghiChu: ghiChu.trim(),
    });
  }

  return (
    <form className="form-dat-mon" onSubmit={xuLyGui} noValidate>
      <div className="form-dat-mon__truong">
        <label htmlFor="hoTen">Họ tên</label>
        <input
          id="hoTen"
          name="hoTen"
          ref={oHoTenRef}
          type="text"
          value={hoTen}
          onChange={(e) => setHoTen(e.target.value)}
          onBlur={xuLyRoiO}
          aria-invalid={loiHienThi("hoTen") ? true : undefined}
        />
        {loiHienThi("hoTen") && (
          <p className="loi" role="alert">
            {loiHienThi("hoTen")}
          </p>
        )}
      </div>

      <div className="form-dat-mon__truong">
        <label htmlFor="soDienThoai">Số điện thoại</label>
        <input
          id="soDienThoai"
          name="soDienThoai"
          type="tel"
          value={soDienThoai}
          onChange={(e) => setSoDienThoai(e.target.value)}
          onBlur={xuLyRoiO}
          aria-invalid={loiHienThi("soDienThoai") ? true : undefined}
        />
        {loiHienThi("soDienThoai") && (
          <p className="loi" role="alert">
            {loiHienThi("soDienThoai")}
          </p>
        )}
      </div>

      <div className="form-dat-mon__truong">
        <label htmlFor="ghiChu">Ghi chú</label>
        <textarea
          id="ghiChu"
          name="ghiChu"
          rows={2}
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
        />
      </div>

      <button type="submit" disabled={!choPhepGui}>
        Gửi đơn
      </button>
    </form>
  );
}
