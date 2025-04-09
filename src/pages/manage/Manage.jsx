import "./Manage.css";
import { NavLink } from "react-router-dom";

function Manage() {
  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
  }

  return (
    <section className="manage container">
      <NavLink to={"/manage/articles"}>Maqola</NavLink>
      <NavLink to={"/manage/conferences"}>Konferensiya</NavLink>
    </section>
  );
}

export default Manage;
