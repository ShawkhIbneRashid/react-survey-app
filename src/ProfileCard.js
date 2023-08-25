import data from './adminResponse.json';
//console.log(data);
//function ProfileCard() {
//    return (
//        <>
//            <div>
//                <div>Name : {data.name}</div>
//                <div>Email : {data.email}</div>
//                <div>Website : {data.website}</div>
//                <div><label>Country :</label>
//                    <select>
//                        {data.country.map((country) => {
//                            return <option key={country.id} value={country.id}>{country.name}</option>
//                        })}
//                    </select>
//                </div>
//            </div>
//        </>
//    )
//}

// return <option key={country.id} value={country.id}>{country.name}</option>
//function ProfileCard() {
//    return (
//        <>
//            <div>
//                <div>Name : {data.name}</div>
//                <div>Email : {data.email}</div>
//                <div>Website : {data.website}</div>
//                <div><label>Country :</label>
//                    
//                        {data.country.map((country) => {
//                            return <div>{country.name}</div>
//                        })}
//                    
//                </div>
//            </div>
//        </>
//    )
//}
//console.log(Object.keys(data).length);
const id = "Question1";

const jsonID = Object.keys(data);
const arrID = data.Suggestions[0];
console.log(arrID["111"]);

//<div>
//                    Total number of Questions: {jsonID}
//                </div>
//               
//                <div>
//                    Objects : {Object.keys(data).map((qus) => {
//                        data.Question1.map((q) => {
//                            return <div> {q}</div>
//                    })  
//                       // return <div> {qus} </div>
//                        
//                    })}
//                </div>

function ProfileCard() {
    return (
        <>
            <div>
                

                <div>
                    Question 1:
                    {data.Question1.map((qus) => {
                        return <div> {qus.Question}
                            <div>
                                Answers:
                                {qus.Answers.map((ir) => {
                                    return <div> {ir}</div>
                                })}
                                
                            </div>
                        </div>
                        
                })}
                </div>

                <div>
                    Question 2:
                    {data.Question2.map((qus) => {
                        return <div>{qus.Question}
                            <div>
                                Answers:
                                {qus.Answers.map((ir) => {
                                    return <div> {ir}</div>
                                })}

                            </div>
                        </div>

                    })}
                </div>

                <div>
                    Question 3:
                    {data.Question3.map((qus) => {
                        return <div> {qus.Question}
                            <div>
                                Answers:
                                {qus.Answers.map((ir) => {
                                    return <div> {ir}</div>
                                })}

                            </div>
                        </div>

                    })}
                </div>

                <div>

                    Suggestions:
                    {Object.keys(arrID).map((sg) => {
                        return <div> {arrID[sg]} </div>
                    })}
                </div>
                
            </div>
        </>
    )
}


//function ProfileCard({ title, handle, image, description}) {
//    return (
//        <div className="card">
//            <div className="card-image">
//                <figure className="image is-1by1">
//                    <img src={image} alt="image of cortana" />
//                </figure>
//            </div>
//
//            <div className="card-content">
//                <div className="media-content">
//                    <p className="title is-4"> {title}</p>
//                    <p className="title is-4"> {handle}</p>
//                </div>
//                <div className="content">
//                    {description}
//                </div>
//            </div>
//        </div>
//    );
//}
//
export default ProfileCard;




import React, { useState } from 'react';
import data from './newAdminResponse.json';
import 'bulma/css/bulma.css'

const id = "Question1";

const jsonID = Object.keys(data);
const arrID = data.Questions[0];
//const valPoint = "";

function ProfileCard() {
    const [valRadio, setVal] = useState();
    return (

        <div >

            <div class="columns is-mobile is-centered has-background-grey-lighter">
                <div class="column is-half">
                    <section className="hero is-warning">
                        <div className="hero-body">
                            <p className="title">
                                {data.testName}
                            </p>
                        </div>
                    </section>


                    <div >
                        <div class="card" >
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">

                                        <p class="title is-4 pt-5">1</p>

                                        {data.Questions.map((qus) => {
                                            return <div> <p class="subtitle is-4"> {qus.Question1} </p> </div>

                                        })}
                                    </div>
                                </div>


                                {data.Questions[0]["Answers"].map((ir) => {
                                    return (
                                        <div>
                                            <p class="subtitle is-5">
                                                <p class="pb-3">
                                                    <p class="pl-3">
                                                        <input type="radio" value={ir["points"]} name="radioPoint" style={{ marginRight: '1em' }} />


                                                        {ir["option"], ir["value"]}
                                                    </p>
                                                </p>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>



                    <div>
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">

                                        <p class="title is-4">2</p>

                                        {data.Questions.map((qus) => {
                                            return <div> <p class="subtitle is-4"> {qus.Question2} </p> </div>

                                        })}
                                    </div>
                                </div>


                                {data.Questions[1]["Answers"].map((ir) => {
                                    return (
                                        <div>
                                            <p class="subtitle is-5">
                                                <p class="pb-3">
                                                    <p class="pl-3">
                                                        <input type="radio" value="ans" name="radAns" style={{ marginRight: '1em' }} />


                                                        {ir["option"], ir["value"]}
                                                    </p>
                                                </p>
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    </div>


                    <div>
                        <div class="card">
                            <div class="card-content">
                                <div class="media">
                                    <div class="media-content">

                                        <p class="title is-4">3</p>

                                        {data.Questions.map((qus) => {
                                            return <div> <p class="subtitle is-4"> {qus.Question3} </p> </div>

                                        })}
                                    </div>
                                </div>


                                {data.Questions[2]["Answers"].map((ir) => {
                                    return (
                                        <div>
                                            <p class="subtitle is-5">
                                                <p class="pb-3">
                                                    <p class="pl-3">
                                                        <input type="radio" value="ans" name="radAns" style={{ marginRight: '1em' }} />

                                                        {ir["option"], ir["value"]}
                                                    </p>
                                                </p>
                                            </p>
                                        </div>
                                    )
                                })

                                }
                                <p class="pb-5">
                                </p>
                                <div class="columns is-mobile is-centered">
                                    <div class="buttons">
                                        <button class="button is-primary is-medium">Submit</button>
                                    </div>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>

        </div>
    )
}


export default ProfileCard;