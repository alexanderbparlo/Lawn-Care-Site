"use client";

import { ServiceType } from "@/lib/firestore";

const SERVICES: ServiceType[] = ["Lawn Mowing", "Edging", "Leaf Blowing"];

interface ServiceCheckboxesProps {
  selected: ServiceType[];
  onChange: (services: ServiceType[]) => void;
  error?: string;
}

export default function ServiceCheckboxes({ selected, onChange, error }: ServiceCheckboxesProps) {
  function toggle(service: ServiceType) {
    if (selected.includes(service)) {
      onChange(selected.filter((s) => s !== service));
    } else {
      onChange([...selected, service]);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <span className="text-sm font-medium text-gray-700">
        Services Requested <span className="text-red-500">*</span>
      </span>
      <div className="flex flex-wrap gap-3 pt-1">
        {SERVICES.map((service) => (
          <label
            key={service}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-colors select-none text-sm font-medium
              ${selected.includes(service)
                ? "bg-[#2D6A4F] border-[#2D6A4F] text-white"
                : "bg-white border-gray-300 text-gray-700 hover:border-[#52B788]"
              }`}
          >
            <input
              type="checkbox"
              className="sr-only"
              checked={selected.includes(service)}
              onChange={() => toggle(service)}
            />
            {service}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
