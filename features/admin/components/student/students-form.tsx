"use client";

import {Loader2} from "lucide-react";

import {DataTable} from "@/components/data-table";
import {columns} from "@/app/[locale]/admin/students/columns";

import {useGetStudents} from "../../api/use-get-students";

type Props = {
  userSession: string;
};

export const StudentsForm = ({userSession}: Props) => {
  const studentsQuery = useGetStudents({userSession});
  const students = studentsQuery.data || [];
  const isDisabled = studentsQuery.isLoading;

  if (isDisabled) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-slate-300 animate-spin" />
      </div>
    );
  }

  return <DataTable filterKey="email" filterLabel="email" columns={columns} data={students} />;
};
