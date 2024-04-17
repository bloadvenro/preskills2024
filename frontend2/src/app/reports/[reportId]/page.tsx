import { NextPage } from "next";
import ReportView from "./view";

const ReportViewPage: NextPage = async ({ params }: any) => {
  const response = await fetch(`http://localhost:5002/order/get/${params.reportId}`);
  const data = await response.json();

  return <ReportView data={Object.entries(data)} />;
};

export default ReportViewPage;
