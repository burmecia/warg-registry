import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import utc from "dayjs/plugin/utc"
import { Package } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { getPackages } from "@/lib/db"
import CopySpecButton from "@/components/copy-spec"

// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

dayjs.extend(utc)
dayjs.extend(localizedFormat)

function makePkgSpec(rel: any) : string {
  return "fdw_package_url 'wargs://wrappers.supabase.com',\n"
    + `fdw_package_name '${rel.package}',\n`
    + `fdw_package_version '${rel.version}',\n`
}

export default async function Home() {
  const pkgs = await getPackages()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-24 py-16">
      <section className="flex flex-row gap-4">
        <Package size={40} />
        <h1 className="text-4xl font-extrabold mb-8">Supabase Wrappers Registry</h1>
      </section>
      <Separator />
      <section>
        <ol className="flex flex-col gap-3">
        {pkgs.map((pkg: any) => (
          <li key={pkg.log_id} className="">
            <h2 className="text-2xl font-bold py-3">{pkg.name}</h2>
            <ol className="flex flex-col gap-4 pl-4">
            {pkg.releases.map((rel: any) => (
              <li key={rel.record_id} className="flex flex-col gap-2 border-l-4 pl-2 border-emerald-500">
                <div className="flex flex-row gap-2">
                  <span className="flex items-center font-bold">v{rel.version}</span>
                  <CopySpecButton spec={makePkgSpec(rel)} />
                </div>
                <div className="text-sm text-muted-foreground">{rel.status} at {dayjs.utc(rel.released_at).local().format("lll")}</div>
                <div>content hash: {rel.content_hash}</div>
              </li>
            ))}
            </ol>
          </li>
        ))}
        </ol>
      </section>
      <section className="mt-8">
        &copy; Supabase Inc
      </section>
    </main>
  );
}
