import { useState, useEffect } from "react";
import Header from "./components/Header";
import DanhSachMon from "./components/DanhSachMon";
import GioHang from "./components/GioHang";
import Khung from "./components/Khung";
import FormDatMon from "./components/FormDatMon";
import { DS_MON } from "./data/monAn";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [gio, setGio] = useLocalStorage("gio-hang", []);
  const [idDangChon, setIdDangChon] = useState(null);

  // C4.3: Thông báo thành công
  const [thongBao, setThongBao] = useState("");

  // C4.3: Key để reset form — đổi key → React dựng lại form mới
  const [formKey, setFormKey] = useState(0);

  function datMon(id) {
    setGio((truoc) => {
      const daCo = truoc.find((dong) => dong.id === id);
      if (daCo) {
        return truoc.map((dong) =>
          dong.id === id ? { ...dong, soLuong: dong.soLuong + 1 } : dong,
        );
      }
      return [...truoc, { id, soLuong: 1 }];
    });
  }

  function chonMon(id) {
    setIdDangChon(id);
  }

  function xoaGio() {
    setGio([]);
  }

  // C4.3: Xử lý gửi đơn
  function guiDon(thongTin) {
    setThongBao(`Đã nhận đơn của ${thongTin.hoTen}`);
    setGio([]); // Làm rỗng giỏ
    setFormKey((k) => k + 1); // Đổi key → reset form
    setTimeout(() => setThongBao(""), 4000);
  }

  const tongPhan = gio.reduce((sum, dong) => sum + dong.soLuong, 0);

  // C3.2: Đổi document.title
  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";
  useEffect(() => {
    document.title = tongPhan > 0 ? `(${tongPhan}) ${tenQuan}` : tenQuan;
  }, [tongPhan, tenQuan]);

  return (
    <div className="app">
      <Header tongPhan={tongPhan} />

      <main className="app__than">
        <Khung tieuDe="Thực đơn">
          <DanhSachMon
            dsMon={DS_MON}
            idDangChon={idDangChon}
            onChon={chonMon}
            onDat={datMon}
          />
        </Khung>

        {/* C4.2: Truyền nút "Xóa giỏ hàng" vào prop hanhDong */}
        <Khung
          tieuDe="Giỏ hàng"
          hanhDong={
            <button type="button" onClick={xoaGio}>
              Xóa giỏ hàng
            </button>
          }
        >
          <GioHang gio={gio} dsMon={DS_MON} />
        </Khung>

        <Khung tieuDe="Thông tin nhận món">
          {/* C4.3: Thông báo thành công */}
          {thongBao && (
            <p role="status" className="thong-bao-thanh-cong">
              {thongBao}
            </p>
          )}
          {/* C4.3: key={formKey} → reset form khi key đổi */}
          <FormDatMon
            key={formKey}
            onGui={guiDon}
            choPhepGui={gio.length > 0}
          />
        </Khung>
      </main>
    </div>
  );
}
