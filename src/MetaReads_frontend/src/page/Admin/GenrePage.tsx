import PageLayout from "../../components/Layout/PageLayout";
import GenreTable from "../../components/Table/GenreTable";
import { Title } from "../../components/Utility/TitleUtility";

export default function GenrePage() {
  return (
    <PageLayout>
      <div className="my-6">
        <Title text={"Book Genre Management"} />
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <div className="w-[85%]">
          <GenreTable />
        </div>
      </div>
    </PageLayout>
  );
}
