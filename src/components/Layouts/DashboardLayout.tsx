import { Fragment, ReactNode, useEffect, useState } from "react";
import CardAddMesin from "../Fragments/Cards/CardAddMesin";
import CardMesin from "../Fragments/Cards/CardMesin";
import GaugeDashboard from "../Fragments/Dashboard/GaugeDashboard";
import GraphDashboard from "../Fragments/Dashboard/Graph";
import BasicSelect from "../Elements/Select/BasicSelect";
import TableDashboard from "../Fragments/Dashboard/TableDashboard";
// import { getAllIotService } from "../../services/iot/getAllIot";
// import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useGetURLParams } from "../../hooks/useGetURLParams";
import NoMesinView from "../Fragments/Dashboard/NoMesinView";

type ListMesinType = {
    id: string;
    title: string;
    isConnected: boolean;
    url: string;
}

const listMesin: ListMesinType[] = [
    {
        id: 'iot1',
        title: 'IOT 1',
        isConnected: true,
        url: '&active=iot1'
    },
    {
        id: 'iot2',
        title: 'IOT 2',
        isConnected: true,
        url: '&active=iot2'
    },
    {
        id: 'iot3',
        title: 'IOT 3',
        isConnected: true,
        url: '&active=iot3'
    },
]

const DashboardLayout = () => {

    const [listDataMesin, setListDataMesin] = useState<ListMesinType[]>(listMesin);
    const [stateIot, setStateIot] = useState<boolean>(false);
    // const token = useSelector((state: any) => state.token);
    const { search } = useLocation();
    const active = useGetURLParams(search, 'active');

    const toggleIsConnected = (index: number, newValue: boolean) => {
        const updatedList = [...listDataMesin];
        updatedList[index].isConnected = newValue;
        setListDataMesin(updatedList);
    };

    // const { data: dataIot, isFetching } = getAllIotService(token, 1, 10, '');

    useEffect(() => {
        if (active) {
            setStateIot(true)
        } else {
            setStateIot(false);
        }
    }, [search])

    const renderMenuMesin = (): ReactNode => {
        return listDataMesin ? listDataMesin.map((item, index) => (
            <CardMesin key={index}
                id={item.id}
                isConnected={item.isConnected}
                title={item.title}
                url={item.url}
                onIsConnectedChange={(newValue) => toggleIsConnected(index, newValue)}
            />
        )) : (
            <p>No Mesin</p>
        )
    }


    return (
        <article className="md:pt-20 md:pl-60">
            <section className="p-4 flex flex-col gap-3">
                <h1 className="font-bold text-lg text-slate-800">Mesin</h1>
                <div className="overflow-x-auto flex gap-2 flex-no-wrap pb-2">
                    {
                        renderMenuMesin()
                    }
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
                                <input type="date" name="date" id="date" className="text-slate-800 outline-none focus:ring-2 ring-primary rounded-[4px] p-1 text-sm border border-[#DADADA]" onChange={(e) => console.log(e.target.value)} />
                            </div>
                            <div className="flex flex-wrap bg-white gap-3">
                                <GaugeDashboard title="Suhu Dryer" subtitle="Dryer" color="#FF718B" value={70} simbol="°C" />
                                <GaugeDashboard title="Kelembapan Dryer" subtitle="Dryer" color="#3A7358" value={80} simbol="%" />
                            </div>
                        </section>
                        <section className="px-4 pb-4">
                            <div className="pb-3 flex justify-between items-center">
                                <h1 className="font-bold text-lg text-slate-800">Perkembangan Bean</h1>
                                <BasicSelect />
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
        </article>
    )
}

export default DashboardLayout;