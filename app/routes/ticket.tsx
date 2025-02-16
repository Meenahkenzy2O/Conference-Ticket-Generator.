import logo from "../../public/logo.svg"
import "../figma.css"
import arrow from "../../public/arrow.svg"

const Ticket = () => {
    return (
        <section className="container">
            <header>
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <ul className="nav-links">
                    <li className="nav-links4"   >
                        <a href="#">Events</a>
                    </li>
                    <li className="nav-links2"  >
                        <a href="#">My Ticket</a>
                    </li >
                        <li className="nav-links3" >
                        <a href="#">About project</a>
                    </li>
                </ul>
                <div>
                    <button className="nav-links1">
                    <img src={arrow} alt="arrow" />
                        My Tickets
                    </button>
                </div>
            </header>
        <section className="conferenceform">
                <button className="nav-links1">
                <img src={logo} alt="logo" />
                My Tickets
                </button>
            
        </section>
        </section>

    )
}
export default Ticket