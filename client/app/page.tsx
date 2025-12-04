import { CreateUserForm } from "@/components/usersForm";
import UsersPage from "@/components/usersPage";

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl grid grid-cols-[minmax(0,2fr)_minmax(320px,360px)] gap-8 p-8 items-start">
      <UsersPage />

      <div className="self-start">
        <CreateUserForm />
      </div>
    </div>
  );
}
