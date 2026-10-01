import { dinhDangGia } from "../utils/dinhDangGia";

export default function MonAnCard({ mon, dangChon, onChon, onDat }) {
  function xuLyBamThe() {
    onChon(mon.id);
  }

  function xuLyBamDatMon(e) {
    e.stopPropagation();
    onDat(mon.id);
  }

  return (
    <article
      className={`mon-card ${dangChon ? "dang-chon" : ""}`}
      onClick={xuLyBamThe}
    >
      <h3>{mon.ten}</h3>
      <p className="mon-card__mo-ta">{mon.moTa}</p>
      <p className="mon-card__gia">{dinhDangGia(mon.gia)}</p>

      {mon.daHet && <span className="het-mon">Hết món</span>}

      <button
        type="button"
        className="mon-card__nut"
        disabled={mon.daHet}
        onClick={xuLyBamDatMon}
      >
        Đặt món
      </button>
    </article>
  );
}
