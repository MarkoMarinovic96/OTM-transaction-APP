import HeaderBox from "@/components/HeaderBox";
import RecentTransactions from "@/components/RecentTransactions";
import RightSideBar from "@/components/RightSideBar";
import TotalBlanaceBox from "@/components/TotalBlanaceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";
import Loading from "./loading";
import { Suspense } from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const currentPage = Number(page as string) || 1;
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ usersId: loggedIn?.$id });
  const accountData = accounts?.data;

  if (!accounts) return;

  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
  return (
    <Suspense fallback={<Loading />}>
      <section className="home">
        <div className="home-content">
          <header className="home-header">
            <HeaderBox
              type="greeting"
              title="Welcome"
              user={loggedIn?.firstName || "guest"}
              subtext="Acces and manage your account and transactions effciently"
            />
            <TotalBlanaceBox
              accounts={accountData}
              totalBanks={accounts?.totalBanks}
              totalCurrentBalance={accounts?.totalCurrentBalance}
            />
          </header>
          <RecentTransactions
            accounts={accountData}
            transactions={account?.transactions}
            appwriteItemId={appwriteItemId}
            page={currentPage}
          />
        </div>
        <RightSideBar
          user={loggedIn}
          transactions={account?.transactions}
          banks={accountData?.slice(0, 2)}
        />
      </section>
    </Suspense>
  );
};

export default Home;
