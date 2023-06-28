function Header() {
  return (
    <>
      <header className="header">
        <div className="container">
          <a href="/">
            <img
              className="headerimg"
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png"
            ></img>
          </a>
          <ul className="menu flex">
            <li><a href="/">Home</a></li>
            <li><a href="/Quiz">Quiz</a></li>
          </ul>
        </div>
      </header>
    </>
  );
}

export default Header;
