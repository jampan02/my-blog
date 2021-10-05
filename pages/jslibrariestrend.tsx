import { getPopularLibraries } from "../lib/api";
import { Line } from "react-chartjs-2";
import React, { useState } from "react";
import HEAD from "../components/head";
import { GoogleTrentdsAPIContentTypeByDate } from "../types/GoogleTrendsAPIType";
import { useRouter } from "next/router";

type DateType = "weekly" | "monthly" | "yearly";

const PopularTech = ({ data }: { data: GoogleTrentdsAPIContentTypeByDate }) => {
  const router = useRouter();
  const [dateType, setDateType] = useState<DateType>("weekly");
  const dateTypes = [
    { label: "週間", value: "weekly" },
    { label: "月間", value: "monthly" },
    { label: "年間", value: "yearly" },
  ];
  const onChangeDateType = (e: any) => {
    dateTypes.forEach((content) => {
      if (content.label === e.target.value) {
        const contentValue: DateType = content.value as DateType;
        setDateType(contentValue);
      }
    });
  };
  const getCurrentLabel = () => {
    const labels = dateTypes.map((content) => {
      if (content.value === dateType) {
        return content.label;
      }
    });
    const currentLabel = labels[0];
    return currentLabel;
  };
  const lineChart = (
    <Line
      data={{
        labels: data[dateType].map((content: any) => content.formattedTime),

        datasets: [
          {
            data: data[dateType].map((data: any) => data.value[0]),
            label: "React",
            borderColor: "#3333ff",
          },
          {
            data: data[dateType].map((data: any) => data.value[1]),
            label: "Vue",
            borderColor: "green",
          },
          {
            data: data[dateType].map((data: any) => data.value[2]),
            label: "Angular",
            borderColor: "#ff3370",
          },
        ],
      }}
    />
  );

  return (
    <div className="px-5 mt-8 relative">
      <HEAD title="JSライブラリトレンド" />
      <button
        onClick={() => router.push("/")}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l absolute -top-5"
      >
        ブログサイトに戻る
      </button>
      <div className="max-w-5xl m-auto">
        <div className="flex mb-5 justify-center">
          <h1 className="text-5xl font-bold ">JSライブラリトレンド</h1>
          <select
            value={getCurrentLabel()}
            onChange={onChangeDateType}
            className="ml-3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            {dateTypes.map((date) => (
              <option key={date.label}>{date.label}</option>
            ))}
          </select>
        </div>
        {lineChart}
      </div>
    </div>
  );
};

PopularTech.getInitialProps = async () => {
  const data = await getPopularLibraries();

  return { data };
};

export default PopularTech;
