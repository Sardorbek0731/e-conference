import ConferenceModal from "../conferenceModal/ConferenceModal";
import { addConference } from "../../services/conferenceService";
import { useState } from "react";

const AddConference = ({ setOpenAddConference, fetchArticles, plusIcon }) => {
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [modalIsPending, setModalIsPending] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [number, setNumber] = useState("");
  const [articleIDS, setArticleIDS] = useState([]);

  const checkAddButton = (title, description, number, articleIDS) => {
    const trimmedArticleIDS = articleIDS.filter((a) => a.trim().length >= 3);

    const numberValue = parseInt(number);

    if (
      title.trim().length >= 3 &&
      !isNaN(numberValue) &&
      numberValue >= 0 &&
      trimmedArticleIDS.length > 0 &&
      description.replace(/<[^>]+>/g, "").trim().length >= 3
    ) {
      setAddButtonDisabled(false);
    } else {
      setAddButtonDisabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalIsPending(true);

    try {
      await addConference({
        title,
        article_ids: articleIDS,
        image: "test",
        createdAt: new Date(),
        description,
        number,
      });
      await fetchArticles();
      setOpenAddConference(false);
    } catch (err) {
      console.error("Konferensiyani qo'shishda xatolik:", err);
    } finally {
      setModalIsPending(false);
    }
  };

  return (
    <ConferenceModal
      modalTitle={"Konferensiya qo'shish"}
      modalBtnType={"Qo'shish"}
      handeledButton={handleSubmit}
      modalIsPending={modalIsPending}
      disabledButton={addButtonDisabled}
      iconType={plusIcon}
      checkButton={checkAddButton}
      setIsOpenModal={setOpenAddConference}
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
};

export default AddConference;
