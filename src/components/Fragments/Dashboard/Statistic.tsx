import {MoreVert , TrendingUp } from "@mui/icons-material";
import * as React from 'react';

interface StatisticProps {
    title: string;
    titleIcon: React.ReactElement;
    value: string;
    persentase: string;
}

const Statistic: React.FC<StatisticProps> = ({title, titleIcon, value, persentase}) => {
    return (
        <div className="flex flex-col p-5 shadow-sm w-full sm:w-auto sm:flex-1 gap-5">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    {titleIcon}
                    <p className="text-[12px] text-slate-700">{title}</p>
                </div>
                <MoreVert sx={{ fontSize: 14 }} className="text-slate-600" />
            </div>
            <div className="flex justify-between items-center">
                <p className="text-xl text-slate-800 font-semibold">{value}</p>
                <div className="flex gap-2 bg-emerald-100/50 p-1">
                    <TrendingUp sx={{ fontSize: 14 }} className="text-primary" />
                    <p className="text-[10px] text-primary">{persentase}%</p>
                </div>
            </div>
        </div>
    )
}

export default Statistic;