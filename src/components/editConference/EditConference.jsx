import ConferenceModal from "../../components/conferenceModal/ConferenceModal";
import { updateConference } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

function EditConference({ setOpenEditConference, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [modalIsPending, setModalIsPending] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const [number, setNumber] = useState("");
  const [articleIDS, setArticleIDS] = useState([]);

  useEffect(() => {
    const editData = JSON.parse(localStorage.getItem("editConference"));

    setTitle(editData.title);
    setDescription(editData.description);
    setCreatedAt(editData.createdAt);
    setConferenceId(editData.id);
    setNumber(editData.number);
    setArticleIDS(editData.article_ids);
  }, []);

  const checkEditButton = (title, description, number, articleIDS) => {
    const editData = JSON.parse(localStorage.getItem("editConference"));

    const isSameArray = (a, b) => {
      if (!Array.isArray(a) || !Array.isArray(b)) return false;
      if (a.length !== b.length) return false;
      return a.every((item, index) => item === b[index]);
    };

    const trimmedArticleIDS = articleIDS.filter((a) => a.trim().length >= 3);
    const articleIDSCheck = !isSameArray(
      trimmedArticleIDS,
      editData.article_ids
    );

    const numberValue = parseInt(number);

    if (
      trimmedArticleIDS.length > 0 &&
      title.trim().length >= 3 &&
      !isNaN(numberValue) &&
      numberValue >= 0 &&
      description.replace(/<[^>]+>/g, "").trim().length &&
      (title.trim() !== editData.title ||
        numberValue !== parseInt(editData.number) ||
        articleIDSCheck ||
        description !== editData.description)
    ) {
      setEditButtonDisabled(false);
    } else {
      setEditButtonDisabled(true);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setModalIsPending(true);

    try {
      await updateConference(conferenceId, {
        title,
        article_ids: articleIDS,
        image: "test",
        createdAt: new Timestamp(createdAt.seconds, createdAt.nanoseconds),
        description,
        number,
      });
      await fetchArticles();
      setOpenEditConference(false);
    } catch (err) {
      console.error("Konferensiyani tahrirlashda xatolik:", err);
    } finally {
      setModalIsPending(false);
      localStorage.removeItem("editConference");
    }
  };

  return (
    <ConferenceModal
      modalTitle={"Konferensiya tahrirlash"}
      modalBtnType={"Tahrirlash"}
      handeledButton={handleEdit}
      modalIsPending={modalIsPending}
      disabledButton={editButtonDisabled}
      iconType={editIcon}
      checkButton={checkEditButton}
      setIsOpenModal={setOpenEditConference}
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      number={number}
      setNumber={setNumber}
      articleIDS={articleIDS}
      setArticleIDS={setArticleIDS}
    />
  );
}

export default EditConference;
