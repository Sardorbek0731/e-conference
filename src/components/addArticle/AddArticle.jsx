import "./AddArticle.css";
import Modal from "../modal/Modal";
import { addArticle } from "../../services/articleService";
import { useState } from "react";

const AddArticle = ({ setOpenAddArticle, fetchArticles, plusIcon }) => {
  const [addButtonDisabled, setAddButtonDisabled] = useState(true);
  const [isPending, setIsPending] = useState(false);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfName, setPdfName] = useState(null);
  const [autherList, setAutherList] = useState([]);

  const checkAddButton = (author, title, content, pdfFile) => {
    if (
      author.trim().length &&
      title.trim().length &&
      pdfFile &&
      content.replace(/<[^>]+>/g, "").trim().length
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
        author,
        title,
        pdfURL,
        pdfName,
        photo: "",
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
    <Modal
      modalTitle={"Maqola qo'shish"}
      modalBtnType={"Qo'shish"}
      setIsOpenModal={setOpenAddArticle}
      fetchArticles={fetchArticles}
      handeledButton={handleSubmit}
      isPending={isPending}
      author={author}
      setAuthor={setAuthor}
      title={title}
      setTitle={setTitle}
      content={content}
      setContent={setContent}
      disabledButton={addButtonDisabled}
      setDisabledButton={setAddButtonDisabled}
      iconType={plusIcon}
      checkButton={checkAddButton}
      pdfFile={pdfFile}
      setPdfFile={setPdfFile}
      pdfName={pdfName}
      setPdfName={setPdfName}
      autherList={autherList}
      setAutherList={setAutherList}
    />
  );
};

export default AddArticle;
