import React from 'react';

const Faq = () => {
    return(
        <div className="container faq">
            <h1 className="faqtitle">Frequently Asked Questions</h1>
            <h3>What is this site?</h3>
            <p>This site is an attempt to create a easily searchable and fully comprehensive database of every SSBM match ever played and recorded.</p>
            <h3>How much data do you have?</h3>
            <p>Currently, we have about about 150,000 matches, 400 tournaments, and 22,000 players in the database. Most of it comes from larger scale tournaments.</p>
            <h3>Did you know your database isn't 100% accurate?</h3>
            <p>Yes. We are very aware of that. Correcting mistakes in the database is an ongoing process.</p>
            <h3>Did you know you are missing matches?</h3>
            <p>Yes. It is nearly impossible to acquire 100% of the data, give us a break.</p>
            <h3>How did you get this data?</h3>
            <p>Through hard work, determination, and a decent understanding of web scraping.</p>
            <h3>When are you going to get the rest of the data?</h3>
            <p>We intend on including everything from super majors all the way to weekly locals, but its a process that takes a lot of time. Be patient.</p>
            <h3>What are your main sources?</h3>
            <p>Right now, our main sources are smash.gg, challonge.com, and the melee facebook groups.</p>
            <h3>Why did you make this site?</h3>
            <p>We made this because we believe Super Smash Bros Melee is the best game ever created and we wanted to make a contribution to the melee community.</p>
            <h3>What are your plans for the future of this site?</h3>
            <p>You'll have to wait and see...</p>
        </div>
    )
};

export default Faq;