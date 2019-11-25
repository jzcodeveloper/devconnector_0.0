import { a, div, button, ul, li, span, img } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";
import store from "../../store/index.js";

export default () => {
  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  const onLogoutClick = e => {
    e.preventDefault();
    store.dispatch("clearCurrentProfile");
    store.dispatch("logoutUser");
  };

  const { user, isAuthenticated } = store.state.global.auth;

  if (isAuthenticated === true) {
    var links = ul(
      { className: "navbar-nav ml-auto" },
      li(
        { className: "nav-item" },
        a(
          {
            className: "nav-link",
            href: "/feed",
            onclick: onClick
          },
          "Post Feed"
        )
      ),
      li(
        { className: "nav-item" },
        a(
          {
            className: "nav-link",
            href: "/dashboard",
            onclick: onClick
          },
          "Dashboard"
        )
      ),
      li(
        { className: "nav-item" },
        a(
          {
            className: "nav-link",
            href: "",
            onclick: onLogoutClick
          },
          img({
            className: "rounded-circle",
            src: user.avatar,
            alt: user.name,
            style: {
              width: "25px",
              marginRight: "5px"
            },
            title:
              "You must have a Gravatar connected to your email to display an image"
          }),
          "Logout"
        )
      )
    );
  } else {
    var links = ul(
      { className: "navbar-nav ml-auto" },
      li(
        { className: "nav-item" },
        a(
          {
            className: "nav-link",
            href: "/register",
            onclick: onClick
          },
          "Sign Up"
        )
      ),
      li(
        { className: "nav-item" },
        a(
          {
            className: "nav-link",
            href: "/login",
            onclick: onClick
          },
          "Login"
        )
      )
    );
  }

  return div(
    { className: "navbar navbar-expand-sm navbar-dark bg-dark mb-4" },
    div(
      { className: "container" },
      a(
        { className: "navbar-brand", href: "/", onclick: onClick },
        "DevConnector"
      ),
      button(
        { className: "navbar-toggler", type: "button" },
        span({ className: "navbar-toggler-icon" })
      ),
      div(
        { className: "collapse navbar-collapse", id: "mobile-nav" },
        ul(
          { className: "navbar-nav mr-auto" },
          li(
            { className: "nav-item" },
            a(
              {
                className: "nav-link",
                href: "/profiles",
                onclick: onClick
              },
              "Developers"
            )
          )
        ),
        links
      )
    )
  );
};
