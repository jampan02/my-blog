import { useState, useEffect } from "react";
import Link from "next/link";

type Archive = {
  text: string;
  href: string;
  data: number[];
};

export const ArchiveArea = () => {
  const [archives, setArchves] = useState<Archive[]>([]);
  useEffect(() => {
    const { items } = getAllDatesByMonth();
    setArchves(items);
  }, []);

  return (
    <div className="sidebar_container archive_container">
      <p className="sidebar_title">アーカイブ一覧</p>
      <nav className="link_nav">
        <ul>
          {archives.map((archive) => (
            <li key={`${archive.text}of${archive.href}atArchiveArea`}>
              <Link
                href="/archive/[year]/[month]"
                as={`/archive/${archive.href}`}
              >
                <a>{archive.text}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

const getAllDatesByMonth = () => {
  const dates: Archive[] = [
    {
      text: "2021年3月",
      href: "2021/03",
      data: [2021, 3],
    },
  ];
  const date = new Date();
  let year = date.getFullYear();
  let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  const oldestDate = dates[0].data;
  const latestDate = [year, Number(month)];
  //[2021,2022]みたいな感じなの取得
  const allYears = [...Array(latestDate[0] - oldestDate[0] + 1)].map(
    (_, i) => i + oldestDate[0]
  );
  //[01,02,03]みたいな感じの取得
  let allMonths: number[] = [];
  let setDatas: Archive[] = [];
  //ブログ開始から一年未満の場合
  if (latestDate[0] - oldestDate[0] === 0) {
    allMonths = [...Array(latestDate[1] - oldestDate[1])].map(
      (_, i) => i + oldestDate[1] + 1
    );
    setDatas = allMonths.map((month) => {
      return {
        text: `${allYears[0]}年${month}月`,
        href:
          month >= 10
            ? `${allYears[0]}/${month}`
            : `${allYears[0]}/${0}${month}`,
        data: [allYears[0], month],
      };
    });
  } else {
    //そうでない場合（それ以上やってる)
    //[2021]
    const firstYear = oldestDate[0];
    //[2023]みたいなかんじ
    const thisYear = latestDate[0];
    //差分 [2011,2012,2013]みたいな感じ
    const differencesOfYear = [...Array(thisYear - firstYear - 1)].map(
      (_, i) => i + firstYear + 1
    );

    //[4,5,6,7,8,9,10,11,12]みたいなかんじ
    const monthsAtFirstYear = [...Array(12 - oldestDate[1])].map(
      (_, i) => i + oldestDate[1] + 1
    );
    //[1,2,3,4]みたいなかんじ
    const monthsAtThisYear = [...Array(latestDate[1])].map((_, i) => i + 1);
    allMonths = [...Array(latestDate[1] - oldestDate[1])].map(
      (_, i) => i + oldestDate[1] + 1
    );
    const datasAtFirstYear: Archive[] = monthsAtFirstYear.map((month) => {
      return {
        text: `${firstYear}年${month}月`,
        href:
          month >= 10 ? `${firstYear}/${month}` : `${firstYear}/${0}${month}`,
        data: [firstYear, month],
      };
    });
    const datasAtThisYear: Archive[] = monthsAtThisYear.map((month) => {
      return {
        text: `${thisYear}年${month}月`,
        href: month >= 10 ? `${thisYear}/${month}` : `${thisYear}/${0}${month}`,
        data: [thisYear, month],
      };
    });
    //始まり年でも、終わり年でもない間の期間 []
    const Months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const datasAtDifference: Archive[][] = differencesOfYear.map(
      (differenceOfYear) => {
        const dataByYear: Archive[] = Months.map((month) => ({
          text: `${differenceOfYear}年${month}月`,
          href:
            month >= 10
              ? `${differenceOfYear}/${month}`
              : `${differenceOfYear}/${0}${month}`,
          data: [differenceOfYear, month],
        }));
        return dataByYear;
      }
    );
    let array1d: Archive[] = [];
    for (let array of datasAtDifference) {
      for (let result of array) {
        array1d.push(result);
      }
    }

    setDatas = [...datasAtFirstYear, ...array1d, ...datasAtThisYear];
  }
  return { items: [...dates, ...setDatas] };
};
