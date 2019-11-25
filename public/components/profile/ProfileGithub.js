import { div, h3, h4, a, span, p } from "../../libs/elements.js";
import Component from "../../libs/component.js";
import store from "../../store/index.js";

export default new class ProfileGithub extends Component {
  constructor() {
    super({});
    self = this;
    this.state = {
      clientId: "4fc2d0cae4c05a46104d",
      clientSecret: "6c8ed6a360382f3310cb50a87148ddb0678d9e31",
      count: 5,
      sort: "created: asc",
      repos: []
    };
  }

  setGithubRepos() {
    const { githubusername } = store.state.global.profile.profile;

    let req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        self.setState({ repos: JSON.parse(req.responseText) });
        self.render();
      }
    };
    req.open(
      "GET",
      `https://api.github.com/users/${githubusername}/repos?per_page=${
        this.state.count
      }&sort=${this.state.sort}&client_id=${
        this.state.clientId
      }&client_secret=${this.state.clientSecret}`
    );
    req.send(null);
  }

  render() {
    let repoItems = this.state.repos.map(repo =>
      div(
        { className: "card card-body mb-2" },
        div(
          { className: "row" },
          div(
            { className: "col-md-6" },
            h4(
              {},
              a(
                {
                  href: repo.html_url,
                  className: "text-info",
                  target: "_blank"
                },
                repo.name
              )
            ),
            p(repo.description)
          ),
          div(
            { className: "col-md-6" },
            span(
              { className: "badge badge-info mr-1" },
              `Stars: ${repo.stargazers_count}`
            ),
            span(
              { className: "badge badge-secondary mr-1" },
              `Watchers: ${repo.watchers_count}`
            ),
            span(
              { className: "badge badge-success" },
              `Forks: ${repo.forks_count}`
            )
          )
        )
      )
    );

    if (document.querySelector(".github")) {
      document.querySelector(".github").innerHTML = "";
      document
        .querySelector(".github")
        .appendChild(
          div(
            {},
            h3({ className: "mb-4 mt-4" }, "Latest Github Repos"),
            ...repoItems
          )
        );
    }
  }
}();
