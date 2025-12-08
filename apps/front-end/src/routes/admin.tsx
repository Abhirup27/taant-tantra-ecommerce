import type { Route } from "./+types/admin";
import AdminPage from "@/admin/adminPage";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Taant Tantra Admin Page" },
    { name: "description", content: "Admin controls for the Taant Tantra Ecommerce store." }

  ];
}


export default function Admin() {
  return (

    <AdminPage />
  )
}

