import { div, img, i, span, h4, p, a, ul, li } from "../../libs/elements.js";
import { Push } from "../../libs/router.js";

export default props => {
  const { profile } = props;

  const onClick = e => {
    e.preventDefault();
    Push(e.target.href);
  };

  let statusCompany = profile.company ? span(" at " + profile.company) : null;

  let profileLocation = profile.location ? span(profile.location) : null;

  let profileSkills = profile.skills
    .slice(0, 4)
    .map(skill =>
      li(
        { className: "list-group-item" },
        i({ className: "fa fa-check pr-1" }),
        skill
      )
    );

  return div(
    { className: "card card-body bg-light mb-3" },
    div(
      { className: "row" },
      div(
        { className: "col-2" },
        img({
          src: profile.user.avatar,
          alt: "",
          className: "rounded-circle"
        })
      ),
      div(
        { className: "col-lg-6 col-md-4 col-8" },
        h4(profile.user.name),
        p(profile.status, statusCompany),
        p({}, profileLocation),
        a(
          {
            href: `/profile/${profile.handle}`,
            className: "btn btn-info",
            onclick: onClick
          },
          "View Profile"
        )
      ),
      div(
        { className: "col-md-4 d-none d-md-block" },
        h4("Skill Set"),
        ul({ className: "list-group" }),
        ...profileSkills
      )
    )
  );
};
