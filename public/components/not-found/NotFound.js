import { div, h1, p } from "../../libs/elements.js";

export default () => {
  return div(
    { className: "ml-5" },
    h1({ className: "display-4" }, "Page Not Found"),
    p("Sorry, this page does not exist")
  );
};
