import "./ManageArticles.css";
import plus from "../../assets/icons/plus.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";

function ManageArticles() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isPending, error, refetch } = useFetch();

  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
    return null;
  }

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      refetch();
    } catch (error) {
      console.error("Maqolani o‘chirishda xatolik:", error);
    }
  };

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageArticles-container">
      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta maqola</h3>
          <button
            className="openAddArticle-modal"
            onClick={() => setIsModalOpen(true)}
          >
            <img src={plus} alt="Plus Icon" /> Qo'shish
          </button>
        </div>
        <div className="manageArticles-navbar">
          <input type="checkbox" className="allArticle-selectedInput" />
          <h3 className="manageArticles-navbarTitle">Sarlavha</h3>
          <h3 className="manageArticles-navbarAuthor">Muallif</h3>
          <h3 className="manageArticles-navbarCreatedAt">Qo'shilgan vaqt</h3>
          <h3 className="manageArticles-navbarEdit">Tahrirlash</h3>
        </div>
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="manageArticles-body">
            {data.map(({ id, title, author, addedTime }) => (
              <div className="manageArticles-item" key={id}>
                <input type="checkbox" className="articleSelected-input" />
                <h1 className="manageArticle-title">{title}</h1>
                <h1 className="manageArticle-author">{author}</h1>
                <h1 className="manageArticle-createdAt">{addedTime}</h1>
                <div className="manageArticle-Buttons">
                  <button className="manageArticle-editButton">
                    <img src={editIcon} alt="Edit Icon" />
                  </button>
                  <button
                    className="manageArticle-deleteButton"
                    onClick={() => handleDelete(id)}
                  >
                    <img src={deleteIcon} alt="Delete Icon" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {isModalOpen && <AddArticle closeModal={() => setIsModalOpen(false)} />}
    </section>
  );
}

export default ManageArticles;
