import { BsFillCheckCircleFill } from "react-icons/bs";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CurrencyLogo from "../../../public/assets/Currency Logo.png";
import ShimmerButton from "../Form/Button/ShimmerButton";
import { NumberTicker } from "../ui/number-ticker";
import LitupButton from "../Form/Button/LitUpButton";

export default function SubscriptionCard({
  title,
  price,
  benefits,
  type,
  isActive,
  onClick,
}: {
  title: string;
  price: string;
  benefits: string[];
  type?: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <Card
      sx={{
        width: "20%",
        backgroundColor: "#14181E",
        minHeight: "500px",
        maxHeight: "1000px",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
        boxShadow: "0px 10px 40px rgba(72, 79, 90, 0.6)",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          component="div"
          sx={{
            color: "white",
            fontWeight: "500",
            fontSize: "25px",
            textTransform: "uppercase",
          }}
          className="flex justify-center"
        >
          {title}
        </Typography>
        <div className="mb-5 flex justify-center rounded-md">
          <hr
            className="w-[20px] border-t-2"
            style={{
              borderColor: "#EFAF21",
            }}
          />
        </div>
        <div className="mb-6">
          {price != "0" ? (
            <div>
              <Typography
                variant="body2"
                sx={{ color: "white", fontSize: "34px", fontWeight: "600" }}
                className="flex justify-center"
              >
                <span className="gap flex gap-2">
                  <div className="flex items-center">
                    <img src={CurrencyLogo} alt="Currency" className="w-6" />
                  </div>
                  <NumberTicker
                    value={Number(price) + 50}
                    bottomValue={Number(price)}
                    direction="down"
                    // decimalPlaces={2}
                  />
                </span>
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "white", fontSize: "12px" }}
                className="flex justify-center"
              >
                Per {type == "Monthly" ? "Month" : "Year"}
              </Typography>
            </div>
          ) : (
            <></>
          )}
        </div>
        <div className="mb-5 flex justify-center rounded-md">
          <hr
            className="border-t-1 w-full"
            style={{
              borderColor: "gray",
              opacity: "0.5",
            }}
          />
        </div>
        <div className="overflow-x- max-h-[220px] overflow-y-auto">
          <ul className="flex flex-col space-y-2">
            {benefits &&
              benefits.map((benefit: any, index: any) => (
                <li
                  key={index}
                  className="flex items-center p-2 text-sm text-gray-600"
                >
                  <div className="mr-2">
                    <BsFillCheckCircleFill color="#EFAF21" size={19} />
                  </div>
                  <div className="text-white" style={{ fontSize: "16px" }}>
                    {benefit}
                  </div>
                </li>
              ))}
          </ul>
        </div>

        <div></div>
      </CardContent>
      <CardActions className="m-4 flex items-center justify-center">
        {isActive == true ? (
          <LitupButton text="Active Plan" />
        ) : (
          <ShimmerButton
            text={"Select Plan"}
            onClick={onClick ? onClick : () => {}}
          />
        )}
      </CardActions>
    </Card>
  );
}
