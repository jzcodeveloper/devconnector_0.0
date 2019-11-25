import { div, small, option, select } from "../../libs/elements.js";

export default ({ name, value, error, info, onInput, options }) => {
  const selectOptions = options.map(op =>
    option(
      { label: op.label, value: op.value, selected: op.selected },
      op.label
    )
  );

  if (error) {
    var invalid = "is-invalid";
    var errorDiv = div(
      { className: "invalid-feedback", style: { display: "block" } },
      error
    );
  }

  return div(
    { className: "form-group" },
    select(
      {
        className: `form-control form-control-lg ${invalid}`,
        name: name,
        value: value,
        oninput: onInput
      },
      ...selectOptions
    ),
    errorDiv,
    small({ className: "form-text text-muted" }, info)
  );
};
