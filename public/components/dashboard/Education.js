import {
  div,
  th,
  tr,
  td,
  button,
  h4,
  table,
  thead
} from "../../libs/elements.js";
import formatDate from "../../libs/utils.js";
import store from "../../store/index.js";

export default props => {
  const { education } = props;

  const onDeleteClick = id => {
    store.dispatch("deleteEducation", id);
  };

  const educationDiv = education.map(edu => {
    return tr(
      {},
      td(edu.school),
      td(edu.degree),
      td(formatDate(edu.from) + " - " + formatDate(edu.to)),
      td(
        {},
        button(
          {
            className: "btn btn-danger",
            onclick: onDeleteClick.bind(this, edu._id)
          },
          "Delete"
        )
      )
    );
  });

  return div(
    {},
    h4({ className: "mb-4" }, "Education Credentials"),
    table(
      { className: "table" },
      thead(
        {},
        tr({}, th("School"), th("Degree"), th("Years"), th()),
        ...educationDiv
      )
    )
  );
};
