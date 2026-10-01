import { useState, useEffect } from "react";
import Header from "./components/Header";
import DanhSachMon from "./components/DanhSachMon";
import GioHang from "./components/GioHang";
import Khung from "./components/Khung";
import FormDatMon from "./components/FormDatMon";
import { DS_MON } from "./data/monAn";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  // C3.3: Đổi useState → useLocalStorage, key "gio-hang"
  const [gio, setGio] = useLocalStorage("gio-hang", []);

  const [idDangChon, setIdDangChon] = useState(null);

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

  function guiDon(thongTin) {
    console.log("Gui don:", { thongTin, gio });
    setGio([]);
  }

  const tongPhan = gio.reduce((sum, dong) => sum + dong.soLuong, 0);

  // C3.2: useEffect đổi document.title theo số phần
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
          <FormDatMon onGui={guiDon} choPhepGui={gio.length > 0} />
        </Khung>
      </main>
    </div>
  );
}
