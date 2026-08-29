import React from "react";
import { Ambulance, Baby, HeartPulse } from "lucide-react";

interface Department {
  id: string;
  title: string;
  icon: React.ElementType;
}

const departments: Department[] = [
  {
    id: "emergency",
    title: "Emergency\nCare",
    icon: Ambulance,
  },
  {
    id: "pediatric",
    title: "Pediatric\nDepartment",
    icon: Baby,
  },
  {
    id: "cardiology",
    title: "Cardiology",
    icon: HeartPulse,
  },
];

export function DepartmentsSection() {
  return (
    <section className="bg-gradient-to-b from-primary-3/5 to-primary-3/70 py-16 px-4">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Our Departments
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {departments.map((dept) => {
            const Icon = dept.icon;
            return (
              <div
                key={dept.id}
                className="group flex aspect-square flex-col items-center justify-center rounded-3xl border border-white/80 bg-white/90 p-6 shadow-xl shadow-cyan-900/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-900/10"
              >
                {/* Container Icon */}
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-5/10 text-primary-5 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-12 w-12 stroke-[1.75]" />
                </div>

                {/* Judul Departemen */}
                <h3 className="whitespace-pre-line text-center text-base font-bold leading-snug text-slate-800 sm:text-lg">
                  {dept.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}