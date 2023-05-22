import { useEffect } from "react";
import React, { useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
function Playerdetails() {
  const Lodingbar = styled.div`
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 30px;
    transform: translate(-50%, -50%);
  `;
  const [footballData, setFootballData] = useState([]);
  const [loading, setLoading] = useState(null);
  const params = useParams();

  console.log(params.id);
  useEffect(() => {
    const getData = async () => {
      //한국: 17, 토트넘 : 47
      const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${params.id}&season=2022`;
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
    console.log(footballData.response);
    const playerdata = footballData.response[0].player;
    const statdata = footballData.response[0].statistics;
    return (
      <>
        <div className="profile">
          <img src={`${playerdata.photo}`}></img>
          <h1>{playerdata.name}</h1>
          <h2>
            {playerdata.firstname} {playerdata.lastname}
          </h2>
          <ul>
            <li>{playerdata.age}</li>
            <li>{playerdata.birth.date}</li>
            <li>{playerdata.nationality}</li>
            <li>{playerdata.birth.place}</li>
            <li>{playerdata.height}</li>
            <li>{playerdata.weight}</li>
          </ul>
        </div>
        <div className="statistics">
          {statdata.map((item) => {
            return (
              <>
                <div className="logos">
                  <img
                    src={
                      item.league.logo ===
                      "https://media-2.api-sports.io/football/leagues/1.png"
                        ? "https://media-3.api-sports.io/football/leagues/34.png"
                        : item.league.logo
                    }
                  ></img>
                  {item.league.logo ===
                  "https://media-1.api-sports.io/football/leagues/30.png"
                    ? "월드컵 예선"
                    : ""}
                  <img src={item.team.logo}></img>
                </div>

                <ul>
                  <li>총 출전 수: {item.games.appearences}</li>
                  <li>선발 수: {item.games.lineups}</li>
                  <li>
                    <ul>
                      <li>교체 in: {item.substitutes.in}</li>
                      <li>교체 out: {item.substitutes.out}</li>
                      <li>벤치: {item.substitutes.bench}</li>
                    </ul>
                  </li>
                  <li>포지션: {item.games.position}</li>
                  <li>평점: {item.games.rating}</li>
                  <li>
                    골: {item.goals.total === null ? "0" : item.goals.total}
                    {`(PK 득점: ${
                      item.penalty.scored === null ? "0" : item.penalty.scored
                    }) (PK 실패: ${
                      item.penalty.missed === null ? "0" : item.penalty.missed
                    })`}{" "}
                    / 어시스트:{" "}
                    {item.goals.assists === null ? "0" : item.goals.assists}
                  </li>
                  <li>
                    슛팅 시도:{" "}
                    {item.shots.total === null ? "0" : item.shots.total} / 유효
                    슛: {item.shots.on === null ? "0" : item.shots.on}
                  </li>
                  <li>
                    드리블 시도: {item.dribbles.attempts} / 드리블 성공:{" "}
                    {item.dribbles.success}
                  </li>
                  <li>
                    패스 성공: {item.passes.total} / 키 패스:{item.passes.key}
                  </li>
                  <li>
                    공중볼 경합: {item.duels.total} / 경합 승리:{" "}
                    {item.duels.won}
                  </li>
                  <li>
                    태클 성공 수: {item.tackles.total} / 블록 성공 수:
                    {item.tackles.blocks} / 인터셉트 성공 수:{" "}
                    {item.tackles.interceptions}
                  </li>
                  <li>파울: {item.fouls.drawn}</li>
                  <li>
                    <ul>
                      <li>
                        <img
                          className="cards"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Yellow_card.svg/1200px-Yellow_card.svg.png"
                        ></img>
                        <h4>옐로카드: {item.cards.yellow}</h4>
                      </li>
                      <li>
                        <img
                          className="cards"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Yellowred_card.svg/1575px-Yellowred_card.svg.png"
                        ></img>
                        <h4>경고 누적 퇴장: {item.cards.yellowred}</h4>
                      </li>
                      <li>
                        <img
                          className="cards"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Red_card.svg/1200px-Red_card.svg.png"
                        ></img>
                        <h4>다이렉트 레드카드: {item.cards.red}</h4>
                      </li>
                    </ul>
                  </li>
                  <li>
                    유효슛 전환율: {(item.shots.on / item.shots.total) * 100}%
                  </li>
                  <li>
                    골 전환율: {(item.goals.total / item.shots.total) * 100}%
                  </li>
                  <li>
                    드리블 성공률:
                    {(item.dribbles.success / item.dribbles.attempts) * 100}%
                  </li>
                  <li>
                    공중볼 경합 성공률:
                    {(item.duels.won / item.duels.total) * 100}%
                  </li>
                </ul>
              </>
            );
          })}
        </div>
      </>
    );
  }
}
export default Playerdetails;
