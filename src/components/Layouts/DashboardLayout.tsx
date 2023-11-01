import { Fragment, ReactNode, useEffect, useState } from "react";
import CardAddMesin from "../Fragments/Cards/CardAddMesin";
import CardMesin from "../Fragments/Cards/CardMesin";
import GaugeDashboard from "../Fragments/Dashboard/GaugeDashboard";
import GraphDashboard from "../Fragments/Dashboard/Graph";
import BasicSelect from "../Elements/Select/BasicSelect";
import TableDashboard from "../Fragments/Dashboard/TableDashboard";
import { getAllIotService } from "../../services/iot/getAllIot";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetURLParams } from "../../hooks/useGetURLParams";
import NoMesinView from "../Fragments/Dashboard/NoMesinView";
import { getDetailIotService } from "../../services/iot/getDetailIot";
import { Backdrop, CircularProgress } from "@mui/material";

type ListMesinType = {
    code: string;
    name: string;
    id: number;
}

type IotRecapsType = {
    id: number | string;
    temperature: number;
    humidty: number;
    iot_id: number;
    created_at: string;
    updated_at: string;
}

const listMesin: ListMesinType[] = [
    {
        code: 'iot-a',
        name: 'IOT A',
        id: 1,
    },
    {
        code: 'iot-b',
        name: 'IOT B',
        id: 2
    },
    {
        code: 'IOT-C',
        name: 'IOT C',
        id: 3
    },
]

const DashboardLayout = () => {
    const [listDataMesin, setListDataMesin] = useState<ListMesinType[]>([]);
    const [summaryBy, setSummaryBy] = useState<string>('Daily');
    const [filterDate, setFilterDate] = useState<string>('');
    const [stateIot, setStateIot] = useState<boolean>(false);
    const [iotRecaps, setIotRecaps] = useState<IotRecapsType[]>([]);
    const [newestSensorData, setNewestSensorData] = useState({
        average_temperature: 0,
        average_humidity: 0
    })

    const token = useSelector((state: any) => state.token);
    const { search } = useLocation();
    const active = useGetURLParams(search, 'active');

    const { data: iotAll, isLoading: loadingIotAll, refetch: refetchAllIot, isRefetching: refetchingAllIot } = getAllIotService(token, 1, 10);
    const { data: detailIot, isLoading: loadingDetailIot, refetch: refetchDetailIot, isRefetching: refetchingDetailIot } = getDetailIotService(token, active, summaryBy, filterDate);

    //--------------Handler Area---------------------//

    const handleChangeSummary = (sumBy: string) => {
        if (!sumBy) return;
        setSummaryBy(sumBy);
        refetchDetailIot();
    }

    //--------------useEffect Area---------------------//

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
            setIotRecaps(detailIot.data.data.iotRecaps);
            const { average_temperature, average_humidity } = detailIot.data.data
            setNewestSensorData((state) => ({ ...state, average_temperature, average_humidity }))
        }
    }, [detailIot])

    useEffect(() => {
        refetchDetailIot();
    }, [filterDate])

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
                <p className="text-slate-500">Belum mesin terbaru</p>
            </div>
        )
    }

    const renderGauge = (): React.ReactElement => {
        return (
            iotRecaps.length == 0
                ? <h1>no Data</h1>
                :
                <Fragment>
                    <GaugeDashboard title="Suhu Dryer" subtitle="Dryer" color="#FF718B" value={newestSensorData.average_temperature} simbol="°C" />
                    <GaugeDashboard title="Kelembapan Dryer" subtitle="Dryer" color="#3A7358" value={newestSensorData.average_humidity} simbol="%" />
                </Fragment>
        );
    }

    return (
        <article className="md:pt-20 md:pl-60">
            <section className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-lg text-slate-800">Mesin</h1>
                <div className="overflow-x-auto flex gap-2 flex-no-wrap pb-2">
                    {
                        renderMenuMesin()
                    }
                    <CardAddMesin  />
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
                                <input type="date" name="date" id="date" className="text-slate-800 outline-none focus:ring-2 ring-primary rounded-[4px] p-1 text-sm border border-[#DADADA]" onChange={(event) => setFilterDate(event.target.value)} />
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
                                <GraphDashboard title="Grafik Suhu" />
                                <GraphDashboard title="Grafik Kelembapan" />
                            </div>
                        </section>
                        <section className="px-4 pb-4">
                            <TableDashboard />
                        </section>
                    </Fragment>
            }
            {renderLoading()}
        </article>
    )
}

export default DashboardLayout;