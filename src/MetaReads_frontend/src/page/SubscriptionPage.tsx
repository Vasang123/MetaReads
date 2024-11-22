import { useEffect, useState } from "react";
import PageLayout from "../components/Layout/PageLayout";
import SubscriptionCard from "../components/Subscriptions/SubscriptionCard";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import { Tabs } from "../components/ui/tabs";
import useGetAllPlan from "../components/Hook/Plan/useGetAllPlan";
import { useUser } from "../lib/user_provider";
import { useNavigate } from "react-router-dom";
import { useModalState } from "../components/Hook/Ui/useModalState";
import BuySubscriptionModal from "../components/Modal/Subscription/BuySubscriptionModal";
import { CircularProgress } from "@mui/material";

export default function SubscriptionPage() {
  const [planInfo, setPlanInfo] = useState<{
    activePlan: string;
    planDuration: "Month" | "Year";
  }>({
    activePlan: "",
    planDuration: "Month",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [data] = useGetAllPlan();
  const { user, getUserById } = useUser();
  const { modalState, handleOpenCreate, handleCloseCreate } = useModalState();

  const [selectedPlan, setSelectedPlan] = useState<{
    id: string;
    type: "Monthly" | "Yearly";
    price: string;
    benefits: string[];
  } | null>(null);

  const benefits = {
    Free: ["Access to limited books", "Basic reader features"],
    Standard: [
      "Access to more books",
      "Basic reader features",
      "AI Summarizer",
    ],
    Premium: [
      "Access to entire book library",
      "Basic reader features",
      "AI Summarizer",
      "Priority support",
    ],
  };

  const renderSubscriptionCards = (isYearly: boolean) =>
    data &&
    data.map((plan) => {
      const isActivePlan = planInfo.activePlan.trim() === plan.name.trim();
      const type = isYearly ? "Yearly" : "Monthly";
      const price = isYearly
        ? plan.price_per_year.toString()
        : plan.price_per_month.toString();
      const isActiveDuration =
        planInfo.planDuration === (isYearly ? "Year" : "Month");

      return (
        <SubscriptionCard
          key={plan.id.toString()}
          title={plan.name}
          price={price}
          isActive={isActivePlan && isActiveDuration}
          benefits={benefits[plan.name as keyof typeof benefits]}
          type={type}
          onClick={() => {
            if (user == null) {
              navigate("/login");
            } else {
              setSelectedPlan({
                id: plan.id.toString(),
                type: type,
                price: price,
                benefits: benefits[plan.name as keyof typeof benefits],
              });
              handleOpenCreate();
            }
          }}
        />
      );
    });

  const tabs = [
    {
      title: "Monthly",
      value: "Monthly",
      content: (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br font-bold text-white">
          <div
            className="flex items-center justify-center"
            style={{ gap: "10%" }}
          >
            {renderSubscriptionCards(false)}
          </div>
        </div>
      ),
    },
    {
      title: "Yearly",
      value: "Yearly",
      content: (
        <div className="overflow-hidden rounded-2xl bg-gradient-to-br font-bold text-white">
          <div
            className="flex items-center justify-center"
            style={{ gap: "10%" }}
          >
            {renderSubscriptionCards(true)}
          </div>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const checkActivePlan = async () => {
      setLoading(true);
      if (!user) {
        setLoading(false);
        return;
      }
      const endDate = Array.isArray(user.subscription)
        ? user.subscription.length > 0
          ? user.subscription[0]?.subscription_end_date
          : 0
        : 0;
      const startDate = Array.isArray(user.subscription)
        ? user.subscription.length > 0
          ? user.subscription[0]?.subscription_start_date
          : 0
        : 0;
      const planName = Array.isArray(user.subscription)
        ? user.subscription.length > 0
          ? user.subscription[0]?.plan.name
          : "No plan available"
        : user.subscription?.plan?.name || "No plan available";

      if (planName) {
        setPlanInfo((prevState) => ({ ...prevState, activePlan: planName }));
      }
      if (endDate && startDate) {
        const durationInSeconds = endDate - startDate;
        const durationInDays = Number(durationInSeconds) / 86400;
        if (durationInDays > 30) {
          setPlanInfo((prevState) => ({ ...prevState, planDuration: "Year" }));
        } else {
          setPlanInfo((prevState) => ({ ...prevState, planDuration: "Month" }));
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
    };

    checkActivePlan();
  }, [user]);

  return (
    <PageLayout>
      <div className="relative max-h-[100vh] w-full overflow-y-auto bg-white bg-dot-black/[0.2] dark:bg-black dark:bg-dot-white/[0.2]">
        <div>
          <BuySubscriptionModal
            open={modalState.create}
            handleClose={handleCloseCreate}
            fetchData={getUserById}
            userId={user ? user.id.toString() : ""}
            planId={selectedPlan ? selectedPlan.id : ""}
            isYearly={selectedPlan ? selectedPlan.type : "Monthly"}
            price={selectedPlan ? selectedPlan.price : ""}
            benefits={selectedPlan ? selectedPlan.benefits : []}
          />
          <div
            className="m-16 flex items-center justify-center overflow-y-auto"
            style={{ gap: "10%" }}
          >
            <div className="w-full text-center text-white">
              <div className="flex justify-center">
                <TypewriterEffectSmooth
                  words={[
                    { text: "Unlock" },
                    { text: "Your" },
                    { text: "Reading" },
                    { text: "Potential" },
                    { text: "!" },
                  ]}
                />
              </div>
              <p className="flex w-[full] flex-col gap-2 text-xl font-semibold">
                <div>
                  Pick the best plan today and embark on your reading journey
                  with us!
                </div>
                <div>
                  Enjoy exclusive benefits and a world of knowledge at your
                  fingertips.
                </div>
              </p>
            </div>
          </div>
          {loading == true ? (
            <div className="flex h-[50vh] w-full items-center justify-center">
              <CircularProgress sx={{ color: "#EFAF21" }} />{" "}
            </div>
          ) : (
            <>
              {data.length > 0 && (
                <div className="relative flex max-w-full flex-col items-start justify-start md:h-[40rem]">
                  <Tabs tabs={tabs} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
