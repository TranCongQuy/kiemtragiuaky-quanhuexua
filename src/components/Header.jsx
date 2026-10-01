export default function Header({ tongPhan }) {
  const tenQuan = import.meta.env.VITE_TEN_QUAN || "Quán Huế Xưa";

  return (
    <header className="header">
      <h1>{tenQuan}</h1>
      <p className="header__gio">
        Giỏ: <span data-testid="tong-phan">{tongPhan}</span> phần
      </p>
    </header>
  );
}
