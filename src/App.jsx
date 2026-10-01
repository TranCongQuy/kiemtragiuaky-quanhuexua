import { useState } from "react";
import Header from "./components/Header";
import DanhSachMon from "./components/DanhSachMon";
import GioHang from "./components/GioHang";
import Khung from "./components/Khung";
import { DS_MON } from "./data/monAn";

export default function App() {
  // C2.2: State giỏ hàng — mảng { id, soLuong }
  const [gio, setGio] = useState([]);

  // C2.4: State thẻ đang chọn
  const [idDangChon, setIdDangChon] = useState(null);

  // C2.2: Thêm món vào giỏ — chưa có thì thêm mới, có rồi thì tăng số lượng
  function datMon(id) {
    setGio((truoc) => {
      const daCo = truoc.find((dong) => dong.id === id);
      if (daCo) {
        // Đã có → tăng số lượng, KHÔNG thêm dòng mới
        return truoc.map((dong) =>
          dong.id === id ? { ...dong, soLuong: dong.soLuong + 1 } : dong,
        );
      }
      // Chưa có → thêm dòng mới với soLuong = 1
      return [...truoc, { id, soLuong: 1 }];
    });
  }

  // C2.4: Chọn thẻ món
  function chonMon(id) {
    setIdDangChon(id);
  }

  // C2.3: Derived state — tính tổng phần từ gio, KHÔNG tạo state riêng
  const tongPhan = gio.reduce((sum, dong) => sum + dong.soLuong, 0);

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

        <Khung tieuDe="Giỏ hàng">
          <GioHang gio={gio} dsMon={DS_MON} />
        </Khung>
      </main>
    </div>
  );
}
