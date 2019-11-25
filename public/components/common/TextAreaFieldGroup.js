import { div, small, textarea } from "../../libs/elements.js";

export default ({ name, placeholder, value, error, info, onInput }) => {
  if (error) {
    var invalid = "is-invalid";
    var errorDiv = div(
      { className: "invalid-feedback", style: { display: "block" } },
      error
    );
  }

  return div(
    { className: "form-group" },
    textarea({
      className: `form-control form-control-lg ${invalid}`,
      placeholder: placeholder,
      name: name,
      value: value,
      oninput: onInput
    }),
    errorDiv,
    small({ className: "form-text text-muted" }, info)
  );
};
