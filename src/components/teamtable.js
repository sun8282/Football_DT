import { useEffect } from "react";
import React, { useState } from "react";
import "../App.css";

import styled from "styled-components";
import { Link } from "react-router-dom";

function Table() {
  const [TeamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(null);
  const Lodingbar = styled.div`
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
  `;
  useEffect(() => {
    const getData = async () => {
      //한국: 17, 토트넘 : 47
      const url =
        "https://api-football-v1.p.rapidapi.com/v3/standings?season=2022&league=39";
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

        if (result.response && result.response.length > 0) {
          setTeamData(result);
          setLoading(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  if (!loading) {
    return <Lodingbar>로딩중...</Lodingbar>;
  } else if (TeamData.response && TeamData.response.length > 0) {
    const resData = TeamData.response[0].league.standings[0];
    console.log(resData);
    return (
      
      <div className="teamtable">
        
        <ul className="champ">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <ul className="euro">
            <li></li>
            <li></li>
        </ul>
        <ul className="confer">
            <li></li>
        </ul>
        <ul className="Rele">
            <li></li>
            <li></li>
            <li></li>
        </ul>
        <div class="title" >
            <h3 data-title="Table">Position Table</h3>
            <p>순위표</p>
        </div>
        <img className="plimg" src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/1200px-Premier_League_Logo.svg.png"></img>
        <ul className="tableheader">
            <li>Rank</li>
            <li className="Team">Team</li>
            <li>PTS</li>
            <li>PL</li>
            <li>W</li>
            <li>D</li>
            <li>L</li>
            <li>GD</li>
            <li>Form</li>
        </ul>
        {resData.map((item) => {
          return (
              <ul className="Team_list">
                <li className="rank">{item.rank}</li>
                <li>
                  <Link to={`/details/${item.team.id}`}>
                    <img src={item.team.logo}></img>
                  </Link>
                </li>
                <li>{item.team.name}</li>
                <li>{item.points}</li>
                <li>{item.all.played}</li>
                <li>{item.all.win}</li>
                <li>{item.all.draw}</li>
                <li>{item.all.lose}</li>
                <li>{item.goalsDiff}</li>
                <li>{item.form}</li>
              </ul>          
          );
        })}
        <ul className="qual">
            <li>
                <ul className="qualchamp">
                    <li></li>
                    <li>Champions League 진출</li>
                </ul>
            </li>
            <li>
                <ul className="qualeuro">
                    <li></li>
                    <li>Europa League 진출</li>
                </ul>
            </li>
            <li>
                <ul className="qualconfer">
                    <li></li>
                    <li>Europa Conference League 진출</li>
                </ul>
            </li>
            <li>
                <ul className="qualrele">
                    <li></li>
                    <li>강등권</li>
                </ul>
            </li>
        </ul>
      </div>
    );
  }
}

export default Table;
