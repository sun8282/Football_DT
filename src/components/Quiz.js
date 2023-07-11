import React, { useEffect, useState } from "react";
import styled from "styled-components";
function Quiz() {
    // const response = await fetch("./question.json");
    // const jsonData = await response.json();
    const [QuizData, setQuizData] = useState([]);
    const [EnKr, setleng] = useState(true);
    const [answer,setanswer] = useState([]);
    let Useranswer =[]
    const Exambox = styled.div`
                    width: 100px; 
                    height: 100px; 
                    border: 1px solid;
                
                `;
    useEffect(() => {
        const getData = async () => {
        //   try {
            const response = await fetch("./question.json");
            const result = await response.json();
            // console.log(result);
            // if (result.response && result.response.length > 0) {
                console.log(result)
                if(EnKr === true && result.kr && result.kr.length >0){
                    setQuizData(result.kr);
                    setanswer(result.answer)
                }else if(EnKr === false && result.en && result.en.length >0){
                    setQuizData(result.en);
                    setanswer(result.answer)
                }
        };
        getData();
      }, [EnKr]);
    let i =0;
    function Clickstep(el){
        el.preventDefault();
        const steps =document.querySelectorAll(".stepbox h2")
        const choose = document.querySelector(".choose")
        const exams = document.querySelectorAll(".exambox")
        const options = document.querySelectorAll(".option label input:checked")
        steps.forEach(element => {
            element.classList.remove("act")
        });
        
        
        if(i === 0){
            if(options.length !== 8){
                alert("모든 문항을 체크 해주세요.")
                steps[i].classList.add("act")
                return
            }else{
                options.forEach(e =>{
                    Useranswer.push([e.className,e.value])
                })
            el.target.classList.add("act")
            choose.classList.add("zero")
            choose.classList.remove("one")
            choose.classList.remove("two")
            i ++
                
            }
            
        }else if(i===1){
            el.target.classList.add("act")
            choose.classList.remove("zero")
            choose.classList.add("one")
            choose.classList.remove("two")
            i ++
        }else if(i===2){
            el.target.classList.add("act")
            choose.classList.remove("zero")
            choose.classList.remove("one")
            choose.classList.add("two")
            i =0
        }
        const act = document.querySelector(".act")
        console.log(act);
        if(act.innerText === "Step 1"){
            exams[0].classList.add("opa")
            exams[1].classList.remove("opa")
            exams[2].classList.remove("opa")
        }else if(act.innerText ==="Step 2"){
            exams[0].classList.remove("opa")
            exams[1].classList.add("opa")
            exams[2].classList.remove("opa")
        }else if(act.innerText ==="Step 3"){
            exams[0].classList.remove("opa")
            exams[1].classList.remove("opa")
            exams[2].classList.add("opa")
        }
    }
    function hintClick(el){
        const hint = el.target.nextSibling;
        hint.classList.remove("none");
    }
    function ClickNext(el){
        const exams = document.querySelectorAll(".exambox")
        const btns = document.querySelectorAll(".next")
        const step1 = document.querySelector(".step1 label h2");
        const step2 = document.querySelector(".step2 label h2");
        const step3 = document.querySelector(".step3 label h2");
        const options = document.querySelectorAll(".option label input:checked")
        
        console.log(options);
        if(el.target == btns[0]){
            
            if(options.length !== 8){
                alert("모든 문항을 체크 해주세요.")
                return
            }else{
                options.forEach(e =>{
                    Useranswer.push([e.className,e.value])
                })
                
            }
            exams[0].classList.remove("opa")
            exams[1].classList.add("opa")
            exams[2].classList.remove("opa")
            step1.classList.remove("act")
            step2.classList.add("act")
            step3.classList.remove("act")

        }else{
            exams[0].classList.remove("opa")
            exams[1].classList.remove("opa")
            exams[2].classList.add("opa")
            step1.classList.remove("act")
            step2.classList.remove("act")
            step3.classList.add("act")
        }
    }
    function answerSubmit(){
        const answerinput = [...document.querySelectorAll(".answerinput")];
        console.log(answerinput);
        let chkinput = []
        let step1point =0
        let step2point =0
        let step3point =0
        let total =0
        answerinput.forEach(e =>{
            chkinput.push(e.value)
        })
        
       
        if(chkinput.every((elem) => elem !=="")){
            answerinput.forEach(e =>{
                Useranswer.push([e.value,e.name])
            })
        }else{
            return alert("비어있는 문항이 있습니다.")
        }
        console.log(Useranswer,answer);
        Useranswer.forEach((el,idx) =>{
            if(idx <=7){
                if(el[0] == answer[idx]){
                    console.log(el);
                    step1point +=parseInt(el[1])
                }
            }else if(8 <= idx <=12){
                if(answer[idx].some(e => e === el[0].trim())){
                    step2point +=parseInt(el[1])
                }
            }else{
                if(answer[idx].some(e => e === el[0].trim())){
                    step3point +=parseInt(el[1])
                }
            }
            
        })
        total = step1point +step2point +step3point
        console.log(total);
    }
    if(QuizData.length >0){
    return (
        <>
            <div className="examcontainer">
                <div className="choose zero">
                    <div className="stepbox">
                        <div className="step1"><label for="input1"><h2 className="act"  onClick={Clickstep}>Step 1</h2></label></div>
                        <p>선수 이름 맞추기</p>
                    </div>
                    <div className="stepbox">
                        <div className="step2"><label for="input2"><h2 onClick={Clickstep}>Step 2</h2></label></div>
                        <p>소속 팀 보고 선수 맞추기</p>
                    </div>
                    <div className="stepbox">
                        <div className="step3"><label for="input3"><h2 onClick={Clickstep}>Step 3</h2></label></div>
                        <p>스쿼드 보고 팀 이름 맞추기</p>
                    </div>
                </div>
                <input type="radio" name="boxinput" id="input1" hidden checked></input>
                <input type="radio" name="boxinput" id="input2" hidden></input>
                <input type="radio" name="boxinput" id="input3" hidden></input>
                <div className="exambox opa" >
                    {QuizData[0].step1[0].map((element,i) => {
                      console.log(element.title);
                      return(
                        <>
                        <div className="questionbox">
                            <div className="questiontitle">
                                <h3>{element.title}</h3>
                                <h4>point: {element.point}</h4>
                            
                            </div>
                            <div className="options">
                                {element.options.map((e,idx) =>{
                                    return(                                    
                                            <div className="option">
                                                <label for={i+"option"+idx}>
                                                    <input type="radio" id={i+"option"+idx} name={"question"+i} value={element.point} className={idx+1}></input>
                                                    <span>{e}</span>
                                                </label>
                                            </div>                                    
                                    )
                                })}
                                <div className="hintbox">
                                    <button onClick={hintClick}>힌트 보기</button>
                                    <h5 className="none">힌트 : {element.hint}</h5>
                                </div>

                            </div>
                        </div>
                        </>
                        )
                    })}
                    <button className="next" onClick={ClickNext}>Next</button>
                </div>
                <div className="exambox " >
                    {QuizData[1].step2[0].map((element,idx) => {
                      console.log(element.img);
                      return(
                        <>
                        <div className="questionbox">
                            <div className="questiontitle">
                                <h3>{element.title}</h3>
                                <h4>point: {element.point}</h4>
                                {/* <img src={element.img}></img> */}
                                <div className={"img"+idx}></div>
                                <input type="text" placeholder="선수 이름을 입력하세요." className="answerinput" name={element.point}></input>
                                <div className="hintbox">
                                    <button onClick={hintClick}>힌트 보기</button>
                                    <h5 className="none">힌트 : {element.hint}</h5>
                                </div>
                            </div>
                        </div> 
                        </>
                        )
                    })}
                    <button className="next" onClick={ClickNext}>Next</button>
                </div>
                <div className="exambox " >
                    {QuizData[2].step3[0].map((element,idx) => {
                      console.log(element.title);
                      return(
                        <>
                        <div className="questionbox">
                            <h3>{element.title}</h3>
                            <h4>point: {element.point}</h4>
                            <div className={"teamimg"+idx}></div>
                            <input type="text" placeholder="팀 이름을 입력하세요." className="answerinput" name={element.point}></input>
                            <div className="hintbox">
                                    <button onClick={hintClick}>힌트 보기</button>
                                    <h5 className="none">힌트 : {element.hint}</h5>
                                </div>
                        </div> 
                        </>
                        )
                    })}
                    <button className="done" onClick={answerSubmit}>Done</button>
                </div>
            </div>
        </>
    );
    }
  }
  
  export default Quiz;