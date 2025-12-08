import type { Route } from "./+types/storeHome";
import { Store } from "@/storeHome/storeHome";
export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Taant Tantra Store" },
    { name: "description", content: "Welcome to India's most loved saree store online." }

  ];
}


export default function StoreHome() {
  return (

    <Store />
  )
}
