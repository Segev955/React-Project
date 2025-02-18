import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import db from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";

import { BarChart, Bar, ResponsiveContainer } from 'recharts';


import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategorieComp from "./categorie";

function StatisticsComp() {

  const [data, setData] = useState([
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ])

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart width={150} height={40} data={data}>
        <Bar dataKey="pv" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default StatisticsComp;
