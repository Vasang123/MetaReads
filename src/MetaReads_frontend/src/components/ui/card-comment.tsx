import { CommentModel } from "../Props/model";

export default function CardComment({
  id,
  user,
  text,
  created_at, // Expecting this to be a timestamp in seconds
}: CommentModel) {
  console.log("created_at value:", created_at); // Debugging line

  // Convert created_at from seconds (assuming it's already a BigInt)
  const timestampS = Number(created_at); // No need to divide by 1,000,000,000
  const dateObject = new Date(timestampS * 1000); // Convert to milliseconds

  // Check if dateObject is valid
  if (isNaN(dateObject.getTime())) {
    console.error("Invalid date:", dateObject);
    return <p>Invalid date</p>; // Fallback UI for invalid dates
  }

  // Format the date to "June 13, 2024"
  const options: any = { day: "numeric", month: "long", year: "numeric" };
  const formattedDate = dateObject
    .toLocaleDateString("en-US", options) // Change locale to English
    .replace(/ /g, "-"); // Optional: replace spaces with hyphens

  return (
    <div className="flex w-full py-2">
      <div className="">
        <div className="mr-[16px] h-[40px] w-[40px] rounded-full bg-white"></div>
      </div>
      <div className="mr-12 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold">{user.username}</p>
          <p className="text-xs">{formattedDate}</p>
        </div>
        <div className="whitespace-pre-wrap text-sm">{text}</div>
      </div>
    </div>
  );
}
