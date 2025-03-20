// CSS
import "./ManageArticles";

function ManageArticles() {
  const logined = JSON.parse(localStorage.getItem("logined"));

  if (!logined) {
    return (window.location = "/login");
  }

  return (
    <section className="manageArticles container">Manage-Articles</section>
  );
}

export default ManageArticles;
