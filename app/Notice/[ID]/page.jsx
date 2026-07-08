// app/notice/[id]/page.jsx
import NoticeDetails from "./NoticeDetail";

export default async function Page({ params }) {
  const { id } = await params;
  return <NoticeDetails id={id} />;
}