import homeIcon from "../../assets/icons/home.png";
import chartIcon from "../../assets/icons/chart.png";
import folderIcon from "../../assets/icons/folder.png";
import settingsIcon from "../../assets/icons/settings.png";
import bellIcon from "../../assets/icons/bell.png";


const SideBar =() => {
    
    return (
        <aside className="side-left">
        <div className="side-left__logo-wrap">
          <div className="side-left__logo">A</div>
        </div>
        <nav className="side-left__menu">
          <button className="icon-btn active">
            <img src={homeIcon} alt="home" className="icon-btn__icon" />
          </button>
          <button className="icon-btn">
            <img src={chartIcon} alt="chart" className="icon-btn__icon" />
          </button>
          <button className="icon-btn">
            <img src={folderIcon} alt="folder" className="icon-btn__icon" />
          </button>
          <button className="icon-btn">
            <img src={settingsIcon} alt="settings" className="icon-btn__icon" />
          </button>
        </nav>
        <div className="side-left__bottom">
          <button className="fab-btn">＋</button>
          <button className="icon-btn">
            <img src={bellIcon} alt="bell" className="icon-btn__icon" />
          </button>
          <button className="user-avatar">
            <span>JS</span>
          </button>
        </div>
      </aside>
    );
}

export default SideBar;