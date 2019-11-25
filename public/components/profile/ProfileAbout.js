import { div, span, h3, p, i } from "../../libs/elements.js";

export default props => {
  const { profile } = props;

  const firstName = profile.user.name.trim().split(" ")[0];

  const profileBio = profile.bio
    ? span(profile.bio)
    : span(firstName + " does not have a bio");

  const skills = profile.skills.map(skill =>
    div({ className: "p-3" }, i({ className: "fa fa-check" }), skill)
  );

  return div(
    { className: "row" },
    div(
      { className: "col-md-12" },
      div(
        { className: "card card-body bg-light mb-3" },
        h3({ className: "text-center text-info" }, firstName + `'s Bio`),
        p({ className: "lead" }, profileBio),
        h3({ className: "text-center text-info" }, "Skill Set"),
        div(
          { className: "row" },
          div(
            {
              className:
                "d-flex flex-wrap justify-content-center align-items-center"
            },
            ...skills
          )
        )
      )
    )
  );
};
