import { div, a, i } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";

export default () => {
  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  return div(
    { className: "btn-group mb-4" },
    a(
      {
        href: "/edit-profile",
        className: "btn btn-light",
        onclick: onClick
      },
      i({ className: "fas fa-user-circle text-info mr-1" }),
      "Edit profile"
    ),
    a(
      {
        href: "/add-experience",
        className: "btn btn-light",
        onclick: onClick
      },
      i({ className: "fab fa-black-tie text-info mr-1" }),
      "Add Experience"
    ),
    a(
      {
        href: "/add-education",
        className: "btn btn-light",
        onclick: onClick
      },
      i({ className: "fas fa-graduation-cap text-info mr-1" }),
      "Add Education"
    )
  );
};
