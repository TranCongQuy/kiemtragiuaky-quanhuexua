import MonAnCard from "./MonAnCard";

export default function DanhSachMon({ dsMon, idDangChon, onChon, onDat }) {
  return (
    <div className="danh-sach-mon">
      {dsMon.map((mon) => (
        <MonAnCard
          key={mon.id}
          mon={mon}
          dangChon={mon.id === idDangChon}
          onChon={onChon}
          onDat={onDat}
        />
      ))}
    </div>
  );
}
