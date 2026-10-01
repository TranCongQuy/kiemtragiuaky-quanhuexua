export default function Khung({ tieuDe, hanhDong, children }) {
  return (
    <section className="khung">
      <div className="khung__dau">
        <h2>{tieuDe}</h2>
        {hanhDong && <div className="khung__hanh-dong">{hanhDong}</div>}
      </div>
      <div className="khung__than">{children}</div>
    </section>
  );
}
