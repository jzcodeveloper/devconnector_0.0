import { div, p, span, strong, li, ul, h4, h3 } from "../../libs/elements.js";
import formatDate from "../../libs/utils.js";

export default props => {
  const { education, experience } = props;

  const expItems = experience.map(exp => {
    const expLocation = exp.location
      ? p({}, span({}, strong("Location: "), exp.location))
      : null;

    const expDescription = exp.description
      ? p({}, span({}, strong("Description: "), exp.description))
      : null;

    return li(
      { className: "list-group-item" },
      h4(exp.company),
      p(formatDate(exp.from) + " - " + formatDate(exp.to)),
      p({}, strong("Position: "), exp.title),
      expLocation,
      expDescription
    );
  });

  const eduItems = education.map(edu => {
    const eduDescription = edu.description
      ? p({}, span({}, strong("Description: "), edu.description))
      : null;

    return li(
      { className: "list-group-item" },
      h4(edu.school),
      p(formatDate(edu.from) + " - " + formatDate(edu.to)),
      p({}, strong("Degree: "), edu.degree),
      p({}, strong("Field Of Study: "), edu.fieldOfStudy),
      eduDescription
    );
  });

  const expItemsCheck =
    expItems.length > 0
      ? ul({ className: "list-group" }, ...expItems)
      : p({ className: "text-center" }, "No Experience Listed");

  const eduItemsCheck =
    eduItems.length > 0
      ? ul({ className: "list-group" }, ...eduItems)
      : p({ className: "text-center" }, "No Education Listed");

  return div(
    { className: "row" },
    div(
      { className: "col-md-6" },
      h3({ className: "text-center text-info" }, "Experience"),
      expItemsCheck
    ),
    div(
      { className: "col-md-6" },
      h3({ className: "text-center text-info" }, "Education"),
      eduItemsCheck
    )
  );
};
