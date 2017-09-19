import React from "react";
import "../css/faq.css";

const Faq = () => {
    return (
        <div className="container faq mt-5">
            <h1 className="faq-title text-center">FAQ</h1>
            <div className="row">
                <div className="col-6 mx-auto my-2">
                    <h3>What is this site?</h3>
                    <p className="mt-2">
                        This site is an attempt to create a easily searchable
                        and fully comprehensive database of every SSBM match
                        ever played and recorded.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>How much data do you have?</h3>
                    <p className="mt-2">
                        Currently, we have about about 150,000 matches, 400
                        tournaments, and 22,000 players in the database. Most of
                        it comes from larger scale tournaments.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>Did you know your database isn't 100% accurate?</h3>
                    <p className="mt-2">
                        Yes. We are very aware of that. Correcting mistakes in
                        the database is an ongoing process.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>Did you know you are missing matches?</h3>
                    <p className="mt-2">
                        Yes. It is nearly impossible to acquire 100% of the
                        data, give us a break.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>How did you get this data?</h3>
                    <p className="mt-2">
                        Through hard work, determination, and a decent
                        understanding of web scraping.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>When are you going to get the rest of the data?</h3>
                    <p className="mt-2">
                        We intend on including everything from super majors all
                        the way to weekly locals, but its a process that takes a
                        lot of time. Be patient.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>What are your main sources?</h3>
                    <p className="mt-2">
                        Right now, our main sources are smash.gg, challonge.com,
                        and the melee facebook groups.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>Why did you make this site?</h3>
                    <p className="mt-2">
                        We made this because we believe Super Smash Bros Melee
                        is the best game ever created and we want to make a
                        contribution to the melee community.
                    </p>
                </div>
                <div className="col-6 mx-auto my-2">
                    <h3>What are your plans for the future of this site?</h3>
                    <p className="mt-2">You'll have to wait and see...</p>
                </div>
            </div>
        </div>
    );
};

export default Faq;
