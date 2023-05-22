// import React from "react";
import { useEffect } from "react";
import React, { useState } from "react";
import "./style.css";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
function Squads(props) {
  const Lodingbar = styled.div`
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
    font-weigth: 600;
  `;
  const [footballData, setFootballData] = useState([]);
  const [loading, setLoading] = useState(null);
  const params = useParams();

  console.log(params.id);
  useEffect(() => {
    const getData = async () => {
      //한국: 17, 토트넘 : 47
      const url = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${params.id}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "890d4abf31msh670286d5d9913fcp1315a7jsnbb8ab845f49e",
          "X-RapidAPI-Host": "api-football-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        if (result.response && result.response.length > 0) {
          setFootballData(result);
          setLoading(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  if (!loading) {
    return <Lodingbar>로딩중입니다...</Lodingbar>;
  } else if (footballData.response && footballData.response.length > 0) {
    const sortedData = footballData.response[0].players.sort(
      (a, b) => a.number - b.number
    );
    return (
      <div className="squad">
        <div className="teamtitle">
          <a
            href={`https://www.google.com/search?q=${footballData.response[0].team.name}&aqs=chrome.0.69i59.3534j0j7&sourceid=chrome&ie=UTF-8`}
            target="blank"
          >
            <img
              src={footballData.response[0].team.logo}
              className="Teamlogo"
            ></img>
          </a>
          <span>{footballData.response[0].team.name}</span>
        </div>
        <h2 className="positiontitle">Keepers</h2>
        <div className="positionbox">
          {sortedData.map((item) => {
            if (item.position == "Goalkeeper") {
              console.log(footballData.response);
              return (
                <div className="playerbox">
                  <Link to={`/playerdetails/${item.id}`}>
                    <img src={item.photo}></img>
                  </Link>
                  <div>
                    {item.name}{" "}
                    {item.number === null ? "" : `no.${item.number}`}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <h2 className="positiontitle">Defenders</h2>
        <div className="positionbox">
          {sortedData.map((item) => {
            if (item.position == "Defender") {
              console.log(footballData.response);
              return (
                <div className="playerbox">
                  <Link to={`/playerdetails/${item.id}`}>
                    <img src={item.photo}></img>
                  </Link>
                  <div>
                    {item.name}{" "}
                    {item.number === null ? "" : `no.${item.number}`}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <h2 className="positiontitle">Midfielders</h2>
        <div className="positionbox">
          {sortedData.map((item) => {
            if (item.position == "Midfielder") {
              console.log(footballData.response);
              return (
                <div className="playerbox">
                  <Link to={`/playerdetails/${item.id}`}>
                    <img src={item.photo}></img>
                  </Link>
                  <div>
                    {item.name}{" "}
                    {item.number === null ? "" : `no.${item.number}`}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <h2 className="positiontitle">Attacker</h2>
        <div className="positionbox">
          {sortedData.map((item) => {
            if (item.position == "Attacker") {
              console.log(footballData.response);
              return (
                <div className="playerbox">
                  <Link to={`/playerdetails/${item.id}`}>
                    <img src={item.photo}></img>
                  </Link>
                  <div>
                    {item.name}{" "}
                    {item.number === null ? "" : `no.${item.number}`}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

export default Squads;
