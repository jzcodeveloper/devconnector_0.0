import { div, h1, p, a } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";

export default () => {
  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  return div(
    { className: "landing" },
    div(
      { className: "dark-overlay landing-inner text-light" },
      div(
        { className: "container" },
        div(
          { className: "row" },
          div(
            { className: "col-md-12 text-center" },
            h1({ className: "display-3 mb-4" }, "Developer Connector"),
            p(
              { className: "lead" },
              "Create a developer profile/portfolio, share posts and get helpfrom other developers"
            ),
            a(
              {
                className: "btn btn-lg btn-info mr-2",
                href: "/register",
                onclick: onClick
              },
              "Sign Up"
            ),
            a(
              {
                className: "btn btn-lg btn-light",
                href: "/login",
                onclick: onClick
              },
              "Login"
            )
          )
        )
      )
    )
  );
};
