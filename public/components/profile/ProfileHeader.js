import { div, h1, img, span, a, i, p } from "../../libs/elements.js";

export default props => {
  const { profile } = props;

  let statusCompany = profile.company ? span(" at " + profile.company) : null;

  let profileLocation = profile.location ? span(profile.location) : null;

  let profileWebsite = profile.website
    ? a(
        {
          className: "text-white p-2",
          href: profile.website,
          target: "_blank"
        },
        i({ className: "fas fa-globe fa-2x" })
      )
    : null;

  let socialTwitter =
    profile.social && profile.social.twitter
      ? a(
          {
            className: "text-white p-2",
            href: profile.social.twitter,
            target: "_blank"
          },
          i({ className: "fab fa-twitter fa-2x" })
        )
      : null;

  let socialFacebook =
    profile.social && profile.social.facebook
      ? a(
          {
            className: "text-white p-2",
            href: profile.social.facebook,
            target: "_blank"
          },
          i({ className: "fab fa-facebook fa-2x" })
        )
      : null;

  let socialLinkedin =
    profile.social && profile.social.linkedin
      ? a(
          {
            className: "text-white p-2",
            href: profile.social.linkedin,
            target: "_blank"
          },
          i({ className: "fab fa-linkedin fa-2x" })
        )
      : null;

  let socialYoutube =
    profile.social && profile.social.youtube
      ? a(
          {
            className: "text-white p-2",
            href: profile.social.youtube,
            target: "_blank"
          },
          i({ className: "fab fa-youtube fa-2x" })
        )
      : null;

  let socialInstagram =
    profile.social && profile.social.instagram
      ? a(
          {
            className: "text-white p-2",
            href: profile.social.instagram,
            target: "_blank"
          },
          i({ className: "fab fa-instagram fa-2x" })
        )
      : null;

  return div(
    { className: "row" },
    div(
      { className: "col-md-12" },
      div(
        { className: "card card-body bg-info text-white mb-3" },
        div(
          { className: "row" },
          div(
            { className: "col-4 col-md-3 m-auto" },
            img({
              className: "rounded-circle",
              src: profile.user.avatar
            })
          )
        ),
        div(
          { className: "text-center" },
          h1({ className: "display-4 text-center" }, profile.user.name),
          p({ className: "lead text-center" }, profile.status, statusCompany),
          p({}, profileLocation),
          p(
            {},
            profileWebsite,
            socialTwitter,
            socialFacebook,
            socialLinkedin,
            socialYoutube,
            socialInstagram
          )
        )
      )
    )
  );
};
