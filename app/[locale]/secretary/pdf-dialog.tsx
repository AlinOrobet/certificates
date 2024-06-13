"use client";

import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {useGetOverviewInfo} from "@/features/admin/api/use-get-overview-info";
import {useGetSecretaries} from "@/features/admin/api/use-get-secretaries";
import {useGetStudents} from "@/features/admin/api/use-get-students";
import {useGetId} from "@/features/secretary/api/use-get-id";
import {Document, Page, Text, View, StyleSheet, PDFViewer} from "@react-pdf/renderer";

import {useTranslations} from "next-intl";

type Props = {
  title: string;
  isOpen: boolean;
  handleCancel: () => void;
  userSession: string;
  id: string;
  scop: string;
  dataCerere: string;
  numarInregistare: string;
};

const PdfDialog = ({
  title,
  isOpen,
  handleCancel,
  userSession,
  id,
  scop,
  dataCerere,
  numarInregistare,
}: Props) => {
  const t = useTranslations();
  const overviewQuery = useGetOverviewInfo({userSession});

  const data = overviewQuery.data || {};

  const studentsQuery = useGetStudents({userSession});
  const students = studentsQuery.data || [];
  const studentData = students.find((student: any) => student.numeComplet === title);

  const secretariesQuery = useGetSecretaries({userSession});
  const secretaries = secretariesQuery.data || [];
  const secretar = secretaries.find((secretar: any) => secretar.email === "orobet.alin@gmail.com");

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader className="w-full justify-center">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="aspect-square">
          <PDFViewer style={{width: "100%", height: "100%"}}>
            <Document>
              <Page size="A4" style={{padding: 24}}>
                <View style={{rowGap: 12}}>
                  <View style={{fontSize: 12}}>
                    <Text>UNIVERSITATEA "STEFAN CEL MARE DIN SUCEAVA"</Text>
                    <Text>{data.numeFacultate}</Text>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      flexDirection: "row",
                      fontSize: 12,
                    }}
                  >
                    <Text>Nr.</Text>
                    <Text>{id}</Text>
                    <Text>/FIESC/</Text>
                    <Text>{numarInregistare}</Text>
                  </View>
                </View>
                <View style={{alignItems: "center", marginVertical: 24}}>
                  <Text style={{fontWeight: 900, textTransform: "uppercase"}}>Adeverinta</Text>
                </View>
                <View style={{rowGap: 12}}>
                  <Text style={{fontSize: 10}}>
                    Studentul {`${studentData.numeComplet} `} este inscris in anul universitar
                    {data.anUniversitar}, in anul {studentData.anStudiu}, de studii,{" "}
                    {studentData.domeniuStudiu} {studentData.programStudiu}, forma de invatamant cu
                    frecventa, regim: {studentData.finantare}
                  </Text>
                  <Text style={{fontSize: 10}}>
                    Adeverinta se elibereaza pentru a-i servi la: {scop}
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 24,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{alignItems: "center", rowGap: 8}}>
                    <Text style={{fontSize: 10}}>DECAN</Text>
                    <Text style={{fontSize: 10}}>{data.numeDecan}</Text>
                  </View>
                  <View style={{alignItems: "center", rowGap: 8}}>
                    <Text style={{fontSize: 10}}>SECRETAR SEF</Text>
                    <Text style={{fontSize: 10}}>{data.numeSecretarSef}</Text>
                  </View>
                  <View style={{alignItems: "center", rowGap: 8}}>
                    <Text style={{fontSize: 10}}>SECRETARIAT</Text>
                    <Text style={{fontSize: 10}}>
                      {secretar.nume} {secretar.prenume}
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>
        <DialogFooter className="pt-2">
          <Button onClick={handleCancel} variant="outline" className="w-full">
            {t("CLOSE")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PdfDialog;
