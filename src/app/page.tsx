import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import { redirect } from "next/navigation";
import Home from "@/components/home/Home";

const HomePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    return redirect("/");
  }

  return <Home userId={session.user.id} />;
};

export default HomePage;
