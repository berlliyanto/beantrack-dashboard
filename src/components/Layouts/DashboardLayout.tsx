import React, { Fragment, ReactNode, useEffect, useState } from "react";
import CardAddMesin from "../Fragments/Cards/CardAddMesin";
import CardMesin from "../Fragments/Cards/CardMesin";
import GaugeDashboard from "../Fragments/Dashboard/GaugeDashboard";
import GraphDashboard from "../Fragments/Dashboard/Graph";
import BasicSelect from "../Elements/Select/BasicSelect";
import { getAllIotService } from "../../services/iot/getAllIot";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetURLParams } from "../../hooks/useGetURLParams";
import NoMesinView from "../Fragments/Dashboard/NoMesinView";
import { getDetailIotService } from "../../services/iot/getDetailIot";
import { Alert, Backdrop, CircularProgress } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";

type ListMesinType = {
    code: string;
    name: string;
    id: number;
}

type NewestSensorDataType = {
    average_temperature: number;
    average_humidity: number;
}

type IotRecapsType = {
    temperature: number;
    humidity: number;
}

const categoryDaily: string[] = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'];
const categoryWeekly: string[] = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];
const categoryMonthly: string[] = ['Minggu-1', 'Minggu-2', 'Minggu-3', 'Minggu-4', 'Minggu-5'];


const DashboardLayout = () => {
    const [category, setCategory] = useState<string[]>(categoryDaily);
    const [summaryBy, setSummaryBy] = useState<string>('Daily');
    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().slice(0, 10));
    const [stateIot, setStateIot] = useState<boolean>(false);
    const [iotRecaps, setIotRecaps] = useState<IotRecapsType[]>([]);
    const [newestSensorData, setNewestSensorData] = useState<NewestSensorDataType>({
        average_temperature: 0,
        average_humidity: 0
    });


    const token = useSelector((state: any) => state.token);
    const { search } = useLocation();
    const active = useGetURLParams(search, 'active');

    const { data: iotAll } = getAllIotService(token, 1, 10);
    const { data: detailIot,
        isLoading: loadingDetailIot,
        refetch: refetchDetailIot,
        isRefetching: refetchingDetailIot,
        error: errorDetailIot,
        isError: isErrorDetailIot } = getDetailIotService(token, active, summaryBy, filterDate);

    //--------------Handler Area---------------------//

    const handleChangeSummary = (sumBy: string) => {
        if (!sumBy) return;
        setSummaryBy(sumBy);
    };

    //--------------useEffect Area---------------------//

    useEffect(() => {
        if (isErrorDetailIot) toast.error(errorDetailIot?.message as string);
    }, [errorDetailIot])

    useEffect(() => {
        if (active) {
            setStateIot(true);
            refetchDetailIot();
        } else {
            setStateIot(false);
        }
    }, [search, active])

    useEffect(() => {
        if (detailIot) {
            setIotRecaps(detailIot.data.data.results);
            const { average_temperature, average_humidity } = detailIot.data.data
            setNewestSensorData((state) => ({ ...state, average_temperature, average_humidity }))
        }
    }, [detailIot])

    useEffect(() => {
        if (summaryBy == "Monthly") {
            setCategory(categoryMonthly);
        } else if (summaryBy == "Weekly") {
            setCategory(categoryWeekly);
        } else {
            setCategory(categoryDaily);
        }
        refetchDetailIot();
    }, [filterDate, summaryBy])

    //--------------Render Area---------------------//
    const renderLoading = (): React.ReactElement => {
        return <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={refetchingDetailIot || loadingDetailIot}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    }

    const renderMenuMesin = (): ReactNode => {
        return iotAll?.data.data.data ? iotAll?.data.data.data.map((item: ListMesinType, index: any) => (
            <CardMesin key={index}
                id={item.id}
                code={item.code}
                name={item.name}
            />
        )) : (
            <div className="flex flex-col justify-center mr-3 bg-white border border-slate-300 rounded-lg px-3">
                <p className="text-slate-500">Belum ada mesin terbaru</p>
            </div>
        )
    }

    const renderAlert = (): ReactNode => {
        let result = 0;
        iotRecaps.forEach((item: IotRecapsType) => {
            result += item.temperature + item.humidity;
        });
        return result == 0 ? 
        (
            <Alert severity="info" sx={{ width: '100%' }}>
                <h1 className="text-[16px] text-slate-800">Belum ada ringkasan data untuk tanggal <span className="font-semibold">{filterDate}</span></h1>
            </Alert>
        ) : (<div></div>)

    }

    const renderGauge = (): React.ReactElement => {
        return (
            <Fragment>
                <GaugeDashboard title="Suhu Dryer" subtitle="Dryer" color="#FF718B" value={newestSensorData.average_temperature} simbol="°C" />
                <GaugeDashboard title="Kelembapan Dryer" subtitle="Dryer" color="#3A7358" value={newestSensorData.average_humidity} simbol="%" />
            </Fragment>
        );
    }

    const renderGraphic = (): React.ReactElement => {
        let saveDataSuhuGraphic: number[] = [];
        let saveCategoryGraphic: string[] = [];
        let saveDataKelembapanGraphic: number[] = [];
        if (iotRecaps.length > 0) {
            iotRecaps.map((item: IotRecapsType) => {
                saveDataSuhuGraphic = [...saveDataSuhuGraphic, item.temperature];
                saveCategoryGraphic = [...saveCategoryGraphic, `$`];
                saveDataKelembapanGraphic = [...saveDataKelembapanGraphic, item.humidity];
            })
        }
        return (
            <Fragment>
                <GraphDashboard title="Grafik Suhu" simbol="°C" data={saveDataSuhuGraphic} category={category} />
                <GraphDashboard title="Grafik Kelembapan" simbol="%" data={saveDataKelembapanGraphic} category={category} />
            </Fragment>
        )
    }

    return (
        <article className="md:pt-20 md:pl-60">
            <section className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-lg text-slate-800">Mesin</h1>
                <div className="overflow-x-auto flex gap-2 flex-no-wrap pb-2">
                    {renderMenuMesin()}
                    <CardAddMesin />
                </div>
            </section>
            {
                !stateIot ?
                    <NoMesinView text="Tidak ada mesin kopi terpilih" />
                    :
                    <Fragment>
                        <section className="px-4 pb-4">
                            <div className="pb-3 flex justify-between items-center">
                                <h1 className="font-bold text-lg text-slate-800">Ringkasan Data</h1>
                                <input type="date" name="date" id="date" className="text-slate-800 outline-none focus:ring-2 ring-primary rounded-[4px] p-1 text-sm border border-[#DADADA]"
                                    onChange={(event) => setFilterDate(event.target.value)}
                                    defaultValue={new Date().toISOString().slice(0, 10)} />
                            </div>
                            <div className="mb-3">
                                {renderAlert()}
                            </div>
                            <div className="flex flex-wrap bg-white gap-3">
                                {renderGauge()}
                            </div>
                        </section>
                        <section className="px-4 pb-4">
                            <div className="pb-3 flex justify-between items-center">
                                <h1 className="font-bold text-lg text-slate-800">Perkembangan Bean</h1>
                                <BasicSelect onChange={handleChangeSummary} summaryBy={summaryBy} />
                            </div>
                            <div className="flex flex-col gap-3 xl:flex-row">
                                {renderGraphic()}
                            </div>
                        </section>
                    </Fragment>
            }
            {renderLoading()}
            <Toaster />
        </article>
    )
}

export default DashboardLayout;