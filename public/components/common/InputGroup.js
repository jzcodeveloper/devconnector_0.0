import { div, input, i, span } from "../../libs/elements.js";

export default ({ name, placeholder, value, error, icon, onInput }) => {
  if (error) {
    var invalid = "is-invalid";
    var errorDiv = div(
      { className: "invalid-feedback", style: { display: "block" } },
      error
    );
  }

  return div(
    { className: "input-group mb-3" },
    div(
      { className: "input-group-prepend" },
      span({ className: "input-group-text" }, i({ className: icon }))
    ),
    input({
      className: `form-control form-control-lg ${invalid}`,
      placeholder: placeholder,
      name: name,
      value: value,
      oninput: onInput
    }),
    errorDiv
  );
};
