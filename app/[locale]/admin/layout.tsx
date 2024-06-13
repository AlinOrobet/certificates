import {Header} from "@/features/admin/components/header";
import {cookies} from "next/headers";
import {redirect} from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: {locale: string};
};
const AdminLayout = ({children, params}: Props) => {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("JSESSIONID");

  if (!sessionCookie || !sessionCookie.value) {
    return redirect(`/${params.locale}`);
  }

  return (
    <div className="h-full">
      <Header locale={params.locale} userSession={`JSESSIONID=${sessionCookie.value}`} />
      <div className="px-3 lg:px-14 ">{children}</div>
    </div>
  );
};

export default AdminLayout;
