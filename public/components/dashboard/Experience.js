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
  const { experience } = props;

  const onDeleteClick = id => {
    store.dispatch("deleteExperience", id);
  };

  const experienceDiv = experience.map(exp => {
    return tr(
      {},
      td(exp.company),
      td(exp.title),
      td(formatDate(exp.from) + " - " + formatDate(exp.to)),
      td(
        {},
        button(
          {
            className: "btn btn-danger",
            onclick: onDeleteClick.bind(this, exp._id)
          },
          "Delete"
        )
      )
    );
  });

  return div(
    {},
    h4({ className: "mb-4" }, "Experience Credentials"),
    table(
      { className: "table" },
      thead(
        {},
        tr({}, th("Company"), th("Title"), th("Years"), th()),
        ...experienceDiv
      )
    )
  );
};
