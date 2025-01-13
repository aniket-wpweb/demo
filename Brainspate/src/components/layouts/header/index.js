import Nav from "./nav"

const Header = ( data ) => {
  return (
    <header className="sticky-top">
        <Nav data={data} />
    </header>
  )
}

export default Header