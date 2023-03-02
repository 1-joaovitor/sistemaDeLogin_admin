import { Box, Button } from "@mui/material";
import Chart from "react-apexcharts";
import * as React from "react";
import "./style.css";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CircularProgress from "@mui/material/CircularProgress";
import { getCoinUsd } from "../../utils/getCoins";
import toast, { Toaster } from "react-hot-toast";

export const ChartBar = ({ coins }) => {
  const [selectCoin, setSelectCoin] = React.useState("USD-BRL");
  const [usd, setUsd] = React.useState([]);
  const { BTCBRL } = coins;
  const { EURBRL } = coins;
  const { USDBRL } = coins;

  const editCoin = async (e) => {
    e.preventDefault();
    setSelectCoin(selectCoin);
    await getUsdData();
    toast.success(`Cotação dos últimos 7 dias para ${selectCoin}`);
  };

  const icons = [
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: BTCBRL?.name,
      number: `Alta  R$${BTCBRL?.high}`,
      progress: `Variação de ${BTCBRL?.pctChange}%`,
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: USDBRL?.name,
      progress: `Variação de ${USDBRL?.pctChange}%`,

      number: `Alta  R$${USDBRL?.high}`,
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: EURBRL?.name,
      number: `Alta  R$${EURBRL?.high}`,
      progress: `Variação de ${EURBRL?.pctChange}%`,
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: BTCBRL?.name,
      progress: (
        <CircularProgress
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          value={Number(BTCBRL?.varBid)}
          variant="determinate"
        />
      ),
      number: `Baixa R$ ${BTCBRL?.low}`,
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: USDBRL?.name,
      number: `Baixa R$ ${USDBRL?.low}`,
      progress: (
        <CircularProgress
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          value={USDBRL?.varBid}
          variant="determinate"
        />
      ),
    },
    {
      icon: <AttachMoneyIcon fontSize="large" />,
      name: EURBRL?.name,
      number: `Baixa R$ ${EURBRL?.low}`,
      progress: (
        <CircularProgress
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          value={EURBRL?.varBid}
          variant="determinate"
        />
      ),
    },
  ];
  const getUsdData = async () => {
    try {
      const response = await getCoinUsd(selectCoin);
      setUsd(response);
    } catch (error) {
      console.log(error);
      toast.success(`Houve um erro de comunicação, reinicie a página`);
    }
  };
  React.useEffect(() => {
    getUsdData();
  }, []);

  const state = {
    options: {
      chart: {
        id: "apexchart-example",
      },
      xaxis: {
        categories: usd.forEach((item, index) => index),
      },
    },
    series: [
      {
        name: "series-1",
        data: usd.map((item) => item?.high),
      },
    ],
  };

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
      <ul className="ListChart">
        {icons.map((item, index) => (
          <li className="ListItem" key={index}>
            <Box
              className="cardInformations"
              sx={{
                boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                borderRadius: 3,
                width: 300,
                height: 150,
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <h4>{item.name}</h4>
                {item.icon}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 2,
                }}
              >
                <h5 className={"testeModi"}>{item.progress}</h5>
                <h4>{item.number}</h4>
              </Box>
            </Box>
          </li>
        ))}
      </ul>
      <Box className="teste2">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h3>Valor máximo atingido por dia do dolar nos últimos 7 dias</h3>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 4,
          }}
        >
          <form className="editCoin" onSubmit={editCoin}>
            <select
              className="select"
              name="coins"
              value={selectCoin}
              onChange={(e) => setSelectCoin(e.target.value)}
            >
              <option value="USD-BRL">USD-BRL</option>
              <option value="EUR-BRL">EUR-BRL</option>
              <option value="BTC-BRL">BTC-BRL</option>
            </select>
            <Button className="button-select" variant="contained" type="submit">
              Editar
            </Button>
          </form>
        </Box>

        <Chart
          options={state.options}
          series={state.series}
          type="area"
          width="100%"
          height="80%"
        />
      </Box>
      <Toaster />
    </Box>
  );
};
