import "./ManageArticles.css";
import plus from "../../assets/icons/plus.png";
import Loading from "../../components/loading/Loading";
import { useFetch } from "../../hooks/useFetch";

function ManageArticles() {
  const { data, isPending, error } = useFetch();

  const logined = JSON.parse(localStorage.getItem("logined"));
  if (!logined) {
    return (window.location = "/login");
  }

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageArticles-container">
      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">1 ta maqola</h3>
          <button className="articlesAdd-button">
            <img src={plus} alt="Plus Icon" />
            Qo'shish
          </button>
        </div>
        <div className="manageArticles-navbar">
          <div className="allArticle-selected">
            <input type="checkbox" />
          </div>
          <h3 className="manageArticles-navbarTitle">Sarlavha</h3>
          <h3 className="manageArticles-navbarAuthor">Muallif</h3>
          <h3 className="manageArticles-navbarCreatedAt">Qo'shilgan vaqt</h3>
        </div>
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="manageArticles-body">
            {data.map((item, id) => {
              return (
                <div className="manageArticles-item" key={id}>
                  <div className="articleSelected">
                    <input type="checkbox" />
                  </div>
                  <h1 className="manageArticle-title">{item.title}</h1>
                  <h1 className="manageArticle-author">{item.author}</h1>
                  <h1 className="manageArticle-createdAt">{item.addedTime}</h1>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default ManageArticles;
