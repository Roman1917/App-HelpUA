interface IHeader {
  count: string;
}
const Header = (props: IHeader) => {
  const { count } = props;
  return (
    <>
      <header className="App-header">
        <div className="Header-Naming">
          <h1>Допомога.UA</h1>
          <h4> ПАРТНЕРИ | ПІДТРИМКА</h4>
        </div>
        <div>
          <h4>{count?.length > 0 ? `${count.length} запити` : "0 запитів"} </h4>
        </div>
      </header>
      <div className="Yellow-Line">.</div>
    </>
  );
};

export default Header;
