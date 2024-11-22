import { useState } from "react";
import PageLayout from "../../components/Layout/PageLayout";
import BookTable from "../../components/Table/BookTable";
import { Title } from "../../components/Utility/TitleUtility";
import useFirebaseStorage from "../../components/Hook/Firebase/useFirebaseStorage";

export default function BookPage() {
  // const [file, setFile] = useState<File | null>(null);
  // const { uploadBookFile, uploadBookCover } = useFirebaseStorage();
  // const handleSend = async () => {
  //   if (file) {
  //     const link = await uploadBookFile(file, "test");
  //     const link2 = await uploadBookCover(file, "test");
  //     console.log(link); 
  //     console.log(link2); 
  //   }
  // }

  return (
    <PageLayout>
      <div className="my-6">
        <Title text={"Book Management"} />
      </div>
      {/* <div className="bg-white">
        
        <input type="file" onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
          }
        }}/>
        <button onClick={handleSend}>send</button>

      </div> */}
      <div className="flex w-full items-center justify-center gap-5">
        <div className="w-[85%]">
          <BookTable />
        </div>
      </div>
    </PageLayout>
  );
}
