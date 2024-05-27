import { Boxes } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getPackages } from "@/lib/db"
import PkgList from "@/components/pkg-list"

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

export default async function Home() {
  const pkgs = await getPackages()

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-16">
      <section className="flex flex-row gap-4">
        <Boxes size={40} className="text-emerald-500"/>
        <h1 className="text-4xl font-extrabold mb-8">Supabase Wasm Wrappers Registry</h1>
      </section>
      <Separator />
      <PkgList pkgs={pkgs} />
      <section className="mt-8">
        &copy; Supabase Inc
      </section>
    </main>
  );
}
