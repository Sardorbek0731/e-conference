import ConferenceModal from "../../components/conferenceModal/ConferenceModal";
import { updateConference } from "../../services/conferenceService";
import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";

function EditConference({ setOpenEditConference, fetchArticles, editIcon }) {
  const [editButtonDisabled, setEditButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [conferenceId, setConferenceId] = useState("");
  const [number, setNumber] = useState("");
  const [articleIDS, setArticleIDS] = useState("");

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

    if (
      title.trim().length >= 3 &&
      description.replace(/<[^>]+>/g, "").trim().length &&
      (title.trim() !== editData.title || description !== editData.description)
    ) {
      setEditButtonDisabled(false);
    } else {
      setEditButtonDisabled(true);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setIsPending(true);

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
      setIsPending(false);
      localStorage.removeItem("editConference");
    }
  };

  return (
    <ConferenceModal
      modalTitle={"Konferensiya tahrirlash"}
      modalBtnType={"Tahrirlash"}
      handeledButton={handleEdit}
      isPending={isPending}
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
