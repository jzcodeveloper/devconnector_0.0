import { div, small, input } from "../../libs/elements.js";

export default ({
  name,
  placeholder,
  value,
  error,
  info,
  type,
  onInput,
  disabled
}) => {
  if (error) {
    var invalid = "is-invalid";
    var errorDiv = div(
      { className: "invalid-feedback", style: { display: "block" } },
      error
    );
  }

  return div(
    { className: "form-group" },
    input({
      type: type,
      className: `form-control form-control-lg ${invalid}`,
      autocomplete: "off",
      placeholder: placeholder,
      name: name,
      value: value,
      oninput: onInput,
      disabled: disabled
    }),
    errorDiv,
    small({ className: "form-text text-muted" }, info)
  );
};
