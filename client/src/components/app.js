import React from "react";
import { Route } from "react-router-dom";
import Navbar from "./features/navbar";
import Landing from "./landing/landing";
import About from "./static_pages/about";
import SearchResults from "./search_results/search_results";
import PlayerProfile from "./player_profile/player_profile";
import Head2HeadResults from "./h2h_results/head2head_results";
import Head2HeadProfile from "./h2h_profile/head2head_profile";
import CharacterSelect from "./character_select/character_select";
import Favicon from "react-favicon";
import Faq from "./static_pages/faq";
import "./css/animate.css";
import "./css/app.css";

export default () =>
    <div>
        <Favicon url="https://vignette3.wikia.nocookie.net/ssb/images/6/64/Favicon.ico/revision/latest?cb=20150114084035" />
        <Route component={Navbar} />
        <Route exact path="/" component={Landing} />
        <Route path="/characterselect" component={CharacterSelect} />
        <Route path="/results/:search/:id" component={SearchResults} />
        <Route path="/player_profile/:id" component={PlayerProfile} />
        <Route
            path="/head2headresults/:id1/:search/:page"
            component={Head2HeadResults}
        />
        <Route
            path="/head2headprofile/:id1/:id2"
            component={Head2HeadProfile}
        />
        <Route path="/faq" component={Faq} />
        <Route path="/about" component={About} />
        <Route path="/character_select_screen" component={CharacterSelect} />
    </div>;
