import HeaderBox from "@/components/HeaderBox";
import RightSideBar from "@/components/RightSideBar";
import TotalBlanaceBox from "@/components/TotalBlanaceBox";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import React from "react";

const Home = async () => {
  const loggedIn = await getLoggedInUser();

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || "guest"}
            subtext="Acces and manage your account and transactions effciently"
          />
          <TotalBlanaceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>
        RECENT TRANS
      </div>
      <RightSideBar user={loggedIn} transactions={[]} banks={[{currentBalance:135.5},{currentBalance:51}]}/>
    </section>
  );
};

export default Home;
