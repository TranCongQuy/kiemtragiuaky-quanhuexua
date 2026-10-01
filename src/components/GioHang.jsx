import { useMemo } from "react";
import { dinhDangGia } from "../utils/dinhDangGia";

export default function GioHang({ gio, dsMon }) {
  const tongTien = useMemo(() => {
    return gio.reduce((sum, dong) => {
      const mon = dsMon.find((m) => m.id === dong.id);
      if (!mon) return sum;
      return sum + mon.gia * dong.soLuong;
    }, 0);
  }, [gio, dsMon]);

  if (gio.length === 0) {
    return (
      <div data-testid="gio-hang" className="gio-hang gio-hang--rong">
        <p>Giỏ hàng trống</p>
      </div>
    );
  }

  return (
    <div data-testid="gio-hang" className="gio-hang">
      <ul className="gio-hang__ds">
        {gio.map((dong) => {
          const mon = dsMon.find((m) => m.id === dong.id);
          if (!mon) return null;
          const thanhTien = mon.gia * dong.soLuong;
          return (
            <li key={dong.id} className="gio-hang__dong">
              {mon.ten} × {dong.soLuong} — {dinhDangGia(thanhTien)}
            </li>
          );
        })}
      </ul>

      <p className="gio-hang__tong">
        Tổng tiền:{" "}
        <strong data-testid="tong-tien">{dinhDangGia(tongTien)}</strong>
      </p>
    </div>
  );
}
