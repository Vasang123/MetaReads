import { useEffect, useState } from "react";
import { Principal } from "@dfinity/principal";
import { PlanModel } from "../../Props/model";
import { MetaReads_backend } from "../../../../../declarations/MetaReads_backend";
import { Plan } from "../../../../../declarations/MetaReads_backend/MetaReads_backend.did";

const useGetAllPlan = () => {
  const [data, setData] = useState<PlanModel[]>([]);

  const fetchData = async () => {
    try {
      const planResponse = await MetaReads_backend.get_all_plan();

      const response: PlanModel[] = planResponse.map((planData: Plan) => ({
        id: Principal.fromText(planData.id.toString()),
        name: planData.name as string,
        price_per_year: planData.price_per_year,
        price_per_month: planData.price_per_month,
      }));
      const order = ["Free", "Standard", "Premium"];

      const sortedResponse = response.sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
      });

      console.log(sortedResponse);

      setData(sortedResponse);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return [data, fetchData] as const;
};

export default useGetAllPlan;
