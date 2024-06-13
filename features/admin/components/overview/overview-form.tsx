"use client";

import {useTranslations} from "next-intl";

import {InputField} from "@/components/form/input-field";

import {useChiefSecretaryNameMutation} from "@/features/admin/api/use-create-chief-secretary-name";
import {useCreateDeanNameMutation} from "@/features/admin/api/use-create-dean-name";
import {useCreateUniversityNameMutation} from "@/features/admin/api/use-create-university-name";
import {useCreateUniversityAbbreviationMutation} from "@/features/admin/api/use-create-university-abbreviation";
import {useCreateUniversityYearMutation} from "@/features/admin/api/use-create-university-year";
import {useGetOverviewInfo} from "@/features/admin/api/use-get-overview-info";
import {useNewOverview} from "../../store/use-new-overview";

type Props = {
  userSession: string;
};

export const OverviewForm = ({userSession}: Props) => {
  const t = useTranslations();

  const newOverview = useNewOverview();
  const overviewQuery = useGetOverviewInfo({userSession});

  const data = overviewQuery.data || {};

  const universityNameMutation = useCreateUniversityNameMutation({userSession});
  const universityAbbreviationMutation = useCreateUniversityAbbreviationMutation({userSession});
  const universityYearMutation = useCreateUniversityYearMutation({userSession});
  const deanNameMutation = useCreateDeanNameMutation({userSession});
  const chiefSecretaryNameMutation = useChiefSecretaryNameMutation({userSession});

  const isLoading =
    overviewQuery.isLoading ||
    universityNameMutation.isPending ||
    universityAbbreviationMutation.isPending ||
    universityYearMutation.isPending ||
    deanNameMutation.isPending ||
    chiefSecretaryNameMutation.isPending;

  const noDataAction = () => {
    newOverview.onOpen();
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <InputField.Skeleton />
          <InputField.Skeleton />
          <InputField.Skeleton />
        </div>
        <div className="space-y-6">
          <InputField.Skeleton />
          <InputField.Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-x-6 lg:grid-cols-2">
      <div className="space-y-6">
        <InputField
          label={t("UNIVERISTY_NAME")}
          name="numeFacultate"
          onSubmit={(values) => {
            universityNameMutation.mutate({numeFacultate: values.numeFacultate});
          }}
          initialData={data.numeFacultate}
          isDisabled={isLoading}
          noDataAction={noDataAction}
        />
        <InputField
          label={t("UNIVERISTY_ABBREVIATION")}
          name="precurtareFacultate"
          onSubmit={(values) => {
            universityAbbreviationMutation.mutate({
              precurtareFacultate: values.precurtareFacultate,
            });
          }}
          initialData={data.precurtareFacultate}
          isDisabled={isLoading}
          noDataAction={noDataAction}
        />
        <InputField
          label={t("UNIVERISTY_YEAR")}
          name="anUniversitar"
          onSubmit={(values) => {
            universityYearMutation.mutate({anUniversitar: values.anUniversitar});
          }}
          initialData={data.anUniversitar}
          isDisabled={isLoading}
          noDataAction={noDataAction}
        />
      </div>
      <div className="space-y-6">
        <InputField
          label={t("DEAN_NAME")}
          name="numeDecan"
          onSubmit={(values) => {
            deanNameMutation.mutate({numeDecan: values.numeDecan});
          }}
          initialData={data.numeDecan}
          isDisabled={isLoading}
          noDataAction={noDataAction}
        />
        <InputField
          label={t("CHIEF_SECRETARY_NAME")}
          name="numeSecretarSef"
          onSubmit={(values) => {
            chiefSecretaryNameMutation.mutate({numeSecretarSef: values.numeSecretarSef});
          }}
          initialData={data.numeSecretarSef}
          isDisabled={isLoading}
          noDataAction={noDataAction}
        />
      </div>
    </div>
  );
};
