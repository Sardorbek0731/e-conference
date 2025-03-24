import "./ManageArticles.css";
import plusIcon from "../../assets/icons/plus.png";
import editIcon from "../../assets/icons/edit.png";
import deleteIcon from "../../assets/icons/delete.png";
import Loading from "../../components/loading/Loading";
import AddArticle from "../../components/addArticle/AddArticle";
import EditArticle from "../../components/editArticle/EditArticle";
import { useState } from "react";
import { useFetch } from "../../hooks/useFetch";
import { deleteArticle } from "../../services/articleService";

function ManageArticles() {
  const { data, isPending, error, fetchArticles } = useFetch();
  const [openAddArticle, setOpenAddArticle] = useState(false);
  const [openEditArticle, setOpenEditArticle] = useState(false);
  const [clickedDelete, setClickedDelete] = useState([]);

  if (!JSON.parse(localStorage.getItem("logined"))) {
    window.location = "/login";
    return null;
  }

  const handleDelete = async (id) => {
    try {
      await deleteArticle(id);
      await fetchArticles();
      setClickedDelete([false, id]);
    } catch (error) {
      console.error("Maqolani o‘chirishda xatolik:", error);
    }
  };

  const handleEdit = (id, title, author, content) => {
    localStorage.setItem(
      "editArticle",
      JSON.stringify({ id, title, author, content })
    );
  };

  if (error) return <p>Xatolik: {error}</p>;

  return (
    <section className="manageArticles-container">
      <div className="manageArticles">
        <div className="manageArticles-header">
          <h3 className="articlesCount">{data.length} ta maqola</h3>
          <button
            className="openAddArticle-modal"
            onClick={() => setOpenAddArticle(true)}
          >
            <img src={plusIcon} alt="Plus Icon" /> Qo'shish
          </button>
        </div>
        <div className="manageArticles-navbar">
          <h3 className="manageArticles-navbarTitle">Sarlavha</h3>
          <h3 className="manageArticles-navbarAuthor">Muallif</h3>
          <h3 className="manageArticles-navbarCreatedAt">Qo'shilgan vaqt</h3>
          <h3 className="manageArticles-navbarEdit">Tahrirlash</h3>
        </div>
        {isPending ? (
          <Loading isPending={isPending} />
        ) : (
          <div className="manageArticles-body">
            {data.map(({ id, title, author, addedTime, content }) => (
              <div className="manageArticles-item" key={id}>
                <h1 className="manageArticle-title">{title}</h1>
                <h1 className="manageArticle-author">{author}</h1>
                <h1 className="manageArticle-createdAt">{addedTime}</h1>
                <div className="manageArticle-Buttons">
                  <button
                    className="manageArticle-editButton"
                    onClick={() => {
                      handleEdit(id, title, author, content);
                      setOpenEditArticle(true);
                    }}
                  >
                    <img src={editIcon} alt="Edit Icon" />
                  </button>
                  <button
                    className={
                      clickedDelete[0] && id === clickedDelete[1]
                        ? "manageArticle-deleteButton disabledDeleteButton"
                        : "manageArticle-deleteButton"
                    }
                    onClick={() => {
                      handleDelete(id);
                      setClickedDelete([true, id]);
                    }}
                    disabled={clickedDelete[0] && id === clickedDelete[1]}
                  >
                    {clickedDelete[0] && id === clickedDelete[1] ? (
                      <span className="loading centreLoading"></span>
                    ) : (
                      <img src={deleteIcon} alt="Delete Icon" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {openAddArticle && (
        <AddArticle
          setOpenAddArticle={setOpenAddArticle}
          fetchArticles={fetchArticles}
          plusIcon={plusIcon}
        />
      )}
      {openEditArticle && (
        <EditArticle
          setOpenEditArticle={setOpenEditArticle}
          fetchArticles={fetchArticles}
          editIcon={editIcon}
        />
      )}
    </section>
  );
}

export default ManageArticles;
