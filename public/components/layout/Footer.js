import { footer } from "../../libs/elements.js";

export default () => {
  return footer(
    { className: "bg-dark text-white mt-5 p-4 text-center" },
    `Copyright © ${new Date().getFullYear()} DevConnector`
  );
};
