import React from "react";
import { Link } from "react-router-dom";
import "./home.css";

export default function Navbar() {
  return (
    <div id="Home">
      <section class="curved">
        <section id="main">
          <div className="main-row">
            <div></div>
            <div className="text">
              <h1>Tumblr</h1>
              <h3> مساحه للجمال والمتعه البصريه , تمبلر حياه اخرى تجدها هنا</h3>

              <h4> اهلاً في مساحتك الخاصة</h4>

              <Link className=".btn" to={"/SignUp"} className="btn">
                ToSignUp
              </Link>
            </div>
            <br /> <br /> <br />
          </div>
        </section>
      </section>
    </div>
  );
}
