import ArticleModal from "../articleModal/ArticleModal";
import { addArticle } from "../../services/articleService";
import { useState } from "react";

const AddArticle = ({ setOpenAddArticle, fetchArticles, plusIcon }) => {
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const [authors, setAuthors] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);

  const checkAddButton = (authors, title, content, pdfFile, pdfName) => {
    const trimmedAuthors = authors.filter((a) => a.trim().length >= 3);

    if (
      trimmedAuthors.length > 0 &&
      title.trim().length >= 3 &&
      pdfFile &&
      pdfName &&
      content.replace(/<[^>]+>/g, "").trim().length >= 3
    ) {
      setAddButtonDisabled(false);
    } else {
      setAddButtonDisabled(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const cloudinary = new FormData();
    cloudinary.append("file", pdfFile);
    cloudinary.append("upload_preset", "E-Conference");

    const setPDF = await fetch(
      `https://api.cloudinary.com/v1_1/dqbxrkizg/raw/upload`,
      {
        method: "POST",
        body: cloudinary,
      }
    );

    const getPDF = await setPDF.json();
    let pdfURL = getPDF.url;

    try {
      await addArticle({
        authors,
        title,
        pdfURL,
        pdfName,
        image: "test",
        createdAt: new Date(),
        content,
      });
      await fetchArticles();
      setOpenAddArticle(false);
    } catch (err) {
      console.error("Maqolani qo'shishda xatolik:", err);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <ArticleModal
      modalTitle={"Maqola qo'shish"}
      modalBtnType={"Qo'shish"}
      handeledButton={handleSubmit}
      isPending={isPending}
      disabledButton={addButtonDisabled}
      iconType={plusIcon}
      checkButton={checkAddButton}
      setIsOpenModal={setOpenAddArticle}
      authors={authors}
      setAuthors={setAuthors}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      pdfFile={pdfFile}
      setPdfFile={setPdfFile}
      pdfName={pdfName}
      setPdfName={setPdfName}
    />
  );
};

export default AddArticle;
