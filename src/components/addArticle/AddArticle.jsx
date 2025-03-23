import Modal from "../modal/Modal";

const AddArticle = ({ setIsModalOpen, fetchArticles }) => {
  return (
    <Modal setIsModalOpen={setIsModalOpen} fetchArticles={fetchArticles} />
  );
};

export default AddArticle;
