import PageLayout from "../../components/Layout/PageLayout";
import AuthorTable from "../../components/Table/AuthorTable";
import { Title } from "../../components/Utility/TitleUtility";

export default function AuthorPage() {
  return (
    <PageLayout>
      {" "}
      <div className="my-6">
        <Title text={"Book Author Management"} />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <div className="w-[85%]">
          <AuthorTable />
        </div>
      </div>
    </PageLayout>
  );
}
