import { ArrowRight, Ellipsis, EllipsisVertical, ExternalLink } from 'lucide-react';
import { applicationStatusConfig } from './ApplicationStatusChart';
import { Link } from 'react-router-dom';
import type { Application, ApplicationStatus } from '@/models/applications';

type RecentApplciationsProps = {
  data: Application[];
};

type StatusColor = {
  textColor: string;
  bgColor: string;
};

export const statusColorsConfig: Record<ApplicationStatus, StatusColor> = {
  'in-progress': {
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  interview: {
    bgColor: 'bg-violet-100',
    textColor: 'text-violet-800',
  },
  offer: {
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  rejected: {
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
};

export default function RecentApplications({ data }: RecentApplciationsProps) {
  return (
    <section className="flex-2 space-y-3 items-center rounded-lg border bg-white">
      <div className="px-4 pt-3 flex justify-between">
        <h2 className="text-xl font-semibold">Recent applications</h2>
        <div className=" items-center flex text-sm gap-1 text-blue-500 cursor-pointer hover:text-blue-400">
          <Link to="/applications">See all applications</Link>
          <ArrowRight className="w-4" />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_1.5fr_48px] border-y px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
          <p>Company</p>
          <p>Job</p>
          <p>Status</p>
          <p>Date</p>
          <p>Location</p>
          <p>Link</p>
          <p className="w-fit">Actions</p>
        </div>
        {data.map((item) => {
          return (
            <div className="grid grid-cols-[1.5fr_2fr_1fr_1fr_1.5fr_1.5fr_48px] px-4 py-2 text-sm items-center text-gray-800 hover:bg-gray-50">
              <div className="flex items-center gap-2">
                {item.companyLogo && item.companyLogo !== '' ? (
                  <img className="w-8 h-8 rounded-full " src={item.companyLogo} />
                ) : (
                  <div className="w-8 h-8 rounded-full "></div>
                )}
                <p>{item.company}</p>
              </div>
              <p className="truncate">{item.position}</p>
              <span className={`flex items-center justify-center mr-5 rounded-full`}>
                <p
                  className={`px-3 py-[2px] rounded-full ${applicationStatusConfig[item.status]} ${statusColorsConfig[item.status].textColor} ${statusColorsConfig[item.status].bgColor}`}
                >
                  {item.status}
                </p>
              </span>
              <p>
                {new Date(item.appliedAt).toLocaleDateString('en-US', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
              <p className="truncate text-gray-600">{item.location}</p>
              <a href="">
                <ExternalLink className="w-5 h-5 text-gray-500" />
              </a>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <Ellipsis className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
