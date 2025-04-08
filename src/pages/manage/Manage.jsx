import "./Manage.css";
import { NavLink } from "react-router-dom";

function Manage() {
  return (
    <section className="manage container">
      <NavLink to={"/manage/articles"}>Maqola</NavLink>
      <NavLink to={"/manage/conferences"}>Konferensiya</NavLink>
    </section>
  );
}

export default Manage;
