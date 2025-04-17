export default async function Article({ params }) {
  const { articleID } = await params;

  return <div>Article Page: {articleID}</div>;
}
