"use client"

import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import utc from "dayjs/plugin/utc"
import { useState } from 'react'
import { Package, Frown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import CopySpecButton from "@/components/copy-spec"

dayjs.extend(utc)
dayjs.extend(localizedFormat)

function makePkgSpec(rel: any) : string {
  const protocol = window.location.protocol.replace(/^http/, "warg")
  const url = `${protocol}//${window.location.host}`
  return `fdw_package_url '${url}',\n`
    + `fdw_package_name '${rel.package}',\n`
    + `fdw_package_version '${rel.version}',\n`
}

export default function PkgList({ pkgs }: { pkgs: any[] }) {
  const [filter, setFilter] = useState("")

  return (
    <section className="pt-4">
      <Input placeholder="Search package" onChange={e => setFilter(e.target.value)} />
      <ol className="flex flex-col gap-3">
      {pkgs.filter((pkg: any) => pkg.name.includes(filter)).length === 0 &&
        <li className="flex flex-row gap-2 py-6"><Frown /> No packages found</li>
      }
      {pkgs.filter((pkg: any) => pkg.name.includes(filter)).map((pkg: any) => (
        <li key={pkg.log_id} className="">
          <h2 className="flex flex-row gap-2 text-2xl font-bold py-3">
            <div className="flex flex-col justify-center pt-0.5">
              <Package size={24} className="text-emerald-500" />
            </div>
            {pkg.name}
          </h2>
          <ol className="flex flex-col gap-4 pl-5">
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
  );
}
