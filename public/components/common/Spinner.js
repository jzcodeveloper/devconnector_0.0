import { div, img } from "../../libs/elements.js";

export default () => {
  return div(
    {},
    img({
      src: "../components/common/spinner.gif",
      alt: "Loading...",
      style: { width: "200px", margin: "auto", display: "block" }
    })
  );
};
