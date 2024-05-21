import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBlanaceBox from "@/components/TotalBlanaceBox";
import { getAccount, getAccounts } from "@/lib/actions/bank.actions";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async ({ searchParams: { id, page } }: SearchParamProps) => {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ usersId: loggedIn.$id });
  const accountData = accounts?.data;

  if (!accounts) return;

  const appwriteItemId = (id as string) || accountData[0]?.appwriteItemId;
  const account = await getAccount({ appwriteItemId });
console.log('aaaaa',{accountData,account,loggedIn})
  return (
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
        RECENT TRANS
      </div>
      <RightSideBar
        user={loggedIn}
        transactions={account?.transactions}
        banks={accountData?.slice(0,2)}
      />
    </section>
  );
};

export default Home;
